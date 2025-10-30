// app/[categorySlug]/page.tsx

import React from 'react';
import Image from 'next/image'; // 🔥 ADD: Import Image
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

export default async function CategoryPage({
  params
}: {
  params: Promise<{ categorySlug: string }>
}) {
  // ✅ params await хийх
  const { categorySlug } = await params;

  // ✅ Backend-с өгөгдөл татах
  const [category, categoryArticles, breakingNews, sidebarArticles] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getArticlesByCategory(categorySlug, 20),
    getBreakingNews(),
    getArticles({ limit: 10 })
  ]);

  // Category олдохгүй бол 404
  if (!category) {
    notFound();
  }

  // Hero article - эхний нийтлэл
  const heroArticle = categoryArticles[0];
  
  // Grid articles - бусад нийтлэлүүд
  const gridArticles = categoryArticles.slice(1);

  // 🔥 Helper function to get valid image URL
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
            <h1 className="flex items-center gap-4">
              <div className="w-[7px] h-[28px] bg-red-500" />
              <span className="text-3xl lg:text-4xl font-serif font-bold text-[#2F2F2F]">
                {category.name}
              </span>
            </h1>
            {category.description && (
              <p className="mt-3 text-zinc-600 ml-[28px]">
                {category.description}
              </p>
            )}
            <p className="mt-2 text-sm text-zinc-500 ml-[28px]">
              {category.article_count} мэдээ
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Main Content */}
            <section className="flex-1 w-full lg:max-w-[773px]">
              {/* Hero Article */}
              {heroArticle && (
                <article className="mb-8 lg:mb-10 border border-neutral-200 overflow-hidden group">
                  <a href={`/articles/${heroArticle.slug || heroArticle.id}`}>
                    <div className="relative w-full h-[300px] lg:h-[400px]">
                      <Image
                        src={getImageUrl(heroArticle)}
                        alt={heroArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        sizes="(max-width: 768px) 100vw, 773px"
                        priority
                      />
                    </div>
                    <div className="bg-[#FFE4CC] p-6 lg:p-8">
                      <h2 className="text-xl lg:text-2xl font-serif font-bold text-[#2F2F2F] leading-tight group-hover:text-red-500 transition mb-3">
                        {heroArticle.title}
                      </h2>
                      {heroArticle.description && (
                        <p className="text-sm lg:text-base text-zinc-700 mb-4 line-clamp-2">
                          {heroArticle.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-sm text-zinc-600">
                        <span className="font-medium text-[#2F2F2F]">
                          {heroArticle.category}
                        </span>
                        <span>•</span>
                        <time>{heroArticle.timeAgo}</time>
                      </div>
                    </div>
                  </a>
                </article>
              )}

              {/* Articles Grid */}
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

              {/* Advertisement */}
              <Advertisement 
                className="my-8 lg:my-10"
                imageUrl="/banner1.png"
              />
            </section>

            {/* Sidebar */}
            <aside className="w-full lg:w-[367px] flex flex-col gap-8 lg:gap-10">
              <NewsFeed articles={sidebarArticles} />
              
              <div className="lg:sticky lg:top-4">
                <Advertisement 
                  imageUrl="/banner2.png"
                  isVertical
                />
              </div>

              <TopicsSection />
              <NewsletterSignup />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}