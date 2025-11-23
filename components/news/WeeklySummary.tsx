'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/lib/types';

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

  const tabs = useMemo(() => {
    return Object.keys(articlesByDay).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime(); 
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
        <div className="text-2xl font-serif font-bold text-[#2F2F2F]">
          7 хоногийн тойм
        </div>
      </div>

  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4 overflow-x-auto md:overflow-visible  /* md-аас доош scroll */">
    <div
      className="
        flex gap-2 
        pb-2 
        scrollbar-hide 
        flex-nowrap        /* жижиг дэлгэц дээр мөр солигдохгүй */
      "
    >
      {/* <button
        onClick={() => setActiveTab('Бүгд')}
        className={`px-4 py-2 text-sm rounded-full transition whitespace-nowrap border ${
          activeTab === 'Бүгд'
            ? 'bg-red-500 text-white border-[#C8C8C8]'
            : 'text-[#2F2F2F] hover:bg-neutral-200 border-[#C8C8C8]'
        }`}
      >
        Бүгд
      </button> */}

      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm rounded-full transition whitespace-nowrap border ${
            tab === activeTab
              ? 'bg-red-500 text-white border-[#C8C8C8]'
              : 'text-[#2F2F2F] hover:bg-neutral-200 border-[#C8C8C8]'
          }`}
        >
          {tab}
        </button>
      ))}

      <button className="px-4 py-2 border-[#C8C8C8] text-sm rounded-full hover:bg-neutral-200 whitespace-nowrap">
        +++
      </button>
    </div>
  </div>


    {/* Scroll Container - 7 мэдээ, харагдах хэсэгт 5 багтана */}
      <div className="overflow-y-auto h-[620px] space-y-4 pr-2">
        {displayArticles.map((article, index) => {
          const bgColor = colors[index % colors.length];
          const isOdd = index % 2 !== 0; // Сондгой дугаар эсэх
          
          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug || article.id}`}
              className="flex gap-2 cursor-pointer group"
              style={{ 
                backgroundColor: isOdd ? '#FFE4CC' : '#FFF7EF',
                padding: isOdd ? '' : '0',
              }}
            >
              {/* Image/Badge */}
              <div className={`relative w-[110px] h-[90px] md:w-[203px] md:h-[110px] shrink-0 overflow-hidden ${bgColor} flex p-2 items-center justify-center`}>
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
              
              <div className="flex-1 p-2">
                <h2 className="text-xs md:text-[17px] font-medium md:font-bold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2">
                  {article.title}
                </h2>
                <div className="flex justify-between gap-2 text-xs text-zinc-500 border-t mt-3" style={{ borderColor: '#C8C8C8' }}>
                  <span className="flex items-center gap-1 mt-3">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {(() => {
                      const now = new Date();
                      const published = new Date(article.publishedAt || '');
                      const diffMs = now.getTime() - published.getTime();
                      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                      const diffDays = Math.floor(diffHours / 24);
                      
                      if (diffDays > 0) {
                        return `${diffDays} өдрийн өмнө`;
                      } else if (diffHours > 0) {
                        return `${diffHours} цагийн өмнө`;
                      } else {
                        const diffMins = Math.floor(diffMs / (1000 * 60));
                        return `${diffMins} минутын өмнө`;
                      }
                    })()}
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