// components/layout/NavigationMenu.tsx

'use client';

import React, { useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { Category } from '@/lib/types';
import sm_logo from '../../public/sm_logo.png';
import Logo from '@/public/EN.svg'

interface NavigationMenuProps {
  categories: Category[];
  activeCategory?: string;
}
const WEATHER_API =
  'https://api.open-meteo.com/v1/forecast?latitude=47.9167&longitude=106.9167&current_weather=true&temperature_unit=celsius';

const NavigationMenu: React.FC<NavigationMenuProps> = ({ categories, activeCategory }) => { // ✅ activeCategory нэмэх
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dateString, setDateString] = useState('');
  const [weather, setWeather] = useState<{ temp: number; wind: number } | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const pathname = usePathname();

  const customOrder = useMemo(
    () => [
      'politics',
      'economy',
      'society',
      'peoples-representative',
      'tech',
      'fact-checking',
      'pop-news',
      'world',
      '126-attendance',
      'other',
    ],
    []
  );

  const orderedCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];

    const normalized = categories.map((c) => ({
      ...c,
      display_order: typeof c.display_order === 'number' ? c.display_order : 0,
    }));

    const fromCustom = customOrder
      .map((slug) => normalized.find((c) => c.slug === slug))
      .filter(Boolean) as Category[];

    const remaining = normalized
      .filter((c) => !customOrder.includes(c.slug))
      .sort((a, b) => {
        if (a.display_order !== b.display_order) return a.display_order - b.display_order;
        return a.name.localeCompare(b.name);
      });

    return [...fromCustom, ...remaining];
  }, [categories, customOrder]);

  const menuCategories = useMemo(
    () => orderedCategories.filter((c) => c.slug !== 'video'),
    [orderedCategories]
  );

  const visibleCategories = useMemo(
    () => orderedCategories.filter((c) => c.slug !== 'video'),
    [orderedCategories]
  );

  useEffect(() => {
    const now = new Date();
    setDateString(`${now.getFullYear()} ${now.getMonth() + 1} ${now.getDate()}`);
  }, []);

  useEffect(() => {
    fetch(WEATHER_API)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current_weather) {
          setWeather({
            temp: data.current_weather.temperature,
            wind: data.current_weather.windspeed,
          });
        }
      })
      .catch((err) => console.error('Weather API error:', err));
  }, []);

  useEffect(() => {
    let scrollY = 0;
    if (mobileMenuOpen) {
      scrollY = window.scrollY || document.documentElement.scrollTop;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 50);
    }

    return () => {
      if (mobileMenuOpen || document.body.style.position === 'fixed') {
        const top = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        const restoreY = top ? -parseInt(top || '0', 10) : 0;
        window.scrollTo(0, restoreY);
      }
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  return (
    <nav className="bg-[#FFF1E5] lg:bg-zinc-800 text-[#2F2F2F] lg:text-white sticky top-0 z-50 py-2 md:py-3 lg:py-0">
      <div
        className="max-w-[1325px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24"
      >
        <div className="flex items-center justify-between h-12 lg:h-auto">
          {/* Logo - LEFT */}
          <div className="shrink-0">
            <Link href="/">
              <Image
                src={sm_logo}
                alt="Logo"
                width={200}
                height={50}
                className="lg:hidden h-7 md:h-8 w-auto"
              />
            </Link>
            <Link href="/" className="hidden lg:block text-xl xl:text-2xl font-bold text-red-500">
              <Image src={Logo} alt='logo'/>
            </Link>
          </div>

          {/* Desktop Menu - CENTER */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-[1000px] mx-4">
            {menuCategories.map((category, index) => {
              const isActive = activeCategory 
                ? category.slug === activeCategory 
                : pathname.startsWith(`/${category.slug}`);
              
              return (
                <React.Fragment key={category.id}>
                  <Link
                    href={`/${category.slug}`}
                    className={`px-2 lg:px-3 xl:px-4 py-3 text-xs lg:text-sm hover:bg-zinc-700 transition whitespace-nowrap relative ${
                      isActive ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#FF3336]' : ''
                    }`}
                  >
                    {category.name}
                  </Link>
                  {index < menuCategories.length - 1 && <div className="h-4 lg:h-5 w-px bg-zinc-700" />}
                </React.Fragment>
              );
            })}
          </div>

          {/* Desktop Live Button - RIGHT */}
          <button className="hidden lg:flex items-center gap-1.5 lg:gap-2 shrink-0 px-3 lg:px-4 py-1.5 lg:py-2 bg-red-500 text-white text-xs lg:text-sm font-medium hover:bg-red-600 transition">
            <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white animate-pulse" />
            ШУУД
          </button>

          {/* Mobile Menu Button - RIGHT */}
          <button
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="lg:hidden p-1.5 md:p-2 hover:bg-zinc-100 rounded transition"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - FULLSCREEN OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          aria-hidden={!mobileMenuOpen}
        >
          <div
            className="absolute inset-0 bg-black/10"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div
            ref={panelRef}
            className="relative z-10 h-full"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="absolute inset-0 bg-[#FFF1E5] p-4 overflow-y-auto max-h-screen">
              <div className="flex justify-end">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded hover:bg-zinc-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center items-center gap-5 font-[10px] mb-10">
                <div className="flex gap-4 shrink-0">
                  <div className="flex gap-2 shrink-0">
                    <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 10.5V8.5M13 10.5V12.5M13 10.5H8.5M1 16.5V25.5C1 26.6046 1.89543 27.5 3 27.5H17C18.1046 27.5 19 26.6046 19 25.5V16.5H1Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M1 16.5V12.5C1 11.3954 1.89543 10.5 3 10.5H5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 8.5V12.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 16.5V12.5C19 11.3954 18.1046 10.5 17 10.5H16.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex flex-col text-xs w-[90px]">
                      <span className="text-xs font-bold text-[#2F2F2F] whitespace-nowrap">Өнөөдөр</span>
                      <span className="text-[#2F2F2F] font-sm">{dateString}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center" style={{marginLeft:"-20px"}}>
                      <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 21C15.7467 21 20 16.5228 20 11C20 5.47715 15.7467 1 10.5 1C5.25329 1 1 5.47715 1 11C1 16.5228 5.25329 21 10.5 21Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13 8C12.4292 7.31501 11.4239 6.83855 10.5 6.80872M10.5 6.80872C9.40075 6.77322 8.41667 7.36998 8.41667 9.00001C8.41667 12 13 10.5 13 13.5C13 15.211 11.7802 15.9462 10.5 15.891M10.5 6.80872V5M8 14.5C8.53707 15.3593 9.53567 15.8494 10.5 15.891M10.5 15.891V18" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#2F2F2F] whitespace-nowrap">Ам.доллар</span>
                      <span className="text-xs font-medium text-[#2F2F2F]">3,580.5</span>
                    </div>
                  </div>

                  <div className="flex gap-1 items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 13C4.33333 13 1 14 1 18C1 22 4.33333 23 6 23H18C19.6667 23 23 22 23 18C23 14 19.6667 13 18 13" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 9H20M12 2V1M19 4L18 5M6 4L7 5M4 9H5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#2F2F2F] whitespace-nowrap">Улаанбаатар хот</span>
                      <div className="text-xs font-medium text-[#2F2F2F]">
                        {weather ? `${weather.temp.toFixed(1)}°C` : '...'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Links */}
              <div className="mt-2 border-t border-[#C8C8C8]">
                {visibleCategories.map((category, idx) => {
                  const isActive = activeCategory 
                    ? category.slug === activeCategory 
                    : pathname.startsWith(`/${category.slug}`);
                  
                  return (
                    <Link
                      key={category.id}
                      href={`/${category.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-sm hover:bg-zinc-100 transition border-b border-[#C8C8C8] ${
                        isActive ? 'border-b-2 border-b-[#FF3336]' : ''
                      }`}
                      ref={idx === 0 ? firstLinkRef : undefined}
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>

              <button className="w-full mt-4 px-4 py-3 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                ШУУД
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;