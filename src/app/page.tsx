'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ArrowRight, FileText, Layers, Camera, Clock, Phone } from 'lucide-react';

// Components
import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const photos = [
    "WhatsApp Image 2026-04-21 at 12.43.29 PM (1).jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.29 PM.jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.31 PM (1).jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.31 PM.jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.32 PM (1).jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.32 PM.jpeg",
  ];

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el: any) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const servicios = [
    {
      icon: FileText,
      title: 'Materiales',
      desc: 'Couché, Bond, Sulfatada, Opalina, Vinyl y Adhesivos en múltiples gramajes.',
      href: '/materiales',
      accent: '#0071e3',
      bg: 'bg-blue-50',
    },
    {
      icon: Layers,
      title: 'Acabados',
      desc: 'Laminado mate o brillante, medio corte y guillotina para cada trabajo.',
      href: '/acabados',
      accent: '#ff3b30',
      bg: 'bg-red-50',
    },
    {
      icon: Camera,
      title: 'Galería',
      desc: 'Conoce muestras reales de nuestros trabajos de impresión digital.',
      href: '/galeria',
      accent: '#34c759',
      bg: 'bg-green-50',
    },
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      
      {/* Hero */}
      <Hero photos={photos} />

      {/* Servicios resumen */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-10 md:mb-14 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">¿Qué hacemos?</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
              NUESTROS <span className="text-premium">SERVICIOS.</span>
            </h2>
            <div className="flex gap-1 mt-5">
              <div className="w-12 h-1 bg-[#0071e3]" />
              <div className="w-12 h-1 bg-[#ff3b30]" />
              <div className="w-12 h-1 bg-[#34c759]" />
              <div className="w-12 h-1 bg-[#ffcc00]" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicios.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                className="reveal group bg-white rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-xl border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1 min-h-[260px]"
              >
                <div>
                  <div className={`w-12 h-12 ${s.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <s.icon className="w-6 h-6" style={{ color: s.accent }} />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tighter italic mb-3 uppercase">{s.title}</h3>
                  <p className="text-[#86868b] text-base font-medium italic leading-snug">{s.desc}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all" style={{ color: s.accent }}>
                  Ver más <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-10 md:mb-14 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Proceso</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
              ¿CÓMO <span className="text-premium">FUNCIONA?</span>
            </h2>
            <div className="flex gap-1 mt-5">
              <div className="w-12 h-1 bg-[#0071e3]" />
              <div className="w-12 h-1 bg-[#ff3b30]" />
              <div className="w-12 h-1 bg-[#34c759]" />
              <div className="w-12 h-1 bg-[#ffcc00]" />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[
              { num: '00', title: 'Contáctanos', desc: 'Habla con nuestro bot o manda mensaje por Facebook para registrar tu pedido.', color: '#7c3aed' },
              { num: '01', title: 'Envías tu archivo', desc: 'PDF o PNG. Compatible con Corel y Adobe.', color: '#0071e3' },
              { num: '02', title: 'Elegimos material', desc: 'Te asesoramos en papel, gramaje y formato.', color: '#ff3b30' },
              { num: '03', title: 'Imprimimos', desc: 'Impresión CMYK digital de alta precisión.', color: '#34c759' },
              { num: '04', title: 'Te entregamos', desc: 'Express: antes 12:00 mismo día.', color: '#d97706' },
            ].map((step, idx) => (
              <div key={idx} className="reveal bg-[#f5f5f7] rounded-[2.5rem] p-6 md:p-8 flex flex-col gap-3 border border-slate-100">
                <span className="text-[38px] md:text-[42px] font-black tracking-tighter leading-none" style={{ color: step.color }}>{step.num}</span>
                <h4 className="text-base md:text-xl font-bold italic tracking-tight text-[#1d1d1f]">{step.title}</h4>
                <p className="text-[#86868b] text-xs md:text-sm font-medium italic">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiempos de entrega */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-[#111113] relative overflow-hidden">
        {/* Decorative bg text */}
        <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="text-[240px] md:text-[380px] font-black tracking-tighter text-white/[0.025] italic leading-none pr-6">24h</span>
        </div>
        <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-3 bg-[#ffcc00]/10 border border-[#ffcc00]/20 rounded-full px-5 py-2 mb-6">
              <Clock className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]">Logística Express</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic text-white leading-[0.95]">
              ENTREGAS <span className="text-[#ffcc00]">RÁPIDAS.</span>
            </h2>
            <p className="text-white/50 text-lg font-medium italic mt-4 max-w-lg">
              Sin esperas. Tu trabajo listo cuando lo necesitas.
            </p>
          </div>
          {/* 3 vivid cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* Card 1 — verde */}
            <div className="bg-[#0f2d1a] border border-[#34c759]/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#34c759] block mb-5">Pedido antes de</span>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-[76px] font-black text-white italic leading-none">12</span>
                <span className="text-3xl font-black text-white/40 pb-1">pm</span>
              </div>
              <div className="h-px bg-white/10 mb-5" />
              <span className="text-2xl font-black text-white italic">Entrega mismo día</span>
              <div className="mt-auto pt-6">
                <div className="w-10 h-10 bg-[#34c759] rounded-xl flex items-center justify-center text-white font-black text-lg">✓</div>
              </div>
            </div>
            {/* Card 2 — azul */}
            <div className="bg-[#061829] border border-[#0071e3]/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#60a5fa] block mb-5">Pedido después de</span>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-[76px] font-black text-white italic leading-none">12</span>
                <span className="text-3xl font-black text-white/40 pb-1">pm</span>
              </div>
              <div className="h-px bg-white/10 mb-5" />
              <span className="text-2xl font-black text-white italic">Día siguiente</span>
              <div className="mt-auto pt-6">
                <div className="w-10 h-10 bg-[#0071e3] rounded-xl flex items-center justify-center text-white font-black text-lg">→</div>
              </div>
            </div>
            {/* Card 3 — amarillo */}
            <div className="bg-[#1e1600] border border-[#ffcc00]/25 rounded-[2.5rem] p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <Phone className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ffcc00]">Horario</span>
              </div>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-[66px] font-black text-white italic leading-none">8:30</span>
              </div>
              <div className="h-px bg-white/10 mb-5" />
              <span className="text-xl font-black text-white/80 italic">a.m. — 6:00 p.m.</span>
              <div className="mt-auto pt-6">
                <a href="tel:+5568081606" className="text-sm font-bold text-[#ffcc00]/60 hover:text-[#ffcc00] transition-colors">55 6808 1606</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería preview */}
      <section className="py-14 md:py-20 px-4 md:px-6 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Nuestro Trabajo</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
                GALERÍA <span className="text-premium">RÁPIDA.</span>
              </h2>
            </div>
            <a href="/galeria" className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#0071e3] hover:gap-4 transition-all">
              Ver galería completa <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.slice(0, 3).map((img, i) => (
              <div key={i} className="reveal aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 group">
                <img
                  src={`/${img}`}
                  alt={`Trabajo Publideas ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto y Ubicación */}
      <Contacto />

      <Footer />
    </main>
  );
}
