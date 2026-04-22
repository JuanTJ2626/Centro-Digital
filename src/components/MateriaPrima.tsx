'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FileText, StickyNote, Box, Zap, ScrollText, Image as ImageIcon } from 'lucide-react';

export default function MateriaPrima() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const materiaCards = gsap.utils.toArray('.materia-card');
      materiaCards.forEach((card: any) => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(card, {
            rotateX: (y - rect.height / 2) / 25,
            rotateY: (x - rect.width / 2) / -25,
            scale: 1.02,
            duration: 0.5,
            perspective: 1500
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 1, ease: 'power2.out' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-40 px-6 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-20 px-2 text-center md:text-left flex flex-col md:items-start items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-[#0071e3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Box className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Catálogo Premium</span>
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-bold italic text-slate-500">Impresión CMYK Exacta</span>
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-4 italic leading-[0.95]">
            MATERIA <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500">PRIMA.</span>
          </h2>
          <p className="text-2xl font-medium text-[#86868b] italic max-w-2xl">
            Sustratos que transforman el diseño en realidad. Calidad digital inigualable para cada una de tus ideas.
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Couché */}
          <div className="reveal materia-card lg:col-span-2 rounded-[3.5rem] bg-white p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group border border-slate-100">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -mr-48 -mt-48 transition-colors group-hover:bg-blue-100/50" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
              <div>
                <h3 className="text-5xl font-bold tracking-tighter italic mb-4 text-[#1d1d1f]">Papel Couché</h3>
                <p className="text-xl text-[#86868b] max-w-md font-medium leading-snug italic">Ideal para flyers, posters e impresiones de altísima calidad. Absorción de color perfecta.</p>
              </div>
              <FileText className="w-12 h-12 text-[#0071e3] opacity-10 shrink-0" />
            </div>
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-50 pt-8">
              {[
                { g: "130 a 150 grs", p: "$7" },
                { g: "200 grs aprox", p: "$8" },
                { g: "300 grs", p: "$8.50" },
                { g: "Hasta 350 grs", p: "$9.50" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-4 rounded-3xl bg-[#fbfbfd]">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">{item.g}</span>
                  <div className="text-3xl font-black tracking-tighter text-[#1d1d1f]">{item.p}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Adhesivos */}
          <div className="reveal materia-card rounded-[3.5rem] bg-[#1d1d1f] p-12 flex flex-col justify-between shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent transition-opacity group-hover:opacity-40" />
            <div className="relative z-10 mb-8">
              <StickyNote className="w-10 h-10 text-[#ff3b30] mb-8 shadow-3xl" />
              <h3 className="text-4xl font-bold tracking-tighter italic text-white mb-4">Adhesivos</h3>
              <p className="text-white/40 text-lg font-medium leading-tight italic">Incluye opciones de medio corte o forma exacta.</p>
            </div>
            
            <div className="relative z-10 flex flex-col gap-4">
              {[
                { n: "Couché Adh.", p: "Desde $9" },
                { n: "Marca Dimasa", p: "$12" },
                { n: "Holográficos", p: "Desde $17" },
                { n: "Fotoluminiscente", p: "$180" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-white/10 pb-2">
                   <span className="text-sm font-bold text-white/70">{item.n}</span>
                   <span className="text-xl font-black text-white italic">{item.p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Cartulinas Especiales */}
          <div className="reveal materia-card rounded-[3.5rem] bg-gradient-to-br from-yellow-50 to-orange-50 p-12 flex flex-col justify-between shadow-2xl relative group overflow-hidden border border-yellow-100/50">
            <div className="relative z-10 mb-8">
              <ScrollText className="w-10 h-10 text-yellow-600 mb-8" />
              <h3 className="text-4xl font-bold tracking-tighter italic text-[#1d1d1f] mb-4">Cartulinas</h3>
              <p className="text-slate-500 text-lg font-medium leading-tight italic">Opciones ideales para invitaciones, tarjetas y presentaciones.</p>
            </div>
            
            <div className="relative z-10 flex flex-col gap-4">
              {[
                { n: "Opalina 120/350g", p: "Desde $7" },
                { n: "Bristol (Inkjet)", p: "Desde $2" },
                { n: "Kraft / Lino", p: "Aprox $10" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-yellow-900/5 pb-2">
                   <span className="text-sm font-bold text-[#1d1d1f]/60">{item.n}</span>
                   <span className="text-xl font-black text-[#1d1d1f] italic">{item.p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Banners & Exteriores */}
          <div className="reveal materia-card lg:col-span-2 rounded-[3.5rem] bg-white p-12 flex flex-col justify-between shadow-2xl relative group overflow-hidden border border-slate-100">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-[100px] -mr-32 -mt-32 transition-colors group-hover:bg-purple-100/50" />
            <div className="relative z-10 flex justify-between items-start mb-8">
              <div>
                <h3 className="text-5xl font-bold tracking-tighter italic text-[#1d1d1f] mb-4">Lonas & Banners</h3>
                <p className="text-slate-500 text-xl font-medium leading-tight italic">Formatos amplios para máxima visibilidad. Varía por gramaje.</p>
              </div>
              <ImageIcon className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
            
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-50 pt-8">
              {[
                { size: "Banner 30x70 cm", p: "Desde $19" },
                { size: "Banner 33x95 cm", p: "Desde $24" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-6 rounded-3xl bg-[#fbfbfd]">
                  <span className="text-xs font-black uppercase tracking-widest text-[#86868b]">{item.size}</span>
                  <div className="text-4xl font-black tracking-tighter text-[#1d1d1f]">{item.p}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
