export const COOKIE_CONSENT_KEY = "sgweblab.cookie_consent";

export type CookieConsentValue = "accepted" | "rejected";

export const getCookieConsent = (): CookieConsentValue | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      return stored;
    }
    return null;
  } catch {
    return null;
  }
};

export const setCookieConsent = (value: CookieConsentValue): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore quota / private mode */
  }
};
