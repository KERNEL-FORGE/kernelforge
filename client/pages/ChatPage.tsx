import React, { useEffect, useState, useRef } from "react";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, ApiResponse } from "@shared/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, MessageSquare, Terminal } from "lucide-react";
import { toast } from "sonner";

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [username, setUsername] = useState("Invité-" + Math.floor(Math.random() * 1000));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(scrollToBottom, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const json = await res.json();
      if (json.success) setMessages(json.data);
    } catch (err) {
      console.error("Error fetching messages");
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const body = {
      user: username,
      text: inputText,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const json = await res.json();
      if (json.success) {
        setInputText("");
        fetchMessages();
      }
    } catch (err) {
      toast.error("Erreur d'envoi du message");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background relative overflow-hidden pt-20 px-6 pb-12">
        {/* Background elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-orange/5 rounded-full blur-[120px] -z-10 animate-pulse" />

        <div className="max-w-4xl mx-auto flex flex-col h-[75vh] bg-glass border border-white/5 rounded-[3rem] overflow-hidden glow-green">
          {/* Header */}
          <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-2xl text-primary">
                <MessageSquare size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight uppercase">FORGE CHAT</h1>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Système en ligne</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
              <User size={14} className="text-primary" />
              <input 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                className="bg-transparent border-none text-xs font-bold text-foreground focus:outline-none w-24"
                title="Votre nom d'utilisateur"
              />
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-grow overflow-y-auto p-8 space-y-6 scrollbar-hide">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.user === username ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-4 ${msg.user === username ? "flex-row-reverse" : ""}`}
                >
                  <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10" />
                  <div className={`max-w-[70%] space-y-1 ${msg.user === username ? "text-right" : ""}`}>
                    <div className="flex items-center gap-2 justify-end flex-row-reverse">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{msg.user}</span>
                      <span className="text-[8px] font-medium text-foreground/30">{msg.timestamp}</span>
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.user === username 
                      ? "bg-primary text-black font-medium rounded-tr-none" 
                      : "bg-white/5 border border-white/5 rounded-tl-none"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form onSubmit={handleSendMessage} className="p-8 border-t border-white/5 bg-white/5 flex gap-4">
            <div className="relative flex-grow">
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <Input 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Entrez votre commande..." 
                className="pl-12 h-14 bg-black/40 border-white/10 rounded-2xl focus:ring-primary/40 focus:border-primary/40"
              />
            </div>
            <Button type="submit" className="h-14 w-14 rounded-2xl bg-primary text-black hover:scale-105 transition-transform shrink-0">
              <Send size={20} />
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
