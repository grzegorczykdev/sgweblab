import ProjectImageGalleryLightbox from "@/components/portfolio/ProjectImageGalleryLightbox";
import ProjectImageZoomTrigger from "@/components/portfolio/ProjectImageZoomTrigger";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProjectMediaFrame } from "@/types/project";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface ProjectImageCarouselProps {
  images: string[];
  altForIndex: (index: number) => string;
  mediaFrame?: ProjectMediaFrame;
}

const ProjectImageCarousel = ({
  images,
  altForIndex,
  mediaFrame,
}: ProjectImageCarouselProps) => {
  const { t } = useLanguage();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const onLightboxIndexChange = (index: number) => {
    setLightboxIndex(index);
    api?.scrollTo(index);
    setCurrent(index);
  };

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "center" }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {images.map((src, index) => (
            <CarouselItem key={src} className="pl-0 basis-full">
              <div
                className={cn(
                  "relative w-full overflow-hidden rounded-xl border border-border/50",
                  !mediaFrame && "bg-muted/20",
                )}
              >
                <ProjectImageZoomTrigger
                  src={src}
                  alt={altForIndex(index)}
                  onClick={() => openLightbox(index)}
                  adaptiveFrame={!mediaFrame}
                  mediaFrame={mediaFrame}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              aria-label={t("portfolio.carousel.previous")}
              className={cn(
                "absolute left-3 top-1/2 z-10 -translate-y-1/2",
                "flex h-9 w-9 items-center justify-center rounded-full",
                "glass border border-border/60 text-primary shadow-md",
                "transition-opacity hover:bg-background/95",
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              aria-label={t("portfolio.carousel.next")}
              className={cn(
                "absolute right-3 top-1/2 z-10 -translate-y-1/2",
                "flex h-9 w-9 items-center justify-center rounded-full",
                "glass border border-border/60 text-primary shadow-md",
                "transition-opacity hover:bg-background/95",
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`${t("portfolio.carousel.goTo")} ${index + 1}`}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    current === index
                      ? "w-6 bg-accent"
                      : "w-2 bg-background/70 hover:bg-background",
                  )}
                />
              ))}
            </div>

            <p
              className="absolute right-3 top-3 z-10 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
              aria-live="polite"
            >
              {current + 1} / {images.length}
            </p>
          </>
        )}
      </Carousel>

      <ProjectImageGalleryLightbox
        images={images}
        altForIndex={altForIndex}
        index={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onIndexChange={onLightboxIndexChange}
      />
    </div>
  );
};

export default ProjectImageCarousel;
