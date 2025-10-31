'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';

interface WeeklySummaryProps {
  articles: NewsArticle[];
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ articles }) => {
  const [activeTab, setActiveTab] = useState('Бүгд');

  // 🔥 Сүүлийн 7 хоногийн мэдээнүүд
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentArticles = useMemo(() => {
    return articles.filter(article => {
      const publishedDate = new Date(article.publishedAt || 0);
      return publishedDate >= sevenDaysAgo;
    });
  }, [articles]);

  // 🔥 Категори бүрээс хамгийн сүүлийн мэдээг авах
  const latestByCategory = useMemo(() => {
    const categoryMap = recentArticles.reduce((acc, article) => {
      const category = article.category;
      
      if (!acc[category]) {
        acc[category] = article;
      } else {
        const existingDate = new Date(acc[category].publishedAt || 0);
        const currentDate = new Date(article.publishedAt || 0);
        
        if (currentDate > existingDate) {
          acc[category] = article;
        }
      }
      
      return acc;
    }, {} as Record<string, NewsArticle>);

    return Object.entries(categoryMap);
  }, [recentArticles]);

  // 🔥 Өдрөөр мэдээг бүлэглэх (Tab-д ашиглах)
  const articlesByDay = useMemo(() => {
    const grouped: Record<string, NewsArticle[]> = {};

    recentArticles.forEach(article => {
      const date = new Date(article.publishedAt || 0);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateKey = `${year}.${month}.${day}`;
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(article);
    });

    return grouped;
  }, [recentArticles]);

  // 🔥 Tabs - Мэдээ байгаа өдрүүд (огноогоор эрэмбэлэх)
  const tabs = useMemo(() => {
    return Object.keys(articlesByDay).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime(); // Шинээс хуучин руу
    });
  }, [articlesByDay]);

  // 🔥 Харуулах мэдээнүүд
  const displayArticles = useMemo(() => {
    if (activeTab === 'Бүгд') {
      // Категори бүрээс хамгийн сүүлийнх
      return latestByCategory.map(([_, article]) => article);
    } else {
      // Тухайн өдрийн мэдээнүүд
      return articlesByDay[activeTab] || [];
    }
  }, [activeTab, latestByCategory, articlesByDay]);

  // 🎨 Өнгийн палитр
  const colors = [
    'bg-green-500',
    'bg-blue-500', 
    'bg-yellow-500',
    'bg-orange-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-teal-500'
  ];

  if (latestByCategory.length === 0) {
    return null;
  }

  return (
    <section className="my-10">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <div className="text-2xl font-bold text-[#2F2F2F]">
          7 хоногийн тойм
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab('Бүгд')}
            className={`px-4 py-2 text-sm rounded-full transition whitespace-nowrap ${
              activeTab === 'Бүгд'
                ? 'bg-red-500 text-white' 
                : 'bg-neutral-100 text-[#2F2F2F] hover:bg-neutral-200'
            }`}
          >
            Бүгд
          </button>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-full transition whitespace-nowrap ${
                tab === activeTab
                  ? 'bg-red-500 text-white' 
                  : 'bg-neutral-100 text-[#2F2F2F] hover:bg-neutral-200'
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="px-4 py-2 text-sm bg-neutral-100 rounded-full hover:bg-neutral-200 whitespace-nowrap">
            +++
          </button>
        </div>
      </div>

      {/* Scroll Container - 7 мэдээ, харагдах хэсэгт 5 багтана */}
      <div className="overflow-y-auto h-[530px] space-y-4 pr-2">
        {displayArticles.map((article, index) => {
          const bgColor = colors[index % colors.length];
          
          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug || article.id}`}
              className="flex gap-4 cursor-pointer group"
            >
              {/* Image/Badge */}
              <div className={`relative w-[120px] h-[80px] shrink-0 rounded-lg overflow-hidden ${bgColor} flex items-center justify-center`}>
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">
                    Weekly {index + 1}
                  </span>
                )}
              </div>
              
              <div className="flex-1">
                <span className="text-xs text-red-500 font-medium">
                  {article.category} {(() => {
                    const date = new Date(article.publishedAt || '');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    return `${month}/${day}`;
                  })()}
                </span>
                <h3 className="text-sm font-medium text-[#2F2F2F] mt-1 leading-snug group-hover:text-red-500 transition line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {article.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    0
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default WeeklySummary;