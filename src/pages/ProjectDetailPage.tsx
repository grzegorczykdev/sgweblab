import ProjectArticle from "@/components/portfolio/ProjectArticle";
import { useLanguage } from "@/contexts/LanguageContext";
import { getPortfolioPath } from "@/lib/i18n";
import { findProjectBySlug } from "@/lib/portfolio";
import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

const ProjectDetailPage = () => {
  const { language, t } = useLanguage();
  const { slug } = useParams<{ slug?: string }>();

  if (!slug) {
    return <Navigate to={getPortfolioPath(language)} replace />;
  }

  const project = findProjectBySlug(language, slug);

  if (!project) {
    return <Navigate to={getPortfolioPath(language)} replace />;
  }

  return (
    <main className="section-padding pt-28 md:pt-32">
      <div className="container-custom space-y-6">
        <Link
          to={getPortfolioPath(language)}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          {t("portfolio.back")}
        </Link>

        <ProjectArticle
          project={project}
          language={language}
          labels={{
            client: t("portfolio.client"),
            challenge: t("portfolio.challenge"),
            solution: t("portfolio.solution"),
            results: t("portfolio.results"),
          }}
        />
      </div>
    </main>
  );
};

export default ProjectDetailPage;
