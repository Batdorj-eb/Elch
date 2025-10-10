'use client';

import React from 'react';
import Link from 'next/link';

const NavigationBar: React.FC = () => {
  const menuItems = [
    { label: 'Эхний хуудас', href: '/' },
    { label: 'Улс төр', href: '/politics' },
    { label: 'Эдийн засаг', href: '/economy' },
    { label: 'Спорт, урлаг', href: '/sports' },
    { label: 'Нийгэм', href: '/society' },
    { label: 'Хууль эрх зүй', href: '/law' },
    { label: 'Боловсрол', href: '/education' },
    { label: 'Дэлхий', href: '/world' },
    { label: '7 ХН видео', href: '/videos' },
    { label: 'Бусад', href: '/others' },
  ];

  return (
    <nav className="bg-zinc-800 text-white">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-96">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {/* Logo Icon */}
          <div className="shrink-0 mr-4">
            <span className="text-2xl font-bold text-red-500">EN</span>
          </div>

          {/* Menu Items */}
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 text-sm hover:bg-zinc-700 transition whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}

          {/* Live Button */}
          <button className="ml-auto shrink-0 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            ШУУД
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;