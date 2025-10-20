// components/news/HeroArticle.tsx
// ============================================

import React from 'react';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';

interface HeroArticleProps {
  article?: NewsArticle;
}

const HeroArticle: React.FC<HeroArticleProps> = ({ article }) => {
  const defaultArticle: NewsArticle = {
    id: '1',
    title: 'Pudam iuntur aut alite ahonror het aspelit volo dolor auta liguam dolessit aspelit volo dolor',
    category: 'Улс төр',
    imageUrl: 'https://placehold.co/800x400/3b82f6/white?text=Hero+Article',
    timeAgo: '2 цаг 30 минутын өмнө',
    featured: true
  };

  const data = article || defaultArticle;

  return (
    <article className="mb-10 border border-neutral-200 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px]">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Content Box */}
      <div className="bg-[#FFE4CC] p-4 sm:p-6 lg:p-8">
        {/* Title */}
        <h1 
          className="font-bold text-zinc-800 leading-tight hover:text-red-500 transition cursor-pointer mb-3 lg:mb-4"
          style={{ fontSize: 'clamp(20px, 4vw, 30px)' }}
        >
          {data.title}
        </h1>
        
        {/* Meta Info */}
        <div className="flex items-center gap-2 text-zinc-600">
          <span 
            className="font-medium text-zinc-800"
            style={{ fontSize: '15px' }}
          >
            {data.category}
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
            {data.timeAgo}
          </time>
        </div>
      </div>
    </article>
  );
};

export default HeroArticle;