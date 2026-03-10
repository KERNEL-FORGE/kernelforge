import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { BlogPost, ApiResponse } from "@shared/api";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((response: ApiResponse<BlogPost[]>) => {
        const foundPost = response.data.find(p => p.id === id);
        setPost(foundPost || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog post:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-black mb-6 tracking-tighter">ARTICLE NON TROUVÉ</h1>
          <p className="text-foreground/40 mb-12 text-xl font-medium uppercase tracking-widest">Cet article semble s'être égaré dans le noyau.</p>
          <Button asChild className="bg-primary text-black font-bold px-8 h-14 rounded-2xl glow-green">
            <Link to="/blog">Retour au Blog</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background relative overflow-hidden pt-20 px-6 pb-20">
        {/* Background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-orange/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Button variant="ghost" className="mb-8 text-foreground/60 hover:text-primary transition-colors px-0" asChild>
              <Link to="/blog" className="flex items-center gap-2">
                <ArrowLeft size={20} /> Retour au Blog
              </Link>
            </Button>

            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-gradient">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm font-bold uppercase tracking-widest text-foreground/40 pb-8 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-primary" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">{post.tags.length}</span>
                <Tag size={16} className="text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16 rounded-[3rem] overflow-hidden border border-white/5 glow-green"
            >
              <img src={post.image} alt={post.title} className="w-full h-auto object-cover aspect-video" />
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-invert max-w-none mb-16"
          >
            <div className="p-12 bg-glass border border-white/5 rounded-[3rem] space-y-6">
              <p className="text-xl text-foreground/60 leading-relaxed font-medium italic border-l-4 border-primary pl-8">
                {post.excerpt}
              </p>

              <div className="text-lg text-foreground leading-relaxed whitespace-pre-wrap font-medium space-y-6">
                {post.content}
              </div>
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16 space-y-6"
          >
            <h2 className="text-2xl font-black uppercase tracking-tight">Étiquettes</h2>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-6 py-3 bg-glass border border-white/5 rounded-2xl text-sm font-bold uppercase tracking-widest text-primary hover:border-primary/40 transition-all cursor-pointer glow-green"
                >
                  <Tag className="inline mr-2" size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-12 bg-glass border border-white/5 rounded-[3rem] text-center space-y-8 glow-green"
          >
            <h2 className="text-4xl font-black tracking-tighter">ENVIE DE CONTINUER LA LECTURE ?</h2>
            <p className="text-foreground/40 text-xl font-medium">Découvrez nos autres articles et restez à jour sur l'actualité Kernel Forge.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild className="bg-primary text-black font-bold px-10 h-16 text-lg rounded-2xl glow-green">
                <Link to="/blog">Voir tous les articles</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/10 font-bold px-10 h-16 text-lg rounded-2xl hover:bg-white/5">
                <Link to="/tchat">Discuter dans le Tchat</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetailPage;
