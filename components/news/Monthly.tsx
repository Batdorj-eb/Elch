'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/lib/types';

interface MonthlySummaryProps {
  articles: NewsArticle[];
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ articles }) => {
  const [activeTab, setActiveTab] = useState('Бүгд');

  // 🔥 Сүүлийн 1 жилийн мэдээнүүд
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const recentArticles = useMemo(() => {
    return articles.filter(article => {
      const publishedDate = new Date(article.publishedAt || 0);
      return publishedDate >= oneYearAgo;
    });
  }, [articles]);

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

  // 🔥 Сар бүрээр бүлэглэх (YYYY.MM format)
  const articlesByMonth = useMemo(() => {
    const grouped: Record<string, NewsArticle[]> = {};

    recentArticles.forEach(article => {
      const date = new Date(article.publishedAt || 0);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const monthKey = `${year}.${month}`;

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(article);
    });

    return grouped;
  }, [recentArticles]);

  // 🔥 Tabs - сүүлээс эхэлж эрэмбэлэх
  const tabs = useMemo(() => {
    return Object.keys(articlesByMonth).sort((a, b) => {
      return new Date(b + '.01').getTime() - new Date(a + '.01').getTime();
    });
  }, [articlesByMonth]);

  // 🔥 Харуулах мэдээнүүд
  const displayArticles = useMemo(() => {
    if (activeTab === 'Бүгд') {
      return latestByCategory.map(([_, article]) => article);
    } else {
      return articlesByMonth[activeTab] || [];
    }
  }, [activeTab, latestByCategory, articlesByMonth]);

  const colors = [
    'bg-green-500',
    'bg-blue-500', 
    'bg-yellow-500',
    'bg-orange-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-teal-500'
  ];

  if (latestByCategory.length === 0) return null;

  return (
    <section className="my-10">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
         <button
            onClick={() => setActiveTab('Бүгд')}
            className={`px-4 py-2 text-sm rounded-full transition whitespace-nowrap border ${
              activeTab === 'Бүгд'
                ? 'bg-red-500 text-white border-[#C8C8C8]'
                : 'text-[#2F2F2F] hover:bg-neutral-200 border-[#C8C8C8]'
            }`}
          >
            Бүгд
          </button>
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
      </div>

      {/* Articles */}
      <div className="overflow-y-auto h-[1043px] space-y-4 pr-2">
        {displayArticles.map((article, index) => {
          const bgColor = colors[index % colors.length];
          const isOdd = index % 2 !== 0;

          return (
            <Link
              key={article.id}
              href={`/articles/${article.slug || article.id}`}
              className="flex gap-4 cursor-pointer group"
              style={{ 
                backgroundColor: isOdd ? '#FFE4CC' : '#FFF7EF',
                padding: isOdd ? '' : '0',
              }}
            >
              <div className={`relative w-[203px] h-[110px] shrink-0 overflow-hidden ${bgColor} flex p-2 items-center justify-center`}>
                {article.coverImage ? (
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <span className="text-white font-bold text-lg">Monthly {index + 1}</span>
                )}
              </div>
              <div className="flex-1 p-2">
                <h2 className="text-md font-medium text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2">
                  {article.title}
                </h2>
                <div className="flex justify-between gap-2 text-xs text-zinc-500 border-t mt-3" style={{ borderColor: '#C8C8C8' }}>
                  <span className="flex items-center gap-1 mt-3">
                    {(() => {
                      const now = new Date();
                      const published = new Date(article.publishedAt || '');
                      const diffMs = now.getTime() - published.getTime();
                      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                      const diffDays = Math.floor(diffHours / 24);
                      if (diffDays > 0) return `${diffDays} өдрийн өмнө`;
                      if (diffHours > 0) return `${diffHours} цагийн өмнө`;
                      const diffMins = Math.floor(diffMs / (1000 * 60));
                      return `${diffMins} минутын өмнө`;
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

export default MonthlySummary;
