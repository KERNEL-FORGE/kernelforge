import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { BlogPost, ChatMessage, MediaItem, Service } from "@shared/api";

const defaultDbPath = process.env.VERCEL
  ? path.resolve("/tmp", "kernelforge.sqlite")
  : path.resolve(process.cwd(), "data", "kernelforge.sqlite");
const dbPath = process.env.SQLITE_DB_PATH ? path.resolve(process.env.SQLITE_DB_PATH) : defaultDbPath;

const sqlString = (value: string) => `'${value.replace(/'/g, "''")}'`;

const run = (sql: string) => {
  execFileSync("sqlite3", [dbPath, sql], { stdio: "pipe" });
};

const readRows = <T>(sql: string): T[] => {
  const output = execFileSync("sqlite3", ["-json", dbPath, sql], { encoding: "utf8" });
  if (!output.trim()) return [];
  return JSON.parse(output) as T[];
};

const seedData = () => {
  const nowDate = new Date().toLocaleDateString();
  const nowTime = new Date().toLocaleTimeString();

  run(`
    INSERT INTO chat_messages (id, user, text, timestamp, avatar)
    SELECT ${sqlString(randomUUID())}, 'Root', 'Bienvenue sur le chat de Kernel Forge !', ${sqlString(nowTime)}, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Root'
    WHERE NOT EXISTS (SELECT 1 FROM chat_messages LIMIT 1);

    INSERT INTO chat_messages (id, user, text, timestamp, avatar)
    SELECT ${sqlString(randomUUID())}, 'KernelDev', 'Quelqu''un a testé la nouvelle version du noyau ?', ${sqlString(nowTime)}, 'https://api.dicebear.com/7.x/avataaars/svg?seed=KernelDev'
    WHERE (SELECT COUNT(*) FROM chat_messages) = 1;

    INSERT INTO blog_posts (id, title, excerpt, content, author, date, image, tags)
    SELECT ${sqlString(randomUUID())},
      'L''optimisation du Noyau Linux pour le Gaming',
      'Pourquoi le noyau Linux optimisé est crucial pour une performance stable sur Minecraft et autres jeux.',
      'Dans cet article, nous explorons les modifications nécessaires du noyau Linux pour réduire la latence et améliorer les FPS...',
      'Kernel Dev',
      ${sqlString(nowDate)},
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      ${sqlString(JSON.stringify(["Linux", "Gaming", "Performance"]))}
    WHERE NOT EXISTS (SELECT 1 FROM blog_posts LIMIT 1);

    INSERT INTO blog_posts (id, title, excerpt, content, author, date, image, tags)
    SELECT ${sqlString(randomUUID())},
      'Sécurité Open Source : Les Meilleures Pratiques',
      'Comment protéger vos infrastructures contre les menaces émergentes en utilisant des solutions 100% libres.',
      'La sécurité ne doit pas être un coût, mais un investissement dans votre liberté numérique...',
      'Forge Security',
      ${sqlString(nowDate)},
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      ${sqlString(JSON.stringify(["Sécurité", "Audit", "Open Source"]))}
    WHERE (SELECT COUNT(*) FROM blog_posts) = 1;

    INSERT INTO media_items (id, title, url, type, description, date)
    SELECT ${sqlString(randomUUID())},
      'Installation du Kernel Forge',
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800',
      'image',
      'Un aperçu de notre interface de configuration.',
      ${sqlString(nowDate)}
    WHERE NOT EXISTS (SELECT 1 FROM media_items LIMIT 1);

    INSERT INTO media_items (id, title, url, type, description, date)
    SELECT ${sqlString(randomUUID())},
      'Le Serveur Minecraft en pleine action',
      'https://images.unsplash.com/photo-1627373670806-07a3fe03d2da?auto=format&fit=crop&q=80&w=800',
      'image',
      'Nos membres en train de bâtir la Forge Virtuelle.',
      ${sqlString(nowDate)}
    WHERE (SELECT COUNT(*) FROM media_items) = 1;

    INSERT INTO services (id, title, description, icon, category)
    SELECT ${sqlString(randomUUID())}, 'Développement Open Source', 'Création de solutions logicielles robustes et personnalisées basées sur le libre.', 'code', 'Development'
    WHERE NOT EXISTS (SELECT 1 FROM services LIMIT 1);

    INSERT INTO services (id, title, description, icon, category)
    SELECT ${sqlString(randomUUID())}, 'Design & UX', 'Interfaces ergonomiques et modernes pour une expérience utilisateur fluide.', 'palette', 'Design'
    WHERE (SELECT COUNT(*) FROM services) = 1;

    INSERT INTO services (id, title, description, icon, category)
    SELECT ${sqlString(randomUUID())}, 'Audit de Sécurité', 'Évaluation complète de votre système et protection de vos données sensibles.', 'shield', 'Security'
    WHERE (SELECT COUNT(*) FROM services) = 2;
  `);
};

