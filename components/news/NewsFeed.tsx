// components/news/NewsFeed.tsx

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';
import time from '@/public/icons/time.svg';

interface NewsFeedProps {
  articles: NewsArticle[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const NewsFeed: React.FC<NewsFeedProps> = ({ articles: initialArticles }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'trending'>('new');
  
  // Шинэ мэдээ state
  const [newArticles, setNewArticles] = useState<NewsArticle[]>(initialArticles || []);
  const [offset, setOffset] = useState(initialArticles?.length || 0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Их уншсан мэдээ state
  const [trendingArticles, setTrendingArticles] = useState<NewsArticle[]>([]);
  const [trendingLoaded, setTrendingLoaded] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const LIMIT = 10;

  // Шинэ мэдээ fetch хийх
  const fetchMoreArticles = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/articles?limit=${LIMIT}&offset=${offset}`, {
        cache: 'no-store'
      });
      
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      
      if (data.success && data.data?.articles) {
        const newItems = data.data.articles.map((article: any) => convertToNewsArticle(article));
        
        if (newItems.length < LIMIT) {
          setHasMore(false);
        }
        
        setNewArticles(prev => [...prev, ...newItems]);
        setOffset(prev => prev + newItems.length);
      }
    } catch (error) {
      console.error('Fetch more articles error:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset]);

  // Их уншсан мэдээ fetch хийх
  const fetchTrendingArticles = useCallback(async () => {
    if (trendingLoaded) return;
    console.log('🔥 Fetching trending articles...'); 
    try {
      const res = await fetch(`${API_URL}/articles?limit=50&sort=views&order=DESC`, {
        cache: 'no-store'
      });
      
      if (!res.ok) throw new Error('Failed to fetch trending');
      
      const data = await res.json();
      console.log('📦 Trending data:', data);
      if (data.success && data.data?.articles) {
        const items = data.data.articles
          .map((article: any) => convertToNewsArticle(article))
          .sort((a: NewsArticle, b: NewsArticle) => (b.views || 0) - (a.views || 0));
        
        setTrendingArticles(items);
        setTrendingLoaded(true);
      }
    } catch (error) {
      console.error('Fetch trending error:', error);
      // Fallback: use initial articles sorted by views
      const sorted = [...initialArticles].sort((a, b) => (b.views || 0) - (a.views || 0));
      setTrendingArticles(sorted);
      setTrendingLoaded(true);
    }
  }, [trendingLoaded, initialArticles]);

  // Tab солиход trending fetch хийх
  useEffect(() => {
    if (activeTab === 'trending' && !trendingLoaded) {
      fetchTrendingArticles();
    }
  }, [activeTab, trendingLoaded, fetchTrendingArticles]);

  // Scroll event handler
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement || activeTab !== 'new') return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      
      // Доод хэсэгт 100px ойртоход fetch хийнэ
      if (scrollHeight - scrollTop - clientHeight < 100) {
        fetchMoreArticles();
      }
    };

    scrollElement.addEventListener('scroll', handleScroll);
    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [activeTab, fetchMoreArticles]);

  const currentNews = activeTab === 'new' ? newArticles : trendingArticles;

  if (!initialArticles || initialArticles.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span 
          className="font-serif font-bold text-[#2F2F2F]"
          style={{ fontSize: 'clamp(20px, 5vw, 30px)' }}
        >
          Мэдээний урсгал
        </span>
      </h2>

      <div className="flex gap-0 mb-4">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition ${
            activeTab === 'new'
              ? 'bg-red-500 text-white'
              : 'bg-neutral-200 text-zinc-700 hover:bg-neutral-300'
          }`}
        >
          Шинэ мэдээ
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition ${
            activeTab === 'trending'
              ? 'bg-red-500 text-white'
              : 'bg-neutral-200 text-zinc-700 hover:bg-neutral-300'
          }`}
        >
          Их уншсан
        </button>
      </div>

      <div>
        <div 
          ref={scrollRef}
          className="max-h-[610px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100"
        >
          <div className="space-y-4">
            {currentNews.map((item, index) => (
              <div key={`${item.id}-${index}`}>
                <Link href={`/articles/${item.slug || item.id}`}>
                  <article className="cursor-pointer group flex gap-3">
                    {/* Article Image */}
                    {item.coverImage && (
                      <div className="relative w-24 h-20 sm:w-28 sm:h-24 flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 96px, 120px"
                        />
                      </div>
                    )}

                    {/* Article Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h3 className="font-sans text-sm font-medium text-[#2F2F2F] leading-snug group-hover:text-red-500 transition mb-2 line-clamp-3">
                        {item.title}
                      </h3>

                      <div className="flex justify-between gap-2 text-xs text-zinc-500 font-sans">
                        <span className="font-bold text-[#2F2F2F] border-[#C8C8C8] inline-block">
                          {item.category}
                        </span>
                        <time 
                          className="text-zinc-600 flex items-center gap-1"
                          style={{ fontSize: '12px', paddingRight:'10px' }}
                        >
                          <Image src={time} alt="" width={14} height={14} />
                          {item.timeAgo}
                        </time>
                      </div>
                    </div>
                  </article>
                </Link>
                
                {index < currentNews.length - 1 && (
                  <div className="h-px bg-neutral-200 mt-4" />
                )}
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && activeTab === 'new' && (
              <div className="py-4 text-center text-sm text-zinc-500">
                Ачаалж байна...
              </div>
            )}
            
            {/* No more articles */}
            {!hasMore && activeTab === 'new' && (
              <div className="py-4 text-center text-sm text-zinc-400">
                Бүх мэдээг ачааллаа
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to convert backend article
function convertToNewsArticle(backendArticle: any): NewsArticle {
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
    length: backendArticle.content?.length || 0,
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

export default NewsFeed;