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
    { name: "Materiales", href: "/materiales" },
    { name: "Acabados", href: "/acabados" },
    { name: "Galería", href: "/galeria" },
  ];

  return (
    <>
      <nav className={`fixed w-full z-[100] px-4 md:px-6 py-4 flex justify-center transition-all duration-500 ${scrolled ? 'top-0' : 'top-2'}`}>
        <div className={`w-full max-w-5xl transition-all duration-500 ${scrolled ? 'rounded-none md:rounded-full bg-white/80' : 'rounded-[2rem] bg-white/40'} apple-glass py-3 px-6 md:px-8 flex justify-between items-center shadow-2xl shadow-black/[0.03] border border-white/40 relative overflow-hidden`}>
          {/* Scroll Progress Line */}
          <div className="absolute bottom-0 left-0 h-1 line-cmyk transition-all duration-200" style={{ width: '0%', opacity: scrolled ? 1 : 0 }} id="scroll-progress" />
          
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/LOGO PUBLIDEAS.jpeg" alt="Logo" className="h-8 md:h-10 w-auto rounded-lg shadow-sm" />
            <div className="flex flex-col">
               <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-[#1d1d1f]">PUBLIDEAS</span>
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0071e3]">Impresión Digital</span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black text-[#1d1d1f]/60 uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-[#0071e3] transition-colors">
                {link.name}
              </a>
            ))}
            <a href="/cotizar" className="px-8 py-3 bg-[#1d1d1f] text-white rounded-full hover:scale-110 active:scale-95 transition-all text-[10px] font-black shadow-lg shadow-black/10">
              COTIZAR
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-[#1d1d1f]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
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
              className={`text-5xl font-black italic tracking-tighter transition-all duration-700 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          
          <div className={`transition-all duration-700 delay-400 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a 
              href="/cotizar" 
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-4 px-12 py-8 bg-[#0071e3] text-white rounded-[2rem] text-2xl font-bold shadow-2xl shadow-blue-500/30"
            >
              <MessageSquare className="w-6 h-6" />
              COTIZAR YA
            </a>
          </div>

          {/* Footer of mobile menu */}
          <div className="mt-12">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 italic">Publideas — SLP</span>
          </div>
        </div>
      </div>
    </>
  );
}
