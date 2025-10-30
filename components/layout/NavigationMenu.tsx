// components/layout/NavigationMenu.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../app/mobile_logo.png';
import type { Category } from '@/lib/types';

interface NavigationMenuProps {
  categories: Category[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ categories }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#FFF1E5] lg:bg-zinc-800 text-[#2F2F2F] lg:text-white sticky top-0 z-50 py-3 lg:py-0">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96">
        {/* Desktop & Mobile Header */}
        <div className="flex items-center justify-between h-12 lg:h-auto">
          {/* Logo Icon */}
          <div className="shrink-0">
            {/* Mobile logo image */}
            <Image
              src={Logo}
              alt="Logo"
              width={200}
              className="md:hidden"
            />

            {/* Desktop text logo */}
            <Link href="/" className="hidden lg:block text-xl lg:text-2xl font-bold text-red-500">
              EN
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            {categories.map((category, index) => (
              <React.Fragment key={category.id}>
                <Link
                  href={`/${category.slug}`}
                  className="px-3 xl:px-4 py-3 text-sm hover:bg-zinc-700 transition whitespace-nowrap"
                >
                  {category.name}
                </Link>
                {index < categories.length - 1 && (
                  <div className="h-5 w-px bg-zinc-700" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Desktop Live Button */}
          <button className="hidden lg:flex items-center gap-2 shrink-0 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            ШУУД
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-zinc-700 rounded transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-700 py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${category.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm hover:bg-zinc-700 transition"
              >
                {category.name}
              </Link>
            ))}
            <button className="w-full mt-2 px-4 py-3 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition flex items-center justify-center gap-2">
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