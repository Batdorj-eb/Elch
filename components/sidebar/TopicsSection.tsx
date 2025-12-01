// components/sidebar/TopicsSection.tsx

import React from 'react';
import Link from 'next/link';
import { getTags } from '@/lib/api';

const TopicsSection = async () => {
  const tags = await getTags(10);

  if (tags.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="flex items-center gap-4 mb-6">
        <div className="w-[7px] h-[22px] bg-red-500" />
        <span className="text-2xl font-bold text-[#2F2F2F]">Топик</span>
      </h2>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Link
            key={`${tag}-${index}`}
            href={`/search?q=${encodeURIComponent(tag)}`}
            className="px-4 py-2 text-sm text-[#2F2F2F] rounded-full border border-[#C8C8C8] hover:bg-red-500 hover:text-white transition"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopicsSection;