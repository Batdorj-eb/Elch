import React from 'react';
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
    <article className={`group cursor-pointer ${className}`}>
      <div className={`flex ${layout === 'vertical' ? 'flex-col' : 'gap-4'}`}>
        {/* Image */}
        <div className={`relative overflow-hidden rounded-lg ${
          layout === 'vertical' ? 'w-full h-[200px] mb-4' : 'w-[180px] h-[120px] shrink-0'
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
          <div className="flex items-center gap-2 mb-2 text-xs text-zinc-600">
            <span className="text-red-500 font-medium">{article.category}</span>
            <span>•</span>
            <time>{article.timeAgo}</time>
          </div>
          
          <h3 className="text-base font-semibold text-zinc-800 leading-snug group-hover:text-red-500 transition line-clamp-3">
            {article.title}
          </h3>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;