import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const WAKAPI_TARGET = "https://wakatime.lth.so";
const SPOTIFY_TARGET = "https://spotify.lth.so";
const GHOST_TARGET = "https://blog.lth.so";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const WAKAPI_API_KEY = env.WAKAPI_API_KEY as string;
  const GHOST_CONTENT_API_KEY = env.GHOST_CONTENT_API_KEY as string;

  return {
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
          rewrite: (path) => {
            const newPath = path.replace(/^\/api\/ghost/, "/ghost/api/content");
            const connector = newPath.includes("?") ? "&" : "?";
            return `${newPath}${connector}key=${GHOST_CONTENT_API_KEY}`;
          },
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
          rewrite: (path) => {
            const newPath = path.replace(/^\/api\/ghost/, "/ghost/api/content");
            const connector = newPath.includes("?") ? "&" : "?";
            return `${newPath}${connector}key=${GHOST_CONTENT_API_KEY}`;
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
