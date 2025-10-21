// components/article/SocialShare.tsx

'use client';

import React from 'react';
import { Facebook, Twitter, MessageCircle, Link as LinkIcon } from 'lucide-react';

const SocialShare: React.FC = () => {
  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`);
    // Add actual share logic here
  };

  return (
    <div className="flex items-center gap-2 mb-6 lg:mb-8">
      <button
        onClick={() => handleShare('facebook')}
        className="flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 bg-black text-white rounded hover:bg-zinc-800 transition"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
      <button
        onClick={() => handleShare('messenger')}
        className="flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        aria-label="Share on Messenger"
      >
        <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
      <button
        onClick={() => handleShare('copy')}
        className="flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 bg-neutral-200 text-zinc-700 rounded hover:bg-neutral-300 transition"
        aria-label="Copy link"
      >
        <LinkIcon className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
    </div>
  );
};

export default SocialShare;