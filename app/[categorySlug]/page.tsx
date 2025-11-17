// app/[categorySlug]/page.tsx

import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import NewsFeed from '@/components/news/NewsFeed';
import { 
  getArticlesByCategory, 
  getBreakingNews, 
  getArticles, 
  getCategoryBySlug 
} from '@/lib/api';
import MonthlySummary from '@/components/news/Monthly';
import BannerSection from '@/components/common/BannerSection';
import time from '@/public/icons/time.svg';

export default async function CategoryPage({
  params
}: {
  params: Promise<{ categorySlug: string }>
}) {
  const { categorySlug } = await params;

  const [category, categoryArticles, breakingNews, sidebarArticles, allArticles] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getArticlesByCategory(categorySlug, 20),
    getBreakingNews(),
    getArticles({ limit: 10 }),
    getArticles({ limit: 100 })  
  ]);

  if (!category) {
    notFound();
  }

  const getImageUrl = (article: any) => {
    const url = article?.imageUrl || article?.coverImage;
    if (!url || typeof url !== 'string' || url.startsWith('blob:')) {
      return 'https://placehold.co/800x450/e5e5e5/666666?text=ELCH+NEWS';
    }
    return url;
  };

  // ✅ Улс төр category эсэхийг шалгах
  const isPoliticsCategory = categorySlug === 'uls-tur' || category.name === 'Улс төр';

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      <header>
        <BreakingNewsBanner articles={breakingNews} />
        <Header />
        <NavigationBar />
      </header>

      <main className="bg-[#FFF1E5]">
        <div 
          className="max-w-[1325px] mx-auto py-4 md:py-6 lg:py-10"
          style={{
            paddingLeft: 'clamp(16px, 5vw, 96px)',
            paddingRight: 'clamp(16px, 5vw, 96px)'
          }}
        >
          {/* Page Title */}
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="text-center mb-4 md:mb-6 lg:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2F2F2F] inline-block relative pb-2 md:pb-3">
                {category.name}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-red-500" />
              </h1>
            </div>
          </div>
          
          {/* ✅ Tags - ЗӨВХӨН Улс төр category-д харуулах */}
          {isPoliticsCategory && (
            <div className="mb-4 md:mb-6 lg:mb-8">
              <div className="flex gap-0 overflow-x-auto pb-2 scrollbar-hide">
                <button className="py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm font-medium text-[#2F2F2F] whitespace-nowrap transition border-r border-[#2F2F2F] hover:bg-red-50">
                  Бүгд
                </button>
                <button className="py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm font-medium text-[#2F2F2F] whitespace-nowrap transition border-r border-[#2F2F2F] hover:bg-red-50">
                  Сонгуулъ 2028
                </button>
                <button className="py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm font-medium text-[#2F2F2F] whitespace-nowrap transition border-r border-[#2F2F2F] hover:bg-red-50">
                  Мэтгэлцээн
                </button>
                <button className="py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm font-medium text-[#2F2F2F] whitespace-nowrap transition border-r border-[#2F2F2F] hover:bg-red-50">
                  Нүүрсний хулгай
                </button>
                <button className="py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm font-medium text-[#2F2F2F] whitespace-nowrap transition border-r border-[#2F2F2F] hover:bg-red-50">
                  Хөгжлийн банк
                </button>
                <button className="py-1.5 md:py-2 px-3 md:px-4 text-xs md:text-sm font-medium text-[#2F2F2F] whitespace-nowrap transition hover:bg-red-50">
                  Ногоон автобус
                </button>
              </div>
            </div>
          )}
          
          {/* Grid Articles */}
          <div>
            {categoryArticles.length >= 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8 lg:mb-10">
                {categoryArticles.slice(0, 3).map((article) => (
                  <a 
                    key={article.id} 
                    href={`/articles/${article.slug || article.id}`}
                    className="group"
                  >
                    <article className="cursor-pointer">
                      <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[220px] mb-2 md:mb-3 overflow-hidden">
                        <Image
                          src={getImageUrl(article)}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <h3 className="text-xs sm:text-sm lg:text-base font-bold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition mb-1.5 md:mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex justify-between gap-2 md:gap-3 text-[10px] md:text-xs text-zinc-500 border-t border-b py-1 md:py-1.5" style={{ borderColor: '#C8C8C8' }}>
                        <span className='flex gap-2'>
                          <Image src={time} alt="" width={14} height={14} />
                          {article.timeAgo}
                        </span>
                      </div>
                    </article>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Main Content + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10">
            <section className="flex-1 w-full lg:max-w-[773px]">
              <BannerSection className="my-3 md:my-4" type={'horizontal'} />
              
              <MonthlySummary 
                articles={allArticles} 
                categorySlug={categorySlug}
                categoryName={category.name}
              />
            </section>

            <aside className="w-full lg:w-[367px] lg:shrink-0 flex flex-col gap-2">
              <div className="hidden md:block">
                <NewsFeed articles={sidebarArticles} />
              </div>
              <div>
                <BannerSection type="vertical" />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}