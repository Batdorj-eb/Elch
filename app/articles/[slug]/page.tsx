// app/articles/[slug]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye, Share2, ChevronRight, ChevronLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import NewsFeed from '@/components/news/NewsFeed';
import Advertisement from '@/components/common/Advertisement';
import RelatedNews from '@/components/article/RelatedNews';
import CommentSection from '@/components/article/CommentSection';
import SocialShare from '@/components/article/SocialShare';
import { getArticleBySlug, getComments, getArticles, getBreakingNews } from '@/lib/api';

export default async function ArticleDetailPage({
  params
}: {
  params: Promise<{ slug: string }>  // ✅ Promise type
}) {
  // ✅ params await хийх
  const { slug } = await params;

  // ✅ Backend-с өгөгдөл татах
  const article = await getArticleBySlug(slug);

  // Article олдохгүй бол 404
  if (!article) {
    notFound();
  }

  // Comments болон бусад өгөгдөл татах
  const [comments, relatedArticles, breakingNews, sidebarArticles] = await Promise.all([
    getComments(article.id),
    getArticles({ limit: 4 }),
    getBreakingNews(),
    getArticles({ limit: 10 })
  ]);

  // Date formatting
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

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-600 mb-4 lg:mb-6">
          <Link href="/" className="hover:text-red-500 transition">
            Нүүр
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link 
            href={`/${article.category_slug}`} 
            className="hover:text-red-500 transition"
          >
            {article.category_name}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#2F2F2F] line-clamp-1">Мэдээ</span>
        </nav>

        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-500 mb-6 transition font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Буцах
        </Link>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Main Article Content */}
          <article className="flex-1 max-w-[800px]">
            {/* Category Badge */}
            <Link
              href={`/${article.category_slug}`}
              className="inline-block px-4 py-1.5 bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition mb-4"
            >
              {article.category_name}
            </Link>

            {/* Article Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#2F2F2F] leading-tight mb-4 lg:mb-6">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-sm text-zinc-600 mb-6 lg:mb-8 pb-4 lg:pb-6 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {article.author_name[0]}
                </div>
                <span className="font-medium text-[#2F2F2F]">{article.author_name}</span>
              </div>
              <span>•</span>
              <time className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formattedDate}
              </time>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views} үзсэн
              </span>
            </div>

            {/* Social Share */}
            <SocialShare />

            {/* Featured Image */}
            {article.featured_image && (
              <div className="mb-6 lg:mb-8">
                <div className="relative w-full h-[250px] sm:h-[350px] lg:h-[500px] mb-3 lg:mb-4 rounded-lg overflow-hidden border border-neutral-200">
                  <Image
                    src={article.featured_image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {article.excerpt && (
                  <p className="text-xs lg:text-sm text-zinc-500 text-center italic">
                    {article.excerpt}
                  </p>
                )}
              </div>
            )}

            {/* Article Excerpt */}
            {article.excerpt && (
              <div className="mb-6 lg:mb-8 p-4 lg:p-6 bg-neutral-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-base lg:text-lg font-medium text-[#2F2F2F] leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none mb-8 lg:mb-12">
              <div
                className="text-[#2F2F2F] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                  fontSize: '18px',
                  lineHeight: '1.8'
                }}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 lg:mt-10 pt-6 lg:pt-8 border-t border-neutral-200">
              <span className="text-sm text-zinc-600 font-medium">Холбоотой:</span>
              <Link 
                href={`/${article.category_slug}`}
                className="px-3 py-1 bg-neutral-100 text-zinc-700 text-xs rounded-full hover:bg-red-500 hover:text-white transition"
              >
                {article.category_name}
              </Link>
            </div>

            {/* Related News */}
            <div className="mt-8 lg:mt-12">
              <h2 className="text-xl lg:text-2xl font-serif font-bold text-[#2F2F2F] mb-6">
                Холбоотой мэдээ
              </h2>
              <RelatedNews articles={relatedArticles} />
            </div>

            {/* Advertisement */}
            <Advertisement
              imageUrl="/banner1.png"
              className="my-8 lg:my-10"
            />

            {/* Comment Section */}
            <CommentSection 
              articleId={article.id} 
              comments={comments}
            />
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-[367px]">
            <NewsFeed articles={sidebarArticles} />
            
            <Advertisement
              imageUrl="/banner2.png"
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