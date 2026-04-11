
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "/assets/logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { name: "Home", href: "/#home" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Services", href: "/#services" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-4 left-0 z-50 w-full">
      <div className="mx-auto flex justify-center px-2 sm:px-4">
        <div
          className={`
            flex items-center justify-between
            transform-gpu will-change-transform
            transition-[width,transform,padding,backdrop-filter,box-shadow,background-color,border-color] duration-500 ease-out
            rounded-full border
            px-4 md:px-6
            ${isScrolled ? "py-1.5" : "py-1"}
            ${isScrolled
              ? "w-[75%] translate-y-0 scale-[0.985] bg-slate-900/35 border-yellow-300/35 backdrop-blur-2xl shadow-[0_16px_44px_rgba(8,12,25,0.5),0_0_34px_rgba(225,220,0,0.24)]"
              : "w-[90%] -translate-y-[2px] scale-[0.95] bg-white/10 border-white/25 backdrop-blur-xl shadow-[0_10px_30px_rgba(4,8,20,0.35)]"
            }
          `}
        >
          <a href="/#home" aria-label="Go to home section">
            <img
              src={logo}
              alt="The One Branding logo"
              className={`w-auto transition-all duration-500 ease-out ${isScrolled ? "h-16 md:h-16" : "h-16 md:h-16"}`}
            />
          </a>

          {/* Desktop Navigation */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="menu-item font-secondary text-brand-white/95 hover:text-brand-yellow transition-colors duration-300 py-2 text-lg"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden block">
              <Button
                variant="glass"
                aria-label="Open mobile menu"
                className="rounded-full"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-brand-black/95 backdrop-blur-xl border-brand-yellow/60">
              <nav className="flex flex-col space-y-6 pt-10">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-secondary text-brand-white hover:text-brand-yellow transition-colors duration-300 text-xl py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
