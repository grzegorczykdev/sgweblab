import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import PortfolioIntroSection from "@/components/portfolio/PortfolioIntroSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { filterProjects } from "@/lib/portfolio";
import type { ProjectFilterCategory } from "@/types/project";
import { useMemo, useState } from "react";

const PortfolioPage = () => {
  const { language, t } = useLanguage();
  const [category, setCategory] = useState<ProjectFilterCategory>("all");

  const projects = useMemo(() => filterProjects(category), [category]);

  return (
    <main className="section-padding pt-28 md:pt-32">
      <div className="container-custom space-y-6">
        <PortfolioIntroSection />

        <div
          className="h-px w-full bg-border/80"
          role="separator"
          aria-hidden
        />

        <div id="portfolio-projects" className="scroll-mt-28 space-y-6">
          <PortfolioFilters
            activeCategory={category}
            onChange={setCategory}
            labels={{
              all: t("portfolio.filter.all"),
              websites: t("portfolio.filter.websites"),
              systems: t("portfolio.filter.systems"),
            }}
          />

          <PortfolioGrid projects={projects} language={language} />
        </div>
      </div>
    </main>
  );
};

export default PortfolioPage;
