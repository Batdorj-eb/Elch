'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/lib/types';

interface MonthlySummaryProps {
  articles: NewsArticle[];
  categorySlug?: string; 
  categoryName?: string; 
}

const MonthlySummary: React.FC<MonthlySummaryProps> = ({ 
  articles, 
  categorySlug,
  categoryName 
}) => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Recent articles filter
  const recentArticles = useMemo(() => {
    return articles.filter(article => {
      const publishedDate = new Date(article.publishedAt || 0);
      const isRecent = publishedDate >= oneYearAgo;
      
      if (categorySlug) {
        return isRecent && article.categorySlug === categorySlug;
      }
      
      return isRecent;
    });
  }, [articles, categorySlug, oneYearAgo]);

  // Сар бүрээр бүлэглэх
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

    // Сар бүрийн мэдээг огноогоор эрэмбэлэх
    Object.keys(grouped).forEach(monthKey => {
      grouped[monthKey].sort((a, b) => {
        return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
      });
    });

    return grouped;
  }, [recentArticles]);

  // Tabs - сүүлийн сараас эхлэх
  const tabs = useMemo(() => {
    return Object.keys(articlesByMonth).sort((a, b) => {
      return new Date(b + '.01').getTime() - new Date(a + '.01').getTime();
    });
  }, [articlesByMonth]);

  // ✅ Default - хамгийн сүүлийн сар
  const [activeTab, setActiveTab] = useState(tabs[0] || '');

  // Display articles - зөвхөн тухайн сарын мэдээ
  const displayArticles = useMemo(() => {
    return articlesByMonth[activeTab] || [];
  }, [activeTab, articlesByMonth]);

  const colors = [
    'bg-green-500',
    'bg-blue-500', 
    'bg-yellow-500',
    'bg-orange-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-teal-500'
  ];

  // Хэрэв мэдээ байхгүй бол
  if (recentArticles.length === 0) {
    return (
      <section className="my-10 p-6 bg-white rounded-lg text-center">
        <p className="text-gray-600">
          {categoryName 
            ? `"${categoryName}" ангилалд мэдээ байхгүй байна`
            : 'Мэдээ байхгүй байна'
          }
        </p>
      </section>
    );
  }

  return (
    <section className="my-10">
      {/* Category title */}
      {categoryName && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-[#2F2F2F]">
            {categoryName} - Сарын хураангуй
          </h2>
        </div>
      )}

      {/* ✅ Зөвхөн сарын tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm rounded-full transition whitespace-nowrap border ${
              tab === activeTab
                ? 'bg-red-500 text-white border-red-500'
                : 'text-[#2F2F2F] hover:bg-neutral-200 border-[#C8C8C8]'
            }`}
          >
            {tab} ({articlesByMonth[tab]?.length || 0})
          </button>
        ))}
      </div>

      {/* Articles list */}
      <div className="overflow-y-auto h-[1043px] space-y-4 pr-2">
        {displayArticles.length > 0 ? (
          displayArticles.map((article, index) => {
            const bgColor = colors[index % colors.length];
            const isOdd = index % 2 !== 0;

            return (
              <Link
                key={article.id}
                href={`/articles/${article.slug || article.id}`}
                className="flex gap-4 cursor-pointer group"
                style={{ 
                  backgroundColor: isOdd ? '#FFE4CC' : '#FFF7EF',
                  padding: '8px',
                }}
              >
                {/* Image section */}
                <div className={`relative w-[110px] h-[90px] shrink-0 overflow-hidden ${bgColor} flex items-center justify-center`}>
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {article.category}
                    </span>
                  )}
                </div>

                {/* Content section */}
                <div className="flex-1 py-2">
                  <h2 className="text-xs md:text:md font-medium text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2 mb-2">
                    {article.title}
                  </h2>
                  
                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-xs text-zinc-500 border-t pt-2" style={{ borderColor: '#C8C8C8' }}>
                    <span className="flex items-center gap-1">
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
          })
        ) : (
          <div className="text-center py-10 text-gray-500">
            {activeTab} сард мэдээ байхгүй байна
          </div>
        )}
      </div>
    </section>
  );
};

export default MonthlySummary;