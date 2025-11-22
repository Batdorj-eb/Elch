// components/article/RelatedNews.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';
import time from '@/public/icons/time.svg'

interface RelatedNewsProps {
  articles: NewsArticle[];
}

const RelatedNews: React.FC<RelatedNewsProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
      {articles.slice(0, 3).map((article) => (
        <Link 
          key={article.id}
          href={`/articles/${article.id}`}
          className="group"
        >
          <article className="overflow-hidden transition-all duration-300">
            {/* Image */}
            <div className="relative w-full h-[210px]">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className='pt-2'>
              <span className="text-xs font-bold text-red-500 mb-2 block">
                {article.category}
              </span>
              <h3 className="text-sm font-bold text-[#2F2F2F] line-clamp-2 group-hover:text-red-500 transition leading-snug">
                {article.title}
              </h3>
              <time 
                  className="text-zinc-600 flex items-center mt-3 gap-1 border-y py-2 border-[#c8c8c8]"
                  style={{ fontSize: '12px' }}
                >
                <Image src={time} alt="" width={14} height={14} />
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