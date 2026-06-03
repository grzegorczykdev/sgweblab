import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { detectPreferredLanguage, getHomePath } from "@/lib/i18n";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFoundContent = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname,
      );
    }
  }, [location.pathname]);

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center bg-muted px-4"
    >
      <div className="text-center max-w-md">
        <h1 className="mb-4 font-display text-4xl font-bold text-primary">
          404
        </h1>
        <p className="mb-6 text-xl text-muted-foreground">
          {t("notFound.message")}
        </p>
        <Link
          to={getHomePath(language)}
          className="text-primary underline hover:text-primary/90"
        >
          {t("notFound.back")}
        </Link>
      </div>
    </main>
  );
};

const NotFound = () => (
  <LanguageProvider initialLanguage={detectPreferredLanguage()}>
    <NotFoundContent />
  </LanguageProvider>
);

export default NotFound;
