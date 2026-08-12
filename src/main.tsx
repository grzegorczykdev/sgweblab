import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const loadDeferredFonts = () => import("./fonts-deferred.css");

if ("requestIdleCallback" in window) {
  requestIdleCallback(() => void loadDeferredFonts(), { timeout: 2000 });
} else {
  window.addEventListener("load", () => void loadDeferredFonts());
}

createRoot(document.getElementById("root")!).render(<App />);
