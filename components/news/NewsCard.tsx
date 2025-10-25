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
        <div className={`flex font-serif ${layout === 'vertical' ? 'flex-col' : 'flex-col sm:flex-row gap-3 sm:gap-4'}`}>
          {/* Image */}
          <div className={`relative overflow-hidden ${
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
                {article.timeAgo}
              </time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;