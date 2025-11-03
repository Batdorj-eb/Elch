'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Link as LinkIcon, MessageCircle, Check } from 'lucide-react';

interface CompactShareButtonsProps {
  title: string;
  url: string;
  description?: string;
}

const CompactShareButtons: React.FC<CompactShareButtonsProps> = ({ 
  title, 
  url, 
  description = '' 
}) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(
      shareUrl,
      'share-dialog',
      'width=600,height=450,location=0,menubar=0,toolbar=0'
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Facebook */}
      <button
        onClick={() => openShareWindow(shareUrls.facebook)}
        className="w-9 h-9 bg-[#1877F2] rounded-full flex items-center justify-center hover:opacity-80 transition"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4 text-white" fill="currentColor" />
      </button>

      {/* Twitter */}
      <button
        onClick={() => openShareWindow(shareUrls.twitter)}
        className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4 text-white" fill="currentColor" />
      </button>

      {/* Telegram */}
      <button
        onClick={() => openShareWindow(shareUrls.telegram)}
        className="w-9 h-9 bg-[#0088cc] rounded-full flex items-center justify-center hover:opacity-80 transition"
        aria-label="Share on Telegram"
      >
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.093.036.306.02.472z"/>
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => openShareWindow(shareUrls.whatsapp)}
        className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center hover:opacity-80 transition"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 text-white" fill="currentColor" />
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="w-9 h-9 bg-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-300 transition"
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <LinkIcon className="w-4 h-4 text-zinc-700" />
        )}
      </button>
    </div>
  );
};

export default CompactShareButtons;