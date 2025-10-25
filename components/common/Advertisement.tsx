import React from 'react';
import Image from 'next/image';

interface AdvertisementProps {
  imageUrl?: string;
  isVertical?: boolean;
  className?: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ 
  imageUrl = '',  
  isVertical = false,
  className = '' 
}) => {
  return (
    <div className={`${className}`}>
      {/* <div>
        <span className="text-xs text-zinc-500 uppercase">Сурталчилгаа</span>
      </div> */}
      
      <div className={` ${
        isVertical ? 'h-[680px]' : 'h-[270px]'
      }`}>
        <div className={`relative w-full h-full overflow-hidden bg-neutral-100`}>
         
          <Image
            src={imageUrl}
            alt="Advertisement"
            fill
            className="object-cover hover:opacity-90 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Advertisement;