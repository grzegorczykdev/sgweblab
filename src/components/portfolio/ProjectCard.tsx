import { Badge } from "@/components/ui/badge";
import { getImageAlt, getProjectCoverImage, getProjectPath } from "@/lib/portfolio";
import type { Language, Project } from "@/types/project";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  language: Language;
}

const ProjectCard = ({ project, language }: ProjectCardProps) => {
  return (
    <article className="glass rounded-2xl border border-border/60 overflow-hidden shadow-premium transition-all duration-300 hover:shadow-premium-lg hover:-translate-y-1">
      <Link to={getProjectPath(language, project)} className="block h-full">
        <img
          src={getProjectCoverImage(project)}
          alt={getImageAlt(project, language)}
          loading="lazy"
          decoding="async"
          className="w-full h-52 object-cover"
        />
        <div className="p-6 space-y-4">
          <h3 className="font-display text-xl font-semibold text-primary">
            {project.content[language].title}
          </h3>
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {project.seo.description[language]}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="rounded-full">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
