// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'ELCH NEWS - Монголын мэдээний портал',
  description: 'Шуурхай мэдээ, улс төр, эдийн засаг, спорт болон бусад сонирхолтой мэдээллүүд',
  keywords: ['мэдээ', 'монгол', 'улс төр', 'эдийн засаг', 'спорт', 'elch news'],
  authors: [{ name: 'Elch News Team' }],
  openGraph: {
    title: 'ELCH NEWS',
    description: 'Монголын мэдээний портал',
    type: 'website',
    locale: 'mn_MN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}