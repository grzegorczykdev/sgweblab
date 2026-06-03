import { persistLanguage } from "@/lib/i18n";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

type Language = "en" | "pl";

interface Translations {
  [key: string]: {
    en: string;
    pl: string;
  };
}

export const translations: Translations = {
  // Navigation
  "nav.about": { en: "About Me", pl: "O mnie" },
  "nav.services": { en: "Services", pl: "Usługi" },
  "nav.contact": { en: "Contact", pl: "Kontakt" },
  "nav.portfolio": { en: "Portfolio", pl: "Portfolio" },
  "nav.cta.contact": { en: "Get in touch", pl: "Skontaktuj się ze mną" },
  "nav.menu.open": { en: "Open menu", pl: "Otwórz menu" },
  "nav.menu.close": { en: "Close menu", pl: "Zamknij menu" },

  // Portfolio
  "portfolio.title": { en: "Selected projects", pl: "Wybrane realizacje" },
  "portfolio.subtitle": {
    en: "Explore websites and systems built with measurable business outcomes in mind.",
    pl: "Poznaj strony i systemy zaprojektowane z myślą o mierzalnych efektach biznesowych.",
  },
  "portfolio.filter.all": { en: "All", pl: "Wszystkie" },
  "portfolio.filter.websites": {
    en: "Websites & E-commerce",
    pl: "Strony i E-commerce",
  },
  "portfolio.filter.systems": {
    en: "Applications & Systems",
    pl: "Aplikacje i Systemy",
  },
  "portfolio.client": { en: "Client", pl: "Klient" },
  "portfolio.challenge": { en: "Business challenge", pl: "Wyzwanie biznesowe" },
  "portfolio.solution": { en: "My solution", pl: "Moje rozwiązanie" },
  "portfolio.results": { en: "Results achieved", pl: "Osiągnięte wyniki" },
  "portfolio.back": { en: "Back to portfolio", pl: "Wróć do portfolio" },
  "portfolio.disclaimer": {
    en: "Sensitive client data and company names have been changed for portfolio presentation purposes.",
    pl: "Dane wrażliwe klienta oraz nazwa firmy zostały zmienione na potrzeby prezentacji w portfolio.",
  },
  "portfolio.image.expand": {
    en: "Click to enlarge image",
    pl: "Kliknij, aby powiększyć zdjęcie",
  },
  "portfolio.carousel.previous": { en: "Previous image", pl: "Poprzednie zdjęcie" },
  "portfolio.carousel.next": { en: "Next image", pl: "Następne zdjęcie" },
  "portfolio.carousel.goTo": { en: "Go to image", pl: "Przejdź do zdjęcia" },

  // Hero Section
  "hero.stats.years": { en: "Years of experience", pl: "Lata doświadczenia" },
  "hero.stats.projects": {
    en: "Projects delivered",
    pl: "Dostarczone projekty",
  },
  "hero.stats.satisfaction": {
    en: "Satisfied clients",
    pl: "Zadowoleni klienci",
  },
  "hero.headline": {
    en: "A website that sells. I will build a modern online image for your business.",
    pl: "Twoja strona, która sprzedaje. Zbuduję nowoczesny wizerunek Twojej firmy w sieci.",
  },
  "hero.subheadline": {
    en: "I create fast business card sites and landing pages optimized for Google search. I implement intelligent AI solutions, configure digital product sales, and ensure your local visibility on Google. I will help you attract valuable audiences and effectively turn them into paying customers.",
    pl: "Tworzę szybkie strony wizytówki i landing page'e zoptymalizowane pod wyszukiwarkę Google. Wdrażam inteligentne rozwiązania AI, konfiguruję sprzedaż produktów cyfrowych i dbam o Twoją lokalną widoczność w Google. Pomogę Ci przyciągnąć wartościowych odbiorców i skutecznie zamienić ich w płacących klientów.",
  },
  "hero.cta.primary": {
    en: "Let's talk about your business",
    pl: "Porozmawiajmy o Twoim biznesie",
  },
  "hero.cta.secondary": { en: "View Services", pl: "Zobacz Usługi" },

  // Why Me Section
  "whyme.header": { en: "About Me", pl: "O mnie" },
  "whyme.title": { en: "Why Me", pl: "Dlaczego Ja" },
  "whyme.subtitle": {
    en: "I combine passion and knowledge with the real needs of your business.",
    pl: "Łączę pasję i wiedzę z realnymi potrzebami Twojego biznesu",
  },
  "whyme.quality.title": {
    en: "Architecture of Success",
    pl: "Architektura Sukcesu",
  },
  "whyme.quality.description": {
    en: "Code tailored for profit. I create sites that delight with design, but above all, earn money. I ditch heavy templates for custom solutions optimized for SEO from the very first line of code.",
    pl: "Kod skrojony pod zysk. Tworzę strony, które zachwycają designem, ale przede wszystkim zarabiają. Rezygnuję z ciężkich szablonów na rzecz autorskich rozwiązań zoptymalizowanych pod SEO od pierwszej linii kodu.",
  },
  "whyme.strategy.title": {
    en: "SEO & AI Optimization",
    pl: "SEO & AI Optimization",
  },
  "whyme.strategy.description": {
    en: "Visibility in a new era. Your site must be visible not just to people, but to algorithms. I optimize code so that your business is recommended by AI assistants like ChatGPT or Gemini.",
    pl: "Widoczność w nowej erze. Twoja strona musi być widoczna nie tylko dla ludzi, ale i dla algorytmów. Optymalizuję kod tak, aby Twój biznes był polecany przez asystentów AI, takich jak ChatGPT czy Gemini.",
  },
  "whyme.seo_ai.title": {
    en: "Sales Automation",
    pl: "Automatyzacja Sprzedaży",
  },
  "whyme.seo_ai.description": {
    en: "Your business on autopilot. I implement systems that sell for you. From payment automation to intelligent chatbots and handling digital products—your company earns even when you are resting.",
    pl: "Twój biznes na autopilocie. Wdrażam systemy, które sprzedają za Ciebie. Od automatyzacji płatności po inteligentne chatboty i obsługę produktów cyfrowych - Twoja firma zarabia nawet wtedy, gdy Ty odpoczywasz.",
  },
  "whyme.seo_ai.skill1": { en: "24/7 Sales", pl: "Sprzedaż 24/7" },
  "whyme.seo_ai.skill2": { en: "Online payments", pl: "Płatności online" },
  "whyme.seo_ai.skill3": { en: "Digital products", pl: "Produkty cyfrowe" },
  "whyme.seo_ai.skill4": { en: "AI Assistants", pl: "Asystenci AI" },
  "whyme.modern_ai.title": {
    en: "Partnership, not just a service",
    pl: "Partnerstwo, nie tylko usługa",
  },
  "whyme.modern_ai.description": {
    en: "Don't know where to start? I will guide you through the entire process, from choosing a domain to configuring your business card site, all the way to deployment and optimization. You get full support and a tool that you truly understand and can use.",
    pl: "Nie wiesz od czego zacząć? Przeprowadzę Cię przez cały proces, od wyboru domeny po konfigurację wizytówki, aż do wdrożenia i optymalizacji strony. Otrzymujesz ode mnie pełne wsparcie i narzędzie, które naprawdę rozumiesz i potrafisz obsługiwać.",
  },
  "whyme.modern_ai.skill1": { en: "A to Z Support", pl: "Wsparcie od A do Z" },
  "whyme.modern_ai.skill2": {
    en: "Clear action plan",
    pl: "Jasny plan działania",
  },
  "whyme.modern_ai.skill3": {
    en: "Business consulting",
    pl: "Doradztwo biznesowe",
  },
  "whyme.modern_ai.skill4": { en: "Simple language", pl: "Prosty język" },
  "whyme.effect.label": { en: "Effect", pl: "Efekt" },
  "whyme.quality.effect": {
    en: "Lightning-fast site, ready to fight for the top spots in search engines.",
    pl: "Błyskawiczna strona, gotowa na walkę o pierwsze miejsca w wyszukwiarkach.",
  },
  "whyme.strategy.effect": {
    en: "Support throughout the entire process, regardless of your current level of expertise.",
    pl: "Wsparcie przy całym procesie, bez względu na Twój obecny poziom zaawansowania.",
  },
  "whyme.seo_ai.effect": {
    en: "A scalable business without the need for constant supervision.",
    pl: "Skalowalny biznes bez konieczności ciągłego nadzoru.",
  },
  "whyme.partnership.title": {
    en: "Partnership, not just a service",
    pl: "Partnerstwo, nie tylko usługa",
  },
  "whyme.partnership.description": {
    en: "Don't know where to start? I will guide you through the entire process, from choosing a domain to configuring your business card site, all the way to deployment and optimization. You get full support and a tool that you truly understand and can use.",
    pl: "Nie wiesz od czego zacząć? Przeprowadzę Cię przez cały proces, od wyboru domeny po konfigurację wizytówki, aż do wdrożenia i optymalizacji strony. Otrzymujesz ode mnie pełne wsparcie i narzędzie, które naprawdę rozumiesz i potrafisz obsługiwać.",
  },
  "whyme.cta.label": {
    en: "Plan your launch with me",
    pl: "Zaplanuj start razem ze mną",
  },
  "whyme.cta.button": {
    en: "Go to contact",
    pl: "Przejdź do kontaktu",
  },
  "whyme.cta.banner.title": {
    en: "Consulting and shared vision",
    pl: "Doradztwo i wspólna wizja",
  },
  "whyme.cta.banner.body": {
    en: "Your business is unique, which is why before I write the first line of code, I listen to your needs. I act as your technology advisor. Together, we design solutions that best address the challenges of your industry. It's a partnership where my technical knowledge meets your business experience to create a product perfectly tailored to your clients.",
    pl: "Twój biznes jest unikalny, dlatego zanim postawię pierwszą linię kodu, słucham Twoich potrzeb. Działam jako Twój doradca technologiczny. Wspólnie projektujemy rozwiązania, które najlepiej odpowiedzą na wyzwania Twojej branży. To partnerstwo, w którym moja wiedza techniczna spotyka się z Twoim doświadczeniem biznesowym, by stworzyć produkt idealnie skrojony pod Twoich klientów.",
  },
  "whyme.cta.banner.note": {
    en: "",
    pl: "",
  },
  "whyme.combined.title": {
    en: "Architecture of Success: Code and Strategy",
    pl: "Architektura Sukcesu: Kod i Strategia",
  },
  "whyme.combined.description": {
    en: "I create sites that not only delight with design but above all, earn money. I ditch heavy templates for custom solutions that I optimize for SEO from the very first line of code. Thanks to this, your service is lightning-fast, secure, and ready to fight for the top spots in Google.",
    pl: "Tworzę strony, które nie tylko zachwycają designem, ale przede wszystkim zarabiają. Rezygnuję z ciężkich szablonów na rzecz autorskich rozwiązań, które optymalizuję pod kątem SEO od pierwszej linijki kodu. Dzięki temu Twój serwis jest błyskawiczny, bezpieczny i gotowy na walkę o pierwsze miejsca w Google.",
  },
  "whyme.combined.skill1": { en: "Loading speed", pl: "Szybkość ładowania" },
  "whyme.combined.skill2": { en: "Unique design", pl: "Unikalny projekt" },
  "whyme.combined.skill3": {
    en: "Optimized for Google",
    pl: "Optymalizacja pod Google",
  },
  "whyme.combined.skill4": { en: "Security", pl: "Bezpieczeństwo" },
  // Services Section
  "services.title": { en: "Services", pl: "Usługi" },
  "services.subtitle.compact": {
    en: "Three areas that deliver speed, visibility, and effortless operation.",
    pl: "Trzy obszary, które dowożą szybkość, widoczność i bezproblemową obsługę.",
  },
  "services.group.dev.title": {
    en: "Development & Design",
    pl: "Development & Design",
  },
  "services.group.dev.desc": {
    en: "I design and program from scratch. I will create a fast and secure site that will work for your business.",
    pl: "Projektuję i programuję od zera. Stworzę szybką i bezpieczną stronę, która będzie pracowała dla Twojego biznesu.",
  },
  "services.group.dev.b1": {
    en: "Individual design and implementation: a unique site tailored to your brand's needs.",
    pl: "Indywidualny projekt i wdrożenie: unikalna strona dopasowana do potrzeb Twojej marki.",
  },
  "services.group.dev.b2": {
    en: "Modernization of current service: code and design optimization to speed up site performance.",
    pl: "Modernizacja obecnego serwisu: optymalizacja kodu i designu w celu przyspieszenia działania strony.",
  },
  "services.group.dev.b3": {
    en: "Full responsiveness: flawless display and operation on mobile devices and tablets.",
    pl: "Pełna responsywność: bezbłędne wyświetlanie i obsługa na urządzeniach mobilnych oraz tabletach.",
  },
  "services.group.dev.cta": {
    en: "I want a new website",
    pl: "Chcę nową stronę",
  },
  "services.group.seoai.title": {
    en: "Search engine visibility and modern customer service",
    pl: "Widoczność w wyszukiwarkach i nowoczesna obsługa klienta",
  },
  "services.group.seoai.desc": {
    en: "I will make it easy for clients to find you, and artificial intelligence will help you serve them even while you sleep.",
    pl: "Sprawię, że klienci łatwo Cię znajdą, a sztuczna inteligencja pomoże Ci ich obsłużyć nawet kiedy śpisz.",
  },
  "services.group.seoai.b1": {
    en: "Effective positioning (SEO): actions aimed at bringing real customers from the search engine.",
    pl: "Skuteczne pozycjonowanie (SEO): działania nakierowane na sprowadzenie realnych klientów z wyszukiwarki.",
  },
  "services.group.seoai.b2": {
    en: "AI Assistant implementation: intelligent automation of inquiry handling 24/7.",
    pl: "Wdrożenie asystenta AI: inteligentna automatyzacja obsługi zapytań przez 24/7.",
  },
  "services.group.seoai.b3": {
    en: "Google Maps optimization: increasing business visibility for clients in your immediate area.",
    pl: "Optymalizacja w Mapach Google: zwiększenie widoczności firmy dla klientów z Twojej najbliższej okolicy.",
  },
  "services.group.seoai.cta": {
    en: "Check my visibility",
    pl: "Sprawdź moją widoczność",
  },
  "services.group.care.title": {
    en: "Full technical care - your external IT department.",
    pl: "Pełna opieka techniczna - Twój zewnętrzny dział IT.",
  },
  "services.group.care.desc": {
    en: "Not interested in technology and don't want to waste time configuring it? I'll take everything on myself. From domain purchase and hosting, through design and coding, to ongoing maintenance. You focus on business, I ensure your technology simply works.",
    pl: "Nie interesuje Cię technologia i nie chcesz tracić czasu na jej konfigurację? Wezmę wszystko na siebie. Od zakupu domeny i hostingu, przez projekt i kodowanie, aż po stałe utrzymanie. Ty zajmujesz się biznesem, ja dbam, żeby Twoja technologia po prostu działała.",
  },
  "services.group.care.b1": {
    en: "Comprehensive online start: domain registration, configuration of stable hosting and company email.",
    pl: "Kompleksowy start online: rejestracja domeny, konfiguracja stabilnego hostingu i poczty firmowej.",
  },
  "services.group.care.b2": {
    en: "Digital sales automation: implementation of payment systems and digital product distribution.",
    pl: "Automatyzacja sprzedaży cyfrowej: wdrożenie systemów płatności i dystrybucji produktów cyfrowych.",
  },
  "services.group.care.b3": {
    en: "Constant support and security: regular data updates and monitoring of site functionality.",
    pl: "Stałe wsparcie i bezpieczeństwo: regularne aktualizacje danych oraz monitoring poprawności działania strony.",
  },
  "services.group.care.cta": {
    en: "I need support",
    pl: "Potrzebuję wsparcia",
  },

  // Lead / Contact
  "lead.badge": { en: "Contact", pl: "Kontakt" },
  "lead.heading": {
    en: "Let's take the first step towards your online success",
    pl: "Zróbmy pierwszy krok do Twojego sukcesu online",
  },
  "lead.subtitle.highlight": {
    en: "Have a vision but don't know how to handle it technically? Or maybe you just need a site that finally starts earning for itself?",
    pl: "Masz wizję, ale nie wiesz, jak ją technicznie 'ugryźć'? A może po prostu potrzebujesz strony, która w końcu zacznie na siebie zarabiać?",
  },
  "lead.subtitle.rest": {
    en: " Write to me. We will go through the entire process together. I don't just offer code, I offer peace of mind and the certainty that your business is in good hands.",
    pl: " Napisz do mnie. Przejdziemy wspólnie przez cały proces. Nie oferuję tylko kodu, oferuję spokój i pewność, że Twój biznes jest w dobrych rękach.",
  },
  "lead.body.highlight": {
    en: "I treat every project individually.",
    pl: "Każdy projekt traktuję indywidualnie.",
  },
  "lead.body.rest": {
    en: " Whether you need a simple business card site or an advanced system with AI — I'm here to turn your challenges into effective solutions.",
    pl: " Niezależnie od tego, czy potrzebujesz prostej wizytówki, czy zaawansowanego systemu z AI - jestem tu, aby zamienić Twoje wyzwania w sprawne rozwiązania.",
  },
  "lead.custom": {
    en: "Have a non-standard request? Write freely! I love projects that require unconventional thinking. Describe your idea and together we'll figure out how to best execute it.",
    pl: "Masz niestandardowe zlecenie? Napisz śmiało! Uwielbiam projekty, które wymagają nieszablonowego myślenia. Opisz swój pomysł, a wspólnie zastanowimy się, jak go najlepiej zrealizować.",
  },
  "lead.emailOrFormPrefix": {
    en: "Send an email to ",
    pl: "Wyślij maila na ",
  },
  "lead.emailOrFormSuffix": {
    en: " or use the form.",
    pl: " lub skorzystaj z formularza.",
  },
  "lead.messageLabel": { en: "What do you need?", pl: "Czego potrzebujesz?" },
  "lead.name": { en: "Your Name", pl: "Twoje Imię" },
  "lead.email": { en: "Email Address", pl: "Adres Email" },
  "lead.submit": { en: "Send Message", pl: "Wyślij wiadomość" },
  "lead.privacyNote": {
    en: "Your data is safe. I reply within 24h.",
    pl: "Twoje dane są bezpieczne. Odpowiadam w ciągu 24h.",
  },
  "lead.error": {
    en: "Something went wrong. Please try again in a moment.",
    pl: "Coś poszło nie tak. Spróbuj ponownie za chwilę.",
  },
  "lead.antiSpamNote": {
    en: "We use anti-spam protection to ensure your message safely reaches my inbox.",
    pl: "Używamy zabezpieczeń anty-spamowych, aby Twoja wiadomość bezpiecznie trafiła do mojej skrzynki.",
  },
  "lead.rateLimitExceeded": {
    en: "Oops! It looks like my inbox is very busy right now. Please write to me directly at: ",
    pl: "Ups! Wygląda na to, że moja skrzynka jest teraz bardzo oblegana. Proszę, napisz do mnie bezpośrednio na adres: ",
  },
  "lead.errors.nameRequired": {
    en: "Name is required",
    pl: "Imię jest wymagane",
  },
  "lead.errors.nameTooLong": {
    en: "Name is too long",
    pl: "Imię jest za długie",
  },
  "lead.errors.emailInvalid": {
    en: "Invalid email address",
    pl: "Nieprawidłowy adres email",
  },
  "lead.errors.emailTooLong": {
    en: "Email is too long",
    pl: "Email jest za długi",
  },
  "lead.errors.messageTooShort": {
    en: "Message is too short (min. 10 characters)",
    pl: "Wiadomość jest za krótka (min. 10 znaków)",
  },
  "lead.errors.messageTooLong": {
    en: "Message is too long",
    pl: "Wiadomość jest za długa",
  },

  // Footer
  "footer.rights": {
    en: "All rights reserved.",
    pl: "Wszelkie prawa zastrzeżone.",
  },
};

const normalizeLanguage = (lang?: string): Language =>
  lang?.toLowerCase() === "pl" ? "pl" : "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage = "en",
}) => {
  const [language, setLanguage] = useState<Language>(() =>
    normalizeLanguage(initialLanguage),
  );

  useEffect(() => {
    const normalized = normalizeLanguage(initialLanguage);
    setLanguage(normalized);
    persistLanguage(normalized);
  }, [initialLanguage]);

  const handleSetLanguage = useCallback((lang: Language) => {
    const normalized = normalizeLanguage(lang);
    setLanguage(normalized);
    persistLanguage(normalized);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) {
        if (import.meta.env.DEV) {
          console.warn(`Translation missing for key: ${key}`);
        }
        return key;
      }
      return translation[language];
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
