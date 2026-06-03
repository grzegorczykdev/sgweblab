import { getHomePath, getPortfolioPath, parseLocalizedPath } from "@/lib/i18n";
import { findProjectBySlug, getProjectAlternateUrls, BASE_URL } from "@/lib/portfolio";
import type { Language } from "@/types/project";

interface AlternateLinks {
  pl: string;
  en: string;
  xDefault: string;
}

export interface SeoPayload {
  lang: Language;
  title: string;
  description: string;
  canonical: string;
  alternates: AlternateLinks;
}

const HOME_SEO = {
  pl: {
    title:
      "Strony internetowe Lublin, Warszawa, ca?a Polska | Sylwia Grzegorczyk",
    description:
      "Strony internetowe Lublin, Warszawa i ca?a Polska. Tworz? nowoczesne strony firmowe i landing page'e zoptymalizowane pod Google.",
  },
  en: {
    title: "Sylwia Grzegorczyk | Full Stack Engineer & SEO Expert | Worldwide",
    description:
      "Custom websites for businesses worldwide. Modern landing pages, company sites, and e-commerce - optimized for Google. Remote collaboration.",
  },
} as const;

const PORTFOLIO_SEO = {
  pl: {
    title: "Portfolio realizacji | SGWebLab",
    description:
      "Przegl?d wdro?onych stron, aplikacji i systemw AI. Zobacz wyzwania, rozwi?zania oraz mierzalne efekty biznesowe.",
  },
  en: {
    title: "Portfolio projects | SGWebLab",
    description:
      "A curated selection of websites, applications, and AI systems with business challenges, solutions, and measurable outcomes.",
  },
} as const;

const homeAlternates = (): AlternateLinks => ({
  pl: `${BASE_URL}${getHomePath("pl")}`,
  en: `${BASE_URL}${getHomePath("en")}`,
  xDefault: `${BASE_URL}${getHomePath("en")}`,
});

const portfolioAlternates = (): AlternateLinks => ({
  pl: `${BASE_URL}${getPortfolioPath("pl")}`,
  en: `${BASE_URL}${getPortfolioPath("en")}`,
  xDefault: `${BASE_URL}${getPortfolioPath("en")}`,
});

export const resolveSeo = (pathname: string): SeoPayload => {
  const { lang: parsedLang, segments } = parseLocalizedPath(pathname);
  const lang: Language = parsedLang ?? "en";

  if (segments.length === 0) {
    return {
      lang,
      title: HOME_SEO[lang].title,
      description: HOME_SEO[lang].description,
      canonical: `${BASE_URL}${getHomePath(lang)}`,
      alternates: homeAlternates(),
    };
  }

  if (segments[0] === "portfolio" && segments.length === 1) {
    return {
      lang,
      title: PORTFOLIO_SEO[lang].title,
      description: PORTFOLIO_SEO[lang].description,
      canonical: `${BASE_URL}${getPortfolioPath(lang)}`,
      alternates: portfolioAlternates(),
    };
  }

  if (segments[0] === "portfolio" && segments[1]) {
    const project = findProjectBySlug(lang, segments[1]);

    if (project) {
      const alternates = getProjectAlternateUrls(project);
      return {
        lang,
        title: project.seo.title[lang],
        description: project.seo.description[lang],
        canonical: alternates[lang],
        alternates,
      };
    }
  }

  return {
    lang,
    title: HOME_SEO[lang].title,
    description: HOME_SEO[lang].description,
    canonical: `${BASE_URL}${getHomePath(lang)}`,
    alternates: homeAlternates(),
  };
};
