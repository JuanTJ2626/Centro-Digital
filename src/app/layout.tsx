import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Publideas | Impresión Digital CMYK en SLP',
  description: 'Publideas — Impresión digital en CMYK: couché, bond, opalina, adhesivos y sintéticos. Entrega express mismo día.',
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
      <body className={`${outfit.className} bg-[#0f1115] text-[#f0f0f2] antialiased`}>
        {children}
      </body>
    </html>
  );
}
