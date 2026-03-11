import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { BlogPost, ChatMessage, MediaItem, Service } from "@shared/api";

// In-memory fallback for environments where better-sqlite3 cannot be compiled
interface Storage {
  blogPosts: BlogPost[];
  mediaItems: MediaItem[];
  services: Service[];
  messages: ChatMessage[];
}

let store: Storage = {
  blogPosts: [],
  mediaItems: [],
  services: [],
  messages: []
};

const seedData = () => {
  const nowDate = new Date().toLocaleDateString();
  const nowTime = new Date().toLocaleTimeString();

  store.messages = [
    { id: randomUUID(), user: 'Root', text: 'Bienvenue sur le chat de Kernel Forge !', timestamp: nowTime, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Root' },
    { id: randomUUID(), user: 'KernelDev', text: 'Quelqu\'un a testé la nouvelle version du noyau ?', timestamp: nowTime, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KernelDev' }
  ];

  store.blogPosts = [
    {
      id: randomUUID(),
      title: 'L\'optimisation du Noyau Linux pour le Gaming',
      excerpt: 'Pourquoi le noyau Linux optimisé est crucial pour une performance stable sur Minecraft et autres jeux.',
      content: 'Dans cet article, nous explorons les modifications nécessaires du noyau Linux pour réduire la latence et améliorer les FPS...',
      author: 'Kernel Dev',
      date: nowDate,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      tags: ["Linux", "Gaming", "Performance"]
    },
    {
      id: randomUUID(),
      title: 'Sécurité Open Source : Les Meilleures Pratiques',
      excerpt: 'Comment protéger vos infrastructures contre les menaces émergentes en utilisant des solutions 100% libres.',
      content: 'La sécurité ne doit pas être un coût, mais un investissement dans votre liberté numérique...',
      author: 'Forge Security',
      date: nowDate,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      tags: ["Sécurité", "Audit", "Open Source"]
    }
  ];

  store.mediaItems = [
    {
      id: randomUUID(),
      title: 'Installation du Kernel Forge',
      url: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800',
      type: 'image',
      description: 'Un aperçu de notre interface de configuration.',
      date: nowDate
    },
    {
      id: randomUUID(),
      title: 'Le Serveur Minecraft en pleine action',
      url: 'https://images.unsplash.com/photo-1627373670806-07a3fe03d2da?auto=format&fit=crop&q=80&w=800',
      type: 'image',
      description: 'Nos membres en train de bâtir la Forge Virtuelle.',
      date: nowDate
    }
  ];

  store.services = [
    { id: randomUUID(), title: 'Développement Open Source', description: 'Création de solutions logicielles robustes et personnalisées basées sur le libre.', icon: 'code', category: 'Development' },
    { id: randomUUID(), title: 'Design & UX', description: 'Interfaces ergonomiques et modernes pour une expérience utilisateur fluide.', icon: 'palette', category: 'Design' },
    { id: randomUUID(), title: 'Audit de Sécurité', description: 'Évaluation complète de votre système et protection de vos données sensibles.', icon: 'shield', category: 'Security' }
  ];
};

export const initializeSqlite = () => {
  seedData();
};

export const sqliteStore = {
  getBlogPosts(): BlogPost[] {
    return [...store.blogPosts].reverse();
  },

  addBlogPost(input: Omit<BlogPost, "id" | "date">): BlogPost {
    const post: BlogPost = {
      ...input,
      id: randomUUID(),
      date: new Date().toLocaleDateString(),
    };
    store.blogPosts.push(post);
    return post;
  },

  getMediaItems(): MediaItem[] {
    return [...store.mediaItems].reverse();
  },

  addMediaItem(input: Omit<MediaItem, "id" | "date">): MediaItem {
    const item: MediaItem = {
      ...input,
      id: randomUUID(),
      date: new Date().toLocaleDateString(),
    };
    store.mediaItems.push(item);
    return item;
  },

  getServices(): Service[] {
    return [...store.services];
  },

  addService(input: Omit<Service, "id">): Service {
    const service: Service = {
      ...input,
      id: randomUUID(),
    };
    store.services.push(service);
    return service;
  },

  getMessages(): ChatMessage[] {
    return [...store.messages];
  },

  addMessage(input: Pick<ChatMessage, "user" | "text" | "avatar">): ChatMessage {
    const message: ChatMessage = {
      id: randomUUID(),
      user: input.user || "Anonyme",
      text: input.text,
      timestamp: new Date().toLocaleTimeString(),
      avatar: input.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${input.user || "Anonyme"}`,
    };
    store.messages.push(message);
    return message;
  },
};
