import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const PLAYBACK_RATE = 0.8;

interface InlineAutoplayVideoProps {
  src: string;
  className?: string;
  "aria-label": string;
}

/**
 * Decorative autoplay clip: inline, muted, looping at PLAYBACK_RATE.
 * Loads and plays only in the viewport (Lighthouse-friendly).
 */
const InlineAutoplayVideo = ({
  src,
  className,
  "aria-label": ariaLabel,
}: InlineAutoplayVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.01 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const applyPlaybackSettings = () => {
      el.muted = true;
      el.defaultMuted = true;
      el.volume = 0;
      el.loop = true;
      el.playbackRate = PLAYBACK_RATE;
    };

    const tryPlay = () => {
      if (!isVisibleRef.current) return;
      applyPlaybackSettings();
      void el.play().catch(() => {});
    };

    if (!isVisible) {
      el.pause();
      el.removeAttribute("src");
      el.load();
      return;
    }

    applyPlaybackSettings();

    if (el.getAttribute("src") !== src) {
      el.src = src;
      el.load();
    }

    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    el.setAttribute("x-webkit-airplay", "deny");

    const lockAudio = () => {
      el.muted = true;
      el.volume = 0;
    };

    const lockRate = () => {
      if (el.playbackRate !== PLAYBACK_RATE) {
        el.playbackRate = PLAYBACK_RATE;
      }
    };

    /** Ignore brief pause at loop seam — native `loop` handles the restart. */
    const onPause = () => {
      if (!isVisibleRef.current) return;
      const duration = el.duration;
      if (Number.isFinite(duration) && el.currentTime >= duration - 0.3) {
        return;
      }
      requestAnimationFrame(() => {
        if (!isVisibleRef.current || !el.paused) return;
        if (
          Number.isFinite(el.duration) &&
          el.currentTime >= el.duration - 0.3
        ) {
          return;
        }
        tryPlay();
      });
    };

    const onCanPlay = () => tryPlay();

    el.addEventListener("volumechange", lockAudio);
    el.addEventListener("ratechange", lockRate);
    el.addEventListener("pause", onPause);
    el.addEventListener("canplay", onCanPlay);

    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay();
    }

    return () => {
      el.removeEventListener("volumechange", lockAudio);
      el.removeEventListener("ratechange", lockRate);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("canplay", onCanPlay);
    };
  }, [isVisible, src]);

  const blockInteraction = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        // @ts-expect-error — valid on <video>, not yet in all React DOM typings
        disableRemotePlayback
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        tabIndex={-1}
        aria-label={ariaLabel}
        className={cn(
          "absolute top-1/2 left-1/2 min-h-full min-w-full w-auto h-auto",
          "-translate-x-1/2 -translate-y-1/2 scale-[1.04]",
          "object-cover object-center bg-transparent",
          "pointer-events-none select-none touch-none",
          "[&::-webkit-media-controls]:hidden",
        )}
        onVolumeChange={(e) => {
          e.currentTarget.muted = true;
          e.currentTarget.volume = 0;
        }}
        onRateChange={(e) => {
          e.currentTarget.playbackRate = PLAYBACK_RATE;
        }}
        onClick={blockInteraction}
        onDoubleClick={blockInteraction}
        onContextMenu={blockInteraction}
        onKeyDown={blockInteraction}
        onTouchStart={blockInteraction}
        onTouchEnd={blockInteraction}
      />
    </div>
  );
};

export default InlineAutoplayVideo;
