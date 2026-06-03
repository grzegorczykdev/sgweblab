import InlineAutoplayVideo from "@/components/portfolio/InlineAutoplayVideo";
import ProjectImageCarousel from "@/components/portfolio/ProjectImageCarousel";
import ProjectImageLightbox from "@/components/portfolio/ProjectImageLightbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { getImageAlt } from "@/lib/portfolio";
import type { Language, Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface ProjectMediaProps {
  project: Project;
  language: Language;
}

const mediaFrameClass =
  "w-full rounded-xl border border-border/50 overflow-hidden";

const ProjectMedia = ({ project, language }: ProjectMediaProps) => {
  const { t } = useLanguage();
  const { images, video, architectureImage, mediaFrame } = project;
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

      {architectureImage && (
        <figure className="space-y-2">
          <figcaption className="font-display text-sm font-semibold text-primary">
            {t("portfolio.architecture")}
          </figcaption>
          <div className={cn(mediaFrameClass, "bg-background p-3 md:p-4")}>
            <img
              src={architectureImage}
              alt={
                language === "pl"
                  ? `Diagram architektury: ${title}`
                  : `Architecture diagram: ${title}`
              }
              loading="lazy"
              decoding="async"
              className="mx-auto w-full h-auto max-h-[420px] object-contain"
            />
          </div>
        </figure>
      )}

      {count === 1 && (
        <div className={cn(mediaFrameClass, !mediaFrame && "bg-muted/20")}>
          <ProjectImageLightbox
            src={images[0]}
            alt={altForIndex(0)}
            adaptiveFrame={!mediaFrame}
            mediaFrame={mediaFrame}
          />
        </div>
      )}

      {count > 1 && (
        <ProjectImageCarousel
          images={images}
          altForIndex={altForIndex}
          mediaFrame={mediaFrame}
        />
      )}
    </div>
  );
};

export default ProjectMedia;
