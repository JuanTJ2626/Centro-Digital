'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Droplets, Wand2, Sparkles, Star, Zap, Layers } from 'lucide-react';

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
            x: x - 150,
            y: y - 150,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
          });

          gsap.to(card, {
            scale: 1.05,
            rotateX: (y - rect.height / 2) / 15,
            rotateY: (x - rect.width / 2) / -15,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          const gloss = card.querySelector('.gloss-effect');
          gsap.to(gloss, { opacity: 0, duration: 0.8 });
          gsap.to(card, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { name: "Laminado Pro", price: "$2", desc: "Disponible en mate o brillante. Un toque premium instantáneo.", icon: Droplets, color: "from-blue-600/10 to-blue-600/5", accent: "#0071e3" },
    { name: "Soft Touch", price: "$8", desc: "Sensación aterciopelada premium. Una experiencia táctil increíble.", icon: Wand2, color: "from-red-500/10 to-red-500/5", accent: "#ff3b30" },
    { name: "Glitter / Holográfico", price: "Desde $7", desc: "Destellos visuales y efectos arcoíris que no pasan desapercibidos.", icon: Star, color: "from-yellow-400/10 to-yellow-400/5", accent: "#ffcc00" },
    { name: "Barniz / Foil 3D", price: "Desde $48", desc: "Realce volumétrico asombroso. El más alto nivel de lujo impreso.", icon: Sparkles, color: "from-green-500/10 to-green-500/5", accent: "#34c759" }
  ];

  return (
    <section className="py-40 px-6 bg-[#fbfbfd]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-20 px-2 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-[#0071e3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3] mb-1">Acabados Especiales</span>
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-bold italic text-slate-500">Texturas Tridimensionales</span>
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter mb-4 italic leading-[0.95]">
            VALOR <br className="hidden md:block" /> AGREGADO.
          </h2>
          <p className="text-2xl font-medium text-[#86868b] italic max-w-2xl">
            Detalles que se sienten. Acabados tridimensionales y texturas que transforman tus diseños en productos élite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((f, idx) => (
            <div key={idx} className="value-card reveal relative overflow-hidden h-[450px] flex flex-col justify-between p-14 rounded-[4rem] bg-white border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all group" style={{ perspective: '1500px' }}>

              {/* Solid Tint Overlay instead of full transparency */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-30 group-hover:opacity-60 transition-opacity duration-500`} />

              <div className="gloss-effect absolute w-[400px] h-[400px] bg-white blur-[80px] rounded-full pointer-events-none opacity-0 mix-blend-overlay" style={{ transform: 'translate(-50%, -50%)' }} />

              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-12 text-[#1d1d1f]">
                  <div className="w-16 h-16 rounded-[2rem] flex items-center justify-center bg-white shadow-xl group-hover:scale-110 transition-transform" style={{ color: f.accent }}>
                    <f.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-black italic tracking-tighter uppercase">{f.name}</h3>
                </div>
                <p className="text-[#86868b] text-2xl font-medium italic leading-[1.3] max-w-[340px]">{f.desc}</p>
              </div>
              <div className="relative z-10 flex justify-between items-end border-t border-slate-200/50 pt-12">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-30 italic text-[#1d1d1f]">Lujo Táctil</span>
                <div className="text-7xl font-black tracking-tighter leading-none" style={{ color: f.accent }}>{f.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
