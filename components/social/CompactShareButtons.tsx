'use client';

import React, { useState } from 'react';
import { Facebook, Twitter, Link as LinkIcon, Check } from 'lucide-react';

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
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Fallback copy failed:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Facebook */}
      <button
        onClick={() => openShareWindow(shareUrls.facebook)}
        className="w-9 h-9 bg-[#1877F2] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Share on Facebook"
        title="Facebook хуваалцах"
      >
        <Facebook className="w-4 h-4 text-white" fill="currentColor" />
      </button>

      {/* Twitter (X) */}
      <button
        onClick={() => openShareWindow(shareUrls.twitter)}
        className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Share on Twitter"
        title="Twitter (X) хуваалцах"
      >
        <Twitter className="w-4 h-4 text-white" fill="currentColor" />
      </button>

      {/* Telegram */}
      <button
        onClick={() => openShareWindow(shareUrls.telegram)}
        className="w-9 h-9 bg-[#0088cc] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Share on Telegram"
        title="Telegram хуваалцах"
      >
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.093.036.306.02.472z"/>
        </svg>
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => openShareWindow(shareUrls.whatsapp)}
        className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
        aria-label="Share on WhatsApp"
        title="WhatsApp хуваалцах"
      >
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          copied 
            ? 'bg-green-100 hover:bg-green-200' 
            : 'bg-zinc-200 hover:bg-zinc-300'
        }`}
        aria-label="Copy link"
        title={copied ? "Хуулагдлаа!" : "Холбоос хуулах"}
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