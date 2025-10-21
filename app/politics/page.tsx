// app/politics/page.tsx

import React from 'react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import CategoryLayout from '@/components/category/CategoryLayout';

export default function PoliticsPage() {
  const categoryFilters = ['Бүгд', 'Спорт 2028', 'Нүүрсний хүчил', 'Ногоон автобус'];

  const featuredNews = [
    {
      id: 1,
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      image: 'https://placehold.co/400x300/ef4444/white?text=Politics+1',
      timeAgo: '2 цаг 30 минутын өмнө',
      views: 16,
      comments: 22
    },
    {
      id: 2,
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      image: 'https://placehold.co/400x300/3b82f6/white?text=Politics+2',
      timeAgo: '2 цаг 30 минутын өмнө',
      views: 15,
      comments: 23
    },
    {
      id: 3,
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      image: 'https://placehold.co/400x300/10b981/white?text=Politics+3',
      timeAgo: '2 цаг 30 минутын өмнө',
      views: 16,
      comments: 22
    }
  ];

  const newsList = Array(6).fill(null).map((_, idx) => ({
    id: idx + 4,
    title: 'Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit.',
    image: 'https://placehold.co/300x200/8b5cf6/white?text=News+' + (idx + 1),
    timeAgo: '2 цаг 30 минутын өмнө',
    views: 16,
    comments: 22
  }));

  return (
    <div className="min-h-screen bg-white">
      <header>
        <BreakingNewsBanner />
        <Header />
        <NavigationBar />
      </header>

      <CategoryLayout
        title="Үлс төр"
        categoryFilters={categoryFilters}
        featuredNews={featuredNews}
        newsList={newsList}
      />

      <Footer />
    </div>
  );
}