// components/news/SourcesSection.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import type { NewsArticle } from '@/lib/types';

interface SourcesSectionProps {
  articles: NewsArticle[];
}

const SourcesSection: React.FC<SourcesSectionProps> = ({ articles }) => {
  // 🔥 "Сурвалжлага" (slug: video) категорийн мэдээнүүд
  const videoArticles = articles.filter(article => 
    article.categorySlug === 'video' || 
    article.category === 'Сурвалжлага'
  ).slice(0, 3); // Эхний 3-ийг авах

  if (videoArticles.length === 0) {
    return null;
  }

  const buildArticleHref = (slug?: string | null, id?: string | number) => {
    const value = slug || String(id || '');
    if (!value) return '/articles';
    const normalized = value.startsWith('/') ? value.slice(1) : value; // remove leading slash
    // if slug already contains 'articles/' don't prefix again
    if (normalized.startsWith('articles/')) return `/${normalized}`;
    return `/articles/${normalized}`;
  };

  // 🔥 Цагийн форматчлуур
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffMs = now.getTime() - published.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} өдрийн өмнө`;
    if (diffHours > 0) return `${diffHours} цагийн өмнө`;
    if (diffMins > 0) return `${diffMins} минутын өмнө`;
    return 'Саяхан';
  };

  return (
    <section className="my-8 lg:my-10">
      <h2 className="flex items-center gap-3 lg:gap-4 mb-6">
        <div className="w-[5px] lg:w-[7px] h-[18px] lg:h-[22px] bg-red-500" />
        <span className="text-xl lg:text-2xl font-bold text-[#2F2F2F]">
          Сурвалжлага
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {videoArticles.map((article) => (
          <Link
            key={article.id}
            href={buildArticleHref(article.slug, article.id)}
            className="group cursor-pointer"
          >
            <div className="relative w-full h-[180px] lg:h-[200px] mb-3 lg:mb-4 overflow-hidden rounded-lg">
              {article.coverImage ? (
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" fill="currentColor" />
                </div>
              )}
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 lg:w-6 lg:h-6 text-red-500 ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            <h3 className="text-xs lg:text-lg font-bold text-[#2F2F2F] mt-1.5 lg:mt-2 leading-snug group-hover:text-red-500 transition line-clamp-2">
              {article.title}
            </h3>

            {/* Meta Info */}
            <div className="flex justify-between gap-2 text-zinc-600 mt-2 border-t border-b py-1.5" style={{ borderColor: '#C8C8C8' }}>
              <span 
                className="font-medium text-[#2F2F2F]"
                style={{ fontSize: '12px' }}
              >
                {article.category}
              </span>
              <svg 
                width="4" 
                height="4" 
                viewBox="0 0 4 4" 
                fill="currentColor"
                className="text-zinc-400"
              >
                <circle cx="2" cy="2" r="2" />
              </svg>
              <time 
                className="text-zinc-600"
                style={{ fontSize: '12px' }}
              >
                {getTimeAgo(article.publishedAt || '')}
              </time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SourcesSection;
