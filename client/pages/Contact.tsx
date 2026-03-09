import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, MapPin, Phone, Mail, ArrowLeft, Github, Linkedin, Twitter } from "lucide-react";
import Layout from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background relative overflow-hidden pt-12">
        {/* Background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-pink/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                CONTACTEZ <br />
                <span className="text-gradient underline decoration-primary/30">L'ÉQUIPE</span>
              </h1>
              <p className="text-foreground/60 text-lg md:text-xl max-w-lg">
                Vous avez un projet en tête ou une question sur l'open source ? Nous sommes là pour vous répondre et forger ensemble de nouvelles solutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {[
                { icon: <Mail className="text-primary" />, label: "Email", value: "hello@kernelforge.org" },
                { icon: <Phone className="text-accent-pink" />, label: "Téléphone", value: "+33 1 23 45 67 89" },
                { icon: <MapPin className="text-accent-blue" />, label: "Siège Social", value: "Technopole Kernel, Lyon, France" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-glass border border-white/5 rounded-3xl group hover:border-white/10 transition-all">
                  <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/20 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-foreground/40 font-bold uppercase tracking-wider mb-1">{item.label}</div>
                    <div className="text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-6">
              <h3 className="text-xl font-bold">Réseaux Sociaux</h3>
              <div className="flex gap-4">
                {[Github, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="p-4 bg-glass border border-white/5 rounded-2xl text-foreground/40 hover:text-primary hover:border-primary/40 transition-all">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 md:p-12 bg-glass border border-white/10 rounded-[3rem] shadow-2xl relative"
          >
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input id="name" placeholder="John Doe" className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-primary/40" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email">Email professionnel</Label>
                  <Input id="email" type="email" placeholder="john@company.com" className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-primary/40" />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="subject">Sujet du message</Label>
                <Input id="subject" placeholder="Audit Linux / Nouveau Projet" className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 focus:ring-primary/40" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message">Votre message</Label>
                <Textarea id="message" placeholder="Dites-nous tout..." className="min-h-[180px] bg-white/5 border-white/10 rounded-3xl px-6 py-5 focus:ring-primary/40 resize-none" />
              </div>

              <Button className="w-full h-16 bg-gradient-to-r from-primary to-[#ff0080] rounded-2xl text-lg font-bold hover:scale-105 transition-transform">
                Envoyer le Message <Send className="ml-2" size={18} />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