export const initializeSqlite = () => {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  run(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      date TEXT NOT NULL,
      image TEXT,
      tags TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS media_items (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('image', 'video')),
      description TEXT,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT,
      category TEXT NOT NULL CHECK(category IN ('Development', 'Design', 'Security', 'Infrastructure'))
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id TEXT PRIMARY KEY,
      user TEXT NOT NULL,
      text TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      avatar TEXT
    );
  `);

  seedData();
};

export const sqliteStore = {
  getBlogPosts(): BlogPost[] {
    const rows = readRows<Omit<BlogPost, "tags"> & { tags: string }>("SELECT * FROM blog_posts ORDER BY rowid DESC;");
    return rows.map((row) => ({ ...row, tags: JSON.parse(row.tags) as string[] }));
  },

  addBlogPost(input: Omit<BlogPost, "id" | "date">): BlogPost {
    const post: BlogPost = {
      ...input,
      id: randomUUID(),
      date: new Date().toLocaleDateString(),
    };

    run(`
      INSERT INTO blog_posts (id, title, excerpt, content, author, date, image, tags)
      VALUES (
        ${sqlString(post.id)},
        ${sqlString(post.title)},
        ${sqlString(post.excerpt)},
        ${sqlString(post.content)},
        ${sqlString(post.author)},
        ${sqlString(post.date)},
        ${post.image ? sqlString(post.image) : "NULL"},
        ${sqlString(JSON.stringify(post.tags))}
      );
    `);

    return post;
  },

  getMediaItems(): MediaItem[] {
    return readRows<MediaItem>("SELECT * FROM media_items ORDER BY rowid DESC;");
  },

  addMediaItem(input: Omit<MediaItem, "id" | "date">): MediaItem {
    const item: MediaItem = {
      ...input,
      id: randomUUID(),
      date: new Date().toLocaleDateString(),
    };

    run(`
      INSERT INTO media_items (id, title, url, type, description, date)
      VALUES (
        ${sqlString(item.id)},
        ${sqlString(item.title)},
        ${sqlString(item.url)},
        ${sqlString(item.type)},
        ${item.description ? sqlString(item.description) : "NULL"},
        ${sqlString(item.date)}
      );
    `);

    return item;
  },

  getServices(): Service[] {
    return readRows<Service>("SELECT * FROM services ORDER BY rowid ASC;");
  },

  addService(input: Omit<Service, "id">): Service {
    const service: Service = {
      ...input,
      id: randomUUID(),
    };

    run(`
      INSERT INTO services (id, title, description, icon, category)
      VALUES (
        ${sqlString(service.id)},
        ${sqlString(service.title)},
        ${sqlString(service.description)},
        ${service.icon ? sqlString(service.icon) : "NULL"},
        ${sqlString(service.category)}
      );
    `);

    return service;
  },

  getMessages(): ChatMessage[] {
    return readRows<ChatMessage>("SELECT * FROM chat_messages ORDER BY rowid ASC;");
  },

  addMessage(input: Pick<ChatMessage, "user" | "text" | "avatar">): ChatMessage {
    const message: ChatMessage = {
      id: randomUUID(),
      user: input.user || "Anonyme",
      text: input.text,
      timestamp: new Date().toLocaleTimeString(),
      avatar: input.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${input.user || "Anonyme"}`,
    };

    run(`
      INSERT INTO chat_messages (id, user, text, timestamp, avatar)
      VALUES (
        ${sqlString(message.id)},
        ${sqlString(message.user)},
        ${sqlString(message.text)},
        ${sqlString(message.timestamp)},
        ${message.avatar ? sqlString(message.avatar) : "NULL"}
      );
    `);

    return message;
  },
};
