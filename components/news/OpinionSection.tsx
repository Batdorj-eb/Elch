import React from 'react';
import Image from 'next/image';

const OpinionSection: React.FC = () => {
  const opinions = [
    {
      id: '1',
      title: 'Nemo asinvenderum intureius que quas et aspelit volo dolor autaspe et ipsum',
      author: 'Batbayar Altsanbud',
      imageUrl: 'https://i.pravatar.cc/150?img=1',
      date: '2020.05.19'
    },
    {
      id: '2',
      title: 'Nemo asinvenderum intureius que quas et aspelit volo dolor autaspe et ipsum',
      author: 'Oyunjargal Bataadai',
      imageUrl: 'https://i.pravatar.cc/150?img=2',
      date: '2020.05.19'
    },
    {
      id: '3',
      title: 'Nemo asinvenderum intureius que quas et aspelit volo dolor autaspe et ipsum',
      author: 'Batmunkh Tsetsegee',
      imageUrl: 'https://i.pravatar.cc/150?img=3',
      date: '2020.05.19'
    }
  ];

  return (
    <section className="my-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span className="text-2xl font-bold text-[#2F2F2F]">
          Ардын Элч
        </span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {opinions.map((opinion) => (
          <article key={opinion.id} className="group cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={opinion.imageUrl}
                  alt={opinion.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2F2F2F]">
                  {opinion.author}
                </p>
              </div>
            </div>
            
            <h3 className="text-base font-semibold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition">
              {opinion.title}
            </h3>
            
            <time className="text-xs text-zinc-500 mt-2 block">
              {opinion.date}
            </time>
          </article>
        ))}
      </div>
     <div className="flex justify-center">
        <button className="w-[366px] mt-5 lg:mt-6 px-6 py-2.5 lg:py-3 bg-red-500 text-white text-sm lg:text-base font-medium rounded hover:bg-red-600 transition">
          Дэлгэрэнгүй үзэх
        </button>
      </div>
    </section>
  );
};

export default OpinionSection;