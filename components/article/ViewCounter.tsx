// components/article/ViewCounter.tsx
'use client';

import { useEffect, useRef } from 'react';

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  const hasCounted = useRef(false);

  useEffect(() => {
    // Strict Mode болон давхар render-ээс хамгаална
    if (hasCounted.current) return;
    
    // SSR үед sessionStorage байхгүй
    if (typeof window === 'undefined') return;

    const viewedKey = `viewed_${slug}`;
    
    try {
      const alreadyViewed = sessionStorage.getItem(viewedKey);
      if (alreadyViewed) return;
      
      // Эхлээд flag тавьж, дараа нь API дуудна
      hasCounted.current = true;
      sessionStorage.setItem(viewedKey, 'true');

      const incrementView = async () => {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          await fetch(`${API_URL}/articles/slug/${slug}/increment-view`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          console.error('View count error:', error);
        }
      };

      incrementView();
    } catch (error) {
      // sessionStorage алдаа (private browsing гэх мэт)
      console.error('Storage error:', error);
    }
  }, [slug]);

  return null;
}