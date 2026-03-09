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
            className="text-6xl md:text-9xl font-black mb-10 leading-[0.85] tracking-tighter"
          >
            ENTREZ DANS <br />
            <span className="text-gradient">LA FORGE</span>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Button size="lg" className="bg-primary text-black hover:scale-105 transition-all px-12 h-20 text-2xl font-black rounded-3xl glow-green border-none">
              REJOINDRE <Send className="ml-3" size={24} />
            </Button>
            <Button size="lg" variant="outline" className="h-20 px-12 text-2xl font-black border-white/10 hover:bg-white/5 rounded-3xl group transition-all">
              EXPLORER <ArrowUpRight className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
