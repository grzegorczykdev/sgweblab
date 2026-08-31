import type { Language } from "@/types/project";

export interface PrivacySection {
  id?: string;
  title: Record<Language, string>;
  paragraphs: Record<Language, string>[];
  list?: Record<Language, string>[];
}

const CONTACT_EMAIL = "hello@sgweblab.com";

export const privacyPolicyMeta: Record<
  Language,
  { title: string; updated: string; intro: string }
> = {
  pl: {
    title: "Polityka prywatności",
    updated: "31 sierpnia 2026",
    intro:
      "Niniejsza polityka opisuje, w jaki sposób SG Web Lab (Sylwia Grzegorczyk) przetwarza dane osobowe użytkowników strony sgweblab.com.",
  },
  en: {
    title: "Privacy Policy",
    updated: "August 31, 2026",
    intro:
      "This policy explains how SG Web Lab (Sylwia Grzegorczyk) processes personal data of visitors to sgweblab.com.",
  },
};

export const privacyPolicySections: PrivacySection[] = [
  {
    title: {
      pl: "1. Administrator danych",
      en: "1. Data controller",
    },
    paragraphs: [
      {
        pl: `Administratorem Twoich danych osobowych jest Sylwia Grzegorczyk, prowadząca działalność pod marką SG Web Lab („Administrator”). Kontakt w sprawach ochrony danych: ${CONTACT_EMAIL}.`,
        en: `The controller of your personal data is Sylwia Grzegorczyk, operating under the SG Web Lab brand (“Controller”). Contact for data protection matters: ${CONTACT_EMAIL}.`,
      },
    ],
  },
  {
    title: {
      pl: "2. Jakie dane zbieramy",
      en: "2. What data we collect",
    },
    paragraphs: [
      {
        pl: "W zależności od sposobu korzystania ze strony możemy przetwarzać następujące dane:",
        en: "Depending on how you use the site, we may process the following data:",
      },
    ],
    list: [
      {
        pl: "dane podane w formularzu kontaktowym: imię, adres e-mail, treść wiadomości;",
        en: "data submitted via the contact form: name, email address, message content;",
      },
      {
        pl: "dane techniczne związane z korzystaniem ze strony (np. adres IP, typ przeglądarki, system operacyjny) — w szczególności gdy wyrazisz zgodę na analitykę;",
        en: "technical data related to your visit (e.g. IP address, browser type, operating system) — especially if you consent to analytics;",
      },
      {
        pl: "dane zapisane lokalnie w przeglądarce w celu ograniczenia nadużyć formularza (localStorage);",
        en: "data stored locally in your browser to limit form abuse (localStorage);",
      },
      {
        pl: "dane przetwarzane przez Google reCAPTCHA przy wysyłce formularza (ochrona antyspamowa).",
        en: "data processed by Google reCAPTCHA when submitting the form (anti-spam protection).",
      },
    ],
  },
  {
    title: {
      pl: "3. Cele i podstawy prawne przetwarzania",
      en: "3. Purposes and legal bases",
    },
    paragraphs: [
      {
        pl: "Dane przetwarzamy wyłącznie w konkretnych celach i na podstawie przepisów RODO:",
        en: "We process data only for specific purposes and on the following GDPR legal bases:",
      },
    ],
    list: [
      {
        pl: "odpowiedź na zapytanie wysłane przez formularz lub e-mail — art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora) lub art. 6 ust. 1 lit. b RODO (działania przed zawarciem umowy);",
        en: "responding to inquiries sent via the form or email — Art. 6(1)(f) GDPR (legitimate interest) or Art. 6(1)(b) GDPR (steps prior to entering a contract);",
      },
      {
        pl: "zapewnienie bezpieczeństwa i stabilności strony (antyspam, ograniczenie nadużyć) — art. 6 ust. 1 lit. f RODO;",
        en: "ensuring site security and stability (anti-spam, abuse prevention) — Art. 6(1)(f) GDPR;",
      },
      {
        pl: "statystyki odwiedzin strony (Google Analytics) — wyłącznie po Twojej zgodzie, art. 6 ust. 1 lit. a RODO.",
        en: "visit statistics (Google Analytics) — only after your consent, Art. 6(1)(a) GDPR.",
      },
    ],
  },
  {
    title: {
      pl: "4. Odbiorcy danych",
      en: "4. Data recipients",
    },
    paragraphs: [
      {
        pl: "Dane mogą być przekazywane podmiotom wspierającym Administratora w świadczeniu usług, w tym:",
        en: "Data may be shared with service providers that support the Controller, including:",
      },
      {
        pl: "Podmioty te przetwarzają dane jako podmioty przetwarzające na podstawie umów powierzenia lub własnych regulaminów.",
        en: "These entities process data as processors under data processing agreements or their own terms of service.",
      },
    ],
    list: [
      {
        pl: "Netlify, Inc. — hosting strony i obsługa formularza kontaktowego;",
        en: "Netlify, Inc. — website hosting and contact form handling;",
      },
      {
        pl: "Google LLC — reCAPTCHA (ochrona formularza) oraz Google Analytics (po wyrażeniu zgody).",
        en: "Google LLC — reCAPTCHA (form protection) and Google Analytics (after consent).",
      },
    ],
  },
  {
    title: {
      pl: "5. Przekazywanie danych poza Europejski Obszar Gospodarczy",
      en: "5. Transfers outside the EEA",
    },
    paragraphs: [
      {
        pl: "Netlify i Google mogą przetwarzać dane w USA lub innych krajach spoza EOG. Przekazywanie odbywa się z zastosowaniem mechanizmów przewidzianych przez RODO, w tym standardowych klauzul umownych Komisji Europejskiej.",
        en: "Netlify and Google may process data in the USA or other countries outside the EEA. Transfers rely on GDPR mechanisms, including the European Commission’s Standard Contractual Clauses.",
      },
    ],
  },
  {
    title: {
      pl: "6. Okres przechowywania danych",
      en: "6. Data retention",
    },
    paragraphs: [
      {
        pl: "Wiadomości z formularza kontaktowego przechowujemy przez okres niezbędny do udzielenia odpowiedzi i ewentualnej dalszej współpracy, nie dłużej niż 24 miesiące od ostatniego kontaktu, chyba że dłuższe przechowywanie wynika z przepisów prawa.",
        en: "Contact form messages are kept for as long as needed to respond and for any follow-up cooperation, but no longer than 24 months from the last contact, unless a longer period is required by law.",
      },
      {
        pl: "Dane analityczne są przechowywane zgodnie z ustawieniami Google Analytics i Twoją zgodą na cookies.",
        en: "Analytics data is retained according to Google Analytics settings and your cookie consent.",
      },
    ],
  },
  {
    title: {
      pl: "7. Twoje prawa",
      en: "7. Your rights",
    },
    paragraphs: [
      {
        pl: "Przysługuje Ci prawo do: dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, sprzeciwu wobec przetwarzania oraz cofnięcia zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania sprzed cofnięcia).",
        en: "You have the right to access, rectify, erase, restrict, and port your data, to object to processing, and to withdraw consent at any time (without affecting the lawfulness of processing before withdrawal).",
      },
      {
        pl: `Aby skorzystać z praw, napisz na adres ${CONTACT_EMAIL}. Masz też prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO), jeśli uznasz, że przetwarzanie narusza przepisy.`,
        en: `To exercise your rights, email ${CONTACT_EMAIL}. You may also lodge a complaint with your supervisory authority (in Poland: the President of the Personal Data Protection Office — UODO) if you believe processing violates the law.`,
      },
    ],
  },
  {
    id: "cookies",
    title: {
      pl: "8. Pliki cookies i podobne technologie",
      en: "8. Cookies and similar technologies",
    },
    paragraphs: [
      {
        pl: "Cookies to małe pliki zapisywane w przeglądarce. Strona może też korzystać z localStorage (np. do zapisania preferencji języka lub limitu wysyłek formularza).",
        en: "Cookies are small files stored in your browser. The site may also use localStorage (e.g. to save language preference or form submission limits).",
      },
      {
        pl: "Cookies niezbędne do działania strony (np. zapamiętanie wyboru języka) nie wymagają zgody. Cookies analityczne (Google Analytics) uruchamiamy dopiero po kliknięciu „Akceptuję” w banerze cookies.",
        en: "Cookies essential for the site (e.g. language preference) do not require consent. Analytics cookies (Google Analytics) are loaded only after you click “Accept” in the cookie banner.",
      },
      {
        pl: "Możesz w każdej chwili zmienić ustawienia cookies w przeglądarce lub odrzucić analitykę przy pierwszej wizycie. Odrzucenie nie wpływa na możliwość wysłania formularza kontaktowego.",
        en: "You can change cookie settings in your browser at any time or reject analytics on your first visit. Rejecting analytics does not prevent you from using the contact form.",
      },
    ],
    list: [
      {
        pl: "sgweblab.lang — preferencja języka (localStorage, niezbędne);",
        en: "sgweblab.lang — language preference (localStorage, essential);",
      },
      {
        pl: "sgweblab_form_hits — limit wysyłek formularza antyspamowego (localStorage, niezbędne);",
        en: "sgweblab_form_hits — anti-spam form submission limit (localStorage, essential);",
      },
      {
        pl: "sgweblab.cookie_consent — zapis Twojej decyzji o cookies (localStorage, niezbędne);",
        en: "sgweblab.cookie_consent — your cookie choice (localStorage, essential);",
      },
      {
        pl: "_ga, _ga_* — Google Analytics (cookies analityczne, tylko po zgodzie).",
        en: "_ga, _ga_* — Google Analytics (analytics cookies, only after consent).",
      },
    ],
  },
  {
    title: {
      pl: "9. Bezpieczeństwo danych",
      en: "9. Data security",
    },
    paragraphs: [
      {
        pl: "Stosujemy środki techniczne i organizacyjne adekwatne do ryzyka, w tym szyfrowanie połączenia HTTPS, zabezpieczenia formularza (honeypot, reCAPTCHA, limit wysyłek) oraz ograniczony dostęp do panelu administracyjnego.",
        en: "We apply technical and organizational measures appropriate to the risk, including HTTPS encryption, form protections (honeypot, reCAPTCHA, submission limits), and restricted access to the admin panel.",
      },
    ],
  },
  {
    title: {
      pl: "10. Zmiany polityki",
      en: "10. Policy changes",
    },
    paragraphs: [
      {
        pl: "Polityka może być aktualizowana. Data ostatniej zmiany jest podana na górze dokumentu. Istotne zmiany będą komunikowane na stronie.",
        en: "This policy may be updated. The last revision date is shown at the top. Material changes will be communicated on the site.",
      },
    ],
  },
];
