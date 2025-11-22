// components/news/HeroArticle.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';
import time from '@/public/icons/time.svg'

interface HeroArticleProps {
  article: NewsArticle;
}

const HeroArticle: React.FC<HeroArticleProps> = ({ article }) => {
  return (
    <Link href={`/articles/${article.slug || article.id}`}>
      <article className="overflow-hidden group">
        {/* Image */}
        <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px]">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            priority
          />
        </div>
        
        {/* Content Box */}
        <div className="bg-[#FFE4CC] p-4 sm:p-6 lg:p-8">
          {/* Title */}
          <h1 
            className="font-serif font-bold text-[#2F2F2F] leading-tight group-hover:text-red-500 transition cursor-pointer mb-3 lg:mb-4 uppercase"
            style={{ fontSize: 'clamp(20px, 4vw, 30px)' }}
          >
            {article.title}
          </h1>

          {/* Excerpt (optional) */}
          {article.description && (
            <p 
              className="text-[#2F2F2F] mb-3 lg:mb-4 line-clamp-2"
              style={{ fontSize: 'clamp(14px, 2vw, 16px)' }}
            >
              {article.description}
            </p>
          )}
          
          {/* Meta Info */}
          <div className="flex justify-between gap-2 text-zinc-600 border-t pt-3" style={{ borderColor: '#5D5D5D' }}>
            <span 
              className="font-bold text-[#2F2F2F] group-hover:text-red-500 transition"
              style={{ fontSize: '15px' }}
            >
              {article.category}
            </span>
            <time 
              className="text-zinc-600 flex items-center gap-1"
              style={{ fontSize: '12px' }}
            >
              <Image src={time} alt="" width={14} height={14} />
              {article.timeAgo}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default HeroArticle;