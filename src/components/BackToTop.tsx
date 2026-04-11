import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      type="button"
      variant="glass"
      size="icon"
      aria-label="Back to top"
      onClick={handleBackToTop}
      className={`fixed bottom-5 right-5 z-[70] h-10 w-10 rounded-full border-brand-yellow/45 text-brand-yellow shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-2 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp size={18} />
    </Button>
  );
};

export default BackToTop;
