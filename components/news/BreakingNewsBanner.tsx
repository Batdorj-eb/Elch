'use client';

import React, { useState, useEffect } from 'react';
import type { NewsArticle } from '@/lib/types';

interface BreakingNewsBannerProps {
  articles: NewsArticle[];
}

const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate breaking news every 5 seconds
  useEffect(() => {
    if (articles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % articles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [articles.length]);

  if (!articles || articles.length === 0) {
    return null;
  }

  const currentArticle = articles[currentIndex];

  return (
    <div className="bg-white border-b border-stone-300">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-96 py-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold text-red-500 uppercase whitespace-nowrap">
            ШУУРХАЙ МЭДЭЭ:
          </span>
          <p className="text-sm text-zinc-800">
            {currentArticle.title}
          </p>
          {articles.length > 1 && (
            <span className="text-xs text-zinc-500 ml-auto">
              {currentIndex + 1}/{articles.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;