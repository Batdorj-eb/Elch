// components/article/VideoContent.tsx
'use client';
import { useEffect, useRef, useCallback } from 'react';

interface VideoContentProps {
  html: string;
}

interface FBSDKType {
  XFBML: {
    parse: (element?: HTMLElement | null) => void;
  };
  init: (config: { xfbml: boolean; version: string }) => void;
}

declare global {
  interface Window {
    FB?: FBSDKType;
    fbAsyncInit?: () => void;
  }
}

export default function VideoContent({ html }: VideoContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const fbLoadedRef = useRef(false);

  const parseFBVideos = useCallback(() => {
    if (window.FB && contentRef.current) {
      window.FB.XFBML.parse(contentRef.current);
    }
  }, []);

  // Load Facebook SDK
  useEffect(() => {
    if (fbLoadedRef.current) return;
    
    window.fbAsyncInit = () => {
      window.FB?.init({
        xfbml: true,
        version: 'v18.0'
      });
      parseFBVideos();
    };

    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      fbLoadedRef.current = true;
    } else if (window.FB) {
      parseFBVideos();
    }
  }, [parseFBVideos]);

  useEffect(() => {
    if (!contentRef.current) return;

    const figures = contentRef.current.querySelectorAll('figure.media');
    
    figures.forEach((figure) => {
      const oembed = figure.querySelector('oembed');
      if (!oembed) return;

      const url = oembed.getAttribute('url');
      if (!url) return;

      let wrapper: HTMLDivElement | null = null;

      // YouTube video
      const youtubeMatch = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        
        wrapper = document.createElement('div');
        wrapper.style.cssText = `
          width: 100%;
          max-width: 575px;
          aspect-ratio: 16/9;
          margin: 0 auto;
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
      
      // Facebook video
      const facebookVideoMatch = url.match(
        /facebook\.com\/(?:[^/]+\/)?(?:videos?|watch|reel)(?:\/|\?v=)([0-9]+)/
      );
      const facebookReelMatch = url.match(/facebook\.com\/reel\/([0-9]+)/);
      
      if ((facebookVideoMatch || facebookReelMatch) && !youtubeMatch) {
        wrapper = document.createElement('div');
        wrapper.style.cssText = `
          width: 100%;
          max-width: 575px;
          margin: 0 auto;
        `;
        
        const fbVideo = document.createElement('div');
        fbVideo.className = 'fb-video';
        fbVideo.setAttribute('data-href', url);
        fbVideo.setAttribute('data-width', '575');
        fbVideo.setAttribute('data-show-text', 'false');
        fbVideo.setAttribute('data-allowfullscreen', 'true');
        
        wrapper.appendChild(fbVideo);
      }

      if (wrapper) {
        figure.replaceWith(wrapper);
      }
    });

    // Parse after DOM update
    const timer = setTimeout(parseFBVideos, 200);

    // ============================================
    // TABLE PROCESSING - Responsive tables
    // ============================================
    const tableFigures = contentRef.current.querySelectorAll<HTMLElement>('figure.table');
    tableFigures.forEach((figureElement) => {
      // Figure wrapper - allow scroll on mobile
      figureElement.style.width = '100%';
      figureElement.style.maxWidth = '100%';
      figureElement.style.margin = '1.5rem 0';
      figureElement.style.overflowX = 'auto';
      figureElement.style.setProperty('-webkit-overflow-scrolling', 'touch');
      
      // Get the table inside
      const table = figureElement.querySelector<HTMLTableElement>('table');
      if (table) {
        // Check if mobile (< 768px)
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
          // Mobile: natural width with scroll
          table.style.width = 'auto';
          table.style.minWidth = '600px';
          table.style.tableLayout = 'auto';
          table.style.fontSize = '10px';
        } else {
          // Desktop: fit to container
          table.style.width = '100%';
          table.style.maxWidth = '100%';
          table.style.tableLayout = 'fixed';
          table.style.fontSize = '9px';
        }
        
        table.style.borderCollapse = 'collapse';
        
        // Style table cells - very compact
        const cells = table.querySelectorAll<HTMLTableCellElement>('td, th');
        cells.forEach((cell) => {
          cell.style.padding = isMobile ? '4px 6px' : '3px 4px';
          cell.style.border = '1px solid #e5e5e5';
          cell.style.verticalAlign = 'middle';
          cell.style.textAlign = 'center';
          
          if (isMobile) {
            cell.style.whiteSpace = 'nowrap';
          } else {
            cell.style.wordWrap = 'break-word';
            cell.style.whiteSpace = 'normal';
            cell.style.overflow = 'hidden';
            cell.style.textOverflow = 'ellipsis';
            cell.style.maxWidth = '80px';
          }
        });
        
        // Style images inside table - smaller
        const tableImages = table.querySelectorAll<HTMLImageElement>('img');
        tableImages.forEach((img) => {
          const imgSize = isMobile ? '40px' : '30px';
          const imgHeight = isMobile ? '50px' : '38px';
          
          img.style.width = imgSize;
          img.style.maxWidth = imgSize;
          img.style.minWidth = imgSize;
          img.style.height = imgHeight;
          img.style.objectFit = 'cover';
          img.style.borderRadius = '3px';
          img.style.display = 'block';
          img.style.margin = '0 auto';
          // Remove all classes that might override
          img.className = '';
        });
      }
    });

    // Also handle tables not wrapped in figure
    const standaloneTables = contentRef.current.querySelectorAll<HTMLTableElement>('table:not(figure.table table)');
    standaloneTables.forEach((tableElement) => {
      const isMobile = window.innerWidth < 768;
      
      // Wrap in scrollable container if not already
      if (!tableElement.parentElement?.classList.contains('table-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        wrapper.style.overflowX = 'auto';
        wrapper.style.setProperty('-webkit-overflow-scrolling', 'touch');
        wrapper.style.margin = '1.5rem 0';
        tableElement.parentNode?.insertBefore(wrapper, tableElement);
        wrapper.appendChild(tableElement);
      }
      
      if (isMobile) {
        tableElement.style.width = 'auto';
        tableElement.style.minWidth = '600px';
        tableElement.style.fontSize = '10px';
      } else {
        tableElement.style.width = '100%';
        tableElement.style.tableLayout = 'fixed';
        tableElement.style.fontSize = '9px';
      }
      tableElement.style.borderCollapse = 'collapse';
      
      const cells = tableElement.querySelectorAll<HTMLTableCellElement>('td, th');
      cells.forEach((cell) => {
        cell.style.padding = isMobile ? '4px 6px' : '3px 4px';
        cell.style.border = '1px solid #e5e5e5';
        cell.style.textAlign = 'center';
        if (!isMobile) {
          cell.style.wordWrap = 'break-word';
          cell.style.whiteSpace = 'normal';
        }
      });
    });

    // ============================================
    // IMAGE PROCESSING
    // ============================================
    const imageFigures = contentRef.current.querySelectorAll<HTMLElement>('figure.image, figure.image_resized');
    imageFigures.forEach((figureElement) => {
      if (figureElement.querySelector('iframe') || figureElement.querySelector('.fb-video')) return;
      
      figureElement.style.width = '100%';
      figureElement.style.maxWidth = '100%';
      figureElement.style.height = 'auto';
      figureElement.classList.add('w-full', 'max-w-full', 'my-6', 'md:my-8');
    });

    // Process images NOT inside tables
    const images = contentRef.current.querySelectorAll<HTMLImageElement>('img:not(.table-scroll-wrapper img):not(figure.table img)');
    images.forEach((img) => {
      img.removeAttribute('width');
      img.removeAttribute('height');
      img.style.width = '100%';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.classList.add('w-full', 'h-auto', 'rounded-lg', 'border', 'border-neutral-200');
    });

    return () => clearTimeout(timer);
  }, [html, parseFBVideos]);

  return (
    <div 
      ref={contentRef}
      className="article-content text-[#2F2F2F] leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        fontSize: 'clamp(13px, 2vw, 15px)',
        lineHeight: '1.75',
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    />
  );
}