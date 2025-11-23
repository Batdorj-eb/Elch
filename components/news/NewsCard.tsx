// components/news/NewsCard.tsx
'use client';

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import time from '@/public/icons/time.svg'

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
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!article.publishedAt) {
      setTimeAgo('Саяхан');
      return;
    }

    const now = new Date();
    const published = new Date(article.publishedAt);
    const diffMs = now.getTime() - published.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) setTimeAgo(`${diffMins} минутын өмнө`);
    else if (diffHours < 24) setTimeAgo(`${diffHours} цагийн өмнө`);
    else if (diffDays < 7) setTimeAgo(`${diffDays} өдрийн өмнө`);
    else setTimeAgo(formatDate(article.publishedAt));
  }, [article.publishedAt]);

  const getImageUrl = (): string => {
    const url = article.imageUrl || article.coverImage;
    if (!url || typeof url !== 'string' || url.startsWith('blob:')) {
      return 'https://placehold.co/800x450.png?text=ELCH+NEWS';
    }
    return url;
  };

  return (
    <Link href={`/articles/${article.slug}`}>
      <article className={`group cursor-pointer ${className}`}>
        <div className={`flex font-serif ${layout === 'vertical' ? 'flex-col' : 'flex-col sm:flex-row gap-3 sm:gap-4'}`}>
          <div className={`relative overflow-hidden ${
            layout === 'vertical' 
              ? 'w-full h-[210px] mb-3 sm:mb-4' 
              : 'w-full sm:w-[140px] lg:w-[180px] h-[180px] sm:h-[100px] lg:h-[120px] shrink-0'
          }`}>
            <Image
              src={getImageUrl()}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/800x450/e5e5e5/666666?text=ELCH+NEWS';
              }}
            />
          </div>

          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-serif font-bold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2 uppercase">
              {article.title}
            </h3>

            <div className="flex justify-between gap-2 mt-1.5 sm:mb-2 text-[11px] sm:text-xs text-zinc-600 font-sans py-2 border-t border-b border-[#C8C8C8] inline-block">
              <span className="font-medium">{article.category}</span>
              <time 
                  className="text-zinc-600 flex items-center gap-1"
                  style={{ fontSize: '12px' }}
                >
                <Image src={time} alt="" width={14} height={14} />
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
