'use client';
export default function Navbar() {
  return (
    <nav className="fixed w-full z-[100] px-6 py-4 flex justify-center">
      <div className="w-full max-w-5xl apple-glass rounded-[2rem] py-3 px-8 flex justify-between items-center shadow-lg shadow-black/[0.03] border border-white/40">
        <div className="flex items-center gap-3">
          <img src="/LOGO PUBLIDEAS.jpeg" alt="Logo" className="h-8 w-auto rounded-md shadow-sm" />
          <div className="flex flex-col">
             <span className="text-xl font-black tracking-tighter leading-none text-[#1d1d1f]">MIGUEL</span>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0071e3]">Elite Print</span>
          </div>
        </div>
        <div className="hidden md:flex gap-10 text-[13px] font-medium text-[#1d1d1f]/70 uppercase tracking-widest font-black">
          <a href="#services" className="hover:text-[#1d1d1f] transition-colors">Materiales</a>
          <a href="#gallery-scroll-container" className="hover:text-[#1d1d1f] transition-colors">Galería</a>
          <a href="#quote" className="px-6 py-2 bg-[#1d1d1f] text-white rounded-full hover:scale-105 transition-all text-[10px] font-black">Cotizar</a>
        </div>
      </div>
    </nav>
  );
}
