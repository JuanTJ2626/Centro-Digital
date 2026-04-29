'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Droplets, Layers, Star, Zap, Scissors, ArrowRight } from 'lucide-react';

export default function ValorAgregado() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const valueCards = gsap.utils.toArray('.value-card');
      valueCards.forEach((card: any) => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const gloss = card.querySelector('.gloss-effect');
          
          gsap.to(gloss, {
            x: x - 200,
            y: y - 200,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out'
          });

          gsap.to(card, {
            rotateX: (y - rect.height/2) / 25,
            rotateY: (x - rect.width/2) / -25,
            duration: 0.5,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          const gloss = card.querySelector('.gloss-effect');
          gsap.to(gloss, { opacity: 0, duration: 0.8 });
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power2.out' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { name: "Laminado Brillante", price: "$2", desc: "Acabado brillante que intensifica los colores y protege la impresión. Alta resistencia al desgaste.", icon: Droplets, accent: "#0071e3", label: "Por hoja" },
    { name: "Laminado Mate", price: "$2", desc: "Acabado suave y opaco. Elegante y sin reflejos, perfecto para tarjetas y presentaciones premium.", icon: Layers, accent: "#1d1d1f", label: "Por hoja" },
    { name: "Medio Corte", price: null, desc: "Corte parcial del adhesivo para fácil desprendimiento sin cortar el respaldo. Ideal para stickers.", icon: Scissors, accent: "#ff3b30", label: "Para Adhesivos" },
    { name: "Guillotina", price: null, desc: "Corte recto de precisión milimétrica para formatos estándar y personalizados.", icon: Star, accent: "#34c759", label: "Corte" }
  ];

  return (
    <section className="py-24 md:py-40 px-4 md:px-6 bg-[#f5f5f7]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16 md:mb-24 px-2 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-[#0071e3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3] mb-1">Diferenciadores</span>
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-bold italic text-slate-500">Valor de Marca</span>
              </div>
            </div>
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-4 italic leading-[0.95] text-[#1d1d1f]">
            ACABADOS <br className="hidden md:block"/> <span className="text-premium">PREMIUM.</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#86868b] italic max-w-2xl px-4 md:px-0">
            Terminaciones que elevan la calidad y durabilidad de cada impresión.
          </p>
          <div className="flex gap-1 mt-8">
            <div className="w-12 h-1 bg-[#0071e3]" />
            <div className="w-12 h-1 bg-[#ff3b30]" />
            <div className="w-12 h-1 bg-[#34c759]" />
            <div className="w-12 h-1 bg-[#ffcc00]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {features.map((f, idx) => (
            <div key={idx} className="value-card reveal relative overflow-hidden min-h-[420px] md:min-h-[480px] p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-white border border-white shadow-[0_30px_70px_rgba(0,0,0,0.03)] transition-all group" style={{ perspective: '2000px' }}>
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700" style={{ backgroundColor: f.accent }} />
              <div className="gloss-effect absolute w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-gradient-to-br from-white to-transparent blur-[80px] md:blur-[100px] rounded-full pointer-events-none opacity-0 mix-blend-overlay z-20" style={{ transform: 'translate(-50%, -50%)' }} />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-10 md:mb-12">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[1.8rem] bg-[#f5f5f7] flex items-center justify-center transition-all group-hover:scale-110 shadow-sm" style={{ color: f.accent }}>
                      <f.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 bg-slate-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-slate-100">{f.label}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-black italic tracking-tighter text-[#1d1d1f] mb-4 md:mb-6 uppercase">{f.name}</h3>
                  <p className="text-[#86868b] text-lg md:text-xl font-medium italic leading-[1.3] max-w-sm">{f.desc}</p>
                </div>

                <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-slate-50 flex items-end justify-between">
                  <div className="flex flex-col">
                    {f.price ? (
                      <>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#86868b] mb-1.5 md:mb-2 opacity-50">Por hoja</span>
                        <div className="text-5xl md:text-7xl font-black tracking-tighter text-[#1d1d1f] flex items-baseline gap-2">
                           {f.price} <span className="text-[10px] opacity-20 tracking-normal font-bold italic">MXN</span>
                        </div>
                      </>
                    ) : (
                      <span className="text-lg text-slate-400 italic font-medium">Precio según trabajo<br />Consultar</span>
                    )}
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-slate-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#1d1d1f]" />
                  </div>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 blur-[60px] md:blur-[80px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none rounded-full" style={{ backgroundColor: f.accent }} />
            </div>
          ))}
        </div>

        <div className="reveal mt-10 md:mt-12 bg-white/50 backdrop-blur-sm border border-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
             <div className="w-14 h-14 md:w-16 md:h-16 bg-[#1d1d1f] rounded-[1.5rem] md:rounded-[1.8rem] flex items-center justify-center shadow-2xl shrink-0">
                <Scissors className="w-6 h-6 md:w-8 md:h-8 text-white" />
             </div>
             <div>
                <h4 className="text-2xl md:text-3xl font-black italic text-[#1d1d1f] tracking-tighter uppercase">Corte Personalizado</h4>
                <p className="text-base md:text-lg text-slate-500 font-medium italic">Medio corte o corte de forma exacto para todos tus adhesivos.</p>
             </div>
          </div>
          <div className="px-6 py-3 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 italic">
             Precisión Milimétrica ✂️
          </div>
        </div>
      </div>
    </section>
  );
}
