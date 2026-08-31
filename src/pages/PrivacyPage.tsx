import { useLanguage } from "@/contexts/LanguageContext";
import {
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/data/privacyPolicyContent";

const PrivacyPage = () => {
  const { language } = useLanguage();
  const meta = privacyPolicyMeta[language];

  return (
    <main id="main" className="section-padding pt-28 md:pt-32 pb-16">
      <div className="container-custom max-w-3xl">
        <header className="space-y-3 mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary tracking-tight text-balance">
            {meta.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {language === "pl" ? "Ostatnia aktualizacja: " : "Last updated: "}
            {meta.updated}
          </p>
          <p className="text-muted-foreground leading-relaxed text-pretty">
            {meta.intro}
          </p>
        </header>

        <div className="space-y-10">
          {privacyPolicySections.map((section) => (
            <section
              key={section.title[language]}
              id={section.id}
              className="scroll-mt-28 space-y-3"
            >
              <h2 className="font-display text-xl font-semibold text-primary tracking-tight">
                {section.title[language]}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph[language]}
                  className="text-muted-foreground leading-relaxed text-pretty"
                >
                  {paragraph[language]}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                  {section.list.map((item) => (
                    <li key={item[language]} className="text-pretty">
                      {item[language]}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
