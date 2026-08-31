import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "nutrimind-rag",
    category: "systems",
    techStack: [
      "Vue 3",
      "FastAPI",
      "LangChain",
      "ChromaDB",
      "Google Gemini",
      "Ragas",
    ],
    images: [
      "/portfolio/nutrimind-rag/nutrimind-rag-1.webp",
    ],
    architectureImage: "/portfolio/nutrimind-rag/architecture-diagram.webp",
    mediaFrame: {
      aspectRatio: "16/7",
      objectFit: "cover",
    },
    slug: {
      pl: "nutrimind-rag-zywienie-kliniczne",
      en: "nutrimind-rag-clinical-nutrition",
    },
    seo: {
      title: {
        pl: "NutriMind AI – RAG do żywienia klinicznego | Portfolio",
        en: "NutriMind AI – Clinical Nutrition RAG | Portfolio",
      },
      description: {
        pl: "Produkcyjny RAG: odpowiedzi z PDF-ów medycznych z cytatami, Vue 3 + FastAPI + ChromaDB, eval Ragas, deploy Netlify/Render.",
        en: "Production RAG: answers from medical PDFs with citations, Vue 3 + FastAPI + ChromaDB, Ragas eval, Netlify/Render deploy.",
      },
    },
    githubUrl: "https://github.com/grzegorczykdev/RAG_langchain",
    liveDemoUrl: "https://diet-rec.netlify.app/",
    showDisclaimer: false,
    content: {
      pl: {
        title: "NutriMind AI – RAG do żywienia klinicznego z cytowaniem źródeł",
        summary:
          "NutriMind AI to produkcyjny system RAG dla dietetyków. Klient potrzebował narzędzia, które odpowiada wyłącznie na podstawie zaufanych źródeł - zweryfikowanych PDF-ów z wytycznymi klinicznymi, bez wiedzy z open web i bez halucynacji poza własną dokumentacją.\n\nJak to działa - droga od źródeł do odpowiedzi: zaufane pliki PDF trafiają do pipeline’u indeksacji; LangChain tnie je na fragmenty i każdy fragment embeduję modelem gemini-embedding-001. Wektory z metadanymi (nazwa pliku, strona) lądują w ChromaDB na dysku Render. Gdy dietetyk zadaje pytanie po polsku, zapytanie też jest embedowane - w ChromaDB wyszukuję semantycznie najbliższe fragmenty, porównuję je z progiem relevancji (odrzucam szum poniżej 0.5, zostawiam TOP_K=3 najtrafniejszych) i dopiero ten zweryfikowany kontekst trafia do przygotowanego prompta z zasadami groundingowymi. Gemini 2.5 Flash generuje odpowiedź ściśle ograniczoną do tych fragmentów; przy każdej odpowiedzi widać odznaki ze źródłami PDF.\n\nZbudowałam rozdzielony stack: Vue 3 na Netlify, FastAPI na Render. Wzorzec BYOK (Bring Your Own Key): klucz API użytkownika z localStorage w nagłówku X-Gemini-API-Key - backend stateless, bez sekretów na serwerze.\n\nPrzed wdrożeniem przeprowadzam testy jakości RAG w Ragas: na zestawie eval_dataset.json z pytaniami klinicznymi i oczekiwanymi odpowiedziami (ground-truth) odpalam pipeline, który dla każdego przypadku sprawdza Faithfulness - czy model nie dopisuje faktów spoza pobranego kontekstu - oraz Answer Relevancy - czy odpowiedź faktycznie adresuje pytanie dietetyka. Wyniki trafiają do evaluation_report.csv i stanowią bramkę przed deployem.\n\nAplikacja jest live na diet-rec.netlify.app - pokazuje, że projektuję RAG end-to-end: ingestion PDF, embedding, retrieval, grounding promptów, automatyczną ewaluację i deploy produkcyjny.\n\nWażne przy demo: API stoi na darmowym Renderze i po bezczynności „śpi” - pierwsze zapytanie lub health check po przerwie to cold start i może potrwać ok. 30–60 s, zanim serwer się rozgrzeje; to nie awaria, tylko limit free tieru. Kolejne requesty są już szybkie. W Ustawieniach trzeba wkleić własny klucz Gemini (BYOK), a jeśli nic nie wraca od razu - poczekać chwilę i spróbować ponownie.",
        challenge:
          "Dietetycy kliniczni tracą godziny na przeszukiwanie gęstych podręczników i wytycznych w PDF - a generyczne LLM-y halucynują dawki, normy i przeciwwskazania bez audytowalnego śladu źródłowego. Celem było zbudowanie systemu, który odpowiada tylko na podstawie zweryfikowanego korpusu dokumentów, z jasnymi cytatami i gotowością do wdrożenia w chmurze przy kontrolowanych kosztach API.",
        solution:
          "Zaprojektowałam i wdrożyłam rozdzielony stack SPA + async API. Frontend w Vue 3 (Composition API, Vite, Tailwind) obsługuje kliniczny interfejs po polsku, ustawienia klucza API i odznaki źródeł. Backend FastAPI udostępnia /api/health i /api/query z walidacją Pydantic. Pipeline RAG w LangChain: PyPDFLoader → chunking (1000 znaków, overlap 500) → embedding gemini-embedding-001 → ChromaDB → retrieval TOP_K=3 z progiem relevancji 0.5 → generacja gemini-2.5-flash z promptem zabraniającym faktów spoza kontekstu. Wzorzec BYOK: brak kluczy w repozytorium i na Render; 401 bez nagłówka X-Gemini-API-Key. Jakość przed deployem: Ragas + zestaw eval_dataset.json → evaluation_report.csv.",
        results: [
          "Live demo na diet-rec.netlify.app - frontend Netlify, API Render (oddzielny deploy każdej warstwy)",
          "Grounded RAG z cytowaniem plików PDF - odpowiedzi tylko z zaindeksowanego korpusu, nie z open web",
          "BYOK: stateless backend bez współdzielonego sekretu API na free tierze Render",
          "Automatyczna ewaluacja Ragas: Faithfulness i Answer Relevancy na ground-truth przed wdrożeniem",
          "Stack: Vue 3, FastAPI, LangChain, ChromaDB, Google Gemini 2.5 Flash, Ragas, Netlify, Render",
        ],
      },
      en: {
        title: "NutriMind AI – Clinical Nutrition RAG with Source Citations",
        summary:
          "NutriMind AI is a production RAG system for dietitians. The client needed a tool that answers only from trusted sources - verified clinical-guideline PDFs, with no open-web knowledge and no hallucinations beyond their own document corpus.\n\nHow it works - the path from sources to answer: trusted PDFs enter the indexing pipeline; LangChain splits them into chunks and I embed each chunk with gemini-embedding-001. Vectors with metadata (filename, page) land in on-disk ChromaDB on Render. When the dietitian asks a question in Polish, the query is embedded too - ChromaDB semantically retrieves the closest chunks, I compare them against a relevance threshold (drop noise below 0.5, keep the top 3 matches), and only that verified context goes into a prepared grounding prompt. Gemini 2.5 Flash generates an answer strictly limited to those chunks; every response shows PDF source badges.\n\nI built a decoupled stack: Vue 3 on Netlify, FastAPI on Render. BYOK (Bring Your Own Key): the user's API key from localStorage via X-Gemini-API-Key - stateless backend, no server-side secrets.\n\nBefore deployment I run RAG quality tests with Ragas: on eval_dataset.json - clinical questions with expected answers (ground-truth) - a pipeline scores each case on Faithfulness (whether the model adds facts beyond retrieved context) and Answer Relevancy (whether the answer actually addresses the dietitian's question). Results land in evaluation_report.csv as a pre-deploy quality gate.\n\nLive at diet-rec.netlify.app - end-to-end RAG: PDF ingestion, embedding, retrieval, prompt grounding, automated evaluation, and production deployment.\n\nDemo note: the API runs on Render's free tier and sleeps when idle - the first query or health check after downtime is a cold start and can take ~30-60s while the server wakes up; that's not a bug, it's the free-tier trade-off. Later requests are fast. Paste your own Gemini key in Settings (BYOK); if nothing comes back right away, wait a moment and retry.",
        challenge:
          "Clinical dietitians lose hours cross-referencing dense medical textbooks and guideline PDFs - while generic LLMs hallucinate dosages, norms, and contraindications with no auditable source trail. The goal was to build a system that answers only from a verified document corpus, with clear citations and cloud-ready deployment at controlled API cost.",
        solution:
          "I designed and deployed a decoupled SPA + async API stack. The Vue 3 frontend (Composition API, Vite, Tailwind) provides a Polish clinical UI, API key settings, and source badges. The FastAPI backend exposes /api/health and /api/query with Pydantic validation. The LangChain RAG pipeline: PyPDFLoader → chunking (1000 chars, 500 overlap) → gemini-embedding-001 → ChromaDB → TOP_K=3 retrieval with 0.5 relevance floor → gemini-2.5-flash generation with prompts forbidding facts outside context. BYOK pattern: no keys in repo or Render config; 401 without X-Gemini-API-Key. Pre-deploy quality gate: Ragas + eval_dataset.json → evaluation_report.csv.",
        results: [
          "Live demo at diet-rec.netlify.app - Netlify frontend, Render API (independent tier deployment)",
          "Grounded RAG with PDF source citations - answers only from indexed corpus, not open web",
          "BYOK: stateless backend with no shared API secret on Render free tier",
          "Automated Ragas evaluation: Faithfulness and Answer Relevancy on ground-truth before deploy",
          "Stack: Vue 3, FastAPI, LangChain, ChromaDB, Google Gemini 2.5 Flash, Ragas, Netlify, Render",
        ],
      },
    },
  },
  {
    id: "ai-nutrition-parser",
    category: "systems",
    techStack: [
      "React 19",
      "TypeScript",
      "FastAPI",
      "Python",
      "Google Gemini 3.1",
      "Pydantic v2",
      "Tailwind CSS 4",
    ],
    images: [
      "/portfolio/ai-nutrition-parser/ai-nutrition-parser-1.webp",
      "/portfolio/ai-nutrition-parser/ai-nutrition-parser-2.webp",
    ],
    video: "/portfolio/ai-nutrition-parser/video.webm",
    architectureImage:
      "/portfolio/ai-nutrition-parser/architecture-diagram.webp",
    mediaFrame: {
      aspectRatio: "16/7",
      objectFit: "cover",
    },
    slug: {
      pl: "ai-nutritionist-analiza-posilkow",
      en: "ai-nutritionist-meal-analysis",
    },
    seo: {
      title: {
        pl: "High-Precision AI Nutritionist – Analiza posiłków z warstwą walidacji | Portfolio",
        en: "High-Precision AI Nutritionist – Multimodal Meal Analysis | Portfolio",
      },
      description: {
        pl: "Full-stack AI: multimodalna analiza posiłków (zdjęcie + tekst), walidacja LLM, Triggered Judge Pattern. React 19, FastAPI, Gemini 3.1.",
        en: "Full-stack AI: multimodal meal analysis (photo + text), LLM validation, Triggered Judge Pattern. React 19, FastAPI, Gemini 3.1.",
      },
    },
    githubUrl: "https://github.com/grzegorczykdev/AI_nutrition_parser",
    showDisclaimer: false,
    content: {
      pl: {
        title: "High-Precision AI Nutritionist – Multimodalna analiza posiłków z warstwą walidacji",
        summary:
          "To aplikacja AI, która analizuje posiłek ze zdjęcia lub opisu tekstowego - rozpoznaje składniki i liczy kalorie oraz makroskładniki. Zbudowałam ją od zera jako full-stack: React 19 z TypeScriptem na froncie, FastAPI z Pythonem na backendzie.\n\nUżytkownik może wrzucić zdjęcie talerza, wpisać opis posiłku albo połączyć oba - Google Gemini 3.1 analizuje dane multimodalnie i zwraca ustrukturyzowany JSON gotowy do dalszego przetwarzania. Prompty uwzględniają też to, czego typowe trackery nie widzą: olej do smażenia, alkohol czy różnicę w masie między produktem surowym a gotowym.\n\nNajważniejsza część to walidacja wyników AI. Modele językowe czasem „halucynują” - podają kalorie, które matematycznie się nie spinają. Dlatego dodałam warstwę w Pythonie, która niezależnie przelicza energię według modelu Atwatera. Jeśli rozbieżność przekracza 10%, uruchamia się drugi model - Judge - który koryguje wynik. Cięższy model działa tylko wtedy, gdy trzeba, więc koszty API pozostają pod kontrolą.\n\nCałość jest gotowa na produkcję: kompresja zdjęć w Web Workers, automatyczne retry przy błędach API przez Tenacity, walidacja danych przez Pydantic v2.\n\nTen projekt pokazuje, że potrafię zaprojektować i wdrożyć kompletny pipeline AI - od interfejsu użytkownika, przez integrację z LLM, po twardą logikę backendową i optymalizację kosztów.",
        challenge:
          "Standardowe trackery kalorii generują wysokie marginesy błędu, ponieważ pomijają „niewidoczne” czynniki: oleje do smażenia, wpływ alkoholu oraz różnicę masy między składnikami surowymi a gotowymi. Analiza posiłków oparta wyłącznie na modelach wizyjnych LLM dodatkowo naraża system na halucynacje - niespójne makroskładniki i kalorie sprzeczne z podstawowymi regułami energetycznymi. Celem projektu było zaprojektowanie produkcyjnie gotowej architektury AI, która łączy precyzję domenową z kontrolą kosztów operacyjnych (OpEx) i niskim czasem odpowiedzi na urządzeniach mobilnych.",
        solution:
          "Zaprojektowałam i wdrożyłam full-stack referencyjną implementację (React 19 + FastAPI) opartą na podejściu Domain-Driven AI. Pipeline multimodalny wykorzystuje Google Gemini 3.1 do generowania ustrukturyzowanej analizy posiłku ze zdjęcia i opisu tekstowego, z prompt engineeringiem uwzględniającym konwersję surowe→gotowe oraz niewidoczne makroskładniki (błonnik, alkohol). Kluczową warstwą jest hybrydowy model walidacji: deterministyczny validator w Pythonie przelicza bilans energetyczny według zmodyfikowanego modelu Atwatera, a model „Judge” uruchamiany jest warunkowo - tylko przy rozbieżności przekraczającej 10%. Po stronie frontendu wdrożyłam kompresję obrazów w Web Workers (< 1 MB) oraz transfer multipart/form-data zamiast Base64, co skraca TTFT na wolnych łączach. Całość zabezpieczono Pydantic v2 (strict mode), exponential backoff (Tenacity) oraz polityką zero-leaked secrets.",
        results: [
          "Architektura Triggered Judge Pattern - cięższy model AI wywoływany tylko przy wykrytej niespójności, co optymalizuje koszty API bez utraty jakości danych",
          "Deterministyczne guardrails kaloryczne eliminujące halucynacje JSON naruszające podstawowe reguły fizyki energetycznej",
          "Kompresja obrazów po stronie klienta (< 1 MB) i efektywny transport binarny - szybsza pierwsza odpowiedź na urządzeniach mobilnych",
          "Produkcyjna odporność na błędy infrastruktury: automatyczne retry przy błędach 429/503 z wykorzystaniem Tenacity",
          "Pełny stack referencyjny: React 19, TypeScript, Vite 8, Tailwind CSS 4, FastAPI, Pydantic v2, Google Gemini 3.1",
        ],
      },
      en: {
        title: "High-Precision AI Nutritionist – Multimodal Meal Analysis with Deterministic Validation",
        summary:
          "This is an AI app that analyzes a meal from a photo or a text description - it identifies ingredients and calculates calories and macros. I built it from scratch as a full-stack project: React 19 with TypeScript on the frontend, FastAPI with Python on the backend.\n\nThe user can upload a photo of their plate, type a meal description, or combine both - Google Gemini 3.1 processes the input multimodally and returns structured JSON ready for further processing. The prompts also account for what typical trackers miss: cooking oil, alcohol, and the weight difference between raw and cooked ingredients.\n\nThe most important part is AI output validation. Language models sometimes hallucinate - they report calories that don't add up mathematically. That's why I added a Python layer that independently recalculates energy using the Atwater model. If the discrepancy exceeds 10%, a second model - the Judge - kicks in to correct the result. The heavier model runs only when needed, so API costs stay under control.\n\nThe whole system is production-ready: image compression via Web Workers, automatic API retries with Tenacity, and data validation with Pydantic v2.\n\nThis project shows that I can design and deliver a complete AI pipeline - from user interface, through LLM integration, to rigorous backend logic and cost optimization.",
        challenge:
          "Standard nutrition trackers produce high error margins because they ignore invisible variables: cooking oils, alcohol impact, and the significant mass difference between raw and cooked ingredients. Vision-only LLM meal analysis further introduces hallucination risk - inconsistent macros and calorie totals that violate basic energy-balance rules. The goal was to engineer a production-ready AI architecture that combines domain-level precision with controlled operational costs (OpEx) and low response latency on mobile devices.",
        solution:
          "I designed and built a full-stack reference implementation (React 19 + FastAPI) using a Domain-Driven AI approach. The multimodal pipeline leverages Google Gemini 3.1 to generate structured meal analysis from image and text input, with expert prompt engineering for raw-to-cooked weight conversion and invisible macro tracking (fiber, alcohol). The core innovation is a hybrid validation layer: a Python-based deterministic validator recomputes energy balance using a modified Atwater model, while a secondary Judge model is invoked conditionally - only when discrepancy exceeds 10%. On the frontend, I implemented client-side image compression via Web Workers (< 1 MB) and multipart/form-data transport instead of Base64, reducing Time to First Token on slow networks. The system is hardened with Pydantic v2 strict mode, exponential backoff via Tenacity, and a zero-leaked secrets policy.",
        results: [
          "Triggered Judge Pattern architecture - the heavier AI model runs only on detected inconsistencies, optimizing API costs without sacrificing data quality",
          "Deterministic calorie guardrails eliminating JSON hallucinations that violate basic energy-balance physics",
          "Client-side image compression (< 1 MB) and efficient binary transport - faster first response on mobile devices",
          "Production-grade resilience: automatic retry on 429/503 errors using Tenacity exponential backoff",
          "Complete reference stack: React 19, TypeScript, Vite 8, Tailwind CSS 4, FastAPI, Pydantic v2, Google Gemini 3.1",
        ],
      },
    },
  },
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
    video: "/portfolio/pilates-studio/video.webm",
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
        challenge:
          "The client required a distinctive web platform for a boutique Pilates studio to differentiate the brand from corporate, generic fitness chains. The primary business objective was to create an elegant digital space that reflects their premium philosophy, lowers the entry barrier for beginners, and streamlines the customer journey-from initial onboarding and selecting workout intensity levels to membership checkout.",
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
