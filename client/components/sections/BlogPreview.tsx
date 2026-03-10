import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BlogPost, ApiResponse } from "@shared/api";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPreview = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(res => res.json())
      .then((res: ApiResponse<BlogPost[]>) => {
        setPosts(res.data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 px-6 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="text-left max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[0.9]"
            >
              DERNIÈRES <br/><span className="text-gradient underline">FORGES</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-foreground/40 font-medium text-lg"
            >
              Restez à l'écoute des dernières innovations et publications du noyau Linux.
            </motion.p>
          </div>
          <Button variant="outline" className="h-14 border-white/10 px-8 hover:bg-white/5 rounded-2xl group" asChild>
            <Link to="/blog">Voir tout le Blog <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 bg-glass border border-white/5 hover:border-primary/40 rounded-[2.5rem] transition-all duration-500 glow-green"
            >
              {post.image && (
                <div className="relative aspect-video overflow-hidden rounded-2xl mb-8">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              )}
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-4">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
              </div>
              <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <Button variant="link" className="p-0 h-auto text-primary font-black uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform" asChild>
                <Link to={`/blog/${post.id}`}>Lire la suite</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
