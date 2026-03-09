import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { MediaItem, ApiResponse } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Play, Image, Calendar, Info, ZoomIn } from "lucide-react";

const MediaPage = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((response: ApiResponse<MediaItem[]>) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching media items:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-background relative overflow-hidden pt-20 px-6">
        {/* Background elements */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent-orange/5 rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="max-w-7xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] text-gradient">MÉDIA</h1>
            <p className="text-foreground/50 text-xl max-w-2xl mx-auto uppercase tracking-widest font-bold">Galerie & Publications</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative rounded-[2rem] overflow-hidden bg-glass border border-white/5 hover:border-primary/40 transition-all duration-500 glow-green aspect-video"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-end">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                          {item.type === "video" ? <Play size={12} className="fill-current" /> : <Image size={12} />}
                          {item.type}
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter text-white">{item.title}</h3>
                        <p className="text-xs text-white/40 line-clamp-1 max-w-[200px]">{item.description}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="rounded-2xl bg-white/5 hover:bg-primary/20 text-white/60 hover:text-primary transition-all">
                          <ZoomIn size={18} />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-2xl bg-white/5 hover:bg-primary/20 text-white/60 hover:text-primary transition-all">
                          <Info size={18} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <span className="flex items-center gap-2 text-[10px] font-bold text-white/30 tracking-widest uppercase">
                        <Calendar size={12} /> Publié le {item.date}
                      </span>
                      <Button variant="link" className="p-0 h-auto text-[10px] font-black text-primary tracking-widest uppercase hover:scale-105 transition-transform">
                        Télécharger
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MediaPage;
