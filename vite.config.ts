import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { heroPrerenderPlugin } from "./src/lib/heroPrerenderPlugin";

/** Makes CSS load non-blocking: uses media="print" + onload to prevent render blocking (fixes Lighthouse LCP) */
function nonBlockingCss() {
  return {
    name: "non-blocking-css",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html.replace(
          /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
          '<link rel="stylesheet" media="print" href="$1" onload="this.media=\'all\'"><noscript><link rel="stylesheet" href="$1"></noscript>'
        );
      },
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [heroPrerenderPlugin(), react(), nonBlockingCss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react-helmet-async", "react-fast-compare"],
  },
}));
