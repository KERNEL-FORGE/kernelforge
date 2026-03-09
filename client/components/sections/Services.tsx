import { motion } from "framer-motion";
import { Code2, BookOpen, Search, Layers, Shield, Cpu } from "lucide-react";

const services = [
  {
    icon: <Code2 className="text-primary" size={32} />,
    title: "Développement Open Source",
    description: "Nous forgeons des solutions robustes basées sur les meilleures pratiques de l'open source.",
  },
  {
    icon: <BookOpen className="text-accent-pink" size={32} />,
    title: "Formation Linux",
    description: "Apprenez à maîtriser le noyau Linux et les environnements de serveurs professionnels.",
  },
  {
    icon: <Search className="text-accent-blue" size={32} />,
    title: "Audit & Conseil",
    description: "Expertise approfondie pour optimiser vos systèmes et votre infrastructure existante.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            NOS <span className="text-gradient">SERVICES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto"
          >
            Découvrez nos services spécialisés pour répondre à tous vos besoins technologiques.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 bg-glass rounded-3xl group border border-white/5 hover:border-primary/40 transition-all duration-300"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 inline-block group-hover:bg-primary/20 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-foreground/60 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
