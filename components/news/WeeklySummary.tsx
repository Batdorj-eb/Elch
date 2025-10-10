'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const WeeklySummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Бүгд');

  const tabs = ['Бүгд', '7 хоногийн 01', '7 хоногийн 02', '7 хоногийн 03', '7 хоногийн 04', '7 хоногийн 05'];

  const weeklyItems = [
    {
      id: '1',
      title: 'Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit.',
      category: '7 хоногийн 01',
      imageUrl: 'https://placehold.co/200x150/3b82f6/white?text=Weekly+1',
      views: 12
    },
    {
      id: '2',
      title: 'Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit.',
      category: '7 хоногийн 02',
      imageUrl: 'https://placehold.co/200x150/10b981/white?text=Weekly+2',
      views: 15
    },
    {
      id: '3',
      title: 'Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit.',
      category: '7 хоногийн 03',
      imageUrl: 'https://placehold.co/200x150/f59e0b/white?text=Weekly+3',
      views: 8
    }
  ];

  return (
    <section className="my-10">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
        <h2 className="flex items-center gap-4">
          <div className="w-[7px] h-[22px] bg-red-500" />
          <span className="text-2xl font-bold text-zinc-800">
            7 хоногийн төлөө
          </span>
        </h2>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-full transition whitespace-nowrap ${
                tab === activeTab
                  ? 'bg-red-500 text-white' 
                  : 'bg-neutral-100 text-zinc-800 hover:bg-neutral-200'
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="px-4 py-2 text-sm bg-neutral-100 rounded-full hover:bg-neutral-200 whitespace-nowrap">
            +++
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {weeklyItems.map((item) => (
          <article key={item.id} className="flex gap-4 cursor-pointer group">
            <div className="relative w-[120px] h-[80px] shrink-0 rounded-lg overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>
            
            <div className="flex-1">
              <span className="text-xs text-red-500 font-medium">
                {item.category}
              </span>
              <h3 className="text-sm font-medium text-zinc-800 mt-1 leading-snug group-hover:text-red-500 transition line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-zinc-500">
                <span>👁 {item.views}</span>
                <span>💬 0</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WeeklySummary;