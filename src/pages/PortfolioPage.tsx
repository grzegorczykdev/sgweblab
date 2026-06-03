import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
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
      <div className="container-custom space-y-8">
        <header className="space-y-3 max-w-3xl">
          <p className="text-sm font-semibold text-accent uppercase tracking-wide">
            {t("nav.portfolio")}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">
            {t("portfolio.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("portfolio.subtitle")}
          </p>
        </header>

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
    </main>
  );
};

export default PortfolioPage;
