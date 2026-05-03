import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const BACKEND_TARGET = process.env.VITE_BACKEND_TARGET ?? "http://localhost:8080";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
    proxy: {
      "/api": {
        target: BACKEND_TARGET,
        changeOrigin: true,
      },
    },
  },
  preview: {
    proxy: {
      "/api": {
        target: BACKEND_TARGET,
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
