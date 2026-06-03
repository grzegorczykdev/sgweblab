import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollManager from "@/components/ScrollManager";
import LocalizedRedirect from "@/components/LocalizedRedirect";
import { LanguageProvider } from "@/contexts/LanguageContext";
import {
  buildLocalizedPath,
  isLanguage,
  parseLocalizedPath,
  persistLanguage,
} from "@/lib/i18n";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const LangLayout = () => {
  const location = useLocation();
  const parsed = parseLocalizedPath(location.pathname);

  useEffect(() => {
    if (parsed.lang && isLanguage(parsed.lang)) {
      persistLanguage(parsed.lang);
    }
  }, [parsed.lang]);

  if (parsed.format === "prefix" && parsed.lang) {
    const target = `${buildLocalizedPath(parsed.segments, parsed.lang)}${location.search}${location.hash}`;
    return <Navigate to={target} replace />;
  }

  if (!parsed.lang || !isLanguage(parsed.lang)) {
    return <LocalizedRedirect />;
  }

  return (
    <LanguageProvider initialLanguage={parsed.lang}>
      <ScrollManager />
      <div className="min-h-screen bg-background">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default LangLayout;
