import { 
  ApiResponse, 
  BackendArticle, 
  Category, 
  Comment, 
  ArticlesResponse,
  convertToNewsArticle,
  NewsArticle
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ============================================
// НИЙТЛЭЛҮҮД
// ============================================

export async function getArticles(params?: {
  category?: string;
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<NewsArticle[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const url = `${API_URL}/articles${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const res = await fetch(url, { cache: 'no-store' });
    
    if (!res.ok) throw new Error('Failed to fetch articles');
    
    const data: ApiResponse<ArticlesResponse> = await res.json();
    
    // Backend articles-ийг Frontend NewsArticle болгон хөрвүүлэх
    return data.data.articles.map(convertToNewsArticle);
  } catch (error) {
    console.error('getArticles error:', error);
    return [];
  }
}

export async function getFeaturedArticles(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${API_URL}/articles/featured`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch featured articles');
    
    const data: ApiResponse<ArticlesResponse> = await res.json();
    return data.data.articles.map(convertToNewsArticle);
  } catch (error) {
    console.error('getFeaturedArticles error:', error);
    return [];
  }
}

export async function getBreakingNews(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${API_URL}/articles/breaking`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch breaking news');
    
    const data: ApiResponse<ArticlesResponse> = await res.json();
    return data.data.articles.map(convertToNewsArticle);
  } catch (error) {
    console.error('getBreakingNews error:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<BackendArticle | null> {
  try {
    const res = await fetch(`${API_URL}/articles/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch article');
    
    const data: ApiResponse<BackendArticle> = await res.json();
    return data.data;
  } catch (error) {
    console.error('getArticleBySlug error:', error);
    return null;
  }
}

export async function getArticlesByCategory(categorySlug: string, limit = 20): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${API_URL}/articles?category=${categorySlug}&limit=${limit}`, { 
      cache: 'no-store' 
    });
    if (!res.ok) throw new Error('Failed to fetch articles by category');
    
    const data: ApiResponse<ArticlesResponse> = await res.json();
    return data.data.articles.map(convertToNewsArticle);
  } catch (error) {
    console.error('getArticlesByCategory error:', error);
    return [];
  }
}

// ============================================
// АНГИЛАЛУУД
// ============================================

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('Failed to fetch categories');
    
    const data: ApiResponse<Category[]> = await res.json();
    return data.data;
  } catch (error) {
    console.error('getCategories error:', error);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}`);
    if (!res.ok) throw new Error('Failed to fetch category');
    
    const data: ApiResponse<Category> = await res.json();
    return data.data;
  } catch (error) {
    console.error('getCategoryBySlug error:', error);
    return null;
  }
}

// ============================================
// СЭТГЭГДЭЛ
// ============================================

export async function getComments(articleId: number): Promise<Comment[]> {
  try {
    const res = await fetch(`${API_URL}/comments/article/${articleId}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch comments');
    
    const data: ApiResponse<{ comments: Comment[]; total: number }> = await res.json();
    return data.data.comments;
  } catch (error) {
    console.error('getComments error:', error);
    return [];
  }
}

export async function addComment(
  articleId: number,
  commentData: {
    content: string;
    user_name?: string;
    user_email?: string;
    parent_id?: number;
  },
  token?: string
): Promise<boolean> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}/comments/article/${articleId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(commentData),
    });

    return res.ok;
  } catch (error) {
    console.error('addComment error:', error);
    return false;
  }
}