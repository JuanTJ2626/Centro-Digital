import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Script from 'next/script';
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

        {/* Botpress v3.6 Integration */}
        <Script src="https://cdn.botpress.cloud/webchat/v3.6/inject.js" strategy="afterInteractive" />
        <Script src="https://files.bpcontent.cloud/2026/04/27/04/20260427044403-X09C5Z6P.js" strategy="afterInteractive" />

        <style>{`
          /* Estilo Premium para el Botón de Botpress */
          .bpw-floating-button {
            background: linear-gradient(135deg, #1e3a34 0%, #2d5a4f 100%) !important;
            box-shadow: 0 8px 32px rgba(30, 58, 52, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
            border: none !important;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          }

          .bpw-floating-button:hover {
            transform: scale(1.1) rotate(5deg) !important;
          }

          /* Efecto de resplandor sutil alrededor del botón */
          .bpw-floating-button::after {
            content: '';
            position: absolute;
            inset: -4px;
            background: inherit;
            filter: blur(15px);
            opacity: 0.3;
            z-index: -1;
            border-radius: inherit;
          }

          /* Ventana de Chat Premium */
          #bp-webchat-container {
            border-radius: 28px !important;
            overflow: hidden !important;
            box-shadow: 0 25px 80px -20px rgba(0, 0, 0, 0.6) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(12px) !important;
          }

          .bpw-message-bubble {
            border-radius: 20px !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
          }
          .bpw-header-container {
            background: #1e3a34 !important;
            padding: 24px 20px !important;
          }
        `}</style>
      </body>
    </html>
  );
}
