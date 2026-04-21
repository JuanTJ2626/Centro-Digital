import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Miguel Impresiones Digitales | Centro de Copiado',
  description: 'Impresión digital en CMYK: couché, opalina, kraft, adhesivos y sintéticos con la mejor calidad.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.className} bg-[#0f1115] text-[#f0f0f2] antialiased`}>
        {children}
      </body>
    </html>
  );
}
