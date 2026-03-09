import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Briefcase, 
  Layers, 
  Bell, 
  Search, 
  ChevronRight,
  LogOut,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Admin = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const sidebarItems = [
    { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { id: "services", icon: <Briefcase size={20} />, label: "Services" },
    { id: "expertises", icon: <Layers size={20} />, label: "Expertises" },
    { id: "users", icon: <Users size={20} />, label: "Utilisateurs" },
    { id: "settings", icon: <Settings size={20} />, label: "Paramètres" },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-glass border-r border-white/5 flex flex-col p-6 z-20">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2F4a571026c7964f629c370968e15765de?format=webp&width=100&height=100"
            alt="Kernel Forge"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-gradient">FORGE ADMIN</span>
        </Link>

        <nav className="flex-grow space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                ? "bg-primary/20 text-primary border border-primary/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                : "text-foreground/40 hover:text-foreground/80 hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all">
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
            <Input 
              placeholder="Rechercher..." 
              className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl focus:ring-primary/40" 
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-foreground/40 hover:text-foreground transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/5">
              <div className="text-right">
                <div className="text-sm font-bold">Admin Kernel</div>
                <div className="text-xs text-foreground/40">Super Administrateur</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-pink" />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {activeTab === "dashboard" && (
            <>
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Bonjour, Admin</h1>
                  <p className="text-foreground/40 text-lg">Voici ce qu'il se passe sur la plateforme aujourd'hui.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90 h-12 px-6 rounded-xl">
                  <Plus className="mr-2" size={18} /> Nouveau Projet
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Visiteurs uniques", value: "12,845", change: "+14%", icon: <Users className="text-primary" /> },
                  { label: "Projets Open Source", value: "48", change: "+5", icon: <Briefcase className="text-accent-pink" /> },
                  { label: "Temps de réponse", value: "45ms", change: "-12ms", icon: <Layers className="text-accent-blue" /> },
                ].map((stat, i) => (
                  <div key={i} className="p-8 bg-glass border border-white/5 rounded-[2rem] hover:border-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-blue-400 bg-blue-400/10'}`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-sm text-foreground/40 mb-1">{stat.label}</div>
                    <div className="text-4xl font-extrabold">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Recent Activity Table */}
              <div className="bg-glass border border-white/5 rounded-[2rem] p-8 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Activités Récentes</h2>
                  <Button variant="ghost" className="text-foreground/40 hover:text-primary">
                    Voir tout <ArrowUpRight className="ml-2" size={16} />
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-foreground/40 text-sm">
                        <th className="pb-4 font-medium">Utilisateur</th>
                        <th className="pb-4 font-medium">Action</th>
                        <th className="pb-4 font-medium">Date</th>
                        <th className="pb-4 font-medium">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { user: "Jean Dupont", action: "Nouveau commentaire sur #KernelOptim", date: "Il y a 2h", status: "Actif" },
                        { user: "Sarah Kernel", action: "Mise à jour du service Design", date: "Il y a 5h", status: "Terminé" },
                        { user: "Alex Forge", action: "Connexion réussie", date: "Aujourd'hui, 09:30", status: "Succès" },
                      ].map((row, i) => (
                        <tr key={i} className="group hover:bg-white/5 transition-colors">
                          <td className="py-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10" />
                            <span className="font-bold">{row.user}</span>
                          </td>
                          <td className="py-6 text-foreground/60">{row.action}</td>
                          <td className="py-6 text-foreground/40 text-sm">{row.date}</td>
                          <td className="py-6">
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab !== "dashboard" && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12 bg-glass border border-white/5 rounded-[3rem]">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8">
                {sidebarItems.find(i => i.id === activeTab)?.icon}
              </div>
              <h2 className="text-3xl font-bold mb-4">Module {sidebarItems.find(i => i.id === activeTab)?.label}</h2>
              <p className="text-foreground/40 max-w-md mx-auto mb-10">
                Cette section est en cours de développement. Le panneau d'administration de Kernel Forge est conçu pour une gestion fluide des contenus.
              </p>
              <Button size="lg" className="bg-primary px-8 h-14 text-lg">Configurer maintenant</Button>
            </div>
          )}
        </motion.div>
      </main>

      {/* Background patterns */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-64 w-[500px] h-[500px] bg-accent-pink/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
    </div>
  );
};

export default Admin;
