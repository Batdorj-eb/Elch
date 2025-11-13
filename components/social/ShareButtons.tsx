'use client';

import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, description = '' }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);

  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;

  const openShareWindow = (shareUrl: string) => {
    window.open(
      shareUrl,
      'share-dialog',
      'width=600,height=450,location=0,menubar=0,toolbar=0'
    );
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => openShareWindow(fbUrl)}
        className="w-9 h-9 bg-[#1877F2] rounded-full flex items-center justify-center hover:opacity-80 transition"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4 text-white" fill="currentColor" />
      </button>

      <button
        onClick={() => openShareWindow(twitterUrl)}
        className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4 text-white" fill="currentColor" />
      </button>

      <button
        onClick={() => openShareWindow(linkedinUrl)}
        className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center hover:opacity-80 transition"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-white" fill="currentColor" />
      </button>

      <button
        onClick={() => openShareWindow(whatsappUrl)}
        className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center hover:opacity-80 transition"
        aria-label="Share on WhatsApp"
      >
      </button>
    </div>
  );
};

export default ShareButtons;
