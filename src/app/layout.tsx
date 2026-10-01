import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

import WhatsAppFloating from '@/components/WhatsAppFloating';

const outfit = Outfit({ subsets: ['latin'] });

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
      <body className={`${outfit.className} bg-[#0f1115] text-[#f0f0f2] antialiased relative`}>
        {children}
        <WhatsAppFloating />
      </body>
    </html>
  );
}
