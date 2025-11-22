// components/news/NewsGrid.tsx

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
    <div className="space-y-4 lg:space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-serif">
        {articles.slice(0, 4).map((article) => (
          <NewsCard 
            key={article.id} 
            article={article} 
            layout="vertical"
          />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;