import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

interface ProjectImageGalleryLightboxProps {
  images: string[];
  altForIndex: (index: number) => string;
  index: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}

const SWIPE_THRESHOLD_PX = 48;

const ProjectImageGalleryLightbox = ({
  images,
  altForIndex,
  index,
  open,
  onOpenChange,
  onIndexChange,
}: ProjectImageGalleryLightboxProps) => {
  const { t } = useLanguage();
  const touchStartX = useRef<number | null>(null);
  const count = images.length;

  const goTo = useCallback(
    (next: number) => {
      if (count <= 1) return;
      const wrapped = (next + count) % count;
      onIndexChange(wrapped);
    },
    [count, onIndexChange],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (!open || count <= 1) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, count, goPrev, goNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || count <= 1) return;
    const endX = e.changedTouches[0]?.clientX;
    if (endX === undefined) return;
    const delta = touchStartX.current - endX;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta > 0) goNext();
    else goPrev();
  };

  if (count === 0) return null;

  const src = images[index];
  const alt = altForIndex(index);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-[min(96vw,1400px)] border-0 bg-transparent p-2 shadow-none",
          "[&>button]:right-3 [&>button]:top-3 [&>button]:z-20 [&>button]:rounded-full",
          "[&>button]:bg-black/60 [&>button]:p-2 [&>button]:text-white",
          "[&>button]:opacity-90 [&>button]:hover:opacity-100 [&>button]:hover:bg-black/80",
        )}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>

        <div className="relative flex items-center justify-center">
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label={t("portfolio.carousel.previous")}
                className={cn(
                  "absolute left-1 sm:left-2 top-1/2 z-20 -translate-y-1/2",
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  "bg-black/60 text-white shadow-md",
                  "transition-opacity hover:bg-black/80",
                )}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label={t("portfolio.carousel.next")}
                className={cn(
                  "absolute right-1 sm:right-2 top-1/2 z-20 -translate-y-1/2",
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  "bg-black/60 text-white shadow-md",
                  "transition-opacity hover:bg-black/80",
                )}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <p
                className="absolute bottom-2 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white"
                aria-live="polite"
              >
                {index + 1} / {count}
              </p>
            </>
          )}

          <img
            key={src}
            src={src}
            alt={alt}
            className="mx-auto max-h-[min(90vh,900px)] w-auto max-w-full rounded-lg object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectImageGalleryLightbox;
