import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/types/project";

const HIGHLIGHT_TERMS: Record<Language, string[]> = {
  pl: ["Full Stack & AI Engineer"],
  en: ["Full Stack & AI Engineer", "AI-First Mindset"],
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const HighlightedText = ({
  text,
  terms,
}: {
  text: string;
  terms: string[];
}) => {
  if (terms.length === 0) {
    return <>{text}</>;
  }

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) =>
        terms.includes(part) ? (
          <strong key={index} className="font-medium text-neutral-700">
            {part}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
};

const PortfolioIntroSection = () => {
  const { language, t } = useLanguage();
  const highlightTerms = HIGHLIGHT_TERMS[language];

  return (
    <section aria-labelledby="portfolio-intro-heading" className="w-full mb-8">
      <div className="space-y-4">
        <header className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {t("nav.portfolio")}
          </p>
          <h1
            id="portfolio-intro-heading"
            className="font-display text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl md:leading-tight"
          >
            {t("portfolio.intro.title")}
          </h1>
        </header>

        <div className="space-y-3 text-sm leading-relaxed text-neutral-600">
          <p>
            <HighlightedText
              text={t("portfolio.intro.lead")}
              terms={highlightTerms}
            />
          </p>
          <p>
            <HighlightedText
              text={t("portfolio.intro.bio")}
              terms={highlightTerms}
            />
          </p>
        </div>

        <p className="text-sm leading-relaxed text-neutral-600">
          {t("portfolio.intro.closing")}
        </p>
      </div>
    </section>
  );
};

export default PortfolioIntroSection;
