import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { heroPrerenderPlugin } from "./src/lib/heroPrerenderPlugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [heroPrerenderPlugin(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react-helmet-async", "react-fast-compare"],
  },
}));
