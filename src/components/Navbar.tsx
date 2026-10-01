'use client';
import { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledTotal = (winScroll / height) * 100;

      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) progressBar.style.width = scrolledTotal + '%';
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Precios", href: "#precios" },
    { name: "Productos", href: "#productos" },
    { name: "Dónde ubicarnos", href: "#contacto" },
  ];

  return (
    <>
      <nav className={`fixed w-full z-[100] px-4 md:px-6 py-4 flex justify-center transition-all duration-500 ${scrolled ? 'top-0' : 'top-2'}`}>
        <div className={`w-full max-w-5xl transition-all duration-500 ${scrolled ? 'rounded-none md:rounded-full bg-white/80' : 'rounded-[2rem] bg-white/40'} apple-glass py-3 px-6 md:px-8 flex justify-between items-center shadow-2xl shadow-black/[0.03] border border-white/40 relative overflow-hidden`}>
          {/* Scroll Progress Line */}
          <div className="absolute bottom-0 left-0 h-1 line-cmyk transition-all duration-200" style={{ width: '0%', opacity: scrolled ? 1 : 0 }} id="scroll-progress" />

          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/logo mejorado.png" alt="Logo" className="h-10 md:h-12 w-10 md:w-12 rounded-full aspect-square object-cover border border-white/20 shadow-sm" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-[#1d1d1f]">PUBLIDEAS</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0071e3]">Impresión Digital</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-[#1d1d1f]/70 uppercase tracking-[0.18em]">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-[#0071e3] transition-colors">
                {link.name}
              </a>
            ))}
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full hover:scale-110 active:scale-95 transition-all text-[11px] font-black shadow-lg shadow-green-500/25 tracking-wider"
            >
              COTIZAR
            </a>
          </div>

          {/* Mobile Right Actions: Botón Cotizar + Toggle Menú */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-md shadow-green-500/20 active:scale-95 transition-all"
            >
              COTIZAR
            </a>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-[#1d1d1f]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir menú"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] md:hidden transition-all duration-700 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-white/95 backdrop-blur-3xl" />

        <div className="relative h-full flex flex-col justify-center px-10 gap-12">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-4xl font-black italic tracking-tighter transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </a>
          ))}

          <div className={`transition-all duration-700 delay-400 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-4 px-10 py-6 bg-[#25D366] text-white rounded-[2rem] text-xl font-black shadow-2xl shadow-green-500/30"
            >
              <MessageSquare className="w-6 h-6" />
              COTIZAR POR WHATSAPP
            </a>
          </div>

          {/* Footer of mobile menu */}
          <div className="mt-8">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Publideas — CDMX</span>
          </div>
        </div>
      </div>
    </>
  );
}
