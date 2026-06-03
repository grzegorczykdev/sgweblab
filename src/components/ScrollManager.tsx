import { smoothScrollTo, smoothScrollToSelector } from "@/lib/smooth-scroll";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const isHomePath = (pathname: string): boolean =>
  /^\/(pl|en)\/?$/.test(pathname);

const ScrollManager = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const { pathname, hash } = location;

    if (hash) {
      const delay = isHomePath(pathname) ? 180 : 0;
      smoothScrollToSelector(hash, delay);
      isFirstRender.current = false;
      return;
    }

    if (!isFirstRender.current) {
      smoothScrollTo(0);
    }

    isFirstRender.current = false;
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollManager;
