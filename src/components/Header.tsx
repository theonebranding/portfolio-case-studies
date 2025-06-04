
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
    { name: "Home", href: "#home" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-0  ${
        isScrolled
          ? "bg-brand-black/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="#">
          <img src={logo} alt="Logo" className="h-12 w-auto md:h-36 md:scale-150" />         
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="menu-item font-primary text-brand-white hover:text-brand-yellow transition-colors duration-300 py-2 text-lg"
            >
              {item.name}
            </a>
          ))}
          
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden block">
            <Button
              variant="ghost"
              className="text-brand-white hover:text-brand-yellow"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-brand-black border-brand-yellow">
            <nav className="flex flex-col space-y-6 pt-10">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-primary text-brand-white hover:text-brand-yellow transition-colors duration-300 text-xl py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
