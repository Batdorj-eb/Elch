// app/search/page.tsx

import React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { searchArticles } from '@/lib/api';
import { Search } from 'lucide-react';

async function SearchResults({
  searchParams
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || '';
  const category = params.category;
  const page = parseInt(params.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  const { articles, pagination } = await searchArticles(query, {
    category,
    limit,
    offset
  });

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      <header>
        <Header />
        <NavigationBar />
      </header>

      {/* MAIN: container adjusted to be responsive (max width + responsive padding) */}
      <main className="max-w-[1130px] mx-auto py-6 lg:py-12">
        {/* Search Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-3">
            {/* thinner on mobile, larger on sm+ */}
            <div className="w-1.5 sm:w-[7px] h-6 sm:h-[28px] bg-red-500 rounded-sm" />
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F2F2F]">
              Хайлтын үр дүн
            </h1>
          </div>

          <div className="ml-4 sm:ml-[28px]">
            <p className="text-zinc-600 text-sm sm:text-base">
              <span className="font-medium">"{query}"</span> гэсэн түлхүүр үгээр{' '}
              <span className="font-bold text-red-500">{pagination.total}</span>{' '}
              мэдээ олдлоо
            </p>
          </div>
        </div>

        {/* Results */}
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-white border border-neutral-200 rounded-lg">
            <Search className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-zinc-300" />
            <h2 className="text-lg sm:text-xl font-bold text-zinc-800 mb-2">
              Үр дүн олдсонгүй
            </h2>
            <p className="text-zinc-600 mb-4 text-sm sm:text-base">
              "{query}" гэсэн түлхүүр үгтэй мэдээ олдсонгүй.
            </p>
            <p className="text-sm text-zinc-500">
              Өөр түлхүүр үг ашиглан дахин оролдоно уу.
            </p>
          </div>
        ) : (
          <>
            {/* grid: 1 / 2 / 3 columns and nicer gaps on large screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
              {articles.map((article: any) => (
                <NewsCard key={article.id} article={article} hideTime={true} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.total > limit && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8 sm:mt-10">
                {page > 1 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
                    className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-white border border-neutral-200 rounded hover:bg-zinc-50 transition"
                    aria-label="Өмнөх хуудас"
                  >
                    Өмнөх
                  </Link>
                )}

                <span className="px-3 py-2 sm:px-4 sm:py-2 bg-red-500 text-white rounded text-sm">
                  {page}
                </span>

                {pagination.hasMore && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                    className="px-3 py-2 text-sm sm:px-4 sm:py-2 bg-white border border-neutral-200 rounded hover:bg-zinc-50 transition"
                    aria-label="Дараах хуудас"
                  >
                    Дараах
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>;
}) {
  return (
    <Suspense fallback={<div className="py-10 text-center">Уншиж байна...</div>}>
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}

// Metadata
export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || '';

  return {
    title: query ? `"${query}" - Хайлтын үр дүн | ELCH News` : 'Хайлт | ELCH News',
    description: `"${query}" гэсэн түлхүүр үгтэй мэдээнүүдийн хайлтын үр дүн`
  };
}
