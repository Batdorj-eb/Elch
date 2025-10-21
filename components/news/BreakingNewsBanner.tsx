'use client';

import React from 'react';

const BreakingNewsBanner: React.FC = () => {
  return (
    <div className="bg-white border-b border-stone-300">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-2">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-xs sm:text-sm font-bold text-red-500 uppercase whitespace-nowrap">
            ШУУРХАЙ МЭДЭЭ:
          </span>
          <p className="text-xs sm:text-sm text-zinc-800 flex-1">
            Black Cracker Barrel Employee Says She Was Called 'Burned Biscuit' In Lawsuit
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;