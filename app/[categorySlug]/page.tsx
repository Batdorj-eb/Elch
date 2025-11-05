// app/[categorySlug]/page.tsx

import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import NewsCard from '@/components/news/NewsCard';
import NewsFeed from '@/components/news/NewsFeed';
import Advertisement from '@/components/common/Advertisement';
import TopicsSection from '@/components/sidebar/TopicsSection';
import NewsletterSignup from '@/components/sidebar/NewsletterSignup';
import { 
  getArticlesByCategory, 
  getBreakingNews, 
  getArticles, 
  getCategoryBySlug 
} from '@/lib/api';
import WeeklySummary from '@/components/news/WeeklySummary';

export default async function CategoryPage({
  params
}: {
  params: Promise<{ categorySlug: string }>
}) {
  const { categorySlug } = await params;

  const [category, categoryArticles, breakingNews, sidebarArticles] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getArticlesByCategory(categorySlug, 20),
    getBreakingNews(),
    getArticles({ limit: 10 })
  ]);

  if (!category) {
    notFound();
  }

  const gridArticles = categoryArticles.slice(1);
  const articles = await getArticles({ limit: 100 });

  const getImageUrl = (article: any) => {
    const url = article?.imageUrl || article?.coverImage;
    if (!url || typeof url !== 'string' || url.startsWith('blob:')) {
      return 'https://placehold.co/800x450/e5e5e5/666666?text=ELCH+NEWS';
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      <header>
        <BreakingNewsBanner articles={breakingNews} />
        <Header />
        <NavigationBar />
      </header>

      <main className="bg-[#FFF1E5]">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-6 lg:py-10">
          {/* Page Title */}
          <div className="mb-8 lg:mb-10">
          <div className="text-center mb-6 lg:mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#2F2F2F] inline-block relative pb-3">
              {category.name}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500" />
            </h1>
          </div>
          </div>

          <div>
                   {categoryArticles.length >= 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10">
                  {categoryArticles.slice(0, 3).map((article) => (
                    <a 
                      key={article.id} 
                      href={`/articles/${article.slug || article.id}`}
                      className="group"
                    >
                      <article className="cursor-pointer">
                        <div className="relative w-full h-[200px] lg:h-[220px] mb-3 overflow-hidden">
                          <Image
                            src={getImageUrl(article)}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <h3 className="text-sm lg:text-base font-semibold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <span>{article.timeAgo}</span>
                          {article.views && (
                            <>
                              <span>•</span>
                              <span>{article.views} үзсэн</span>
                            </>
                          )}
                        </div>
                      </article>
                    </a>
                  ))}
                </div>
              )}
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Main Content */}
            <section className="flex-1 w-full lg:max-w-[773px]">
              {/* Advertisement */}
              <Advertisement 
                className="my-4 lg:my-4"
                imageUrl="/banner1.png"
              />
       
              {gridArticles.length > 0 ? (
                <div className="space-y-6 lg:space-y-8">
                  {gridArticles.map((article) => (
                    <NewsCard 
                      key={article.id} 
                      article={article} 
                      layout="horizontal"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 bg-white border border-neutral-200 rounded">
                  <p className="text-lg font-medium mb-2">Одоогоор мэдээ байхгүй байна</p>
                  <p className="text-sm">"{category.name}" ангилалд удахгүй мэдээ нэмэгдэнэ.</p>
                </div>
              )}

              {/* 🔥 Шинэ мэдээ - Latest 3 articles */}
              {gridArticles.length >= 3 && (
                <div className="mb-8 lg:mb-10">
                  <h2 className="flex items-center gap-3 mb-6">
                    <div className="w-[5px] h-[20px] bg-red-500" />
                    <span className="text-xl lg:text-2xl font-serif font-semibold text-[#2F2F2F]">
                      Шинэ мэдээ
                    </span>
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gridArticles.slice(-3).reverse().map((article) => (
                      <a 
                        key={article.id} 
                        href={`/articles/${article.slug || article.id}`}
                        className="group"
                      >
                        <article className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                          <div className="relative w-full h-[180px]">
                            <Image
                              src={getImageUrl(article)}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition duration-300"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 250px"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-sm font-semibold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2 mb-2">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <time>{article.timeAgo}</time>
                              {article.views && (
                                <>
                                  <span>•</span>
                                  <span>{article.views} үзсэн</span>
                                </>
                              )}
                            </div>
                          </div>
                        </article>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <WeeklySummary articles={articles} />
            </section>

            {/* Sidebar */}
            <aside className="w-full lg:w-[367px] flex flex-col gap-8 lg:gap-10">
              <NewsFeed articles={sidebarArticles} />
              
              <div>
                <Advertisement 
                  imageUrl="/banner2.png"
                  isVertical
                />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}