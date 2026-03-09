/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image?: string;
  tags: string[];
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  type: "image" | "video";
  description?: string;
  date: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category: "Development" | "Design" | "Security" | "Infrastructure";
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
