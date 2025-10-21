// lib/types.ts

export interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  author?: string;
  publishedAt?: string;
  timeAgo: string;
  featured?: boolean;
  views?: number;
}

export interface ArticleDetail extends NewsArticle {
  content: string;
  imageCaption?: string;
  tags?: string[];
  comments?: number;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
  replies?: Comment[];
  replyCount?: number;
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
}

export interface WeatherData {
  high: number;
  low: number;
  city: string;
}

export interface CurrencyData {
  code: string;
  rate: number;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  imageUrl: string;
  bio?: string;
}

export interface OpinionArticle extends NewsArticle {
  author: string;
  authorImage: string;
  date: string;
}