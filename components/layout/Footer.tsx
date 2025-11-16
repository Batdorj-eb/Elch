import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer_logo from '@/public/footer_logo.png';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-800 text-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-8 lg:py-10">
        {/* Logo */}
        <div className="mb-6 lg:mb-8 text-center lg:text-left">
          <div className="text-3xl lg:text-4xl font-bold inline-block">
            <Image 
              src={Footer_logo} 
              alt="Elch News Logo" 
              width={150} 
              height={40} 
              className="inline-block"
            />
          </div>
        </div>
        {/* Links & Social */}
        <div className="border-t border-zinc-700 pt-6 lg:pt-8">

          {/* Links */}
          <nav className="flex justify-center lg:justify-end">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-center sm:text-right">
              <Link href="/about" className="text-sm hover:text-red-500 transition">
                Бидний тухай
              </Link>
              <Link href="/about" className="text-sm hover:text-red-500 transition">
                Нийтлэлийн бодлого
              </Link>
              <Link href="/about" className="text-sm hover:text-red-500 transition">
                Хамтран ажиллах
              </Link>
              <Link href="/about" className="text-sm hover:text-red-500 transition">
                Редакцийн бодлого
              </Link>
              <Link href="/privacy" className="text-sm hover:text-red-500 transition">
                Холбоо барих
              </Link>
              <Link href="/contact" className="text-sm hover:text-red-500 transition">
                Нууцын бодлого
              </Link>
            </div>
          </nav>

          {/* Social Media */}
          <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4 mb-6 lg:mb-8 mt-6">
            <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition">
              <Facebook className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition">
              <Instagram className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition">
              <Twitter className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a href="#" className="w-9 h-9 lg:w-10 lg:h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition">
              <Youtube className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-400 text-center lg:text-left">
            © 2025 Элч Ньюс. Бүх эрх хуулиар хамгаалагдсан.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

