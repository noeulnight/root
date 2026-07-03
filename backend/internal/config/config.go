package config

import (
	"net/url"
	"os"
	"strings"
)

type Config struct {
	Port               string
	StaticDir          string
	WakapiTarget       *url.URL
	WakapiAPIKey       string
	SpotifyTarget      *url.URL
	GhostTarget        *url.URL
	GhostContentAPIKey string
	TraccarTarget      *url.URL
	TraccarToken       string
	TraccarDeviceID    string
}

func Load() (Config, error) {
	loadDotEnv(".env", "../.env")

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

	traccarTarget, err := url.Parse(getenv("TRACCAR_TARGET", "https://traccar.lth.so"))
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
		TraccarTarget:      traccarTarget,
		TraccarToken:       os.Getenv("TRACCAR_TOKEN"),
		TraccarDeviceID:    getenv("TRACCAR_DEVICE_ID", "1"),
	}, nil
}

func getenv(key string, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}
	return value
}

func loadDotEnv(paths ...string) {
	for _, path := range paths {
		content, err := os.ReadFile(path)
		if err != nil {
			continue
		}

		for _, line := range strings.Split(string(content), "\n") {
			line = strings.TrimSpace(line)
			if line == "" || strings.HasPrefix(line, "#") {
				continue
			}

			key, value, ok := strings.Cut(line, "=")
			if !ok {
				continue
			}

			key = strings.TrimSpace(key)
			value = strings.Trim(strings.TrimSpace(value), `"'`)
			if key != "" && os.Getenv(key) == "" {
				_ = os.Setenv(key, value)
			}
		}
	}
}
