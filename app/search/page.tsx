// app/search/page.tsx

import React from 'react';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import NewsCard from '@/components/news/NewsCard';
import { searchArticles } from '@/lib/api';
import { Search } from 'lucide-react';

async function SearchResults({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string; category?: string; page?: string }> 
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

      <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-8 lg:py-12">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-[7px] h-[28px] bg-red-500" />
            <h1 className="text-3xl font-bold text-[#2F2F2F]">
              Хайлтын үр дүн
            </h1>
          </div>
          
          <div className="ml-[28px]">
            <p className="text-zinc-600 mb-2">
              <span className="font-medium">"{query}"</span> гэсэн түлхүүр үгээр{' '}
              <span className="font-bold text-red-500">{pagination.total}</span> мэдээ олдлоо
            </p>
          </div>
        </div>

        {/* Results */}
        {articles.length === 0 ? (
          <div className="text-center py-16 bg-white border border-neutral-200 rounded-lg">
            <Search className="w-16 h-16 mx-auto mb-4 text-zinc-300" />
            <h2 className="text-xl font-bold text-zinc-800 mb-2">
              Үр дүн олдсонгүй
            </h2>
            <p className="text-zinc-600 mb-6">
              "{query}" гэсэн түлхүүр үгтэй мэдээ олдсонгүй.
            </p>
            <p className="text-sm text-zinc-500">
              Өөр түлхүүр үг ашиглан дахин оролдоно уу.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article: any) => (
                <NewsCard 
                  key={article.id} 
                  article={article}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination.total > limit && (
              <div className="flex justify-center gap-2 mt-10">
                {page > 1 && (
                  <a
                    href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
                    className="px-4 py-2 bg-white border border-neutral-200 rounded hover:bg-zinc-50 transition"
                  >
                    Өмнөх
                  </a>
                )}
                
                <span className="px-4 py-2 bg-red-500 text-white rounded">
                  {page}
                </span>
                
                {pagination.hasMore && (
                  <a
                    href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
                    className="px-4 py-2 bg-white border border-neutral-200 rounded hover:bg-zinc-50 transition"
                  >
                    Дараах
                  </a>
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
  searchParams: Promise<{ q?: string; category?: string; page?: string }>
}) {
  return (
    <Suspense fallback={<div>Уншиж байна...</div>}>
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}

// Metadata
export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams;
  const query = params.q || '';
  
  return {
    title: query ? `"${query}" - Хайлтын үр дүн | ELCH News` : 'Хайлт | ELCH News',
    description: `"${query}" гэсэн түлхүүр үгтэй мэдээнүүдийн хайлтын үр дүн`
  };
}