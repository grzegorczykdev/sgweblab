import InlineAutoplayVideo from "@/components/portfolio/InlineAutoplayVideo";
import ProjectImageCarousel from "@/components/portfolio/ProjectImageCarousel";
import ProjectImageLightbox from "@/components/portfolio/ProjectImageLightbox";
import { getImageAlt } from "@/lib/portfolio";
import type { Language, Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectMediaProps {
  project: Project;
  language: Language;
}

const mediaFrameClass =
  "w-full rounded-xl border border-border/50 overflow-hidden bg-muted/20";

const ProjectMedia = ({ project, language }: ProjectMediaProps) => {
  const { images, video } = project;
  const title = project.content[language].title;
  const count = images.length;

  const altForIndex = (index: number) =>
    count > 1
      ? language === "pl"
        ? `Mockup projektu ${title} (${index + 1}/${count})`
        : `Project mockup ${title} (${index + 1}/${count})`
      : getImageAlt(project, language);

  return (
    <div className="space-y-4">
      {video && (
        <div className={cn(mediaFrameClass, "bg-background")}>
          <InlineAutoplayVideo
            src={video}
            aria-label={
              language === "pl"
                ? `Podgląd działania: ${title}`
                : `Product preview: ${title}`
            }
            className="aspect-video"
          />
        </div>
      )}

      {count === 1 && (
        <div className={mediaFrameClass}>
          <ProjectImageLightbox
            src={images[0]}
            alt={altForIndex(0)}
            adaptiveFrame
          />
        </div>
      )}

      {count > 1 && (
        <ProjectImageCarousel images={images} altForIndex={altForIndex} />
      )}
    </div>
  );
};

export default ProjectMedia;
