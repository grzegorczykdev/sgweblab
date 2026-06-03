import { useLanguage } from "@/contexts/LanguageContext";
import { shouldCapProjectMediaImage } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type AdaptiveFrameMode = "natural" | "capped";

interface ProjectImageZoomTriggerProps {
  src: string;
  alt: string;
  onClick: () => void;
  imageClassName?: string;
  /** Shrink frame to short images; cap tall ones at 16:10 with centered contain. */
  adaptiveFrame?: boolean;
  /** Fixed aspect frame - image fills the box (cover) without side/top/bottom bars. */
  mediaFrame?: { aspectRatio: string; objectFit?: "cover" | "contain" };
}

const ProjectImageZoomTrigger = ({
  src,
  alt,
  onClick,
  imageClassName = "object-cover",
  adaptiveFrame = false,
  mediaFrame,
}: ProjectImageZoomTriggerProps) => {
  const { t } = useLanguage();
  const imgRef = useRef<HTMLImageElement>(null);
  const [frameMode, setFrameMode] = useState<AdaptiveFrameMode>("natural");

  const updateFrameMode = useCallback((img: HTMLImageElement) => {
    setFrameMode(
      shouldCapProjectMediaImage(img.naturalWidth, img.naturalHeight)
        ? "capped"
        : "natural",
    );
  }, []);

  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      if (!adaptiveFrame) {
        return;
      }
      updateFrameMode(event.currentTarget);
    },
    [adaptiveFrame, updateFrameMode],
  );

  useEffect(() => {
    if (!adaptiveFrame || mediaFrame) {
      return;
    }
    setFrameMode("natural");
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      updateFrameMode(img);
    }
  }, [src, adaptiveFrame, updateFrameMode]);

  const isCapped = adaptiveFrame && !mediaFrame && frameMode === "capped";
  const frameObjectFit = mediaFrame?.objectFit ?? "cover";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t("portfolio.image.expand")}
      style={mediaFrame ? { aspectRatio: mediaFrame.aspectRatio } : undefined}
      className={cn(
        "group relative block w-full overflow-hidden cursor-zoom-in",
        mediaFrame && "flex items-center justify-center",
        !adaptiveFrame && !mediaFrame && "h-full",
        isCapped && "flex aspect-[16/10] items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      )}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        decoding="async"
        onLoad={handleImageLoad}
        className={cn(
          "transition-transform duration-300 ease-out group-hover:scale-[1.02]",
          mediaFrame && "h-full w-full object-center",
          mediaFrame && frameObjectFit === "cover" && "object-cover",
          mediaFrame && frameObjectFit === "contain" && "object-contain",
          adaptiveFrame &&
            !mediaFrame &&
            frameMode === "natural" &&
            "h-auto w-full",
          isCapped && "max-h-full max-w-full object-contain",
          !adaptiveFrame && !mediaFrame && "h-full w-full",
          !adaptiveFrame && !mediaFrame && imageClassName,
          adaptiveFrame &&
            !mediaFrame &&
            frameMode === "natural" &&
            imageClassName,
        )}
      />
      <span
        className="pointer-events-none absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/15"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-primary shadow-md">
          <ZoomIn className="h-5 w-5" />
        </span>
      </span>
    </button>
  );
};

export default ProjectImageZoomTrigger;
