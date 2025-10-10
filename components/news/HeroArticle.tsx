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
    <article className="mb-10">
      <div className="relative w-full h-[400px] mb-4 overflow-hidden rounded-lg">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover hover:scale-105 transition duration-500"
          priority
        />
      </div>
      
      <div className="flex items-center gap-3 mb-3 text-sm text-zinc-600">
        <span className="text-red-500 font-medium">{data.category}</span>
        <span>•</span>
        <time>{data.timeAgo}</time>
      </div>

      <h1 className="text-3xl lg:text-4xl font-bold text-zinc-800 leading-tight hover:text-red-500 transition cursor-pointer">
        {data.title}
      </h1>
    </article>
  );
};

export default HeroArticle;