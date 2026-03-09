import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-pink/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg"
      >
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/5 border border-white/10 text-primary">
          <Search size={48} strokeWidth={1.5} />
        </div>
        <h1 className="text-8xl font-black mb-4 text-gradient leading-none">404</h1>
        <h2 className="text-3xl font-bold mb-6">PAGE INTROUVABLE</h2>
        <p className="text-foreground/60 text-lg mb-12">
          La page que vous recherchez semble s'être égarée dans les méandres du noyau Linux. Pas d'inquiétude, forgeons un chemin de retour.
        </p>
        <Button size="lg" className="bg-gradient-to-r from-primary to-[#ff0080] rounded-2xl h-16 px-10 text-lg font-bold hover:scale-105 transition-transform" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2" size={20} /> Retour à la Forge
          </Link>
        </Button>
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
    </div>
  );
};

export default NotFound;
