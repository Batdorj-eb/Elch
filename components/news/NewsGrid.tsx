// components/news/NewsGrid.tsx
// ============================================

import React from 'react';
import NewsCard from './NewsCard';
import type { NewsArticle } from '@/lib/types';

interface NewsGridProps {
  articles: NewsArticle[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Одоогоор мэдээ байхгүй байна.
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* First Two in Grid - Single column on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 font-serif">
        {articles.slice(0, 4).map((article) => (
          <NewsCard 
            key={article.id} 
            article={article} 
            layout="vertical"
          />
        ))}
      </div>

      {/* Rest in Single Column */}
      {/* {articles.slice(2).map((article) => (
        <NewsCard 
          key={article.id} 
          article={article}
          layout="horizontal"
        />
      ))} */}
    </div>
  );
};

export default NewsGrid;