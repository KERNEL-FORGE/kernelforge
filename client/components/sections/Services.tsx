import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, BookOpen, Search, Briefcase } from "lucide-react";
import { Service, ApiResponse } from "@shared/api";

const getIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("code") || lower.includes("développement")) return <Code2 className="text-primary" size={40} />;
  if (lower.includes("audit") || lower.includes("sécurité")) return <Search className="text-accent-orange" size={40} />;
  if (lower.includes("design")) return <BookOpen className="text-primary" size={40} />;
  return <Briefcase className="text-primary" size={40} />;
};

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then(res => res.json())
      .then((res: ApiResponse<Service[]>) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          >
            NOTRE <span className="text-gradient underline decoration-primary/20">FORGE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 max-w-2xl mx-auto text-lg font-medium"
          >
            Découvrez nos services spécialisés pour forger vos projets les plus ambitieux.
          </motion.p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 uppercase font-black tracking-widest text-foreground/40 animate-pulse">Chargement des services...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-10 bg-glass rounded-[2.5rem] group border border-white/5 hover:border-primary/40 transition-all duration-500 glow-green"
              >
                <div className="mb-8 p-5 rounded-3xl bg-white/5 inline-block group-hover:bg-primary/20 transition-all duration-300 group-hover:rotate-12">
                  {getIcon(service.title)}
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight uppercase group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-foreground/50 leading-relaxed font-medium">
                  {service.description}
                </p>
                <div className="mt-8 text-[10px] font-black text-primary uppercase tracking-[0.2em]">{service.category}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
