import type { Language } from "@/types/project";

/** Single source of truth for hero headline/subheadline (React + static prerender). */
export const HERO_PRERENDER_COPY = {
  pl: {
    headline:
      "Twoja strona, która sprzedaje. Zbuduję nowoczesny wizerunek Twojej firmy w sieci.",
    subheadline:
      "Tworzę szybkie strony wizytówki i landing page'e zoptymalizowane pod wyszukiwarkę Google. Wdrażam inteligentne rozwiązania AI, konfiguruję sprzedaż produktów cyfrowych i dbam o Twoją lokalną widoczność w Google. Pomogę Ci przyciągnąć wartościowych odbiorców i skutecznie zamienić ich w płacących klientów.",
  },
  en: {
    headline:
      "A website that sells. I will build a modern online image for your business.",
    subheadline:
      "I create fast business card sites and landing pages optimized for Google search. I implement intelligent AI solutions, configure digital product sales, and ensure your local visibility on Google. I will help you attract valuable audiences and effectively turn them into paying customers.",
  },
} satisfies Record<Language, { headline: string; subheadline: string }>;

export const heroTranslationEntries = {
  "hero.headline": {
    en: HERO_PRERENDER_COPY.en.headline,
    pl: HERO_PRERENDER_COPY.pl.headline,
  },
  "hero.subheadline": {
    en: HERO_PRERENDER_COPY.en.subheadline,
    pl: HERO_PRERENDER_COPY.pl.subheadline,
  },
} as const;
