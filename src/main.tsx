import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const loadDeferredFonts = () => import("./fonts-deferred.css");

if ("requestIdleCallback" in window) {
  requestIdleCallback(() => void loadDeferredFonts(), { timeout: 2000 });
} else {
  window.addEventListener("load", () => void loadDeferredFonts());
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<App />);
