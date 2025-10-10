import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-800 text-white">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-96 py-10">
        {/* Logo */}
        <div className="mb-8">
          <div className="text-4xl font-bold">
            <span className="text-red-500">E</span>
            <span className="text-white">LCH NEWS</span>
          </div>
        </div>

        {/* Links */}
        <div className="border-t border-zinc-700 pt-8">
          <nav className="flex flex-wrap gap-8 mb-8">
            <Link 
              href="/about" 
              className="text-sm hover:text-red-500 transition"
            >
              Бидний тухай
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm hover:text-red-500 transition"
            >
              Нууцлалын бодлого
            </Link>
            <Link 
              href="/contact" 
              className="text-sm hover:text-red-500 transition"
            >
              Холбоо барих
            </Link>
            <Link 
              href="/careers" 
              className="text-sm hover:text-red-500 transition"
            >
              Ажлын байр
            </Link>
          </nav>

          {/* Social Media */}
          <div className="flex items-center gap-4 mb-8">
            <a 
              href="#" 
              className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center hover:bg-red-500 transition"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-400">
            © 2025 Elch News. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;