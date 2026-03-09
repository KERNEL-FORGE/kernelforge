import { Link } from "react-router-dom";

import { Github, Twitter, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/10 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2F4a571026c7964f629c370968e15765de?format=webp&width=60&height=60"
              alt="Kernel Forge Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-gradient">KERNEL FORGE</span>
          </Link>
          <p className="text-sm text-foreground/60 max-w-xs">
            Une plateforme dédiée à l'open source et à l'innovation logicielle Linux. Nous forgeons le futur de l'informatique.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h4 className="font-semibold text-foreground">Navigation</h4>
            <Link to="/" className="text-foreground/60 hover:text-primary transition-colors">Accueil</Link>
            <Link to="/#services" className="text-foreground/60 hover:text-primary transition-colors">Services</Link>
            <Link to="/#expertises" className="text-foreground/60 hover:text-primary transition-colors">Expertises</Link>
          </div>
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h4 className="font-semibold text-foreground">Légal</h4>
            <Link to="/mentions-legales" className="text-foreground/60 hover:text-primary transition-colors">Mentions Légales</Link>
            <Link to="/confidentialite" className="text-foreground/60 hover:text-primary transition-colors">Confidentialité</Link>
            <Link to="/conditions" className="text-foreground/60 hover:text-primary transition-colors">Conditions</Link>
          </div>
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h4 className="font-semibold text-foreground">Compte</h4>
            <Link to="/login" className="text-foreground/60 hover:text-primary transition-colors">Connexion</Link>
            <Link to="/admin" className="text-foreground/60 hover:text-primary transition-colors">Admin Panel</Link>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-4">
            <a href="https://github.com/kernelforge" className="p-2 bg-white/5 hover:bg-primary/20 rounded-full transition-colors text-foreground/60 hover:text-primary">
              <Github size={20} />
            </a>
            <a href="https://twitter.com/kernelforge" className="p-2 bg-white/5 hover:bg-primary/20 rounded-full transition-colors text-foreground/60 hover:text-primary">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com/company/kernelforge" className="p-2 bg-white/5 hover:bg-primary/20 rounded-full transition-colors text-foreground/60 hover:text-primary">
              <Linkedin size={20} />
            </a>
            <a href="https://kernelforge.org" className="p-2 bg-white/5 hover:bg-primary/20 rounded-full transition-colors text-foreground/60 hover:text-primary">
              <Globe size={20} />
            </a>
          </div>
          <p className="text-xs text-foreground/40">
            &copy; {currentYear} Kernel Forge. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
