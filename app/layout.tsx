// app/layout.tsx

import type { Metadata } from 'next';
import { MarketProvider } from '@/context/MarketContext';
import './globals.css';
import { Nunito, Inter } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CYTRAC — The Cybersecurity Family Board Game',
  description:
    'Make family game night count. CYTRAC teaches real digital safety skills through play — no screens required. Pre-order now.',
  openGraph: {
    title: 'CYTRAC — The Cybersecurity Family Board Game',
    description:
      'Make family game night count. CYTRAC teaches real digital safety skills through play — no screens required.',
    type: 'website',
    // og:image added here once /public/og/cytrac-og.png exists
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang='en'
      className={`h-full scroll-smooth ${nunito.variable} ${inter.variable}`}
    >
      <body className='min-h-full flex flex-col antialiased bg-bg-light text-body'>
        <MarketProvider>{children}</MarketProvider>
      </body>
    </html>
  );
}
