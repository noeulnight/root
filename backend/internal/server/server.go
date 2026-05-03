package server

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/url"
	"os"
	"path"
	"strings"
	"time"

	"github.com/noeulnight/root/backend/internal/config"
)

type Server struct {
	cfg    config.Config
	client *http.Client
	static http.Handler
}

func New(cfg config.Config) (http.Handler, error) {
	if cfg.WakapiTarget == nil || cfg.SpotifyTarget == nil || cfg.GhostTarget == nil {
		return nil, errors.New("upstream targets must be configured")
	}

	s := &Server{
		cfg: cfg,
		client: &http.Client{
			Timeout: 10 * time.Second,
		},
	}

	if _, err := os.Stat(cfg.StaticDir); err == nil {
		s.static = http.FileServer(http.Dir(cfg.StaticDir))
	}

	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/health", s.health)
	mux.HandleFunc("GET /api/wakapi/all-time", s.wakapiAllTime)
	mux.HandleFunc("GET /api/spotify/top/songs", s.spotifyTopSongs)
	mux.HandleFunc("GET /api/ghost", s.ghostLatestPost)
	mux.HandleFunc("/", s.frontend)

	return mux, nil
}

func (s *Server) health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (s *Server) wakapiAllTime(w http.ResponseWriter, r *http.Request) {
	if s.cfg.WakapiAPIKey == "" {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "WAKAPI_API_KEY is not configured"})
		return
	}

	query := url.Values{}
	query.Set("api_key", s.cfg.WakapiAPIKey)

	upstream := upstreamURL(s.cfg.WakapiTarget, "/api/compat/wakatime/v1/users/current/all_time_since_today", query)
	s.proxy(w, r, upstream)
}

func (s *Server) spotifyTopSongs(w http.ResponseWriter, r *http.Request) {
	upstream := upstreamURL(s.cfg.SpotifyTarget, "/api/spotify/top/songs", r.URL.Query())
	s.proxy(w, r, upstream)
}

func (s *Server) ghostLatestPost(w http.ResponseWriter, r *http.Request) {
	if s.cfg.GhostContentAPIKey == "" {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "GHOST_CONTENT_API_KEY is not configured"})
		return
	}

	query := url.Values{}
	query.Set("key", s.cfg.GhostContentAPIKey)
	query.Set("limit", "1")

	upstream := upstreamURL(s.cfg.GhostTarget, "/ghost/api/content/posts/", query)
	s.proxy(w, r, upstream)
}

func (s *Server) proxy(w http.ResponseWriter, r *http.Request, upstream *url.URL) {
	req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, upstream.String(), nil)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "failed to create upstream request"})
		return
	}

	req.Header.Set("Accept", r.Header.Get("Accept"))
	req.Header.Set("User-Agent", "root-backend/1.0")

	resp, err := s.client.Do(req)
	if err != nil {
		writeJSON(w, http.StatusBadGateway, map[string]string{"error": "upstream request failed"})
		return
	}
	defer resp.Body.Close()

	copyResponseHeaders(w.Header(), resp.Header)
	w.WriteHeader(resp.StatusCode)
	_, _ = io.Copy(w, resp.Body)
}

func (s *Server) frontend(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/api/") {
		http.NotFound(w, r)
		return
	}

	if s.static == nil {
		http.NotFound(w, r)
		return
	}

	requested := path.Clean(r.URL.Path)
	if requested == "/" {
		s.static.ServeHTTP(w, r)
		return
	}

	filePath := path.Join(s.cfg.StaticDir, requested)
	if _, err := os.Stat(filePath); err == nil {
		s.static.ServeHTTP(w, r)
		return
	}

	http.ServeFile(w, r, path.Join(s.cfg.StaticDir, "index.html"))
}

func upstreamURL(base *url.URL, upstreamPath string, query url.Values) *url.URL {
	next := *base
	next.Path = upstreamPath
	next.RawQuery = query.Encode()
	return &next
}

func copyResponseHeaders(dst http.Header, src http.Header) {
	for key, values := range src {
		if isHopByHopHeader(key) {
			continue
		}

		for _, value := range values {
			dst.Add(key, value)
		}
	}
}

func isHopByHopHeader(key string) bool {
	switch strings.ToLower(key) {
	case "connection", "keep-alive", "proxy-authenticate", "proxy-authorization", "te", "trailer", "transfer-encoding", "upgrade":
		return true
	default:
		return false
	}
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}
