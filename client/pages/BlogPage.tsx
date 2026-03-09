import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { BlogPost, ApiResponse } from "@shared/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((response: ApiResponse<BlogPost[]>) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-background relative overflow-hidden pt-20 px-6">
        {/* Background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-orange/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] text-gradient">LE BLOG</h1>
            <p className="text-foreground/50 text-xl max-w-2xl mx-auto">
              Découvrez nos articles sur l'open source, le développement noyau et l'innovation technologique.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-glass border-white/5 overflow-hidden group hover:border-primary/30 transition-all duration-500 rounded-[2rem] glow-green h-full flex flex-col">
                    {post.image && (
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    <CardHeader className="p-8">
                      <div className="flex items-center gap-4 text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                        <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                      </div>
                      <CardTitle className="text-3xl font-black mb-4 tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-foreground/50 text-base leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="p-8 pt-0 mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-foreground/40 uppercase tracking-widest flex items-center gap-1">
                            <Tag size={10} /> {tag}
                          </span>
                        ))}
                      </div>
                      <Button variant="link" className="p-0 h-auto text-primary font-bold group-hover:translate-x-2 transition-transform" asChild>
                        <Link to={`/blog/${post.id}`}>
                          LIRE L'ARTICLE <ArrowRight className="ml-2" size={16} />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
