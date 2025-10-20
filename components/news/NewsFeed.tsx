// components/news/NewsFeed.tsx

'use client';

import React, { useState } from 'react';
import type { NewsArticle } from '@/lib/types';

const NewsFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'trending'>('new');

  // Шинэ мэдээ - 7 items
  const newNews: NewsArticle[] = [
    {
      id: 'new-1',
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe liguam dolessit lorem ipsum dolor autaspe intureius.',
      category: 'Улс төр',
      imageUrl: '',
      timeAgo: '1 цаг 23 минутын өмнө'
    },
    {
      id: 'new-2',
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe liguam dolessit lorem ipsum dolor autaspe intureius.',
      category: 'Улс төр',
      imageUrl: '',
      timeAgo: '1 цаг 23 минутын өмнө'
    },
    {
      id: 'new-3',
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe liguam dolessit lorem ipsum dolor autaspe intureius.',
      category: 'Улс төр',
      imageUrl: '',
      timeAgo: '1 цаг 23 минутын өмнө'
    },
    {
      id: 'new-4',
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe liguam dolessit lorem ipsum dolor autaspe intureius.',
      category: 'Улс төр',
      imageUrl: '',
      timeAgo: '1 цаг 23 минутын өмнө'
    },
    {
      id: 'new-5',
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe liguam dolessit lorem ipsum dolor autaspe intureius.',
      category: 'Улс төр',
      imageUrl: '',
      timeAgo: '1 цаг 23 минутын өмнө'
    },
    {
      id: 'new-6',
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe liguam dolessit lorem ipsum dolor autaspe intureius.',
      category: 'Эдийн засаг',
      imageUrl: '',
      timeAgo: '2 цаг өмнө'
    },
    {
      id: 'new-7',
      title: 'Nem asinvenderum intureius que quas et aspelit volo dolor autaspe liguam dolessit lorem ipsum dolor autaspe intureius.',
      category: 'Дэлхий',
      imageUrl: '',
      timeAgo: '3 цаг өмнө'
    },
  ];

  // Trending мэдээ - 7 items
  const trendingNews: NewsArticle[] = [
    {
      id: 'trend-1',
      title: 'Trending: Эйзер амгалан байдлыг нэгтгэх ахуйд дэг арасан болхоо товойн тутад хорсоо очиж нийгнэж.',
      category: 'Спорт',
      imageUrl: '',
      timeAgo: '30 минутын өмнө'
    },
    {
      id: 'trend-2',
      title: 'Trending: Nem asinvenderum intureius que quas et aspelit volo dolor autaspe liguam dolessit.',
      category: 'Сурталчилгаа',
      imageUrl: '',
      timeAgo: '45 минутын өмнө'
    },
    {
      id: 'trend-3',
      title: 'Trending: Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.',
      category: 'Технологи',
      imageUrl: '',
      timeAgo: '1 цаг өмнө'
    },
    {
      id: 'trend-4',
      title: 'Trending: Quas et aspelit volo dolor autaspe liguam dolessit lorem ipsum dolor.',
      category: 'Улс төр',
      imageUrl: '',
      timeAgo: '1 цаг 15 минутын өмнө'
    },
    {
      id: 'trend-5',
      title: 'Trending: Intureius que quas et aspelit volo dolor autaspe liguam dolessit.',
      category: 'Эдийн засаг',
      imageUrl: '',
      timeAgo: '1 цаг 30 минутын өмнө'
    },
    {
      id: 'trend-6',
      title: 'Trending: Dolor autaspe liguam dolessit lorem ipsum dolor autaspe intureius.',
      category: 'Нийгэм',
      imageUrl: '',
      timeAgo: '2 цаг өмнө'
    },
    {
      id: 'trend-7',
      title: 'Trending: Autaspe liguam dolessit lorem ipsum dolor autaspe intureius que quas.',
      category: 'Дэлхий',
      imageUrl: '',
      timeAgo: '2 цаг 30 минутын өмнө'
    },
  ];

  const currentNews = activeTab === 'new' ? newNews : trendingNews;

  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span className="text-2xl font-bold text-zinc-800">
          Мэдээний урсгал
        </span>
      </h2>

      {/* Tabs */}
      <div className="flex gap-0 mb-4">
        <button
          onClick={() => setActiveTab('new')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition ${
            activeTab === 'new'
              ? 'bg-red-500 text-white'
              : 'bg-neutral-200 text-zinc-700 hover:bg-neutral-300'
          }`}
        >
          Шинэ мэдээ
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition ${
            activeTab === 'trending'
              ? 'bg-red-500 text-white'
              : 'bg-neutral-200 text-zinc-700 hover:bg-neutral-300'
          }`}
        >
          Trending мэдээ
        </button>
      </div>

      {/* News Feed with Scroll */}
      <div className="bg-white border border-neutral-200 rounded-b-lg">
        {/* Scrollable container - 5 visible, scroll for more */}
        <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-neutral-100">
          <div className="p-6 space-y-4">
            {currentNews.map((item, index) => (
              <div key={item.id}>
                <article className="cursor-pointer group">
                  <h3 className="text-sm font-medium text-zinc-800 leading-snug group-hover:text-red-500 transition mb-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="font-medium">{item.category}</span>
                    <span>•</span>
                    <time>{item.timeAgo}</time>
                  </div>
                </article>
                
                {index < currentNews.length - 1 && (
                  <div className="h-px bg-neutral-200 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;