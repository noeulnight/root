package server

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/noeulnight/root/backend/internal/config"
)

func TestSpotifyTopSongsUsesConfiguredPublicToken(t *testing.T) {
	upstream := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/api/spotify/top/songs" {
			t.Errorf("path = %q", r.URL.Path)
		}
		if got := r.URL.Query().Get("token"); got != "hyun" {
			t.Errorf("token = %q, want hyun", got)
		}
		if got := r.URL.Query().Get("nb"); got != "1" {
			t.Errorf("nb = %q, want 1", got)
		}
		w.WriteHeader(http.StatusOK)
	}))
	defer upstream.Close()

	target, err := url.Parse(upstream.URL)
	if err != nil {
		t.Fatal(err)
	}
	handler, err := New(config.Config{
		WakapiTarget:       target,
		SpotifyTarget:      target,
		SpotifyPublicToken: "hyun",
		GhostTarget:        target,
	})
	if err != nil {
		t.Fatal(err)
	}

	request := httptest.NewRequest(http.MethodGet, "/api/spotify/top/songs?nb=1&token=other", nil)
	response := httptest.NewRecorder()
	handler.ServeHTTP(response, request)
	if response.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200", response.Code)
	}
}
