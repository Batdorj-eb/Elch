// lib/types.ts
// ============================================
// ТАНЫ ОДООГИЙН TYPES (үлдээнэ)
// ============================================

export interface NewsArticle {
  isBreaking: any;
  coverImage: string;
  id: string;
  slug?: string; 
  title: string;
  description?: string;
  category: string;
  imageUrl: string;
  author?: string;
  publishedAt?: string;
  timeAgo: string;
  featured: number | null;
  views?: number;
  categorySlug?: string;
  content?: string;
  excerpt?: string;
  authorImage?: string;
  length: number;
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
}

export interface OpinionArticle extends NewsArticle {
  author: string;
  authorImage: string;
  date: string;
}

// ============================================
// BACKEND API TYPES (шинээр нэмэх)
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface BackendArticle {
  avatar: string;
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  featured_image: string | null;
  category_id: number;
  category_name: string;
  category_slug: string;
  author_id: number;
  author_name: string;
  views: number;
  view_count?: number;
  likes: number;
  status: 'draft' | 'published' | 'archived';
  is_featured: number | null;
  is_breaking: boolean | number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  is_active: boolean;
  display_order: number;
  id: number;
  name: string;
  slug: string;
  description: string | null;
  article_count: number;
}

export interface ArticleComment {
  id: number;
  article_id: number;
  user_name: string;
  user_email: string | null;
  content: string;
  likes: number;
  dislikes:number;
  parent_id: number | null;
  is_approved: boolean;
  created_at: string;
  replies?: ArticleComment[];
}

export interface ArticlesResponse {
  articles: BackendArticle[];
  total?: number;
  pagination?: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// ============================================
// SUBMISSION TYPES (Ардын элч)
// ============================================

export interface SubmissionFormData {
  name: string;
  email: string;
  phone: string;
  title: string;
  content: string;
}

export interface SubmissionResponse {
  message: string;
  submissionId: number;
}

export interface SubmissionError {
  error: string;
}

// ============================================
// CONVERTER FUNCTION (Backend → Frontend)
// ============================================

export function convertToNewsArticle(backendArticle: BackendArticle): NewsArticle {
  const publishedDate = new Date(backendArticle.published_at || backendArticle.created_at);
  const now = new Date();
  const diffMs = now.getTime() - publishedDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  let timeAgo: string;
  if (diffMins < 60) {
    timeAgo = `${diffMins} минутын өмнө`;
  } else if (diffHours < 24) {
    timeAgo = `${diffHours} цагийн өмнө`;
  } else if (diffDays < 7) {
    timeAgo = `${diffDays} өдрийн өмнө`;
  } else {
    timeAgo = publishedDate.toLocaleDateString('mn-MN');
  }

  const imageUrl = backendArticle.featured_image || 
                   backendArticle.cover_image || 
                   'https://placehold.co/800x400/3b82f6/white?text=No+Image';

  return {
    id: backendArticle.id.toString(),
    slug: backendArticle.slug,
    title: backendArticle.title,
    description: backendArticle.excerpt,
    category: backendArticle.category_name,
    length: backendArticle.content.length,
    imageUrl: imageUrl,
    coverImage: imageUrl,
    author: backendArticle.author_name,
    publishedAt: backendArticle.published_at || backendArticle.created_at,
    timeAgo,
    featured: typeof backendArticle.is_featured === 'number' 
      ? backendArticle.is_featured 
      : null,
    isBreaking: backendArticle.is_breaking === 1 || backendArticle.is_breaking === true,
    views: backendArticle.views || backendArticle.view_count || 0,
    categorySlug: backendArticle.category_slug,
    content: backendArticle.content,
    excerpt: backendArticle.excerpt,
    authorImage: backendArticle.avatar
  };
}