// ============================================
// ТАНЫ ОДООГИЙН TYPES (үлдээнэ)
// ============================================

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
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category_id: number;
  category_name: string;
  category_slug: string;
  author_id: number;
  author_name: string;
  views: number;
  likes: number;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  is_breaking: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  article_count: number;
}

export interface Comment {
  id: number;
  article_id: number;
  user_name: string;
  user_email: string | null;
  content: string;
  likes: number;
  parent_id: number | null;
  is_approved: boolean;
  created_at: string;
  replies?: Comment[];
}

export interface ArticlesResponse {
  articles: BackendArticle[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// ============================================
// CONVERTER FUNCTION (Backend → Frontend)
// ============================================

export function convertToNewsArticle(backendArticle: BackendArticle): NewsArticle {
  // Calculate time ago
  const publishedDate = new Date(backendArticle.published_at);
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

  return {
    id: backendArticle.id.toString(),
    title: backendArticle.title,
    description: backendArticle.excerpt,
    category: backendArticle.category_name,
    imageUrl: backendArticle.featured_image || '/placeholder-image.jpg',
    author: backendArticle.author_name,
    publishedAt: backendArticle.published_at,
    timeAgo,
    featured: backendArticle.is_featured,
    views: backendArticle.views
  };
}