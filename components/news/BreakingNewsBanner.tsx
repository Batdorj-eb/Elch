'use client';

import React, { useState, useEffect } from 'react';
import type { NewsArticle } from '@/lib/types';
import SearchModal from '@/components/search/SearchModal';

interface BreakingNewsBannerProps {
  articles: NewsArticle[];
}

const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({ articles }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Сүүлийн 5 мэдээ авах
  const breakingArticles = articles.slice(-5).reverse(); // Шинээс хуучин руу

  // 5 секунд тутамд солих fade эффекттэй
  useEffect(() => {
    if (breakingArticles.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % breakingArticles.length
        );
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [breakingArticles.length]);

  if (!articles || articles.length === 0) {
    return null;
  }

  const currentArticle = breakingArticles[currentIndex];

  return (
    <div className="bg-[#2F2F2F] md:bg-white border-b border-stone-300">
      <div 
        className="max-w-[1325px] mx-auto py-2 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
      >
        <div className="flex justify-between items-center gap-2 md:gap-4">
          {/* Breaking News */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 overflow-hidden">
            <span className="text-[10px] sm:text-xs md:text-sm font-bold text-red-500 uppercase whitespace-nowrap">
              ШУУРХАЙ МЭДЭЭ:
            </span>
            <div className="flex-1 overflow-hidden">
              <p
                className={`text-[10px] sm:text-xs md:text-sm truncate transition-opacity duration-300 ${
                  fade ? 'opacity-100' : 'opacity-0'
                } text-white md:text-[#2F2F2F]`}
              >
                {currentArticle?.title}
              </p>
            </div>
          </div>

          {/* Search Button - Responsive */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 lg:px-4 py-1.5 md:py-2 bg-white border border-stone-300 rounded-full hover:bg-zinc-50 transition shrink-0"
            aria-label="Хайх"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
};

export default BreakingNewsBanner;