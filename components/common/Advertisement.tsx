// components/Advertisement.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AdvertisementProps {
  imageUrl?: string;
  isVertical?: boolean;
  className?: string;
  linkUrl?: string;  // ✅ Холбоос нэмсэн
  title?: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ 
  imageUrl = '',  
  isVertical = false,
  className = '',
  linkUrl,
  title = 'Advertisement'
}) => {
  const imageContent = (
    <div className={`${isVertical ? 'h-[680px]' : 'h-[270px]'}`}>
      <div className="relative w-full h-full overflow-hidden bg-neutral-100 rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );

  // Холбоос байвал Link-ээр ороох
  if (linkUrl) {
    return (
      <div className={className}>
        <Link 
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {imageContent}
        </Link>
      </div>
    );
  }

  // Холбоосгүй бол зүгээр зураг
  return (
    <div className={className}>
      {imageContent}
    </div>
  );
};

export default Advertisement;