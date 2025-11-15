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

      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      if (!match) return;

      const videoId = match[1];
      
      const wrapper = document.createElement('div');
      wrapper.className = 'relative w-full aspect-video my-6 md:my-8 rounded-lg overflow-hidden border border-neutral-200';
      
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.className = 'absolute top-0 left-0 w-full h-full';
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('title', 'YouTube video');
      
      wrapper.appendChild(iframe);
      figure.replaceWith(wrapper);
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