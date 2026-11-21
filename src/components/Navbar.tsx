'use client';
import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Soluciones", href: "#catalogo" },
    { name: "Taller & Entregas", href: "#contacto" },
  ];

  const handleWhatsApp = (buttonName: string) => {
    trackWhatsAppClick({
      buttonName,
      targetNumber: '834 209 1016',
      message: 'Hola Publideas, requiero cotización ejecutiva para producción de impresión.'
    });
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 flex justify-center px-3 sm:px-6 pointer-events-none ${
          scrolled ? 'top-3 sm:top-4' : 'top-0'
        }`}
      >
        <div
          className={`w-full pointer-events-auto transition-all duration-300 flex items-center justify-between ${
            scrolled
              ? 'max-w-4xl bg-white/95 backdrop-blur-xl shadow-xl shadow-slate-900/5 border border-slate-200/90 rounded-full px-4 sm:px-6 py-2.5'
              : 'max-w-7xl bg-[#fbfbfd]/90 backdrop-blur-md border-b border-slate-200/70 py-3.5 px-3 sm:px-4'
          }`}
        >
          {/* Logo y Marca */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative shrink-0">
              <img
                src="/logo mejorado.png"
                alt="Publideas Impresión Digital"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-slate-200/80 shadow-xs transition-transform group-hover:scale-105"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">PUBLIDEAS</span>
                <div className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00]" />
                </div>
              </div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Centro de Impresión CDMX
              </span>
            </div>
          </a>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#0071e3] transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Botón Comprar / Cotizar en WhatsApp */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20requiero%20cotizaci%C3%B3n%20ejecutiva%20para%20producci%C3%B3n%20de%20impresi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleWhatsApp('Navbar: Cotizar WhatsApp')}
              className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-md shadow-green-500/20 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Cotizar en 1 Clic</span>
            </a>

            {/* Toggle Menú Móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95 transition-all"
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Espaciador para evitar saltos de contenido cuando el header es fixed */}
      <div className="h-16 sm:h-20 w-full" />

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="fixed inset-0 top-[60px] z-40 bg-white/95 backdrop-blur-2xl md:hidden px-6 py-8 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 pb-3">
              <span>Navegación Ejecutiva</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-black text-slate-900 active:text-[#0071e3] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20requiero%20cotizaci%C3%B3n%20ejecutiva%20para%20producci%C3%B3n%20de%20impresi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                handleWhatsApp('Navbar Móvil Desplegable: Cotizar');
                setIsOpen(false);
              }}
              className="w-full py-4 rounded-2xl bg-[#25D366] text-white font-black text-center text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-green-500/25 active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Cotizar Proyecto por WhatsApp
            </a>
            <p className="text-center text-[11px] font-medium text-slate-400">
              Manuel Caballero 131, La Obrera, CDMX • Entrega en 24h
            </p>
          </div>
        </div>
      )}
    </>
  );
}
