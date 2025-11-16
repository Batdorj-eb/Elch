'use client';

import React from 'react';

const TopicsSection: React.FC = () => {
  const topics = [
    'Sports', 'Sport', 'Улс төр', 'Сошиал',
    'Politics', 'War', 'Trump', 'Dollar',
  ];

  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span className="text-2xl font-bold text-[#2F2F2F]">
          Топик
        </span>
      </h2>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <button
            key={`${topic}-${index}`}
            className="px-4 py-2 text-sm text-[#2F2F2F] rounded-full border border-[#C8C8C8] hover:bg-red-500 hover:text-white transition"
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TopicsSection;