
'use client';

import React from 'react';

const BreakingNewsBanner: React.FC = () => {
  return (
    <div className="bg-white border-b border-stone-300">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-96 py-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold text-red-500 uppercase whitespace-nowrap">
            ШУУРХАЙ МЭДЭЭ:
          </span>
          <p className="text-sm text-zinc-800">
            Black Cracker Barrel Employee Says She Was Called 'Burned Biscuit' In Lawsuit
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;