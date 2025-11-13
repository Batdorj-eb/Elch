// app/articles/[slug]/page.tsx - RESPONSIVE VERSION

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import NewsFeed from '@/components/news/NewsFeed';
import RelatedNews from '@/components/article/RelatedNews';
import CommentSection from '@/components/article/CommentSection';
import ShareButtons from '@/components/social/ShareButtons';
import CompactShareButtons from '@/components/social/CompactShareButtons';
import { getArticleBySlug, getComments, getArticles, getBreakingNews } from '@/lib/api';
import type { Metadata } from 'next';
import BannerSection from '@/components/common/BannerSection';

// 🔥 Open Graph Meta Tags
// 🔥 Open Graph Meta Tags
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) {
    return {
      title: 'Мэдээ олдсонгүй',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://elch.mn';
  const articleUrl = `${siteUrl}/articles/${article.slug}`;

  // Ensure featured image is absolute (fallback)
  let featuredImage = article.featured_image || '/default-og-image.jpg';
  if (!featuredImage.startsWith('http')) {
    // If relative path, prefix siteUrl
    featuredImage = featuredImage.startsWith('/') ? `${siteUrl}${featuredImage}` : `${siteUrl}/${featuredImage}`;
  }

  return {
    title: `${article.title} - ELCH News`,
    description: article.excerpt || article.title,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      url: articleUrl,
      siteName: 'ELCH News',
      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: 'mn_MN',
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author_name],
      section: article.category_name,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.title,
      images: [featuredImage],
    },
  };
}


export default async function ArticleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [comments, relatedArticles, breakingNews, sidebarArticles] = await Promise.all([
    getComments(article.id),
    getArticles({ limit: 4 }),
    getBreakingNews(),
    getArticles({ limit: 10 })
  ]);

  // 🔥 Full URL үүсгэх
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/articles/${article.slug}`;

  const formattedDate = new Date(article.published_at).toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      <header>
        <BreakingNewsBanner articles={breakingNews} />
        <Header />
        <NavigationBar />
      </header>

      <main className="max-w-[1500px] mx-auto px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-48 py-6 md:py-8 lg:py-10">
        {/* 📱 MAIN LAYOUT - Mobile: Stack, Desktop (md+): Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10">
          {/* Main Article Content */}
          <article className="flex-1 lg:max-w-[800px]">
            {/* Category Badge */}
            <Link
              href={`/${article.category_slug}`}
              className="inline-block px-3 py-1 md:px-4 md:py-1.5 text-[#FF3336] text-xs md:text-sm font-bold border border-[#FF3336] hover:bg-red-600 transition mb-3 md:mb-4"
            >
              {article.category_name}
            </Link>

            {/* Article Title - Responsive sizes */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#2F2F2F] leading-tight mb-3 md:mb-4 lg:mb-6">
              {article.title}
            </h1>

            {/* Meta Info with Share - Responsive layout */}
            <div className="flex sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 lg:gap-4 text-xs md:text-sm text-zinc-600 mb-4 md:mb-6 lg:mb-8 pb-3 md:pb-4 lg:pb-6 border-b border-neutral-200">
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <time className="flex items-center gap-1">
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">{formattedDate}</span>
                  <span className="sm:hidden">
                    {new Date(article.published_at).toLocaleDateString('mn-MN', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </time>
              </div>

              {/* Share Button */}
              <ShareButtons 
                title={article.title}
                url={articleUrl}
                description={article.excerpt}
              />
            </div>

            {/* Featured Image - Responsive heights */}
            {article.featured_image && (
              <div className="mb-4 md:mb-6 lg:mb-8">
                <div className="relative w-full h-[200px] sm:h-[280px] md:h-[350px] lg:h-[500px] mb-2 md:mb-3 lg:mb-4 rounded-lg overflow-hidden border border-neutral-200">
                  <Image
                    src={article.featured_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {article.excerpt && (
                  <p className="text-xs md:text-sm text-zinc-500 text-center italic px-2">
                    {article.excerpt}
                  </p>
                )}
              </div>
            )}

            {/* 📱 AUTHOR + CONTENT SECTION - Mobile: Stack, Desktop (md+): Side by side */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-10">
              {/* Author Section - Mobile: horizontal, Desktop: vertical */}
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-2">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base shrink-0">
                  {article.avatar}
                </div>
                <div className="font-medium text-sm md:text-base text-[#2F2F2F]">
                  {article.author_name}
                </div>
              </div>

              {/* Article Content */}
              <div className="flex-1">
                {/* Article Excerpt */}
                {article.excerpt && (
                  <div className="mb-4 md:mb-6 lg:mb-8 p-3 md:p-4 lg:p-6 bg-neutral-50 border-l-4 border-red-500 rounded-r-lg">
                    <p className="text-sm md:text-base lg:text-lg font-medium text-[#2F2F2F] leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                )}

                {/* Article Body - Responsive text size */}
                <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
                  <div
                    className="text-[#2F2F2F] leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                    style={{
                      fontSize: 'clamp(16px, 2vw, 18px)',
                      lineHeight: '1.75'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Tags - Responsive */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-8 lg:mt-10 pt-4 md:pt-6 lg:pt-8 border-t border-neutral-200">
              <span className="text-xs md:text-sm text-zinc-600 font-medium">Холбоотой:</span>
              <Link 
                href={`/${article.category_slug}`}
                className="px-2 md:px-3 py-1 bg-neutral-100 text-zinc-700 text-xs rounded-full hover:bg-red-500 hover:text-white transition"
              >
                {article.category_name}
              </Link>
            </div>

            {/* Footer Share - Compact version */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs md:text-sm text-zinc-600 font-medium">Энэ мэдээг хуваалцах:</p>
                <CompactShareButtons 
                  title={article.title}
                  url={articleUrl}
                  description={article.excerpt}
                />
              </div>
            </div>
          </article>

          {/* 📱 SIDEBAR - Mobile: Full width below, Desktop (lg+): Fixed width sidebar */}
          <aside className="hidden sm:block w-full lg:w-[320px] xl:w-[367px]">
            <div className="lg:top-4">
              <NewsFeed articles={sidebarArticles} />
              
              <BannerSection 
                type="vertical"
                className="my-6 md:my-8 lg:my-10"
              />
            </div>
          </aside>
        </div>
        
            {/* Related News */}
            <div className="mt-8 md:mt-10 lg:mt-12 ">
              <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-[#2F2F2F] mb-4 md:mb-6">
                Санал болгох мэдээ
              </h2>
              <RelatedNews articles={relatedArticles} />
            </div>

            <BannerSection 
              type="horizontal"
              className="my-6 md:my-8 lg:my-10"
            />

            {/* Comment Section */}
            <CommentSection 
              articleId={article.id} 
              comments={comments}
            />
        </main>

      <Footer />
    </div>
  );
}