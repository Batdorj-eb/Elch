// components/article/RelatedNews.tsx
// ============================================

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, MessageCircle } from 'lucide-react';

const RelatedNews: React.FC = () => {
  const relatedArticles = [
    {
      id: 1,
      title: 'Trump asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      image: 'https://placehold.co/400x300/ef4444/white?text=Related+1',
      views: 16,
      comments: 22
    },
    {
      id: 2,
      title: 'Dollar asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      image: 'https://placehold.co/400x300/10b981/white?text=Related+2',
      views: 18,
      comments: 15
    },
    {
      id: 3,
      title: 'Mongolia asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      image: 'https://placehold.co/400x300/8b5cf6/white?text=Related+3',
      views: 12,
      comments: 8
    }
  ];

  return (
    <section className="my-8 lg:my-10">
      <h2 className="flex items-center gap-3 lg:gap-4 mb-6">
        <div className="w-[5px] lg:w-[7px] h-[18px] lg:h-[22px] bg-red-500" />
        <span className="text-xl lg:text-2xl font-bold text-[#2F2F2F]">
          Санал болгох мэдээ
        </span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {relatedArticles.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <article className="group cursor-pointer">
              <div className="relative w-full h-[180px] lg:h-[200px] mb-3 overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition mb-2 line-clamp-2">
                {article.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{article.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{article.comments}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedNews;