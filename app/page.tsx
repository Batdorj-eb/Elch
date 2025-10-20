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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header>
        <BreakingNewsBanner />
        <Header />
        <NavigationBar />
      </header>

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Left Column - Main Content */}
          <section className="flex-1 w-full lg:max-w-[773px]">
            <HeroArticle />
            
            <h2 className="flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8 mt-8 lg:mt-10">
              <div className="w-[5px] lg:w-[7px] h-[18px] lg:h-[22px] bg-red-500" />
              <span className="text-2xl lg:text-3xl font-bold text-zinc-800">
                Онцлох мэдээ
              </span>
            </h2>
            
            <NewsGrid />
            
            <Advertisement 
              className="my-8 lg:my-10"
              imageUrl="https://placehold.co/800x200/10b981/white?text=Advertisement"
            />
            
            <WeeklySummary />
            <SourcesSection />
            <OpinionSection />
          </section>

          <aside className="w-full lg:w-[367px]">
            <NewsFeed />
            
            <Advertisement 
              className="my-8 lg:my-10"
              imageUrl="https://placehold.co/400x600/f43f5e/white?text=Advertisement"
              isVertical
            />
            
            <TopicsSection />
            <NewsletterSignup />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}