import React, { useEffect, useState } from "react";
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
  ArrowUpRight,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BlogPost, MediaItem, Service, ApiResponse } from "@shared/api";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  // Form states
  const [newBlog, setNewBlog] = useState({ title: "", excerpt: "", content: "", author: "", tags: "", image: "" });
  const [newMedia, setNewMedia] = useState({ title: "", url: "", type: "image", description: "" });
  const [newService, setNewService] = useState({ title: "", description: "", icon: "", category: "Development" });

  const sidebarItems = [
    { id: "dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { id: "blog", icon: <FileText size={20} />, label: "Blog" },
    { id: "media", icon: <ImageIcon size={20} />, label: "Média" },
    { id: "services", icon: <Briefcase size={20} />, label: "Services" },
    { id: "users", icon: <Users size={20} />, label: "Utilisateurs" },
    { id: "settings", icon: <Settings size={20} />, label: "Paramètres" },
  ];

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "blog") {
        const res = await fetch("/api/blog");
        const json = await res.json();
        setBlogPosts(json.data);
      } else if (activeTab === "media") {
        const res = await fetch("/api/media");
        const json = await res.json();
        setMediaItems(json.data);
      } else if (activeTab === "services") {
        const res = await fetch("/api/services");
        const json = await res.json();
        setServices(json.data);
      }
    } catch (err) {
      toast.error("Erreur lors de la récupération des données");
    } finally {
      setLoading(false);
    }
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newBlog, tags: newBlog.tags.split(",").map(t => t.trim()) })
      });
      const json = await res.json();
      if (json.success) {
        toast.success(json.message);
        setNewBlog({ title: "", excerpt: "", content: "", author: "", tags: "", image: "" });
        fetchData();
      }
    } catch (err) {
      toast.error("Erreur lors de l'ajout");
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMedia)
      });
      const json = await res.json();
      if (json.success) {
        toast.success(json.message);
        setNewMedia({ title: "", url: "", type: "image", description: "" });
        fetchData();
      }
    } catch (err) {
      toast.error("Erreur lors de l'ajout");
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService)
      });
      const json = await res.json();
      if (json.success) {
        toast.success(json.message);
        setNewService({ title: "", description: "", icon: "", category: "Development" });
        fetchData();
      }
    } catch (err) {
      toast.error("Erreur lors de l'ajout");
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-glass border-r border-white/5 flex flex-col p-6 z-20 shrink-0">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F41ba66cdc7114e4ab014f35ba81e151e%2Fa739bfb593ac459181725f47ca6452b6?format=webp&width=100&height=100"
            alt="Kernel Forge"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl font-black tracking-tighter text-gradient leading-none uppercase">FORGE<br/>ADMIN</span>
        </Link>

        <nav className="flex-grow space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                ? "bg-primary/20 text-primary border border-primary/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]" 
                : "text-foreground/40 hover:text-foreground/80 hover:bg-white/5"
              }`}
            >
              {item.icon}
              <span className="font-bold">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all font-bold">
            <LogOut size={20} />
            <span>Déconnexion</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
            <Input 
              placeholder="Rechercher..." 
              className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-primary/40" 
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-white/5 rounded-2xl text-foreground/40 hover:text-primary transition-all">
              <Bell size={22} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-white/5">
              <div className="text-right">
                <div className="text-sm font-black">Admin Kernel</div>
                <div className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold">Root Access</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent-orange glow-green" />
            </div>
          </div>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {activeTab === "dashboard" && (
            <>
              <div>
                <h1 className="text-5xl font-black mb-3 tracking-tighter">BONJOUR, ADMIN</h1>
                <p className="text-foreground/40 text-xl font-medium uppercase tracking-widest">Aperçu global du système</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Visiteurs uniques", value: "12,845", change: "+14%", icon: <Users className="text-primary" /> },
                  { label: "Sessions Actives", value: "342", change: "+12", icon: <FileText className="text-accent-orange" /> },
                  { label: "Uptime Système", value: "99.9%", change: "Stable", icon: <CheckCircle2 className="text-primary" /> },
                ].map((stat, i) => (
                  <div key={i} className="p-10 bg-glass border border-white/5 rounded-[3rem] glow-green hover:border-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-8">
                      <div className="p-5 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                      <span className="text-[10px] font-black px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full uppercase tracking-widest">
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-xs text-foreground/40 font-black uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                    <div className="text-5xl font-black tracking-tighter">{stat.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-glass border border-white/5 rounded-[3rem] p-10 overflow-hidden">
                <h2 className="text-3xl font-black mb-10 tracking-tight uppercase">Dernières Publications</h2>
                <div className="space-y-4">
                  <p className="text-foreground/40 text-center py-10">Consultez les onglets Blog et Média pour plus de détails.</p>
                </div>
              </div>
            </>
          )}

          {activeTab === "blog" && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-5xl font-black mb-2 tracking-tighter">GESTION DU BLOG</h1>
                  <p className="text-foreground/40 text-xl font-medium uppercase tracking-widest">Publiez et éditez vos articles</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 p-10 bg-glass border border-white/5 rounded-[3rem] space-y-8 h-fit">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Nouveau Post</h2>
                  <form onSubmit={handleAddBlog} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Titre</Label>
                      <Input value={newBlog.title} onChange={e => setNewBlog({...newBlog, title: e.target.value})} className="h-14 bg-white/5 border-white/10 rounded-2xl" placeholder="L'avenir de Linux..." required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Accroche (Excerpt)</Label>
                      <Input value={newBlog.excerpt} onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})} className="h-14 bg-white/5 border-white/10 rounded-2xl" placeholder="Bref résumé..." required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Contenu (HTML/Text)</Label>
                      <Textarea value={newBlog.content} onChange={e => setNewBlog({...newBlog, content: e.target.value})} className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl" placeholder="Le corps du post..." required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Auteur</Label>
                      <Input value={newBlog.author} onChange={e => setNewBlog({...newBlog, author: e.target.value})} className="h-14 bg-white/5 border-white/10 rounded-2xl" placeholder="Admin Forge" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Image URL</Label>
                      <Input value={newBlog.image} onChange={e => setNewBlog({...newBlog, image: e.target.value})} className="h-14 bg-white/5 border-white/10 rounded-2xl" placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Tags (séparés par virgule)</Label>
                      <Input value={newBlog.tags} onChange={e => setNewBlog({...newBlog, tags: e.target.value})} className="h-14 bg-white/5 border-white/10 rounded-2xl" placeholder="Linux, Kernel, Gaming" />
                    </div>
                    <Button type="submit" className="w-full h-16 bg-primary text-black font-black text-lg rounded-2xl glow-green">PUBLIER LE POST</Button>
                  </form>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Articles Existants</h2>
                  {loading ? <div className="text-center py-20 text-foreground/40 uppercase font-black tracking-widest animate-pulse">Chargement du noyau...</div> : 
                    <div className="grid gap-6">
                      {blogPosts.map(post => (
                        <div key={post.id} className="p-8 bg-glass border border-white/5 rounded-[2.5rem] flex justify-between items-center group hover:border-primary/40 transition-all">
                          <div>
                            <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">{post.title}</h3>
                            <div className="flex gap-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                              <span>{post.date}</span>
                              <span>{post.author}</span>
                            </div>
                          </div>
                          <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="ghost" className="rounded-xl bg-white/5 hover:bg-white/10 text-foreground/40 hover:text-white">
                              <ArrowUpRight size={18} />
                            </Button>
                            <Button size="icon" variant="ghost" className="rounded-xl bg-white/5 hover:bg-destructive/20 text-foreground/40 hover:text-destructive">
                              <Trash2 size={18} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                </div>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-12">
               <div>
                <h1 className="text-5xl font-black mb-2 tracking-tighter">PUBLICATION MÉDIA</h1>
                <p className="text-foreground/40 text-xl font-medium uppercase tracking-widest">Images et Vidéos de la Forge</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 p-10 bg-glass border border-white/5 rounded-[3rem] space-y-8 h-fit">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Nouveau Média</h2>
                  <form onSubmit={handleAddMedia} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Titre</Label>
                      <Input value={newMedia.title} onChange={e => setNewMedia({...newMedia, title: e.target.value})} className="h-14 bg-white/5 border-white/10 rounded-2xl" placeholder="Snapshot #1" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">URL Média</Label>
                      <Input value={newMedia.url} onChange={e => setNewMedia({...newMedia, url: e.target.value})} className="h-14 bg-white/5 border-white/10 rounded-2xl" placeholder="https://..." required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Type</Label>
                      <select value={newMedia.type} onChange={e => setNewMedia({...newMedia, type: e.target.value as any})} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 appearance-none">
                        <option value="image">Image</option>
                        <option value="video">Vidéo</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Description</Label>
                      <Textarea value={newMedia.description} onChange={e => setNewMedia({...newMedia, description: e.target.value})} className="h-24 bg-white/5 border-white/10 rounded-2xl" placeholder="Quelques mots..." />
                    </div>
                    <Button type="submit" className="w-full h-16 bg-primary text-black font-black text-lg rounded-2xl glow-green uppercase">Ajouter le Média</Button>
                  </form>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Galerie Admin</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {mediaItems.map(item => (
                      <div key={item.id} className="relative group rounded-[2rem] overflow-hidden bg-glass border border-white/5 hover:border-primary/40 transition-all aspect-video">
                        <img src={item.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black to-transparent translate-y-2 group-hover:translate-y-0 transition-all">
                          <h3 className="font-black text-lg tracking-tight uppercase">{item.title}</h3>
                          <div className="text-[10px] font-bold text-primary tracking-widest uppercase">{item.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-12">
               <div>
                <h1 className="text-5xl font-black mb-2 tracking-tighter">SERVICES FORGE</h1>
                <p className="text-foreground/40 text-xl font-medium uppercase tracking-widest">Gérez vos prestations et expertises</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 p-10 bg-glass border border-white/5 rounded-[3rem] space-y-8 h-fit">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Nouveau Service</h2>
                  <form onSubmit={handleAddService} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Nom du Service</Label>
                      <Input value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="h-14 bg-white/5 border-white/10 rounded-2xl" placeholder="Audit de performance..." required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Catégorie</Label>
                      <select value={newService.category} onChange={e => setNewService({...newService, category: e.target.value as any})} className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-4 text-sm appearance-none">
                        <option value="Development">Développement</option>
                        <option value="Design">Design</option>
                        <option value="Security">Sécurité</option>
                        <option value="Infrastructure">Infrastructure</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Description</Label>
                      <Textarea value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="h-32 bg-white/5 border-white/10 rounded-2xl" placeholder="Détails du service..." required />
                    </div>
                    <Button type="submit" className="w-full h-16 bg-primary text-black font-black text-lg rounded-2xl glow-green uppercase">Valider le Service</Button>
                  </form>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl font-black uppercase tracking-tight">Catalogue Actif</h2>
                  <div className="grid gap-6">
                    {services.map(service => (
                      <div key={service.id} className="p-8 bg-glass border border-white/5 rounded-[2.5rem] group hover:border-primary/40 transition-all flex items-center gap-8">
                        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={32} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">{service.title}</h3>
                          <p className="text-foreground/40 text-sm">{service.description}</p>
                          <div className="mt-3 text-[10px] font-black text-primary uppercase tracking-[0.2em]">{service.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {["users", "settings"].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-20 bg-glass border border-white/5 rounded-[4rem] glow-green">
              <div className="w-32 h-32 bg-white/5 rounded-[2rem] flex items-center justify-center mb-10 group-hover:rotate-12 transition-all">
                {sidebarItems.find(i => i.id === activeTab)?.icon}
              </div>
              <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase">{sidebarItems.find(i => i.id === activeTab)?.label}</h2>
              <p className="text-foreground/40 text-xl font-medium max-w-lg mx-auto mb-12 uppercase tracking-widest leading-relaxed">
                Le module de configuration avancée est en cours d'initialisation dans le noyau Kernel Forge.
              </p>
              <Button size="lg" className="bg-primary text-black font-black h-20 px-12 text-xl rounded-3xl glow-green uppercase">Lancer la synchro</Button>
            </div>
          )}
        </motion.div>
      </main>

      {/* Background patterns */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-64 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[160px] -z-10 pointer-events-none" />
    </div>
  );
};

export default Admin;
