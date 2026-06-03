import ProjectMedia from "@/components/portfolio/ProjectMedia";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language, Project } from "@/types/project";
import { Github, ExternalLink } from "lucide-react";

interface ProjectArticleProps {
  project: Project;
  language: Language;
  labels: {
    summary: string;
    github: string;
    liveDemo: string;
    challenge: string;
    solution: string;
    results: string;
  };
}

const ProjectArticle = ({ project, language, labels }: ProjectArticleProps) => {
  const { t } = useLanguage();
  const content = project.content[language];
  const showDisclaimer = project.showDisclaimer !== false;

  return (
    <article className="glass rounded-2xl border border-border/60 p-6 md:p-10 space-y-8">
      <header className="space-y-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">
          {content.title}
        </h1>
        {(project.githubUrl || project.liveDemoUrl) && (
          <div className="flex flex-wrap gap-3">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:bg-accent/20"
              >
                <ExternalLink size={16} aria-hidden="true" />
                {labels.liveDemo}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Github size={16} aria-hidden="true" />
                {labels.github}
              </a>
            )}
          </div>
        )}
        <ProjectMedia project={project} language={language} />
      </header>

      {content.summary && (
        <section className="space-y-3 rounded-xl border border-accent/30 bg-accent/5 px-5 py-4 md:px-6 md:py-5">
          <h2 className="font-display text-lg font-semibold text-primary">
            {labels.summary}
          </h2>
          <p className="text-primary/90 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {content.summary}
          </p>
        </section>
      )}

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
