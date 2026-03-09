import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-[0.2em] text-primary mb-10"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_10px_rgba(34,197,94,1)]"></span>
            </span>
            SYSTÈME D'EXPLOITATION OPTIMISÉ
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
            FORGEZ LE<br />
            <span className="text-gradient">FUTUR DU<br/>CODE</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/50 mb-12 max-w-xl mx-auto lg:mx-0 font-medium">
            La plateforme de référence pour les passionnés de Linux.
            Découvrez un écosystème conçu pour la performance pure et la sécurité open source.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <Button size="lg" className="bg-primary text-black hover:scale-105 transition-all px-10 h-16 text-lg font-bold rounded-2xl glow-green border-none">
              Explorez la Forge <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg font-bold border-white/10 hover:bg-white/5 rounded-2xl">
              Regarder le Pitch <Play className="ml-2 fill-current text-accent-orange" size={16} />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[600px] aspect-square">
            {/* Logo Image */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2Fa739bfb593ac459181725f47ca6452b6?format=webp&width=800&height=1200"
              alt="Kernel Forge Hero"
              className="w-full h-full object-contain drop-shadow-[0_0_80px_rgba(34,197,94,0.3)] filter brightness-110"
            />
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 p-6 bg-glass rounded-[2rem] glow-green hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">OS</div>
                <div>
                  <div className="text-[10px] text-foreground/40 font-black uppercase tracking-widest">Optimized Kernel</div>
                  <div className="text-base font-bold text-gradient">STABLE BUILD</div>
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
