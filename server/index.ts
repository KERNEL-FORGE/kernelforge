import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { BlogPost, MediaItem, Service } from "@shared/api";

// Simple in-memory storage (mock db)
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "L'optimisation du Noyau Linux pour le Gaming",
    excerpt: "Pourquoi le noyau Linux optimisé est crucial pour une performance stable sur Minecraft et autres jeux.",
    content: "Dans cet article, nous explorons les modifications nécessaires du noyau Linux pour réduire la latence et améliorer les FPS...",
    author: "Kernel Dev",
    date: new Date().toLocaleDateString(),
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: ["Linux", "Gaming", "Performance"]
  },
  {
    id: "2",
    title: "Sécurité Open Source : Les Meilleures Pratiques",
    excerpt: "Comment protéger vos infrastructures contre les menaces émergentes en utilisant des solutions 100% libres.",
    content: "La sécurité ne doit pas être un coût, mais un investissement dans votre liberté numérique...",
    author: "Forge Security",
    date: new Date().toLocaleDateString(),
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    tags: ["Sécurité", "Audit", "Open Source"]
  }
];

const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Installation du Kernel Forge",
    url: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800",
    type: "image",
    description: "Un aperçu de notre interface de configuration.",
    date: new Date().toLocaleDateString()
  },
  {
    id: "2",
    title: "Le Serveur Minecraft en pleine action",
    url: "https://images.unsplash.com/photo-1627373670806-07a3fe03d2da?auto=format&fit=crop&q=80&w=800",
    type: "image",
    description: "Nos membres en train de bâtir la Forge Virtuelle.",
    date: new Date().toLocaleDateString()
  }
];

const servicesData: Service[] = [
  {
    id: "1",
    title: "Développement Open Source",
    description: "Création de solutions logicielles robustes et personnalisées basées sur le libre.",
    icon: "code",
    category: "Development"
  },
  {
    id: "2",
    title: "Design & UX",
    description: "Interfaces ergonomiques et modernes pour une expérience utilisateur fluide.",
    icon: "palette",
    category: "Design"
  },
  {
    id: "3",
    title: "Audit de Sécurité",
    description: "Évaluation complète de votre système et protection de vos données sensibles.",
    icon: "shield",
    category: "Security"
  }
];

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Blog API
  app.get("/api/blog", (_req, res) => {
    res.json({ data: blogPosts, success: true });
  });

  app.post("/api/blog", (req, res) => {
    const newPost: BlogPost = {
      ...req.body,
      id: Math.random().toString(36).substring(7),
      date: new Date().toLocaleDateString()
    };
    blogPosts.unshift(newPost);
    res.status(201).json({ data: newPost, success: true, message: "Post de blog ajouté !" });
  });

  // Media API
  app.get("/api/media", (_req, res) => {
    res.json({ data: mediaItems, success: true });
  });

  app.post("/api/media", (req, res) => {
    const newItem: MediaItem = {
      ...req.body,
      id: Math.random().toString(36).substring(7),
      date: new Date().toLocaleDateString()
    };
    mediaItems.unshift(newItem);
    res.status(201).json({ data: newItem, success: true, message: "Média ajouté !" });
  });

  // Services API
  app.get("/api/services", (_req, res) => {
    res.json({ data: servicesData, success: true });
  });

  app.post("/api/services", (req, res) => {
    const newService: Service = {
      ...req.body,
      id: Math.random().toString(36).substring(7)
    };
    servicesData.push(newService);
    res.status(201).json({ data: newService, success: true, message: "Service ajouté !" });
  });

  return app;
}
