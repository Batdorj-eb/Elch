import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { NewsArticle } from '@/lib/types';

interface OpinionSectionProps {
  articles: NewsArticle[];
}

const OpinionSection: React.FC<OpinionSectionProps> = ({ articles }) => {
  // 🔥 "Ардын элч" категорийн сүүлийн 3 мэдээ
  const opinionArticles = articles
    .filter(article => 
      article.categorySlug === 'peoples-representative' || 
      article.category === 'Ардын элч'
    )
    .slice(0, 3);

  if (opinionArticles.length === 0) {
    return null;
  }

  // 🔥 Цагийн форматчлуур
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffMs = now.getTime() - published.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} өдрийн өмнө`;
    if (diffHours > 0) return `${diffHours} цагийн өмнө`;
    if (diffMins > 0) return `${diffMins} минутын өмнө`;
    return 'Саяхан';
  };

  // 🔥 Excerpt эсвэл content-ийн эхний хэсэг
  const getExcerpt = (article: NewsArticle) => {
    if (article.excerpt) return article.excerpt;
    if (article.description) return article.description;
    
    // Content-ээс текст татах (HTML tags устгах)
    if (article.content) {
      const text = article.content.replace(/<[^>]*>/g, '');
      return text.substring(0, 150) + '...';
    }
    
    return '';
  };

  return (
    <section className="my-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span className="text-2xl font-bold text-[#2F2F2F]">
          Ардын Элч
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {opinionArticles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.slug || article.id}`}
            className="group cursor-pointer bg-[#FFF7EF] p-6 block hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {article.authorImage ? (
                  <Image
                    src={article.authorImage}
                    alt={article.author || 'Author'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-red-500 text-white font-bold text-sm">
                    {(article.author || 'A')[0].toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2F2F2F]">
                  {article.author || 'Нэргүй'}
                </p>
              </div>
            </div>
            
            <h3 className="text-base font-semibold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2">
              {article.title}
            </h3>

            <p className="text-[#2F2F2F] text-sm mt-3 line-clamp-3 overflow-hidden text-ellipsis">
              {getExcerpt(article)}
            </p>

            <div className="flex justify-between gap-2 text-zinc-600 mt-4 mb-4 border-t border-[#C8C8C8] pt-2">
              <span 
                className="font-medium text-[#2F2F2F]"
                style={{ fontSize: '12px' }}
              >
                {article.category}
              </span>
              <svg 
                width="4" 
                height="4" 
                viewBox="0 0 4 4" 
                fill="currentColor"
                className="text-zinc-400"
              >
                <circle cx="2" cy="2" r="2" />
              </svg>
              <time 
                className="text-zinc-600"
                style={{ fontSize: '12px' }}
              >
                {getTimeAgo(article.publishedAt || '')}
              </time>
            </div>
          </Link>
        ))}
      </div>

      {opinionArticles.length >= 3 && (
        <div className="flex justify-center">
          <Link
            href="/peoples-representative"
            className="w-[366px] mt-5 lg:mt-6 px-6 py-2.5 lg:py-3 bg-red-500 text-white text-sm lg:text-base font-medium rounded hover:bg-red-600 transition text-center block"
          >
            Дэлгэрэнгүй үзэх
          </Link>
        </div>
      )}
    </section>
  );
};

export default OpinionSection;