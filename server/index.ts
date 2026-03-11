import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { BlogPost, MediaItem, Service, ChatMessage } from "@shared/api";
import { initializeSqlite, sqliteStore } from "./sqlite-store";

let isSqliteInitialized = false;

const ensureSqliteInitialized = () => {
  if (!isSqliteInitialized) {
    initializeSqlite();
    isSqliteInitialized = true;
  }
};

export function createServer() {
  ensureSqliteInitialized();
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
    res.json({ data: sqliteStore.getBlogPosts(), success: true });
  });

  app.post("/api/blog", (req, res) => {
    const newPost = sqliteStore.addBlogPost(req.body as Omit<BlogPost, "id" | "date">);
    res.status(201).json({ data: newPost, success: true, message: "Post de blog ajouté !" });
  });

  // Media API
  app.get("/api/media", (_req, res) => {
    res.json({ data: sqliteStore.getMediaItems(), success: true });
  });

  app.post("/api/media", (req, res) => {
    const newItem = sqliteStore.addMediaItem(req.body as Omit<MediaItem, "id" | "date">);
    res.status(201).json({ data: newItem, success: true, message: "Média ajouté !" });
  });

  // Services API
  app.get("/api/services", (_req, res) => {
    res.json({ data: sqliteStore.getServices(), success: true });
  });

  app.post("/api/services", (req, res) => {
    const newService = sqliteStore.addService(req.body as Omit<Service, "id">);
    res.status(201).json({ data: newService, success: true, message: "Service ajouté !" });
  });

  // Chat API
  app.get("/api/messages", (_req, res) => {
    res.json({ data: sqliteStore.getMessages(), success: true });
  });

  app.post("/api/messages", (req, res) => {
    const { user, text, avatar } = req.body as Pick<ChatMessage, "user" | "text" | "avatar">;
    const newMessage = sqliteStore.addMessage({ user, text, avatar });
    res.status(201).json({ data: newMessage, success: true });
  });

  return app;
}
