'use client';

import React, { useState } from 'react';
import SearchModal from '@/components/search/SearchModal';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <>
      <div className="hidden md:block border-b border-stone-300 bg-[#FFF1E5]">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-96 py-5">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
            {/* Date Section */}
            <div className="flex items-center gap-2">
              <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 10.5V8.5M13 10.5V12.5M13 10.5H8.5M1 16.5V25.5C1 26.6046 1.89543 27.5 3 27.5H17C18.1046 27.5 19 26.6046 19 25.5V16.5H1Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 16.5V12.5C1 11.3954 1.89543 10.5 3 10.5H5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 8.5V12.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 16.5V12.5C19 11.3954 18.1046 10.5 17 10.5H16.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="flex flex-col text-sm">
                <span className="text-[#2F2F2F]">2025 оны 9-р сарын 25</span>
                <span className="text-zinc-600">Даваа гариг</span>
              </div>
            </div>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/main_logo.png"
                alt="ELCH NEWS Logo"
                width={180}
                height={60}
                className="h-10 lg:h-12 w-auto"
                priority
              />
            </div>

            {/* Right Info */}
            <div className="flex items-center gap-4">
              {/* Currency */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-[#2F2F2F]">Ам.доллар</span>
                <div className="flex items-center gap-2">
                  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 21C15.7467 21 20 16.5228 20 11C20 5.47715 15.7467 1 10.5 1C5.25329 1 1 5.47715 1 11C1 16.5228 5.25329 21 10.5 21Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 8C12.4292 7.31501 11.4239 6.83855 10.5 6.80872M10.5 6.80872C9.40075 6.77322 8.41667 7.36998 8.41667 9.00001C8.41667 12 13 10.5 13 13.5C13 15.211 11.7802 15.9462 10.5 15.891M10.5 6.80872V5M8 14.5C8.53707 15.3593 9.53567 15.8494 10.5 15.891M10.5 15.891V18" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-sm font-medium text-[#2F2F2F]">3,590.5</span>
                </div>
              </div>

              {/* Weather */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-[#2F2F2F]">Улаанбаатар хот</span>
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 13C4.33333 13 1 14 1 18C1 22 4.33333 23 6 23H18C19.6667 23 23 22 23 18C23 14 19.6667 13 18 13" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 9H20M12 2V1M19 4L18 5M6 4L7 5M4 9H5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex items-center gap-1 text-sm text-[#2F2F2F]">
                    <span>+20°</span>
                    <span>|</span>
                    <span>+5°</span>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-full hover:bg-zinc-50 transition"
                aria-label="Хайх"
              >
                <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden xl:inline text-sm text-zinc-600">
                  Хайх...
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Header;