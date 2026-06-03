import { smoothScrollTo, smoothScrollToSelector } from "@/lib/smooth-scroll";

export const useScrollToSection = () => {
  const scrollToSection = (selector: string, onAfterScroll?: () => void) => {
    smoothScrollToSelector(selector);
    onAfterScroll?.();
  };

  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return { scrollToSection, scrollToTop };
};
