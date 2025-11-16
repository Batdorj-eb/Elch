// components/Advertisement.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AdvertisementProps {
  imageUrl?: string;
  isVertical?: boolean;
  className?: string;
  linkUrl?: string;
  title?: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({
  imageUrl = '',
  isVertical = false,
  className = '',
  linkUrl,
  title = 'Advertisement'
}) => {
  // Responsive хэмжээ: mobile -> tablet -> desktop. Desktop logic (lg) хэвээр байна.
  const dimensions = isVertical
    ? // Vertical: mobile full-width, height grows with breakpoints, lg keeps original 650px
      'w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]'
    : // Horizontal: mobile full-width short height, grows to lg where width becomes 650px & height 288px
      'w-full h-[160px] sm:h-[200px] md:h-[240px] lg:h-[288px] lg:w-[725px]';

  const wrapperClass = `mx-auto ${dimensions}`;

  const imageContent = (
    <div className={wrapperClass}>
      <div className="relative w-full h-full overflow-hidden bg-neutral-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 650px"
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          // Placeholder when no image provided (keeps layout stable on mobile)
          <div
            role="img"
            aria-label={title}
            className="w-full h-full flex items-center justify-center text-sm text-zinc-500"
          >
            {title}
          </div>
        )}
      </div>
    </div>
  );

  if (linkUrl) {
    return (
      <div className={className}>
        <Link
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={title}
        >
          {imageContent}
        </Link>
      </div>
    );
  }

  return <div className={className}>{imageContent}</div>;
};

export default Advertisement;
