import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Accueil", href: "/#" },
    { label: "Services", href: "/#services" },
    { label: "Communauté", href: "/#communaute" },
    { label: "Expertises", href: "/#expertises" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2F4a571026c7964f629c370968e15765de?format=webp&width=100&height=100"
            alt="Kernel Forge Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-gradient">KERNEL FORGE</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <Link to="/login">Connexion</Link>
          </Button>
          <Button className="bg-gradient-to-r from-primary to-[#ff0080] border-none" asChild>
            <Link to="/contact">Contactez Nous</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
