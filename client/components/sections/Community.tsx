import { motion } from "framer-motion";
import { Gamepad2, GraduationCap, Github, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const communityItems = [
  {
    icon: <Gamepad2 className="text-primary" size={24} />,
    title: "Minecraft Community",
    description: "Rejoignez notre serveur Minecraft dédié aux passionnés de Linux et d'open source. Forgeons ensemble des mondes virtuels.",
    tag: "Gaming",
  },
  {
    icon: <GraduationCap className="text-accent-pink" size={24} />,
    title: "Projets Étudiants",
    description: "Un espace de mentorat pour les étudiants souhaitant contribuer à de vrais projets open source et se forger une expérience solide.",
    tag: "Formation",
  },
  {
    icon: <Github className="text-accent-blue" size={24} />,
    title: "Open Source Lab",
    description: "Contribuez à nos projets sur GitHub et découvrez les entrailles du noyau Linux optimisé pour la performance.",
    tag: "Code",
  },
];

const Community = () => {
  return (
    <section id="communaute" className="py-24 px-6 relative bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="text-left max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[0.9]"
            >
              VIBRER <br/>AVEC LA <span className="text-gradient underline">TRIBU</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/60"
            >
              Au cœur de Kernel Forge, il y a une communauté vibrante. Nous croyons en l'échange, l'entraide et le partage de connaissances.
            </motion.p>
          </div>
          <Button variant="outline" className="h-12 border-white/10 px-8 hover:bg-white/5 rounded-full">
            <MessageSquare className="mr-2" size={18} /> Voir tous les échanges
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {communityItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-10 rounded-[3rem] bg-glass hover:bg-white/5 border border-white/5 hover:border-primary/20 transition-all duration-500 glow-orange"
            >
              <div className="flex justify-between items-start mb-10">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-accent-orange/20 transition-all group-hover:scale-110">
                  {item.icon}
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-black px-4 py-2 bg-white/5 rounded-full border border-white/10 text-foreground/40">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">{item.title}</h3>
              <p className="text-foreground/60 leading-relaxed mb-6">
                {item.description}
              </p>
              <Button variant="link" className="p-0 h-auto text-primary group-hover:translate-x-2 transition-transform">
                En savoir plus <Github className="ml-2" size={14} />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
