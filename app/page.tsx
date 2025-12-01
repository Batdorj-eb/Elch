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
import { 
  getArticles, 
  getBreakingNews,
  getMainFeaturedArticle,     
  getSecondaryFeaturedArticles 
} from '@/lib/api';
import Link from 'next/link';
import BannerSection from '@/components/common/BannerSection';
import SubmissionButton from '@/components/common/SubmissionButton';

export default async function HomePage() {
  const [
    allArticles, 
    breakingArticles, 
    mainArticle,        
    secondaryArticles   
  ] = await Promise.all([
    getArticles({ limit: 20 }),
    getBreakingNews(),
    getMainFeaturedArticle(),
    getSecondaryFeaturedArticles()
  ]);
  console.log(allArticles)
  const heroArticle = mainArticle || allArticles[0];
  const gridArticles = secondaryArticles.length > 0 ? secondaryArticles : allArticles.slice(1, 5);
  const newsFeedArticles = allArticles.slice(0, 10);
  const articles = await getArticles({ limit: 100 });

  

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      {/* Header Section */}
      <header>
        <BreakingNewsBanner articles={breakingArticles} />
        <Header />
        <NavigationBar />
      </header>

      <main className="bg-[#FFF1E5]">
        <div className="max-w-[1325px] mx-auto px-4 sm:px-6 md:px-8 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 md:mt-10">
            {/* Left Column */}
            <section className="flex-1 flex flex-col gap-6">
              {/* Mobile order */}
              <div className="lg:hidden flex flex-col gap-6">
                {heroArticle && <HeroArticle article={heroArticle} />}
                <NewsFeed articles={newsFeedArticles} />
                <BannerSection 
                    type="vertical" 
                  />
                {gridArticles.length > 0 && (
                  <>
                    <h2 className="flex items-center gap-3 lg:gap-4 md:mb-6 mt-8">
                      <div className="w-[5px] lg:w-[7px] h-[18px] lg:h-[22px] bg-red-500" />
                      <span className="text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-[#2F2F2F]">
                        Онцлох мэдээ
                      </span>
                    </h2>
                    <NewsGrid articles={gridArticles}/>
                  </>
                )}
                <BannerSection type="horizontal" />
                <WeeklySummary articles={articles} />
              </div>

              {/* Desktop order */}
              <div className="hidden lg:flex flex-col gap-6">
                {heroArticle && <HeroArticle article={heroArticle} />}
                {gridArticles.length > 0 && (
                  <>
                    <h2 className="flex items-center gap-3 lg:gap-4 mb-2 mt-2">
                      <div className="w-[5px] lg:w-[7px] h-[18px] lg:h-[22px] bg-red-500" />
                      <span className="text-xl md:text-2xl lg:text-3xl font-serif font-semibold text-[#2F2F2F]">
                        Онцлох мэдээ
                      </span>
                    </h2>
                    {/* ✅ Дэд онцлох grid (is_featured = 2-5) */}
                    <NewsGrid articles={gridArticles} />
                  </>
                )}
                <BannerSection type="horizontal" />
                <WeeklySummary articles={articles} />
              </div>
            </section>

            {/* Right Sidebar */}
            <aside className="hidden lg:flex w-[367px] flex-col lg:shrink-0">
              <div className="flex-1 relative">
                <div className="mb-3">
                  <NewsFeed articles={newsFeedArticles} />
                </div>

                <div className="sticky top-4">
                  <BannerSection type="vertical" />
                </div>
              </div>

              <div className="mb-11">
                <TopicsSection />
                <NewsletterSignup />
              </div>
            </aside>
          </div>
        </div>
        <div className="bg-[#FFE4CC] p-4">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-96">
            <SourcesSection articles={articles} />
            <div className="flex justify-center mt-6 pb-4 md:pb-6 lg:pb-8">
              <Link
                href="/video"
                className="text-white text-sm md:text-base font-medium hover:bg-red-600 transition flex items-center justify-center w-full max-w-[366px]"
                style={{ 
                  height: '40px', 
                  backgroundColor: '#FF3336' 
                }}
              >
                Дэлгэрэнгүй үзэх
              </Link>
            </div>
          </div>  
        </div>

        {/* Opinion Section - Responsive */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-96 py-6 lg:py-8">
          <OpinionSection/>
        </div>
      </main>

      <Footer />
    </div>
  );
}
