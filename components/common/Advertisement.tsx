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
  // Хэмжээ тодорхойлох
  const dimensions = isVertical 
    ? 'h-[650px] w-full'  // Vertical: 650px өндөр, full width
    : 'h-[288px] w-[650px]';  // Horizontal: 270px өндөр, 650px өргөн

  const imageContent = (
    <div className={`${dimensions} mx-auto`}>
      <div className="relative w-full h-full overflow-hidden bg-neutral-100">
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