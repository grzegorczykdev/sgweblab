import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { loadGoogleAnalytics } from "@/lib/analytics";
import {
  getCookieConsent,
  setCookieConsent,
} from "@/lib/cookieConsent";
import { getPrivacyPath } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CookieConsent = () => {
  const { language, t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent === "accepted") {
      loadGoogleAnalytics();
      return;
    }
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent("accepted");
    loadGoogleAnalytics();
    setVisible(false);
  };

  const handleReject = () => {
    setCookieConsent("rejected");
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 p-4 md:p-6",
        "motion-reduce:transition-none",
      )}
    >
      <div className="container-custom">
        <div className="glass rounded-2xl border border-white/30 bg-card/95 p-5 md:p-6 shadow-premium-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2 max-w-prose">
              <h2
                id="cookie-consent-title"
                className="font-display text-base font-semibold text-primary"
              >
                {t("cookies.title")}
              </h2>
              <p
                id="cookie-consent-description"
                className="text-sm text-muted-foreground leading-relaxed text-pretty"
              >
                {t("cookies.description")}{" "}
                <Link
                  to={`${getPrivacyPath(language)}#cookies`}
                  className="text-accent font-medium underline underline-offset-2 hover:no-underline"
                >
                  {t("cookies.policyLink")}
                </Link>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="min-h-11"
                onClick={handleReject}
              >
                {t("cookies.reject")}
              </Button>
              <Button
                type="button"
                variant="accent"
                size="sm"
                className="min-h-11"
                onClick={handleAccept}
              >
                {t("cookies.accept")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
