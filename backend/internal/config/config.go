package config

import (
	"net/url"
	"os"
)

type Config struct {
	Port               string
	StaticDir          string
	WakapiTarget       *url.URL
	WakapiAPIKey       string
	SpotifyTarget      *url.URL
	GhostTarget        *url.URL
	GhostContentAPIKey string
}

func Load() (Config, error) {
	wakapiTarget, err := url.Parse(getenv("WAKAPI_TARGET", "https://wakatime.lth.so"))
	if err != nil {
		return Config{}, err
	}

	spotifyTarget, err := url.Parse(getenv("SPOTIFY_TARGET", "https://spotify.lth.so"))
	if err != nil {
		return Config{}, err
	}

	ghostTarget, err := url.Parse(getenv("GHOST_TARGET", "https://blog.lth.so"))
	if err != nil {
		return Config{}, err
	}

	return Config{
		Port:               getenv("PORT", "8080"),
		StaticDir:          getenv("STATIC_DIR", "dist"),
		WakapiTarget:       wakapiTarget,
		WakapiAPIKey:       os.Getenv("WAKAPI_API_KEY"),
		SpotifyTarget:      spotifyTarget,
		GhostTarget:        ghostTarget,
		GhostContentAPIKey: os.Getenv("GHOST_CONTENT_API_KEY"),
	}, nil
}

func getenv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}
