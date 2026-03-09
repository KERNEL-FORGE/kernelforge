import { Link } from "react-router-dom";

import { Github, Twitter, Linkedin, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 py-24 px-6 mt-32 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="flex flex-col items-center md:items-start gap-8 max-w-sm">
          <Link to="/" className="flex items-center gap-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2Fa739bfb593ac459181725f47ca6452b6?format=webp&width=100&height=100"
              alt="Kernel Forge Logo"
              className="w-16 h-16 object-contain"
            />
            <span className="text-3xl font-black tracking-tighter text-gradient leading-none uppercase">KERNEL<br/>FORGE</span>
          </Link>
          <p className="text-base text-foreground/40 leading-relaxed font-medium">
            Une plateforme d'élite dédiée à l'open source et à l'innovation logicielle Linux. Nous forgeons le futur, un commit à la fois.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 flex-grow">
          <div className="flex flex-col gap-5">
            <h4 className="font-black text-foreground uppercase tracking-widest text-xs">Écosystème</h4>
            <Link to="/" className="text-foreground/40 hover:text-primary transition-all font-bold">Accueil</Link>
            <Link to="/services" className="text-foreground/40 hover:text-primary transition-all font-bold">Services</Link>
            <Link to="/communaute" className="text-foreground/40 hover:text-primary transition-all font-bold">Communauté</Link>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-black text-foreground uppercase tracking-widest text-xs">Informations</h4>
            <Link to="/expertises" className="text-foreground/40 hover:text-primary transition-all font-bold">Expertises</Link>
            <Link to="/contact" className="text-foreground/40 hover:text-primary transition-all font-bold">Contact</Link>
            <Link to="/login" className="text-foreground/40 hover:text-primary transition-all font-bold">Connexion</Link>
          </div>
          <div className="flex flex-col gap-5">
            <h4 className="font-black text-foreground uppercase tracking-widest text-xs">Social</h4>
            <a href="#" className="text-foreground/40 hover:text-primary transition-all font-bold">GitHub</a>
            <a href="#" className="text-foreground/40 hover:text-primary transition-all font-bold">Discord</a>
            <a href="#" className="text-foreground/40 hover:text-primary transition-all font-bold">Twitter</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-xs text-foreground/20 font-bold tracking-widest uppercase">
          &copy; {currentYear} Kernel Forge. Crafted with precision for the open source world.
        </p>
        <div className="flex gap-10">
          <Link to="/legal" className="text-[10px] text-foreground/20 hover:text-foreground transition-all uppercase font-bold tracking-[0.2em]">Mentions Légales</Link>
          <Link to="/privacy" className="text-[10px] text-foreground/20 hover:text-foreground transition-all uppercase font-bold tracking-[0.2em]">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
