import React from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import NewsFeed from '@/components/news/NewsFeed';
import Advertisement from '@/components/common/Advertisement';
import RelatedNews from '@/components/article/RelatedNews';
import CommentSection from '@/components/article/CommentSection';
import SocialShare from '@/components/article/SocialShare';
import { ChevronRight } from 'lucide-react';

export default function ArticleDetailPage() {
  const article = {
    title: 'Cras dapibus. Vivamus elementum semper nislus aenean vulputate.',
    category: 'Улс төр',
    author: 'Б.Энхбаяр',
    publishedAt: '2025 оны 1-р сарын 15',
    views: 1234,
    imageUrl: 'https://placehold.co/800x500/3b82f6/white?text=Article+Image',
    imageCaption: 'Montes nascetur ridiculus mus mauris vitae ultricies leo integer.',
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

      Montes nascetur ridiculus mus mauris vitae ultricies leo integer. Mauris pharetra et ultrices neque ornare aenean. Sed turpis tincidunt id aliquet risus feugiat in ante. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Eget nunc scelerisque viverra mauris in aliquam sem fringilla. 

      Adipiscing elit duis tristique sollicitudin nibh sit. Sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum. Ornare arcu odio ut sem nulla pharetra diam. Montes nascetur ridiculus mus mauris vitae ultricies leo integer.
    `
  };

  return (
    <div className="min-h-screen bg-white">
      <header>
        <BreakingNewsBanner />
        <Header />
        <NavigationBar />
      </header>

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-600 mb-4 lg:mb-6">
          <a href="/" className="hover:text-red-500 transition">Нүүр</a>
          <ChevronRight className="w-4 h-4" />
          <a href="/politics" className="hover:text-red-500 transition">{article.category}</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#2F2F2F] line-clamp-1">Мэдээ</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Main Article Content */}
          <article className="flex-1 max-w-[800px]">
            {/* Category Badge */}
            <div className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-medium rounded mb-4">
              {article.category}
            </div>

            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2F2F2F] leading-tight mb-4 lg:mb-6">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-xs lg:text-sm text-zinc-600 mb-6 lg:mb-8 pb-4 lg:pb-6 border-b border-neutral-200">
              <span className="font-medium">{article.author}</span>
              <span>•</span>
              <time>{article.publishedAt}</time>
              <span>•</span>
              <span>{article.views} үзсэн</span>
            </div>

            {/* Social Share */}
            <SocialShare />

            {/* Featured Image */}
            <div className="mb-6 lg:mb-8">
              <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] mb-3 lg:mb-4 rounded-lg overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-xs lg:text-sm text-zinc-500 text-center italic">
                {article.imageCaption}
              </p>
            </div>

            {/* Article Body */}
            <div className="prose prose-zinc max-w-none">
              {article.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-sm lg:text-base text-zinc-700 leading-relaxed mb-4 lg:mb-6">
                  {paragraph.trim()}
                </p>
              ))}

              {/* Blockquote */}
              <blockquote className="my-6 lg:my-8 pl-4 lg:pl-6 border-l-4 border-red-500 bg-neutral-50 p-4 lg:p-6 rounded-r-lg">
                <p className="text-base lg:text-lg font-semibold text-[#2F2F2F] italic leading-relaxed mb-2">
                  "In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Donec odio elit, dictum in, hendrerit sit amet, egestas sed, leo. Nulham dictum felis eu pede mollis pretium."
                </p>
                <cite className="text-xs lg:text-sm text-zinc-600 not-italic">
                  - Эх сурвалж
                </cite>
              </blockquote>

              {/* Content continues */}
              <p className="text-sm lg:text-base text-zinc-700 leading-relaxed mb-4 lg:mb-6">
                Adipiscing elit duis tristique sollicitudin nibh sit. Sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum. Ornare arcu odio ut sem nulla pharetra diam. Montes nascetur ridiculus mus mauris vitae ultricies leo integer.
              </p>

              {/* Second Image */}
              <div className="my-6 lg:my-8">
                <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src="https://placehold.co/800x400/10b981/white?text=Content+Image"
                    alt="Content image"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="text-sm lg:text-base text-zinc-700 leading-relaxed mb-4 lg:mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Montes nascetur ridiculus mus mauris vitae ultricies leo integer.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-neutral-200">
              <span className="text-sm text-zinc-600">Холбоотой:</span>
              <a href="#" className="px-3 py-1 bg-neutral-100 text-zinc-700 text-xs rounded-full hover:bg-red-500 hover:text-white transition">
                Улс төр
              </a>
              <a href="#" className="px-3 py-1 bg-neutral-100 text-zinc-700 text-xs rounded-full hover:bg-red-500 hover:text-white transition">
                Эдийн засаг
              </a>
              <a href="#" className="px-3 py-1 bg-neutral-100 text-zinc-700 text-xs rounded-full hover:bg-red-500 hover:text-white transition">
                Дэлхий
              </a>
            </div>

            {/* Related News */}
            <RelatedNews />

            {/* Advertisement */}
            <Advertisement
              imageUrl="https://placehold.co/800x200/f59e0b/white?text=Advertisement"
              className="my-8 lg:my-10"
            />

            {/* Comment Section */}
            <CommentSection />
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-[367px]">
            <NewsFeed />
            
            <Advertisement
              imageUrl="https://placehold.co/400x600/f43f5e/white?text=Fashion+Sale"
              isVertical
              className="my-8 lg:my-10"
            />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}