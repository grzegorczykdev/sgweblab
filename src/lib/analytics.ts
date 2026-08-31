const GA_MEASUREMENT_ID = "G-F1WRE494EM";

let analyticsLoaded = false;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const loadGoogleAnalytics = (): void => {
  if (analyticsLoaded || typeof window === "undefined") {
    return;
  }

  analyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];

  const gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };
  window.gtag = gtag;

  gtag("js", new Date());

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  script.onload = () => {
    gtag("config", GA_MEASUREMENT_ID);
  };
  document.head.appendChild(script);
};
