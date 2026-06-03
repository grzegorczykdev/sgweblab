import {
  buildLocalizedPath,
  detectPreferredLanguage,
  parseLocalizedPath,
} from "@/lib/i18n";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Redirects paths without a language suffix (e.g. `/portfolio` → `/portfolio/pl`).
 */
const LocalizedRedirect = () => {
  const location = useLocation();
  const { segments } = parseLocalizedPath(location.pathname);
  const lang = detectPreferredLanguage();
  const target = `${buildLocalizedPath(segments, lang)}${location.search}${location.hash}`;

  return <Navigate to={target} replace />;
};

export default LocalizedRedirect;
