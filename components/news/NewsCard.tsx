// components/news/NewsCard.tsx
// ============================================
'use client'; // 🔥 FIX: Make this a Client Component

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';

interface NewsCardProps {
  article: NewsArticle;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ 
  article, 
  layout = 'horizontal',
  className = '' 
}) => {
  // 🔥 FIX: Handle missing or invalid cover images
  const getImageUrl = (): string => {
    // Use imageUrl (primary) or coverImage (backup)
    const url = article.imageUrl || article.coverImage;
    
    // Check if url exists and is a valid string
    if (
      !url || 
      typeof url !== 'string' ||
      url.startsWith('blob:')
    ) {
      return 'https://placehold.co/800x450/e5e5e5/666666?text=ELCH+NEWS';
    }
    return url;
  };

  // 🔥 FIX: Format time ago
  const getTimeAgo = () => {
    if (!article.publishedAt) return 'Саяхан';
    
    const now = new Date();
    const published = new Date(article.publishedAt);
    const diffMs = now.getTime() - published.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} минутын өмнө`;
    if (diffHours < 24) return `${diffHours} цагийн өмнө`;
    if (diffDays < 7) return `${diffDays} өдрийн өмнө`;
    
    return published.toLocaleDateString('mn-MN', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Link href={`/article/${article.slug}`}>
      <article className={`group cursor-pointer ${className}`}>
        <div className={`flex font-serif ${layout === 'vertical' ? 'flex-col' : 'flex-col sm:flex-row gap-3 sm:gap-4'}`}>
          {/* Image */}
          <div className={`relative overflow-hidden ${
            layout === 'vertical' 
              ? 'w-full h-[180px] sm:h-[200px] mb-3 sm:mb-4' 
              : 'w-full sm:w-[140px] lg:w-[180px] h-[180px] sm:h-[100px] lg:h-[120px] shrink-0'
          }`}>
            <Image
              src={getImageUrl()}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
              onError={(e) => {
                // 🔥 FIX: Fallback on error
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/800x450/e5e5e5/666666?text=ELCH+NEWS';
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-serif font-semibold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-3">
              {article.title}
            </h3>
            <div className="flex justify-between gap-2 mt-1.5 sm:mb-2 text-[11px] sm:text-xs text-zinc-600 font-sans">
              <span className="font-medium">{article.category}</span>
              <time className="flex items-center gap-1">
                <Image 
                  src="/Vector.png" 
                  alt="clock icon" 
                  width={12} 
                  height={12}
                />
                {getTimeAgo()}
              </time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;