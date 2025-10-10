'use client';

import React from 'react';
import type { NewsArticle } from '@/lib/types';

const NewsFeed: React.FC = () => {
  const feedItems: NewsArticle[] = [
    {
      id: 'feed-1',
      title: 'Эйзер амгалан байдлыг нэгтгэх ахуйд дэг арасан болхоо товойн тутад хорсоо очиж нийгнэж.',
      category: 'Улс төр',
      imageUrl: '',
      timeAgo: '2 цаг 30 минутын өмнө'
    },
    {
      id: 'feed-2',
      title: 'Эйзер амгалан байдлыг нэгтгэх ахуйд дэг арасан болхоо товойн тутад хорсоо очиж нийгнэж.',
      category: 'Эдийн засаг',
      imageUrl: '',
      timeAgo: '3 цаг өмнө'
    },
    {
      id: 'feed-3',
      title: 'Эйзер амгалан байдлыг нэгтгэх ахуйд дэг арасан болхоо товойн тутад хорсоо очиж нийгнэж.',
      category: 'Дэлхий',
      imageUrl: '',
      timeAgo: '5 цаг өмнө'
    },
  ];

  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span className="text-2xl font-bold text-zinc-800">
          Мазаалийн түгээл
        </span>
      </h2>

      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-4">
        {feedItems.map((item, index) => (
          <div key={item.id}>
            <article className="cursor-pointer group">
              <div className="flex items-center gap-2 mb-2 text-xs text-zinc-600">
                <span className="text-red-500 font-medium">{item.category}</span>
                <span>•</span>
                <time>{item.timeAgo}</time>
              </div>
              
              <h3 className="text-sm font-medium text-zinc-800 leading-snug group-hover:text-red-500 transition">
                {item.title}
              </h3>
            </article>
            
            {index < feedItems.length - 1 && (
              <div className="h-px bg-neutral-200 mt-4" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsFeed;