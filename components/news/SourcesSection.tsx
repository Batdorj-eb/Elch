import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const SourcesSection: React.FC = () => {
  const sources = [
    {
      id: '1',
      title: 'Mongolia asinvenderum intureius que quas et aspelit volo dolor autaspe world...',
      category: 'Сурвалж',
      imageUrl: 'https://placehold.co/400x300/ef4444/white?text=Source+1',
      author: 'Tseegmid'
    },
    {
      id: '2',
      title: 'Dollar asinvenderum intureius que quas et aspelit volo dolor autaspe world...',
      category: 'Сурвалж',
      imageUrl: 'https://placehold.co/400x300/3b82f6/white?text=Source+2',
      author: 'Tseegmid'
    },
    {
      id: '3',
      title: 'Trump asinvenderum intureius que quas et aspelit volo dolor autaspe...',
      category: 'Сурвалж',
      imageUrl: 'https://placehold.co/400x300/10b981/white?text=Source+3',
      author: 'Tseegmid'
    }
  ];

  return (
    <section className="my-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span className="text-2xl font-bold text-zinc-800">
          Сурвалж:бага
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {sources.map((source) => (
          <article key={source.id} className="group cursor-pointer">
            <div className="relative w-full h-[200px] mb-4 rounded-lg overflow-hidden">
              <Image
                src={source.imageUrl}
                alt={source.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-red-500 ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            
            <span className="text-xs text-red-500 font-medium">
              {source.category}
            </span>
            <h3 className="text-sm font-medium text-zinc-800 mt-2 leading-snug group-hover:text-red-500 transition line-clamp-2">
              {source.title}
            </h3>
            <p className="text-xs text-zinc-500 mt-2">{source.author}</p>
          </article>
        ))}
      </div>

      <button className="w-full mt-6 px-6 py-3 bg-red-500 text-white font-medium rounded hover:bg-red-600 transition">
        Дэлгэрэнгүй үзэх
      </button>
    </section>
  );
};

export default SourcesSection;