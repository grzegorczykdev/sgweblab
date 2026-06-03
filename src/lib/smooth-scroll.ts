export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const smoothScrollTo = (top: number): void => {
  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
};

export const smoothScrollToSelector = (
  selector: string,
  delayMs = 0,
): void => {
  const scroll = () => {
    const element = document.querySelector(selector);
    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  if (delayMs > 0) {
    window.setTimeout(scroll, delayMs);
    return;
  }

  requestAnimationFrame(scroll);
};
