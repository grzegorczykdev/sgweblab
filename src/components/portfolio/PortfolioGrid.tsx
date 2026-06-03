import ProjectCard from "@/components/portfolio/ProjectCard";
import type { Language, Project } from "@/types/project";

interface PortfolioGridProps {
  projects: Project[];
  language: Language;
}

const PortfolioGrid = ({ projects, language }: PortfolioGridProps) => {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} language={language} />
      ))}
    </section>
  );
};

export default PortfolioGrid;
