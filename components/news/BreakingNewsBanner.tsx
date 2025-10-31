'use client';

import React from 'react';
import type { NewsArticle } from '@/lib/types';

interface BreakingNewsBannerProps {
  articles: NewsArticle[];
}

const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  const latestArticle = articles[articles.length - 1];

  return (
      <div className="bg-white border-b border-stone-300 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-bold text-red-500 uppercase whitespace-nowrap">
            ШУУРХАЙ МЭДЭЭ:
          </span>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs sm:text-sm text-[#2F2F2F] whitespace-nowrap animate-marquee">
               {latestArticle.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;
