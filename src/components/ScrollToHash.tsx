import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET = 110;

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");

    const scrollToTarget = () => {
      const element = document.getElementById(id);
      if (!element) return;

      const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    };

    requestAnimationFrame(() => {
      scrollToTarget();
      setTimeout(scrollToTarget, 120);
    });
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToHash;
