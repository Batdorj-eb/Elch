// app/page.tsx

import React from 'react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import HeroArticle from '@/components/news/HeroArticle';
import NewsGrid from '@/components/news/NewsGrid';
import NewsFeed from '@/components/news/NewsFeed';
import WeeklySummary from '@/components/news/WeeklySummary';
import SourcesSection from '@/components/news/SourcesSection';
import OpinionSection from '@/components/news/OpinionSection';
import TopicsSection from '@/components/sidebar/TopicsSection';
import NewsletterSignup from '@/components/sidebar/NewsletterSignup';
import Advertisement from '@/components/common/Advertisement';

// ✅ Backend API import
import { getArticles, getFeaturedArticles, getBreakingNews } from '@/lib/api';

export default async function HomePage() {
  // ✅ Backend-с өгөгдөл татах
  const [allArticles, featuredArticles, breakingArticles] = await Promise.all([
    getArticles({ limit: 20 }),
    getFeaturedArticles(),
    getBreakingNews()
  ]);

  // ✅ Hero article - Featured-ийн эхний нийтлэл
  const heroArticle = featuredArticles[0] || allArticles[0];
  
  // ✅ Grid articles - Featured-ээс 2-5 нийтлэл
  const gridArticles = featuredArticles.slice(1, 5);
  
  // ✅ NewsFeed articles - Бүх нийтлэлүүдийн эхний 10
  const newsFeedArticles = allArticles.slice(0, 10);

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      {/* Header Section */}
      <header>
        {/* ✅ Breaking news backend-с */}
        <BreakingNewsBanner articles={breakingArticles} />
        <Header />
        <NavigationBar />
      </header>

      <main className='bg-[#FFF1E5]'>
        {/* Main Content Section */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-6 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left Column - Main Content */}
            <section className="flex-1 w-full lg:max-w-[773px]">
              {/* ✅ Hero article backend-с */}
              {heroArticle && <HeroArticle article={heroArticle} />}
              
              <h2 className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8 mt-8 lg:mt-10">
                <div className="w-[5px] lg:w-[7px] h-[18px] lg:h-[22px] bg-red-500" />
                <span className="text-2xl font-serif lg:text-3xl font-semibold text-[#2F2F2F]">
                  Онцлох мэдээ
                </span>
              </h2>
              
              {/* ✅ Grid articles backend-с */}
              <NewsGrid articles={gridArticles} />
              
              <Advertisement 
                className="my-8 lg:my-10 p-10 bg-[#FFE4CC] object-cover"
                imageUrl="/banner1.png"
              />
              
              <WeeklySummary />
            </section>

            <aside className="w-full lg:w-[367px] flex flex-col justify-between min-h-[1200px]">
              <div className="space-y-8 lg:space-y-10">
                {/* ✅ NewsFeed backend-с */}
                <NewsFeed articles={newsFeedArticles} />
                <div className="lg:sticky lg:top-4">
                  <Advertisement 
                    imageUrl="/banner2.png"
                    isVertical
                  />
                </div>
              </div>
              <div className="space-y-8 lg:space-y-10 relative z-10">
                <TopicsSection />
                <NewsletterSignup />
              </div>
            </aside>
          </div>
        </div>

        <div className="bg-[#FFE4CC] py-1">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96">
            <SourcesSection />
          </div>
        </div>

        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-6 lg:py-10">
          <OpinionSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}