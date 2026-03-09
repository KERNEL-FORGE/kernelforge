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
    { label: "Accueil", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Média", href: "/media" },
    { label: "Services", href: "/services" },
    { label: "Communauté", href: "/communaute" },
    { label: "Expertises", href: "/expertises" },
    { label: "Équipe", href: "/equipe" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2Fa739bfb593ac459181725f47ca6452b6?format=webp&width=100&height=100"
            alt="Kernel Forge Logo"
            className="w-12 h-12 object-contain"
          />
          <span className="text-xl font-bold tracking-tighter text-gradient leading-none">KERNEL<br/>FORGE</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-sm font-semibold tracking-wide text-foreground/70 hover:text-primary transition-all uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Button variant="ghost" className="hidden sm:inline-flex font-bold hover:bg-white/5" asChild>
            <Link to="/login">Connexion</Link>
          </Button>
          <Button className="bg-primary text-black font-bold rounded-full hover:scale-105 transition-transform px-6" asChild>
            <Link to="/contact">Contactez Nous</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
