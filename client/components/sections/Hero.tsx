import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-pink/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-primary mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Nouvelle Version 2.0 disponible
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            FORGEZ LE FUTUR DE <br />
            <span className="text-gradient">L'OPEN SOURCE</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 mb-10 max-w-2xl mx-auto lg:mx-0">
            La plateforme de référence pour les passionnés de Linux et les solutions logicielles innovantes. 
            Découvrez un écosystème conçu pour les développeurs, par les développeurs.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Button size="lg" className="bg-gradient-to-r from-primary to-[#ff0080] hover:scale-105 transition-transform px-8 h-14 text-lg">
              Commencer <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5">
              Voir la Démo <Play className="ml-2 fill-current" size={16} />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            {/* Logo Image */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2F4a571026c7964f629c370968e15765de?format=webp&width=800&height=1200"
              alt="Kernel Forge Hero"
              className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(168,85,247,0.4)]"
            />
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 p-4 bg-glass rounded-2xl shadow-2xl hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">L</div>
                <div>
                  <div className="text-xs text-foreground/40 font-medium">Linux Kernel</div>
                  <div className="text-sm font-bold">Optimized</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
