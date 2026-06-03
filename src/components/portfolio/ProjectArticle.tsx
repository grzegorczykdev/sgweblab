import ProjectMedia from "@/components/portfolio/ProjectMedia";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language, Project } from "@/types/project";

interface ProjectArticleProps {
  project: Project;
  language: Language;
  labels: {
    client: string;
    challenge: string;
    solution: string;
    results: string;
  };
}

const ProjectArticle = ({ project, language, labels }: ProjectArticleProps) => {
  const { t } = useLanguage();
  const content = project.content[language];
  const clientName = content.clientName?.trim();
  const showDisclaimer = project.showDisclaimer !== false;

  return (
    <article className="glass rounded-2xl border border-border/60 p-6 md:p-10 space-y-8">
      <header className="space-y-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">
          {content.title}
        </h1>
        {clientName && (
          <p className="text-muted-foreground">
            <span className="font-semibold text-primary">{labels.client}: </span>
            {clientName}
          </p>
        )}
        <ProjectMedia project={project} language={language} />
      </header>

      <section className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-primary">
          {labels.challenge}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{content.challenge}</p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-2xl font-semibold text-primary">
          {labels.solution}
        </h2>
        <p className="text-muted-foreground leading-relaxed">{content.solution}</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl font-semibold text-primary">
          {labels.results}
        </h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          {content.results.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      </section>

      {showDisclaimer && (
        <footer className="pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground/80 leading-relaxed italic">
            {t("portfolio.disclaimer")}
          </p>
        </footer>
      )}
    </article>
  );
};

export default ProjectArticle;
