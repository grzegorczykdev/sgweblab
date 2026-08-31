import type { Language } from "@/types/project";

/** Single source of truth for hero headline/subheadline. */
export const HERO_COPY = {
  pl: {
    headline:
      "Nowoczesne strony i aplikacje dla sektora Health & Care. Zbuduj wizerunek, któremu zaufa pacjent i klient.",
    subheadline:
      "Jako programistka i specjalistka z zapleczem dietetycznym pomagam markom medycznym, dietetycznym, beauty i wellness zaistnieć w sieci. Tworzę szybkie strony, automatyzuję sprzedaż (ebooków, planów, konsultacji) i wdrażam narzędzia AI, które ułatwiają pracę gabinetów oraz klinik. Zadbaj o widoczność w Google i przyciągnij pacjentów, którzy szukają profesjonalistów.",
  },
  en: {
    headline:
      "Modern websites and apps for the Health & Care sector. Build an image that patients and clients trust.",
    subheadline:
      "As a developer and specialist with a nutrition background, I help medical, dietetics, beauty, and wellness brands establish themselves online. I create fast websites, automate sales (ebooks, plans, consultations), and implement AI tools that make clinics and practices easier to run. Strengthen your Google visibility and attract patients looking for professionals.",
  },
} satisfies Record<Language, { headline: string; subheadline: string }>;

export const heroTranslationEntries = {
  "hero.headline": {
    en: HERO_COPY.en.headline,
    pl: HERO_COPY.pl.headline,
  },
  "hero.subheadline": {
    en: HERO_COPY.en.subheadline,
    pl: HERO_COPY.pl.subheadline,
  },
} as const;
