'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface ViewTrackerProps {
  articleId: number;
  initialViews: number;
  slug: string;
}

export default function ViewTracker({ articleId, initialViews, slug }: ViewTrackerProps) {
  const [views, setViews] = useState(initialViews);
  const [isIncremented, setIsIncremented] = useState(false);

  useEffect(() => {
    // Нэг удаа л increment хийх
    if (isIncremented) return;

    const incrementView = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles/slug/${slug}/increment-view`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data) {
            setViews(data.data.views);
            setIsIncremented(true);
            
            // LocalStorage-д хадгалах (дахин increment хийхгүйн тулд)
            localStorage.setItem(`viewed_${slug}`, 'true');
          }
        }
      } catch (error) {
        console.error('Failed to increment view:', error);
      }
    };

    // Өмнө үзсэн эсэхийг шалгах
    const hasViewed = localStorage.getItem(`viewed_${slug}`);
    
    if (!hasViewed) {
      // 1 секунд delay (bot/crawler-ээс хамгаалах)
      const timer = setTimeout(() => {
        incrementView();
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsIncremented(true);
    }
  }, [articleId, slug, isIncremented]);

  return (
    <span className="flex items-center gap-1">
      <Eye className="w-3 h-3 md:w-4 md:h-4" />
      <span>{views.toLocaleString()}</span>
    </span>
  );
}