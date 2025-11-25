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

    // ========================================
    // 1. VIDEO PROCESSING (YouTube, Facebook)
    // ========================================
    const figures = contentRef.current.querySelectorAll('figure.media');
    
    figures.forEach((figure) => {
      const oembed = figure.querySelector('oembed');
      if (!oembed) return;

      const url = oembed.getAttribute('url');
      if (!url) return;

      let wrapper: HTMLDivElement | null = null;

      // ✅ YouTube video - shorts оролцуулаад
      const youtubeMatch = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        
        // ✅ FIXED: Padding-bottom trick for proper aspect ratio
        wrapper = document.createElement('div');
        wrapper.className = 'video-responsive-wrapper';
        wrapper.style.cssText = `
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          max-width: 100%;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
          border: 1px solid #e5e5e5;
          background: #000;
        `;
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
        iframe.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        `;
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('title', 'YouTube video');
        iframe.setAttribute('loading', 'lazy');
        
        wrapper.appendChild(iframe);
      }
      
      // ✅ Facebook video, reel, watch
      const facebookVideoMatch = url.match(
        /facebook\.com\/(?:[^/]+\/)?(?:videos?|watch|reel)(?:\/|\?v=)([0-9]+)/
      );
      
      const facebookReelMatch = url.match(/facebook\.com\/reel\/([0-9]+)/);
      
      if ((facebookVideoMatch || facebookReelMatch) && !youtubeMatch) {
        wrapper = document.createElement('div');
        wrapper.className = 'video-responsive-wrapper';
        
        // ✅ FIXED: Different aspect ratios
        if (facebookReelMatch) {
          // Portrait video (9:16)
          wrapper.style.cssText = `
            position: relative;
            padding-bottom: 177.78%;
            height: 0;
            overflow: hidden;
            max-width: 500px;
            margin: 1.5rem auto;
            border-radius: 0.5rem;
            border: 1px solid #e5e5e5;
          `;
        } else {
          // Landscape video (16:9)
          wrapper.style.cssText = `
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            max-width: 100%;
            margin: 1.5rem 0;
            border-radius: 0.5rem;
            border: 1px solid #e5e5e5;
          `;
        }
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560&height=315`;
        iframe.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          overflow: hidden;
        `;
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

    // ========================================
    // 2. IMAGE PROCESSING (FIX OVERFLOW)
    // ========================================
    
    // ✅ Fix all figure elements (images)
    const imageFigures = contentRef.current.querySelectorAll('figure.image, figure.image_resized, figure');
    imageFigures.forEach((figure) => {
      // Skip if it's a video wrapper we just created
      if (figure.querySelector('iframe')) return;
      
      const figureElement = figure as HTMLElement;
      
      // Remove inline width styles
      figureElement.style.width = '100%';
      figureElement.style.maxWidth = '100%';
      figureElement.style.height = 'auto';
      
      // Add responsive classes
      figureElement.classList.add('w-full', 'max-w-full', 'my-6', 'md:my-8');
    });

    // ✅ Fix all img elements
    const images = contentRef.current.querySelectorAll('img');
    images.forEach((img) => {
      // Remove inline width/height attributes
      img.removeAttribute('width');
      img.removeAttribute('height');
      
      // Remove inline styles that set fixed width
      img.style.width = '100%';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      
      // Add Tailwind classes
      img.classList.add('w-full', 'h-auto', 'rounded-lg', 'border', 'border-neutral-200');
    });

  }, [html]);

  return (
    <div 
      ref={contentRef}
      className="article-content text-[#2F2F2F] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        fontSize: 'clamp(16px, 2vw, 18px)',
        lineHeight: '1.75'
      }}
    />
  );
}