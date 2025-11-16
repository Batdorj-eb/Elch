// components/news/NewsFeed.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsArticle } from '@/lib/types';
import time from '@/public/icons/time.svg'

interface NewsFeedProps {
  articles: NewsArticle[];
}

const NewsFeed: React.FC<NewsFeedProps> = ({ articles }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'trending'>('new');

  const newNews = articles || [];
  
  const trendingNews = [...articles].sort((a, b) => {
    const viewsA = a.views || 0;
    const viewsB = b.views || 0;
    return viewsB - viewsA;
  });

  const currentNews = activeTab === 'new' ? newNews : trendingNews;

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span 
          className="font-serif font-bold text-[#2F2F2F]"
          style={{ fontSize: 'clamp(20px, 5vw, 30px)' }}
        >
          Мэдээний урсгал
        </span>
      </h2>

      <div className="flex gap-0 mb-4">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition ${
            activeTab === 'new'
              ? 'bg-red-500 text-white'
              : 'bg-neutral-200 text-zinc-700 hover:bg-neutral-300'
          }`}
        >
          Шинэ мэдээ
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition ${
            activeTab === 'trending'
              ? 'bg-red-500 text-white'
              : 'bg-neutral-200 text-zinc-700 hover:bg-neutral-300'
          }`}
        >
          Их уншсан
        </button>
      </div>

      <div>
        <div className="max-h-[610px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
          <div className="space-y-4">
            {currentNews.map((item, index) => (
              <div key={item.id}>
                <Link href={`/articles/${item.slug || item.id}`}>
                  <article className="cursor-pointer group flex gap-3">
                    {/* Article Image */}
                    {item.coverImage && (
                      <div className="relative w-24 h-20 sm:w-28 sm:h-24 flex-shrink-0 overflow-hidden border border-neutral-200">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 96px, 120px"
                        />
                      </div>
                    )}

                    {/* Article Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <h3 className="font-sans text-sm font-medium text-[#2F2F2F] leading-snug group-hover:text-red-500 transition mb-2 line-clamp-3">
                      {item.title}
                    </h3>

                    <div className="flex justify-between gap-2 text-xs text-zinc-500 font-sans">
                      <span className="font-bold text-[#2F2F2F] border-[#C8C8C8] inline-block">
                        {item.category}
                      </span>
                    <time 
                        className="text-zinc-600 flex items-center gap-1"
                        style={{ fontSize: '12px', paddingRight:'10px' }}
                      >
                      <Image src={time} alt="" width={14} height={14} />
                      {item.timeAgo}
                    </time>
                    </div>
                  </div>

                  </article>
                </Link>
                
                {index < currentNews.length - 1 && (
                  <div className="h-px bg-neutral-200 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;