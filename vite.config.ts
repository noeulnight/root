import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const WAKAPI_TARGET = "https://wakatime.lth.so";
const SPOTIFY_TARGET = "https://spotify.lth.so";
const GHOST_TARGET = "https://blog.lth.so";
const WAKAPI_API_KEY =
  process.env.WAKAPI_API_KEY ?? "47ba4fcc-ed5c-404e-8c14-4a0beb6c16fd";
const GHOST_CONTENT_API_KEY = process.env.GHOST_CONTENT_API_KEY ?? "86693ef2e9d42b6948a4bc2446";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/wakapi/all-time": {
        target: WAKAPI_TARGET,
        changeOrigin: true,
        rewrite: () =>
          `/api/compat/wakatime/v1/users/current/all_time_since_today?api_key=${encodeURIComponent(WAKAPI_API_KEY)}`,
      },
      "/api/spotify/top/songs": {
        target: SPOTIFY_TARGET,
        changeOrigin: true,
      },
      "/api/ghost": {
        target: GHOST_TARGET,
        changeOrigin: true,
        rewrite: () =>
          `/ghost/api/content/posts/?key=${encodeURIComponent(GHOST_CONTENT_API_KEY)}&limit=1`,
      },
    },
  },
  preview: {
    proxy: {
      "/api/wakapi/all-time": {
        target: WAKAPI_TARGET,
        changeOrigin: true,
        rewrite: () =>
          `/api/compat/wakatime/v1/users/current/all_time_since_today?api_key=${encodeURIComponent(WAKAPI_API_KEY)}`,
      },
      "/api/spotify/top/songs": {
        target: SPOTIFY_TARGET,
        changeOrigin: true,
      },
      "/api/ghost": {
        target: GHOST_TARGET,
        changeOrigin: true,
        rewrite: () =>
          `/ghost/api/content/posts/?key=${encodeURIComponent(GHOST_CONTENT_API_KEY)}&limit=1`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
