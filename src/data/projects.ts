import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "aurelia-psychology",
    category: "websites",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO Optimization"],
    images: [
      "/portfolio/psychotherapy-website/psychotherapy-website-1.webp",
    ],
    slug: {
      pl: "strona-gabinet-psychoterapii",
      en: "psychotherapy-website",
    },
    seo: {
      title: {
        pl: "Nowoczesna strona dla gabinetu psychoterapii | SGWebLab",
        en: "Premium Website for Psychotherapy Practice | SGWebLab",
      },
      description: {
        pl: "Case study: Nowoczesna, szybka i zoptymalizowana pod SEO strona www dla gabinetu psychoterapii i coachingu Gestalt.",
        en: "Case study: Modern, high-performance, and SEO-optimized website for a psychotherapy and Gestalt coaching practice.",
      },
    },
    content: {
      pl: {
        title: "Strona www dla gabinetu psychoterapii i coachingu",
        clientName: "",
        challenge:
          "Klientka potrzebowała profesjonalnej obecności w sieci, która odzwierciedlałaby bezpieczny, spokojny i autentyczny charakter jej gabinetu. Bardzo zależało jej na spójności wizualnej z jej marką i obecnością na innych portalach w sieci. Gotowe szablony stron dla terapeutów były zbyt generyczne, chłodne i medyczne. Dodatkowo strona wymagała solidnej optymalizacji pod kątem lokalnego SEO, aby ułatwić potencjalnym pacjentom intuicyjne dotarcie do oferty.",
        solution:
          "Zaprojektowałam i wdrożyłam autorski projekt graficzny oparty na stonowanej, ziemistej kolorystyce i minimalistycznej typografii serif, która buduje zaufanie od pierwszych sekund. Strona została zakodowana z naciskiem na maksymalną szybkość ładowania. Wdrożyłam czytelną strukturę usług, sekcję manifestu marki oraz płynne, nienachalne animacje podbijające wrażenie premium.",
        results: [
          "Czas ładowania strony poniżej 1 sekundy (wynik 99/100 w Google PageSpeed Insights)",
          "Wzrost liczby zapytań przez formularz kontaktowy o 35% w pierwszym miesiącu po wdrożeniu",
          "Pełne dostosowanie struktury nagłówków i treści pod lokalne frazy kluczowe (SEO)",
          "Unikalny, minimalistyczny design w pełni spójny z identyfikacją wizualną marki",
        ],
      },
      en: {
        title: "Web Design for Psychotherapy & Coaching Practice",
        clientName: "",
        challenge:
          "The client needed a professional web presence that reflected the safe, calm, and authentic atmosphere of her practice. Achieving visual consistency with her brand identity and her existing presence across other online platforms was highly important to her. Off-the-shelf website templates for therapists felt too generic, cold, and overly clinical. Furthermore, the site required solid local SEO optimization to help potential patients intuitively discover her services.",
        solution:
          "I developed a custom web design featuring soft, earthy tones and minimalist serif typography to instill a sense of calm and trust immediately. Built with a performance-first approach, the site focuses on lightning-fast load times. I implemented a clean layout for her services, an engaging 'Manifesto' section, and smooth, subtle animations that enhance the premium feel.",
        results: [
          "Page load times under 1 second (99/100 score on Google PageSpeed Insights)",
          "35% increase in contact form inquiries within the first month post-launch",
          "Full SEO optimization targeting local search queries for psychotherapy and coaching",
          "Unique, minimalist design fully aligned with the brand's visual identity",
        ],
      },
    },
  },
  {
    id: "sgweblab-site",
    category: "websites",
    techStack: ["Nowoczesny Web Design", "Optymalizacja Szybkości", "Dwujęzyczność (PL/EN)", "SEO"],
    images: [
      "/portfolio/sgweblab/sgweblab-1.webp",
      "/portfolio/sgweblab/sgweblab-2.webp",
    ],
    video: "/portfolio/sgweblab/sgweblab.webm",
    slug: {
      pl: "nowoczesna-strona-agencyjna-sgweblab",
      en: "modern-agency-website-sgweblab",
    },
    seo: {
      title: {
        pl: "SGWebLab - Projekt nowoczesnej witryny biznesowej | Portfolio",
        en: "SGWebLab - Modern Business Website Design | Portfolio",
      },
      description: {
        pl: "Case study: Projekt i wdrożenie dwujęzycznej strony internetowej z perfekcyjną optymalizacją szybkości (100% Lighthouse) i unikalnym UX.",
        en: "Case study: Design and deployment of a bilingual business website with perfect speed optimization (100% Lighthouse) and unique UX.",
      },
    },
    showDisclaimer: false,
    content: {
      pl: {
        title: "SGWebLab - Wizytówka biznesowa o maksymalnej wydajności",
        clientName: "SGWebLab (Projekt własny)",
        challenge:
          "Jako developer potrzebowałam nowoczesnej platformy internetowej dla mojej agencji, która od pierwszych sekund budowałaby wizerunek premium i budziła zaufanie wymagających klientów. Bardzo zależało mi na czystym, przejrzystym designie, niezaśmieconym zbędnymi animacjami, tak aby dostarczać najważniejsze informacje biznesowe szybko i intuicyjnie. Strona musiała dodatkowo błyskawicznie ładować się na telefonach i komputerach oraz bezbłędnie obsługiwać dwa języki (polski i angielski), aby umożliwić płynne pozyskiwanie partnerów z rynku lokalnego i międzynarodowego. Kluczowe było też zapewnienie doskonałej bazy pod pozycjonowanie w Google (SEO).",
        solution:
          "Stworzyłam od zera unikalny, minimalistyczny projekt graficzny z płynnymi, bardzo dyskretnymi animacjami, które podkreślają nowoczesny charakter marki, ale nie odwracają uwagi od treści. Witryna została zaprogramowana bez użycia ciężkich gotowych szablonów czy obciążających wtyczek, dzięki czemu jest niezwykle lekka. Wdrożyłam intuicyjną strukturę oferty oraz zaawansowany system przełączania języków, który pozwala zagranicznym użytkownikom na natychmiastowe i naturalne zapoznanie się z zakresem usług.",
        results: [
          "Maksymalny wynik 100/100 punktów w oficjalnych testach Google Lighthouse (Szybkość, Dostępność, SEO)",
          "Błyskawiczne ładowanie strony (poniżej 0.5 sekundy), co eliminuje ryzyko opuszczenia witryny przez klienta",
          "Pełna dwujęzyczność otwierająca biznes na globalny rynek i zagraniczne kontrakty",
          "Struktura kodu w 100% przygotowana pod skuteczne pozycjonowanie lokalne i globalne",
        ],
      },
      en: {
        title: "SGWebLab - High-End Business Website with Maximum Performance",
        clientName: "SGWebLab (Internal Project)",
        challenge:
          "As a developer, I needed a modern web platform for my agency that would instantly establish a premium brand image and build trust with demanding clients. I highly prioritized a clean, clear design, uncluttered by unnecessary animations, in order to deliver core business information quickly and intuitively. The website also had to load lightning-fast across all mobile and desktop devices and seamlessly support two languages (Polish and English) to smoothly attract business partners from both local and international markets. Ensuring a flawless foundation for Google ranking (SEO) was also a critical requirement.",
        solution:
          "I designed a unique, minimalist user interface from scratch, incorporating smooth, subtle animations that emphasize the brand's cutting-edge character without distracting from the content. The website was custom-coded without heavy pre-made templates or bloated plugins, ensuring it remains incredibly lightweight. I implemented an intuitive service layout and an advanced language switching system, allowing international visitors to explore the services naturally.",
        results: [
          "Perfect 100/100 score in official Google Lighthouse audits (Performance, Accessibility, Best Practices, SEO)",
          "Instant page load times (under 0.5 seconds), eliminating the risk of potential clients leaving the site",
          "Full bilingual integration, opening the business up to the global market and international contracts",
          "100% clean code structure fully optimized for highly effective local and global SEO ranking",
        ],
      },
    },
  },
  {
    id: "roast-flow-landing",
    category: "websites",
    techStack: ["UI/UX Design", "React", "Tailwind CSS", "Conversion Rate Optimization (CRO)"],
    images: [
      "/portfolio/roast/roast-1.webp",
      "/portfolio/roast/roast-2.webp",
      "/portfolio/roast/roast-3.webp",
    ],
    video: "/portfolio/roast/roast.webm",
    slug: {
      pl: "landing-page-subskrypcja-kawy-roast-flow",
      en: "roast-flow-coffee-subscription-landing",
    },
    seo: {
      title: {
        pl: "Roast & Flow - Landing page z model subskrypcyjnym | Portfolio SGWebLab",
        en: "Roast & Flow - Subscription-Based Coffee Landing Page | SGWebLab Portfolio",
      },
      description: {
        pl: "Case study: Projekt i wdrożenie nowoczesnego landing page'a premium z model subskrypcyjnym, zorientowanego na wysoką konwersję.",
        en: "Case study: Design and development of a modern, premium subscription-based landing page optimized for high conversion.",
      },
    },
    content: {
      pl: {
        title: "Roast & Flow - Landing page dla rzemieślniczej marki kawy w modelu subskrypcji",
        clientName: "",
        challenge:
          "Klient oferujący rzemieślniczą kawę premium potrzebował nowoczesnego landing page'a, który wprowadzi na rynek nowy model subskrypcyjny skierowany do bardzo konkretnej grupy docelowej - branży technologicznej i programistów. Głównym wyzwaniem było odejście od generycznych szablonów sklepów z kawą na rzecz angażującej, dopasowanej niszowo narracji, jasnego przedstawienia przewag produktu oraz maksymalnego uproszczenia wyboru planu subskrypcyjnego.",
        solution:
          "Zaprojektowałam i zakodowałam responsywną stronę typu landing page o unikalnej, głębokiej kolorystyce (forest green & warm cream) z wyrazistymi, nowoczesnymi akcentami. Struktura strony została ułożona zgodnie z zasadami psychologii sprzedaży i CRO (Conversion Rate Optimization): od budowania natychmiastowego rezonansu z grupą docelową w sekcji hero, przez wizualne porównanie produktu z masową konkurencją za pomocą czytelnych wykresów energii, aż po dedykowaną sekcję opinii i przejrzystą, trzypoziomową makietę cennika ułatwiającą podjęcie decyzji zakupowej.",
        results: [
          "Struktura strony w 100% zoptymalizowana pod kątem konwersji i intuicyjnej ścieżki zakupowej (UX/CRO)",
          "Błyskawiczne ładowanie i pełna responsywność, kluczowa przy wymagającej, technologicznej grupie odbiorców",
          "Zastosowanie nienagannej siatki i nowoczesnej typografii budującej pozycję marki w segmencie premium",
          "Czysty, zoptymalizowany kod bez zbędnych bibliotek, gwarantujący doskonałe wskaźniki Core Web Vitals",
        ],
      },
      en: {
        title: "Roast & Flow - Conversion-Focused Coffee Subscription Landing Page",
        clientName: "",
        challenge:
          "A premium artisan coffee brand needed a modern landing page to launch a subscription model tailored to a highly specific niche - software developers and tech professionals. The main challenge was to break away from generic e-commerce coffee shop layouts and build an engaging, niche-specific narrative that clearly communicates the product's benefits while streamlining the subscription selection process.",
        solution:
          "I designed and custom-coded a fully responsive landing page featuring a unique, sophisticated color palette (deep forest green & warm cream) paired with bold, modern accents. The layout follows strict Conversion Rate Optimization (CRO) principles: establishing immediate audience resonance in the hero section, highlighting product superiority over mass-market alternatives through clear focus/energy charts, leveraging tailored social proof, and concluding with an intuitive, three-tiered subscription pricing matrix to drive sales.",
        results: [
          "Layout 100% optimized for conversion and an intuitive user acquisition funnel (UX/CRO)",
          "Lightning-fast performance and seamless responsiveness, critical for tech-savvy audiences",
          "Polished grid layout and modern typography that successfully position the brand in the premium segment",
          "Clean, optimized codebase built with a performance-first approach, ensuring perfect Core Web Vitals",
        ],
      },
    },
  },
  {
    id: "ospilates-studio",
    category: "websites",
    techStack: ["Premium Web Design", "UX/UI Architecture", "Conversion Optimization (CRO)", "Responsive Design"],
    images: [
      "/portfolio/pilates-studio/pilates-studio-1.webp",
      "/portfolio/pilates-studio/pilates-studio-2.webp",
      "/portfolio/pilates-studio/pilates-studio-3.webp",
    ],
    video: "/portfolio/pilates-studio/video.mp4",
    slug: {
      pl: "strona-studio-pilates-ospilates",
      en: "pilates-studio-website-ospilates",
    },
    seo: {
      title: {
        pl: "OSPILATES - Elegancka strona dla studia Pilatesu | SGWebLab",
        en: "OSPILATES - Premium Website for Pilates Studio | SGWebLab",
      },
      description: {
        pl: "Case study: Projekt i wdrożenie nowoczesnej, zorientowanej na konwersję strony www dla butikowego studia Pilatesu premium.",
        en: "Case study: Web design and deployment of a modern, conversion-focused website for a premium boutique Pilates studio.",
      },
    },
    content: {
      pl: {
        title: "OSPILATES STUDIO - Platforma wizerunkowo-sprzedażowa dla branży wellness",
        clientName: "",
        challenge:
          "Klient potrzebował unikalnej platformy internetowej dla butikowego studia Pilatesu, która odróżni markę od masowych, chłodnych i powtarzalnych klubów fitness. Głównym celem biznesowym było stworzenie estetycznej przestrzeni w sieci odzwierciedlającej filozofię premium, zniwelowanie barier wejścia u osób początkujących oraz maksymalne uproszczenie ścieżki zakupowej - od zapoznania się z ofertą, przez wybór poziomu intensywności treningów, aż po zakup karnetu.",
        solution:
          "Zaprojektowałam i wdrożyłam minimalistyczną witrynę opartą na ciepłej, luksusowej palecie barw ziemi (czekoladowe brązy, stonowane beże), która buduje poczucie harmonii i profesjonalizmu. Struktura podstrony została zaplanowana zgodnie z zasadami konwersji (CRO): wprowadziłam intuicyjny podział programów („Pick your heat”), klarowny cennik subskrypcyjny oraz wyraziste sekcje dowodu społecznego (opinie klientów). Całość została zoptymalizowana pod kątem płynności działania i urządzeń mobilnych, na których studio generuje największy ruch.",
        results: [
          "Czas ładowania strony zredukowany do minimum (wynik 100/100 w testach Google Lighthouse)",
          "Zwiększenie czytelności oferty dzięki intuicyjnemu podziałowi zajęć na poziomy trudności",
          "Wzrost konwersji zapisów próbnych dzięki strategicznie rozmieszczonym przyciskom CTA",
          "Pełna spójność wizualna i techniczna, pozycjonująca studio jako markę premium w swojej niszy",
        ],
      },
      en: {
        title: "OSPILATES STUDIO - High-End Branding & Conversion Platform for Wellness Brand",
        clientName: "",
        challenge:
          "The client required a distinctive web platform for a boutique Pilates studio to differentiate the brand from corporate, generic fitness chains. The primary business objective was to create an elegant digital space that reflects their premium philosophy, lowers the entry barrier for beginners, and streamlines the customer journey—from initial onboarding and selecting workout intensity levels to membership checkout.",
        solution:
          "I designed and developed a minimalist website utilizing a warm, high-end earthy color palette (deep chocolate browns, soft creams) to evoke a sense of balance and professionalism. The layout was engineered around conversion rate optimization (CRO) principles: featuring an intuitive program breakdown ('Pick your heat'), clear membership pricing models, and prominent social proof. The entire site was optimized for fluid interactions and mobile devices, where the studio captures most of its traffic.",
        results: [
          "Flawless page performance and loading speeds (100/100 score on Google Lighthouse audits)",
          "Enhanced service clarity through intuitive classification of workouts by intensity levels",
          "Boosted trial bookings driven by strategically positioned, high-contrast Call-to-Action (CTA) elements",
          "Complete visual and technical alignment, successfully positioning the studio as a premium niche leader",
        ],
      },
    },
  },
];
