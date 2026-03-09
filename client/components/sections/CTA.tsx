import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, ArrowUpRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[160px] -z-10" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-12 md:p-20 rounded-[3rem] bg-glass border border-white/10"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight"
          >
            PRÊT À REJOINDRE <br />
            <span className="text-gradient underline decoration-primary/30">LA FORGE ?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 text-lg md:text-xl mb-12 max-w-xl mx-auto"
          >
            Que vous soyez une entreprise, un étudiant ou un passionné, nous avons une place pour vous dans notre écosystème.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="bg-gradient-to-r from-primary to-[#ff0080] hover:scale-105 transition-transform px-10 h-16 text-lg rounded-2xl">
              Nous Contacter <Send className="ml-2" size={18} />
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-white/10 hover:bg-white/5 rounded-2xl group">
              En savoir plus <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
