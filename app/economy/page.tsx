// app/economy/page.tsx

import React from 'react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import CategoryLayout from '@/components/category/CategoryLayout';

export default function EconomyPage() {
  const categoryFilters = ['Бүгд', 'Валютын ханш', 'Хөрөнгийн зах зээл', 'Бизнес', 'Татвар'];

  const featuredNews = [
    {
      id: 1,
      title: 'Dollar курс өсч, эдийн засагт нөлөөлж байна...',
      image: 'https://placehold.co/400x300/10b981/white?text=Economy+1',
      timeAgo: '1 цаг өмнө',
      views: 245,
      comments: 34
    },
    {
      id: 2,
      title: 'Хөрөнгийн бирж дээр шинэ рекорд бүртгэгдлээ...',
      image: 'https://placehold.co/400x300/f59e0b/white?text=Economy+2',
      timeAgo: '2 цаг өмнө',
      views: 189,
      comments: 28
    },
    {
      id: 3,
      title: 'Татварын шинэ бодлого хэрэгжиж эхэллээ...',
      image: 'https://placehold.co/400x300/3b82f6/white?text=Economy+3',
      timeAgo: '3 цаг өмнө',
      views: 156,
      comments: 19
    }
  ];

  const newsList = Array(6).fill(null).map((_, idx) => ({
    id: idx + 4,
    title: 'Эдийн засгийн шинэ төсөл хэрэгжиж эхлэх гэж байна. Энэ нь олон салбарт эерэг нөлөө үзүүлэх юм.',
    image: 'https://placehold.co/300x200/10b981/white?text=Econ+' + (idx + 1),
    timeAgo: `${idx + 4} цаг өмнө`,
    views: 120 - idx * 10,
    comments: 15 - idx
  }));

  return (
    <div className="min-h-screen bg-white">
      <header>
        <BreakingNewsBanner />
        <Header />
        <NavigationBar />
      </header>

      <CategoryLayout
        title="Эдийн засаг"
        categoryFilters={categoryFilters}
        featuredNews={featuredNews}
        newsList={newsList}
      />

      <Footer />
    </div>
  );
}