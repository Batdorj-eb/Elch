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

      // YouTube video - shorts оролцуулаад
      const youtubeMatch = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        
        wrapper = document.createElement('div');
        wrapper.className = 'relative w-full aspect-video my-6 md:my-8 rounded-lg overflow-hidden border border-neutral-200 bg-black';
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
        iframe.className = 'absolute top-0 left-0 w-full h-full';
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('title', 'YouTube video');
        iframe.setAttribute('loading', 'lazy');
        
        wrapper.appendChild(iframe);
      }
      
      // Facebook video, reel, watch
      const facebookVideoMatch = url.match(
        /facebook\.com\/(?:[^/]+\/)?(?:videos?|watch|reel)(?:\/|\?v=)([0-9]+)/
      );
      
      // Facebook reel format: facebook.com/reel/VIDEO_ID
      const facebookReelMatch = url.match(/facebook\.com\/reel\/([0-9]+)/);
      
      if ((facebookVideoMatch || facebookReelMatch) && !youtubeMatch) {
        wrapper = document.createElement('div');
        wrapper.className = 'relative w-full my-6 md:my-8 rounded-lg overflow-hidden border border-neutral-200';
        
        // Reel бол portrait (9:16), бусад нь landscape (16:9)
        if (facebookReelMatch) {
          wrapper.style.maxWidth = '500px';
          wrapper.style.margin = '1.5rem auto';
          wrapper.style.aspectRatio = '9/16';
        } else {
          wrapper.style.aspectRatio = '16/9';
        }
        
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`;
        iframe.className = 'w-full h-full';
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share');
        iframe.setAttribute('title', facebookReelMatch ? 'Facebook Reel' : 'Facebook video');
        iframe.setAttribute('loading', 'lazy');
        
        wrapper.appendChild(iframe);
      }

      // Replace figure with wrapper
      if (wrapper) {
        figure.replaceWith(wrapper);
      }
    });
  }, [html]);

  return (
    <div 
      ref={contentRef}
      className="text-[#2F2F2F] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        fontSize: 'clamp(16px, 2vw, 18px)',
        lineHeight: '1.75'
      }}
    />
  );
}