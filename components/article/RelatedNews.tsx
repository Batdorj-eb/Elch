// components/article/RelatedNews.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';

interface RelatedNewsProps {
  articles: NewsArticle[];
}

const RelatedNews: React.FC<RelatedNewsProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
      {articles.slice(0, 3).map((article) => (
        <Link 
          key={article.id}
          href={`/articles/${article.id}`}
          className="group"
        >
          <article className="border border-neutral-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Image */}
            <div className="relative w-full h-[180px]">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <span className="text-xs font-bold text-red-500 mb-2 block">
                {article.category}
              </span>
              <h3 className="text-sm font-bold text-[#2F2F2F] line-clamp-2 group-hover:text-red-500 transition leading-snug">
                {article.title}
              </h3>
              <time className="text-xs text-zinc-500 mt-2 block">
                {article.timeAgo}
              </time>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default RelatedNews;