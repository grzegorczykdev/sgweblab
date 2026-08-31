import type { Language } from "@/types/project";

export const LANG_STORAGE_KEY = "sgweblab.lang";

const SUPPORTED_LANGUAGES: Language[] = ["pl", "en"];

export const isLanguage = (value: string | undefined): value is Language =>
  value === "pl" || value === "en";

export const getStoredLanguage = (): Language | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    return isLanguage(stored) ? stored : null;
  } catch {
    return null;
  }
};

export const setStoredLanguage = (lang: Language): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // ignore quota / private mode
  }
};

/** Preferred language: saved choice → browser → Polish default. */
export const detectPreferredLanguage = (): Language => {
  const stored = getStoredLanguage();
  if (stored) {
    return stored;
  }

  if (typeof navigator !== "undefined") {
    const browserLang = navigator.language?.toLowerCase() ?? "";
    if (browserLang.startsWith("pl")) {
      return "pl";
    }
    if (browserLang.startsWith("en")) {
      return "en";
    }
  }

  return "pl";
};

export type PathFormat = "suffix" | "prefix" | "none";

export interface ParsedLocalizedPath {
  segments: string[];
  lang: Language | null;
  format: PathFormat;
}

/**
 * Parses URLs with language as suffix (`/portfolio/pl`) or legacy prefix (`/pl/portfolio`).
 */
export const parseLocalizedPath = (pathname: string): ParsedLocalizedPath => {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return { segments: [], lang: null, format: "none" };
  }

  const last = parts[parts.length - 1];
  if (isLanguage(last)) {
    return {
      segments: parts.slice(0, -1),
      lang: last,
      format: "suffix",
    };
  }

  const first = parts[0];
  if (isLanguage(first)) {
    return {
      segments: parts.slice(1),
      lang: first,
      format: "prefix",
    };
  }

  return { segments: parts, lang: null, format: "none" };
};

/** Builds a localized path with language suffix, e.g. `/portfolio/pl`. */
export const buildLocalizedPath = (
  segments: string[],
  lang: Language,
): string => {
  if (segments.length === 0) {
    return `/${lang}`;
  }

  return `/${[...segments, lang].join("/")}`;
};

export const getHomePath = (lang: Language): string =>
  buildLocalizedPath([], lang);

export const getPortfolioPath = (lang: Language): string =>
  buildLocalizedPath(["portfolio"], lang);

const PRIVACY_SEGMENTS: Record<Language, string[]> = {
  pl: ["polityka-prywatnosci"],
  en: ["privacy-policy"],
};

export const isPrivacyPathSegment = (segment: string | undefined): boolean =>
  segment === "polityka-prywatnosci" || segment === "privacy-policy";

export const getPrivacyPath = (lang: Language): string =>
  buildLocalizedPath(PRIVACY_SEGMENTS[lang], lang);

export const CV_URL = "/cv/full_stack_AI_sylwia_grzegorczyk_CV.pdf";

export const persistLanguage = (lang: Language): void => {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    setStoredLanguage(lang);
  }
};
