import ProjectImageZoomTrigger from "@/components/portfolio/ProjectImageZoomTrigger";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProjectImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  adaptiveFrame?: boolean;
}

const ProjectImageLightbox = ({
  src,
  alt,
  className,
  imageClassName = "object-cover",
  adaptiveFrame = false,
}: ProjectImageLightboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className={className}>
        <ProjectImageZoomTrigger
          src={src}
          alt={alt}
          onClick={() => setOpen(true)}
          imageClassName={imageClassName}
          adaptiveFrame={adaptiveFrame}
        />
      </div>
      <DialogContent
        className={cn(
          "max-w-[min(96vw,1400px)] border-0 bg-transparent p-2 shadow-none",
          "[&>button]:right-3 [&>button]:top-3 [&>button]:rounded-full [&>button]:bg-black/60 [&>button]:p-2 [&>button]:text-white",
          "[&>button]:opacity-90 [&>button]:hover:opacity-100 [&>button]:hover:bg-black/80",
        )}
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <img
          src={src}
          alt={alt}
          className="mx-auto max-h-[min(90vh,900px)] w-auto max-w-full rounded-lg object-contain"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectImageLightbox;
