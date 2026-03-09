import { motion } from "framer-motion";
import { Globe, Palette, ShieldCheck, Database, Terminal, Workflow } from "lucide-react";

const expertises = [
  {
    icon: <Globe className="text-primary" size={24} />,
    title: "Sites & Applications",
    description: "Des solutions web performantes et évolutives bâties sur des architectures modernes.",
    skills: ["React", "TypeScript", "Node.js", "Vite"],
  },
  {
    icon: <Palette className="text-accent-pink" size={24} />,
    title: "Design & UX",
    description: "Une expérience utilisateur fluide et un design épuré pour une adoption immédiate.",
    skills: ["Figma", "Design Systems", "Accessibilité", "Animation"],
  },
  {
    icon: <ShieldCheck className="text-accent-blue" size={24} />,
    title: "Réseaux & Sécurité",
    description: "Protection des données et optimisation des performances réseau en environnement Linux.",
    skills: ["Firewalling", "VPN", "Audit de Sécurité", "DevSecOps"],
  },
];

const Expertises = () => {
  return (
    <section id="expertises" className="py-24 px-6 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            NOS <span className="text-gradient">EXPERTISES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto"
          >
            Une équipe pluridisciplinaire au service de vos projets les plus ambitieux.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {expertises.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-glass hover:bg-white/5 border border-white/5 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-foreground/60 leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10 text-foreground/40">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertises;
