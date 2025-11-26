// components/article/VideoContent.tsx
'use client';
import { useEffect, useRef } from 'react';

interface VideoContentProps {
  html: string;
}

export default function VideoContent({ html }: VideoContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const figures = contentRef.current.querySelectorAll('figure.media');
    
    figures.forEach((figure) => {
      const oembed = figure.querySelector('oembed');
      if (!oembed) return;

      const url = oembed.getAttribute('url');
      if (!url) return;

      let wrapper: HTMLDivElement | null = null;

      // ✅ YouTube video
      const youtubeMatch = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        
        wrapper = document.createElement('div');
        wrapper.style.cssText = `
          width: 100%;
          max-width: 578px;
          aspect-ratio: 16/9;
          margin: 0 auto;
          border-radius: 0.5rem;
          border: 1px solid #e5e5e5;
          background: #000;
          overflow: hidden;
          position: relative;
        `;
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
        iframe.style.cssText = `
          width: 100%;
          height: 100%;
          border: 0;
          position: absolute;
          top: 0;
          left: 0;
        `;
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('title', 'YouTube video');
        iframe.setAttribute('loading', 'lazy');
        
        wrapper.appendChild(iframe);
      }
      
      // ✅ Facebook video - Full width, no aspect ratio constraint
      const facebookVideoMatch = url.match(
        /facebook\.com\/(?:[^/]+\/)?(?:videos?|watch|reel)(?:\/|\?v=)([0-9]+)/
      );
      
      const facebookReelMatch = url.match(/facebook\.com\/reel\/([0-9]+)/);
      
      if ((facebookVideoMatch || facebookReelMatch) && !youtubeMatch) {
        wrapper = document.createElement('div');
        
        // Facebook video wrapper - no fixed aspect ratio, let FB control the size
        wrapper.style.cssText = `
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        `;
        
        const iframe = document.createElement('iframe');
        
        if (facebookReelMatch) {
          // Reel - portrait video
          iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=476&height=846`;
          iframe.style.cssText = `
            width: 100%;
            max-width: 476px;
            height: 846px;
            border: none;
            display: block;
            margin: 0 auto;
          `;
        } else {
          // Regular video - landscape
          iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`;
          iframe.style.cssText = `
            width: 100%;
            height: 314px;
            border: none;
            display: block;
          `;
        }
        
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share');
        iframe.setAttribute('title', facebookReelMatch ? 'Facebook Reel' : 'Facebook video');
        iframe.setAttribute('loading', 'lazy');
        
        wrapper.appendChild(iframe);
      }

      if (wrapper) {
        figure.replaceWith(wrapper);
      }
    });

    // Image processing
    const imageFigures = contentRef.current.querySelectorAll('figure.image, figure.image_resized, figure');
    imageFigures.forEach((figure) => {
      if (figure.querySelector('iframe')) return;
      
      const figureElement = figure as HTMLElement;
      figureElement.style.width = '100%';
      figureElement.style.maxWidth = '100%';
      figureElement.style.height = 'auto';
      figureElement.classList.add('w-full', 'max-w-full', 'my-6', 'md:my-8');
    });

    const images = contentRef.current.querySelectorAll('img');
    images.forEach((img) => {
      img.removeAttribute('width');
      img.removeAttribute('height');
      img.style.width = '100%';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.classList.add('w-full', 'h-auto', 'rounded-lg', 'border', 'border-neutral-200');
    });

  }, [html]);

  return (
    <div 
      ref={contentRef}
      className="article-content text-[#2F2F2F] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        fontSize: 'clamp(14px, 2vw, 16px)',
        lineHeight: '1.75'
      }}
    />
  );
}