'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import NewsFeed from '@/components/news/NewsFeed';
import Advertisement from '@/components/common/Advertisement';
import { Eye, MessageCircle } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  image: string;
  timeAgo: string;
  views: number;
  comments: number;
}

interface CategoryLayoutProps {
  title: string;
  categoryFilters?: string[];
  featuredNews: NewsItem[];
  newsList: NewsItem[];
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  title,
  categoryFilters = ['Бүгд'],
  featuredNews,
  newsList
}) => {
  const [activeFilter, setActiveFilter] = useState('Бүгд');
  const [activeTimeFilter, setActiveTimeFilter] = useState('Бүгд');

  const timeFilters = ['Бүгд', 'Өнөөдөр', 'Өчигдөр', '7-р сар', '8-р сар', '9-р сар', '4-р сар', '+++'];

  return (
    <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-6 lg:py-10">
      {/* Page Title */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-zinc-800 inline-block relative">
          {title}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500 transform translate-y-2" />
        </h1>
      </div>

      {/* Category Filters */}
      {categoryFilters.length > 1 && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide border-b border-neutral-200">
          {categoryFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm whitespace-nowrap transition ${
                activeFilter === filter
                  ? 'text-red-500 font-medium border-b-2 border-red-500'
                  : 'text-zinc-600 hover:text-zinc-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Main Content */}
        <div className="flex-1">
          {/* Featured News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10">
            {featuredNews.map((news) => (
              <article key={news.id} className="group cursor-pointer">
                <div className="relative w-full h-[200px] lg:h-[220px] mb-3 overflow-hidden rounded-lg">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-sm lg:text-base font-semibold text-zinc-800 leading-snug group-hover:text-red-500 transition mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>{news.timeAgo}</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{news.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>{news.comments}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Advertisement */}
          <Advertisement
            imageUrl="https://placehold.co/800x200/10b981/white?text=Advertisement"
            className="mb-8 lg:mb-10"
          />

          {/* Time Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {timeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTimeFilter(filter)}
                className={`px-3 lg:px-4 py-2 text-xs lg:text-sm rounded-full whitespace-nowrap transition ${
                  activeTimeFilter === filter
                    ? 'bg-red-500 text-white'
                    : 'bg-neutral-100 text-zinc-700 hover:bg-neutral-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* News List */}
          <div className="space-y-4 lg:space-y-6">
            {newsList.map((news) => (
              <article 
                key={news.id} 
                className="flex gap-3 lg:gap-4 group cursor-pointer pb-4 lg:pb-6 border-b border-neutral-100 last:border-0"
              >
                <div className="relative w-[120px] h-[80px] lg:w-[180px] lg:h-[120px] shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-lg font-semibold text-zinc-800 leading-snug group-hover:text-red-500 transition mb-2 line-clamp-2 lg:line-clamp-3">
                    {news.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs lg:text-sm text-zinc-500">
                    <span>{news.timeAgo}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>{news.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span>{news.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <button className="w-full mt-6 lg:mt-8 px-6 py-3 text-sm lg:text-base bg-red-500 text-white font-medium rounded hover:bg-red-600 transition">
            Цааш үзэх
          </button>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[367px]">
          <NewsFeed />
          
          <Advertisement
            imageUrl="https://placehold.co/400x600/f43f5e/white?text=Fashion+Sale"
            isVertical
            className="my-8 lg:my-10"
          />
        </aside>
      </div>
    </main>
  );
};

export default CategoryLayout;