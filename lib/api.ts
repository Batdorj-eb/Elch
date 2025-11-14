import { 
  ApiResponse, 
  BackendArticle, 
  Category, 
  ArticleComment, 
  ArticlesResponse,
  convertToNewsArticle,
  NewsArticle
} from './types';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = 'http://localhost:5000/api';

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
    
    if (!res.ok) {
      console.error('Failed to fetch articles:', res.status);
      return [];
    }
    
    const data: ApiResponse<ArticlesResponse> = await res.json();
    
    // ✅ Safety check
    if (!data.data || !data.data.articles) {
      console.error('Invalid articles response:', data);
      return [];
    }
    
    return data.data.articles.map(convertToNewsArticle);
  } catch (error) {
    console.error('getArticles error:', error);
    return [];
  }
}

export async function getFeaturedArticles(): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${API_URL}/articles/featured`, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error('Failed to fetch featured articles:', res.status);
      return [];
    }
    
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
    
    if (!res.ok) {
      console.error('Failed to fetch breaking news:', res.status);
      return [];
    }
    
    const data: ApiResponse<ArticlesResponse> = await res.json();
    
    // ✅ Safety check
    if (!data.data || !data.data.articles) {
      console.error('Invalid breaking news response:', data);
      return [];
    }
    
    return data.data.articles.map(convertToNewsArticle);
  } catch (error) {
    console.error('getBreakingNews error:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<BackendArticle | null> {
  try {
    const res = await fetch(`${API_URL}/articles/${slug}`, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error('Failed to fetch article:', res.status);
      return null;
    }
    
    const data: ApiResponse<BackendArticle> = await res.json();
    
    // ✅ Safety check
    if (!data.data) {
      console.error('Invalid article response:', data);
      return null;
    }
    
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
    
    if (!res.ok) {
      console.error('Failed to fetch articles by category:', res.status);
      return [];
    }
    
    const data: ApiResponse<ArticlesResponse> = await res.json();
    
    // ✅ Safety check
    if (!data.data || !data.data.articles) {
      console.error('Invalid category articles response:', data);
      return [];
    }
    
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
    
    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status);
      return [];
    }
    
    const data = await res.json();
    let categories: Category[] = [];

    // Backend response format шалгах
    if (data.success && data.data) {
      if (Array.isArray(data.data.categories)) {
        categories = data.data.categories;
      } else if (Array.isArray(data.data)) {
        categories = data.data;
      }
    } else if (Array.isArray(data)) {
      categories = data;
    } else {
      console.error('Invalid categories response:', data);
      return [];
    }

    // 🔹 display_order-оор эрэмбэлэх, filter хийхгүй
    const sortedCategories = categories.sort((a, b) => a.display_order - b.display_order);

    // 🔹 Debug: console-д шалгах
    console.log('Fetched categories:', sortedCategories);

    return sortedCategories;

  } catch (error) {
    console.error('getCategories error:', error);
    return [];
  }
}



export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${API_URL}/categories/${slug}`);
    
    if (!res.ok) {
      console.error('Failed to fetch category:', res.status);
      return null;
    }
    
    const data: ApiResponse<Category> = await res.json();
    
    // ✅ Safety check
    if (!data.data) {
      console.error('Invalid category response:', data);
      return null;
    }
    
    return data.data;
  } catch (error) {
    console.error('getCategoryBySlug error:', error);
    return null;
  }
}

// ============================================
// СЭТГЭГДЭЛ
// ============================================

export async function getComments(articleId: number): Promise<ArticleComment[]> {
  try {
    const res = await fetch(`${API_URL}/comments/article/${articleId}`, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error('Failed to fetch comments:', res.status);
      return [];
    }
    
    const data: ApiResponse<{ comments: ArticleComment[]; total: number }> = await res.json();
    
    // ✅ Safety check
    if (!data.data || !data.data.comments) {
      console.error('Invalid comments response:', data);
      return [];
    }
    
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

// ============================================
// ХАЙЛТ
// ============================================

export async function searchArticles(query: string, options?: {
  category?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    const params = new URLSearchParams({
      q: query,
      limit: String(options?.limit || 20),
      offset: String(options?.offset || 0),
    });

    if (options?.category) {
      params.append('category', options.category);
    }

    const res = await fetch(`${API_URL}/search?${params}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Search failed');
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Search error:', error);
    return { articles: [], pagination: { total: 0 }, query };
  }
}

export async function getSearchSuggestions(query: string) {
  try {
    const res = await fetch(
      `${API_URL}/search/suggestions?q=${encodeURIComponent(query)}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Suggestions error:', error);
    return [];
  }
}

// ============================================
// BANNER
// ============================================

export interface Banner {
  id: number;
  title: string;
  type: 'vertical' | 'horizontal';
  image_url: string;
  link_url?: string;
  is_active: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export async function getBanners(type?: 'vertical' | 'horizontal'): Promise<Banner[]> {
  try {
    const url = type 
      ? `${API_URL}/banners?type=${type}`
      : `${API_URL}/banners`;
    
    const response = await fetch(url, {
      next: { revalidate: 60 } // Cache 60 секунд
    });

    if (!response.ok) {
      console.error('Failed to fetch banners:', response.status);
      return [];
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('getBanners error:', error);
    return [];
  }
}

export async function getVerticalBanners(): Promise<Banner[]> {
  return getBanners('vertical');
}

export async function getHorizontalBanners(): Promise<Banner[]> {
  return getBanners('horizontal');
}

export async function submitSubmission(data: {
  name: string;
  email?: string;
  phone?: string;
  title: string;
  content: string;
}): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (err) {
    console.error('submitSubmission error:', err);
    return false;
  }
}