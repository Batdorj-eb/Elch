// components/news/NewsCard.tsx
// ============================================

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
  return (
    <Link href={`/article/${article.id}`}>
      <article className={`group cursor-pointer ${className}`}>
        <div className={`flex ${layout === 'vertical' ? 'flex-col' : 'flex-col sm:flex-row gap-3 sm:gap-4'}`}>
          {/* Image */}
          <div className={`relative overflow-hidden rounded-lg ${
            layout === 'vertical' 
              ? 'w-full h-[180px] sm:h-[200px] mb-3 sm:mb-4' 
              : 'w-full sm:w-[140px] lg:w-[180px] h-[180px] sm:h-[100px] lg:h-[120px] shrink-0'
          }`}>
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2 text-[11px] sm:text-xs text-zinc-600">
              <span className="text-red-500 font-medium">{article.category}</span>
              <span>•</span>
              <time>{article.timeAgo}</time>
            </div>
            
            <h3 className="text-sm sm:text-base font-semibold text-zinc-800 leading-snug group-hover:text-red-500 transition line-clamp-3">
              {article.title}
            </h3>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;