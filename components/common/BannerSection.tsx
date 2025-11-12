// components/BannerSection.tsx
import { getHorizontalBanners, getVerticalBanners } from '@/lib/api';
import Advertisement from './Advertisement';

interface BannerSectionProps {
  type: 'vertical' | 'horizontal';
  className?: string;
}

export default async function BannerSection({ type, className = '' }: BannerSectionProps) {
  // Banner татаж авах
  const banners = type === 'vertical' 
    ? await getVerticalBanners()
    : await getHorizontalBanners();

  // Banner байхгүй бол харуулахгүй
  if (!banners || banners.length === 0) {
    return null;
  }

  // Эхний идэвхтэй banner-г авах
  const banner = banners[0];

  return (
    <Advertisement
      imageUrl={banner.image_url}
      linkUrl={banner.link_url}
      title={banner.title}
      isVertical={type === 'vertical'}
      className={className}
    />
  );
}