
import React from 'react';
import Image from 'next/image';

interface AdvertisementProps {
  imageUrl: string;
  isVertical?: boolean;
  className?: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ 
  imageUrl, 
  isVertical = false,
  className = '' 
}) => {
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-zinc-500 uppercase">Сурталчилгаа</span>
      </div>
      
      <div className={`relative overflow-hidden rounded-lg bg-neutral-100 ${
        isVertical ? 'w-full h-[600px]' : 'w-full h-[200px]'
      }`}>
        <Image
          src={imageUrl}
          alt="Advertisement"
          fill
          className="object-cover hover:opacity-90 transition"
        />
      </div>
    </div>
  );
};

export default Advertisement;