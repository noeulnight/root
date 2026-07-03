package server

import (
	"encoding/json"
	"errors"
	"io"
	"math"
	"net/http"
	"net/url"
	"os"
	"path"
	"regexp"
	"strconv"
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
	mux.HandleFunc("GET /api/traccar/location", s.traccarLocation)
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

type traccarPosition struct {
	ID         int64      `json:"id"`
	DeviceID   int64      `json:"deviceId"`
	Latitude   float64    `json:"latitude"`
	Longitude  float64    `json:"longitude"`
	Address    *string    `json:"address"`
	DeviceTime *time.Time `json:"deviceTime"`
	FixTime    *time.Time `json:"fixTime"`
}

type traccarGeofence struct {
	ID          int64   `json:"id"`
	Name        string  `json:"name"`
	Description *string `json:"description"`
	Area        string  `json:"area"`
}

type traccarLocationResponse struct {
	CurrentGeofenceNames []string `json:"currentGeofenceNames"`
}

type geoPoint struct {
	Lat float64
	Lon float64
}

func (s *Server) traccarLocation(w http.ResponseWriter, r *http.Request) {
	if s.cfg.TraccarToken == "" {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "TRACCAR_TOKEN is not configured"})
		return
	}

	query := url.Values{}
	query.Set("deviceId", s.cfg.TraccarDeviceID)

	var positions []traccarPosition
	if ok := s.fetchTraccarJSON(w, r, upstreamURL(s.cfg.TraccarTarget, "/api/positions", query), &positions); !ok {
		return
	}

	if len(positions) == 0 {
		writeJSON(w, http.StatusNotFound, map[string]string{"error": "position not found"})
		return
	}

	var geofences []traccarGeofence
	if ok := s.fetchTraccarJSON(w, r, upstreamURL(s.cfg.TraccarTarget, "/api/geofences", nil), &geofences); !ok {
		return
	}

	position := positions[0]
	point := geoPoint{Lat: position.Latitude, Lon: position.Longitude}
	currentGeofenceNames := make([]string, 0)

	for _, geofence := range geofences {
		contains, _, ok := evaluateGeofence(point, geofence.Area)
		if !ok {
			continue
		}

		if contains {
			currentGeofenceNames = append(currentGeofenceNames, geofence.Name)
		}
	}

	writeJSON(w, http.StatusOK, traccarLocationResponse{
		CurrentGeofenceNames: currentGeofenceNames,
	})
}

func (s *Server) fetchTraccarJSON(w http.ResponseWriter, r *http.Request, upstream *url.URL, target any) bool {
	req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, upstream.String(), nil)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"error": "failed to create upstream request"})
		return false
	}

	req.Header.Set("Accept", "application/json")
	req.Header.Set("Authorization", "Bearer "+s.cfg.TraccarToken)
	req.Header.Set("User-Agent", "root-backend/1.0")

	resp, err := s.client.Do(req)
	if err != nil {
		writeJSON(w, http.StatusBadGateway, map[string]string{"error": "upstream request failed"})
		return false
	}
	defer resp.Body.Close()

	if resp.StatusCode < http.StatusOK || resp.StatusCode >= http.StatusMultipleChoices {
		writeJSON(w, resp.StatusCode, map[string]string{"error": "traccar request failed"})
		return false
	}

	if err := json.NewDecoder(resp.Body).Decode(target); err != nil {
		writeJSON(w, http.StatusBadGateway, map[string]string{"error": "failed to decode upstream response"})
		return false
	}

	return true
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

var coordinatePattern = regexp.MustCompile(`[-+]?\d+(?:\.\d+)?`)

func evaluateGeofence(point geoPoint, area string) (bool, float64, bool) {
	upperArea := strings.ToUpper(strings.TrimSpace(area))

	switch {
	case strings.HasPrefix(upperArea, "CIRCLE"):
		return evaluateCircleGeofence(point, area)
	case strings.HasPrefix(upperArea, "POLYGON"):
		return evaluatePolygonGeofence(point, area)
	default:
		return false, 0, false
	}
}

func evaluateCircleGeofence(point geoPoint, area string) (bool, float64, bool) {
	values := parseAreaNumbers(area)
	if len(values) < 3 {
		return false, 0, false
	}

	center := geoPoint{Lat: values[0], Lon: values[1]}
	radiusMeters := values[2]
	distanceMeters := haversineMeters(point, center)

	return distanceMeters <= radiusMeters, math.Max(0, distanceMeters-radiusMeters), true
}

func evaluatePolygonGeofence(point geoPoint, area string) (bool, float64, bool) {
	values := parseAreaNumbers(area)
	if len(values) < 6 || len(values)%2 != 0 {
		return false, 0, false
	}

	points := make([]geoPoint, 0, len(values)/2)
	for i := 0; i < len(values); i += 2 {
		points = append(points, geoPoint{Lat: values[i], Lon: values[i+1]})
	}

	if pointInPolygon(point, points) {
		return true, 0, true
	}

	nearest := math.Inf(1)
	for _, candidate := range points {
		nearest = math.Min(nearest, haversineMeters(point, candidate))
	}

	return false, nearest, true
}

func parseAreaNumbers(area string) []float64 {
	matches := coordinatePattern.FindAllString(area, -1)
	values := make([]float64, 0, len(matches))

	for _, match := range matches {
		value, err := strconv.ParseFloat(match, 64)
		if err == nil {
			values = append(values, value)
		}
	}

	return values
}

func pointInPolygon(point geoPoint, polygon []geoPoint) bool {
	inside := false
	j := len(polygon) - 1

	for i := 0; i < len(polygon); i++ {
		pi := polygon[i]
		pj := polygon[j]

		intersects := ((pi.Lon > point.Lon) != (pj.Lon > point.Lon)) &&
			(point.Lat < (pj.Lat-pi.Lat)*(point.Lon-pi.Lon)/(pj.Lon-pi.Lon)+pi.Lat)

		if intersects {
			inside = !inside
		}

		j = i
	}

	return inside
}

func haversineMeters(a geoPoint, b geoPoint) float64 {
	const earthRadiusMeters = 6371000

	lat1 := degreesToRadians(a.Lat)
	lat2 := degreesToRadians(b.Lat)
	deltaLat := degreesToRadians(b.Lat - a.Lat)
	deltaLon := degreesToRadians(b.Lon - a.Lon)

	h := math.Sin(deltaLat/2)*math.Sin(deltaLat/2) +
		math.Cos(lat1)*math.Cos(lat2)*math.Sin(deltaLon/2)*math.Sin(deltaLon/2)

	return earthRadiusMeters * 2 * math.Atan2(math.Sqrt(h), math.Sqrt(1-h))
}

func degreesToRadians(degrees float64) float64 {
	return degrees * math.Pi / 180
}
