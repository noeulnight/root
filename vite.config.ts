import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const WAKAPI_TARGET = "https://wakatime.lth.so";
const SPOTIFY_TARGET = "https://spotify.lth.so";
const WAKAPI_API_KEY =
  process.env.WAKAPI_API_KEY ?? "cc688ee2-cdb1-4599-8e17-ae7f0dd2bae1";

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
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
