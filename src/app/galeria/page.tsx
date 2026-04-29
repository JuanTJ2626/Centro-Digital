'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Camera, Search, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const photos = [
  'WhatsApp Image 2026-04-21 at 12.43.29 PM (1).jpeg',
  'WhatsApp Image 2026-04-21 at 12.43.29 PM.jpeg',
  'WhatsApp Image 2026-04-21 at 12.43.31 PM (1).jpeg',
  'WhatsApp Image 2026-04-21 at 12.43.31 PM.jpeg',
  'WhatsApp Image 2026-04-21 at 12.43.32 PM (1).jpeg',
  'WhatsApp Image 2026-04-21 at 12.43.32 PM.jpeg',
];

export default function GaleriaPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.gallery-item');
      if (!items.length || !horizontalRef.current) return;

      const getScrollAmount = () => {
        const containerWidth = horizontalRef.current?.scrollWidth || 0;
        return -(containerWidth - window.innerWidth);
      };

      const tween = gsap.to(horizontalRef.current, {
        x: getScrollAmount,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      items.forEach((item: any) => {
        const img = item.querySelector('img');
        gsap.fromTo(
          img,
          { x: -50, scale: 1.1 },
          {
            x: 50,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'left right',
              end: 'right left',
              containerAnimation: tween,
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const images = horizontalRef.current.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.complete) {
          img.onload = () => ScrollTrigger.refresh();
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero de página */}
      <section className="pt-36 pb-10 px-4 md:px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-[#0071e3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Showcase Premium</span>
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-bold italic">Evidencia Real de Nuestro Trabajo</span>
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter italic leading-[0.95] mb-4">
            GALERÍA
          </h1>
          <div className="flex gap-1 mt-4">
            <div className="w-12 h-1 bg-[#0071e3]" />
            <div className="w-12 h-1 bg-[#ff3b30]" />
            <div className="w-12 h-1 bg-[#34c759]" />
            <div className="w-12 h-1 bg-[#ffcc00]" />
          </div>
        </div>
      </section>

      {/* Gallery horizontal scroll */}
      <div ref={sectionRef} className="h-screen overflow-hidden flex flex-col justify-center relative bg-[#fbfbfd]">
        <div className="relative w-full h-[70vh]">
          <div
            ref={horizontalRef}
            className="absolute top-0 left-0 flex items-center gap-16 px-[5vw] h-full w-max"
          >
            {photos.map((img, i) => (
              <div
                key={i}
                className="gallery-item shrink-0 w-[450px] md:w-[900px] h-full bg-slate-50 rounded-[4rem] overflow-hidden relative shadow-3xl border border-slate-100 group"
                style={{ perspective: '1500px' }}
              >
                <img
                  src={`/${img}`}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                  alt={`Trabajo Publideas #${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0071e3] mb-2 px-3 py-1 bg-white inline-block w-fit rounded-full">
                    Publideas
                  </span>
                  <h4 className="text-4xl font-bold italic tracking-tighter text-white">
                    Muestra #{String(i + 1).padStart(2, '0')}
                  </h4>
                </div>
                <div className="absolute top-10 right-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl">
                    <Search className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">Desliza para explorar</span>
          <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#0071e3] w-1/4 animate-pulse" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
