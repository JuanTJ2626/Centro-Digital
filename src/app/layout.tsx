import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import WhatsAppFloating from '@/components/WhatsAppFloating';

const outfit = Outfit({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#fbfbfd',
};

export const metadata: Metadata = {
  title: 'Publideas | Imprenta Digital en CDMX | Libros, Anuarios, Calendarios y Stickers',
  description: 'Centro de impresión digital CMYK en CDMX (Col. La Obrera). Imprimimos libros, anuarios, calendarios, stickers, tarjetas, posters y catálogos en couché, bond y adhesivo. Entrega express mismo día.',
  icons: {
    icon: '/logo mejorado.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.className} bg-[#fbfbfd] text-[#1d1d1f] antialiased relative min-h-screen`}>
        {children}
        <WhatsAppFloating />
      </body>
    </html>
  );
}
