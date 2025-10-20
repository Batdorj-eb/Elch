import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-800 text-white">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-24 xl:px-96 py-8 lg:py-10">
        {/* Logo */}
        <div className="mb-6 lg:mb-8 text-center lg:text-left">
          <div className="text-3xl lg:text-4xl font-bold inline-block">
            <span className="text-red-500">E</span>
            <span className="text-white">LCH NEWS</span>
          </div>
        </div>

        {/* Links & Social */}
        <div className="border-t border-zinc-700 pt-6 lg:pt-8">
          {/* Links */}
          <nav className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-8">
            <Link 
              href="/about" 
              className="text-sm text-center hover:text-red-500 transition"
            >
              Бидний тухай
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-center hover:text-red-500 transition"
            >
              Нууцлалын бодлого
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-center hover:text-red-500 transition"
            >
              Холбоо барих
            </Link>
            <Link 
              href="/careers" 
              className="text-sm text-center hover:text-red-500 transition"
            >
              Ажлын байр
            </Link>
          </nav>

          {/* Social Media */}
          <div className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4 mb-6 lg:mb-8">
            <a 
              href="#" 
              className="w-9 h-9 lg:w-10 lg:h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 lg:w-10 lg:h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 lg:w-10 lg:h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a 
              href="#" 
              className="w-9 h-9 lg:w-10 lg:h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-400 text-center lg:text-left">
            © 2025 Elch News. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

