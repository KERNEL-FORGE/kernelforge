import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Globe, Linkedin, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  github: string;
  linkedin: string;
  website: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Yanis Forge",
    role: "Lead Kernel Engineer",
    bio: "Conçoit et optimise le noyau Linux de la plateforme pour offrir stabilité, faible latence et performances maximales.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://kernelforge.dev",
    email: "mailto:yanis@kernelforge.dev",
  },
  {
    name: "Aïcha Systra",
    role: "Security & DevOps Engineer",
    bio: "Pilote l'infrastructure cloud, l'observabilité et la sécurité applicative pour maintenir un environnement robuste et fiable.",
    photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://kernelforge.dev",
    email: "mailto:aicha@kernelforge.dev",
  },
  {
    name: "Léo Craft",
    role: "Frontend Architect",
    bio: "Façonne des interfaces fluides et accessibles, avec une attention forte au design system et à l'expérience utilisateur.",
    photo: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://kernelforge.dev",
    email: "mailto:leo@kernelforge.dev",
  },
  {
    name: "Inès Openfield",
    role: "Community & Open Source Manager",
    bio: "Anime les contributions open source, accompagne les membres et structure les initiatives de collaboration de la communauté.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://kernelforge.dev",
    email: "mailto:ines@kernelforge.dev",
  },
];

const TeamPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background relative overflow-hidden pt-20 px-6">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] text-gradient">L'ÉQUIPE</h1>
            <p className="text-foreground/50 text-xl max-w-3xl mx-auto">
              Découvrez les membres de Kernel Forge : les talents qui conçoivent, sécurisent et font évoluer notre écosystème open source.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-glass border-white/5 overflow-hidden group hover:border-primary/30 transition-all duration-500 rounded-[2rem] glow-green h-full flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={member.photo}
                      alt={`Portrait de ${member.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  </div>

                  <CardHeader className="p-6">
                    <CardTitle className="text-2xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-primary font-bold uppercase tracking-widest text-xs">
                      {member.role}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="px-6 pb-4">
                    <p className="text-foreground/60 leading-relaxed text-sm">{member.bio}</p>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 mt-auto flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                      <a href={member.github} target="_blank" rel="noreferrer">
                        <Github size={14} className="mr-2" /> GitHub
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                      <a href={member.linkedin} target="_blank" rel="noreferrer">
                        <Linkedin size={14} className="mr-2" /> LinkedIn
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                      <a href={member.website} target="_blank" rel="noreferrer">
                        <Globe size={14} className="mr-2" /> Site
                      </a>
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                      <a href={member.email}>
                        <Mail size={14} className="mr-2" /> Email
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;
