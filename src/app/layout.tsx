import type { Metadata, Viewport } from 'next';
import './globals.css';

import WhatsAppFloating from '@/components/WhatsAppFloating';
import MobileBottomBar from '@/components/MobileBottomBar';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'Publideas | Impresión Digital en CDMX | Libros, Anuarios, Stickers y Catálogo',
  description: 'Imprenta digital en CDMX (Col. La Obrera). Libros, anuarios escolares, calendarios, stickers con medio corte, tabloides y lonas. Compra directa y cotizaciones por WhatsApp en minutos.',
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
      <body className="bg-[#fbfbfd] text-[#0f172a] antialiased relative min-h-screen pb-16 sm:pb-0">
        {children}
        <WhatsAppFloating />
        <MobileBottomBar />
      </body>
    </html>
  );
}
