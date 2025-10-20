// components/news/NewsGrid.tsx
// ============================================

import React from 'react';
import NewsCard from './NewsCard';
import type { NewsArticle } from '@/lib/types';

const NewsGrid: React.FC = () => {
  const featuredNews: NewsArticle[] = [
    {
      id: '2',
      title: 'Trump asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      category: 'Дэлхийд',
      imageUrl: 'https://placehold.co/400x300/ef4444/white?text=News+1',
      timeAgo: '2 цаг 30 минутын өмнө'
    },
    {
      id: '3',
      title: 'Dollar asinvenderum intureius que quas et aspelit volo dolor autaspe world...',
      category: 'Эдийн засаг',
      imageUrl: 'https://placehold.co/400x300/10b981/white?text=News+2',
      timeAgo: '2 цаг 30 минутын өмнө'
    },
    {
      id: '4',
      title: 'Trump asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      category: 'Сурвалжлага',
      imageUrl: 'https://placehold.co/400x300/8b5cf6/white?text=News+3',
      timeAgo: '2 цаг 30 минутын өмнө'
    },
    {
      id: '5',
      title: 'Mongolia asinvenderum intureius que quas et aspelit volo dolor autaspe world...',
      category: 'Улс төр',
      imageUrl: 'https://placehold.co/400x300/f59e0b/white?text=News+4',
      timeAgo: '2 цаг 30 минутын өмнө'
    }
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* First Two in Grid - Single column on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {featuredNews.slice(0, 4).map((article) => (
          <NewsCard 
            key={article.id} 
            article={article} 
            layout="vertical"
          />
        ))}
      </div>

      {/* Rest in Single Column */}
      {/* {featuredNews.slice(2).map((article) => (
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