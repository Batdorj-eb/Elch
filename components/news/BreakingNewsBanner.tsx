'use client';

import React from 'react';

const BreakingNewsBanner: React.FC = () => {
  return (
    <div className="bg-white border-b border-stone-300 overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-2">
        <div className="flex items-center gap-3">
          <span className="text-xs sm:text-sm font-bold text-red-500 uppercase whitespace-nowrap">
            ШУУРХАЙ МЭДЭЭ:
          </span>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs sm:text-sm text-[#2F2F2F] whitespace-nowrap animate-marquee">
              Black Cracker Barrel Employee Says She Was Called 'Burned Biscuit' In Lawsuit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;