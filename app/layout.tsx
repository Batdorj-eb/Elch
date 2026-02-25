import type { Metadata } from 'next';
import localFont from 'next/font/local'
import './globals.css';

const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter-Regular.woff2',  
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
})

const playfair = localFont({
  src: [
    {
      path: '../public/fonts/PlayfairDisplay-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/PlayfairDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'ELCH NEWS - Ардын Элч',
  description: 'Шуурхай мэдээ, улс төр, эдийн засаг, спорт болон бусад сонирхолтой мэдээллүүд',
  keywords: ['мэдээ', 'монгол', 'улс төр', 'эдийн засаг', 'спорт', 'elch news'],
  authors: [{ name: 'Elch News Team' }],
  openGraph: {
    title: 'ELCH NEWS - Ардын Элч',
    description: 'Монголын мэдээний портал',
    type: 'website',
    locale: 'mn_MN',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta
          property="fb:app_id"
          content={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "2617569178642307"}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}