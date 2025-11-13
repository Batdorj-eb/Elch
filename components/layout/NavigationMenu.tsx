// components/layout/NavigationMenu.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import type { Category } from '@/lib/types';
import sm_logo from '../../public/sm_logo.png'

interface NavigationMenuProps {
  categories: Category[];
}
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=47.9167&longitude=106.9167&current_weather=true&temperature_unit=celsius';

const NavigationMenu: React.FC<NavigationMenuProps> = ({ categories }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleCategories = categories.filter(
    (cat) => cat.slug !== 'video' 
  );
  const sortedCategories = categories
    .filter(cat => cat.is_active)  // идэвхтэй category-ууд
    .sort((a, b) => a.display_order - b.display_order);

  
    const [dateString, setDateString] = useState('');
    const [dayString, setDayString] = useState('');
    const [weather, setWeather] = useState<{ temp: number; wind: number } | null>(null);
  
    useEffect(() => {
      const now = new Date();
      setDateString(`${now.getFullYear()} оны ${now.getMonth() + 1}-р сарын ${now.getDate()}`);
      setDayString(now.toLocaleDateString('mn-MN', { weekday: 'long' }));
    }, []);
  
    useEffect(() => {
        // Цаг агаар татах
        fetch(WEATHER_API)
          .then(res => res.json())
          .then(data => {
            if (data && data.current_weather) {
              setWeather({
                temp: data.current_weather.temperature,
                wind: data.current_weather.windspeed,
              });
            }
          })
          .catch(err => console.error('Weather API error:', err));
      }, []);

  return (
    <nav className="bg-[#FFF1E5] lg:bg-zinc-800 text-[#2F2F2F] lg:text-white sticky top-0 z-50 py-2 md:py-3 lg:py-0">
      <div 
        className="max-w-[1325px] mx-auto"
        style={{
          paddingLeft: 'clamp(16px, 5vw, 384px)',
          paddingRight: 'clamp(16px, 5vw, 384px)'
        }}
      >
        <div className="flex items-center justify-between h-12 lg:h-auto">
          {/* Logo - LEFT */}
          <div className="shrink-0">
            <Image
              src={sm_logo}
              alt="Logo"
              width={200}
              height={50}
              className="lg:hidden h-7 md:h-8 w-auto"
            />
            <Link href="/" className="hidden lg:block text-xl xl:text-2xl font-bold text-red-500">
              EN
            </Link>
          </div>

          {/* Desktop Menu - CENTER */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-[1000px] mx-4">
            {sortedCategories.map((category, index) => (
              <React.Fragment key={category.id}>
                <Link
                  href={`/${category.slug}`}
                  className="px-2 lg:px-3 xl:px-4 py-3 text-xs lg:text-sm hover:bg-zinc-700 transition whitespace-nowrap"
                >
                  {category.name}
                </Link>
                {index < sortedCategories.length - 1 && (
                  <div className="h-4 lg:h-5 w-px bg-zinc-700" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Desktop Live Button - RIGHT */}
          <button className="hidden lg:flex items-center gap-1.5 lg:gap-2 shrink-0 px-3 lg:px-4 py-1.5 lg:py-2 bg-red-500 text-white text-xs lg:text-sm font-medium rounded hover:bg-red-600 transition">
            <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full animate-pulse" />
            ШУУД
          </button>

          {/* Mobile Menu Button - RIGHT */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 md:p-2 hover:bg-zinc-100 rounded transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 py-2 mt-2">
                      <div className="flex justify-between items-center gap-5 sm:hidden font-[10px] mb-2">
              {/* Date Section */}
              <div className="flex items-center gap-2 shrink-0">
                <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10.5V8.5M13 10.5V12.5M13 10.5H8.5M1 16.5V25.5C1 26.6046 1.89543 27.5 3 27.5H17C18.1046 27.5 19 26.6046 19 25.5V16.5H1Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 16.5V12.5C1 11.3954 1.89543 10.5 3 10.5H5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 8.5V12.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 16.5V12.5C19 11.3954 18.1046 10.5 17 10.5H16.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex flex-col text-xs w-[90px]">
                  <span className="text-[#2F2F2F] font-sm">{dateString}</span>
                </div>
              </div>
              {/* Right Info */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Currency */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-[#2F2F2F] whitespace-nowrap">Ам.доллар</span>
                  <div className="flex items-center gap-2">
                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 21C15.7467 21 20 16.5228 20 11C20 5.47715 15.7467 1 10.5 1C5.25329 1 1 5.47715 1 11C1 16.5228 5.25329 21 10.5 21Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13 8C12.4292 7.31501 11.4239 6.83855 10.5 6.80872M10.5 6.80872C9.40075 6.77322 8.41667 7.36998 8.41667 9.00001C8.41667 12 13 10.5 13 13.5C13 15.211 11.7802 15.9462 10.5 15.891M10.5 6.80872V5M8 14.5C8.53707 15.3593 9.53567 15.8494 10.5 15.891M10.5 15.891V18" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-xs font-medium text-[#2F2F2F]">3,580.5</span>
                  </div>
                </div>
  
                {/* Weather */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-[#2F2F2F] whitespace-nowrap">Улаанбаатар хот</span>
                  <div className="flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 13C4.33333 13 1 14 1 18C1 22 4.33333 23 6 23H18C19.6667 23 23 22 23 18C23 14 19.6667 13 18 13" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 9H20M12 2V1M19 4L18 5M6 4L7 5M4 9H5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="text-xs font-medium text-[#2F2F2F]">
                      {weather ? `${weather.temp.toFixed(1)}°C` : '...'}
                    </div>
                  </div>
                </div>
              </div>
          </div>
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm hover:bg-zinc-100 transition rounded"
              >
                {category.name}
              </Link>
            ))}
            <button className="w-full mt-2 px-4 py-2.5 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              ШУУД
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;