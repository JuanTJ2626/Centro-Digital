'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Camera, Search, Zap } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface GalleryProps {
  photos: string[];
}

export default function Gallery({ photos }: GalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.gallery-item');
      if (!items.length || !horizontalRef.current) return;

      // Dynamic calculation for scroll distance
      const getScrollAmount = () => {
        const containerWidth = horizontalRef.current?.scrollWidth || 0;
        return -(containerWidth - window.innerWidth);
      };

      // Create the horizontal tween
      const tween = gsap.to(horizontalRef.current, {
        x: getScrollAmount,
        ease: "none"
      });

      // Main pin scroll trigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      });

      // Professional clean Parallax Effect for the images inside the cards
      items.forEach((item: any) => {
        const img = item.querySelector('img');

        gsap.fromTo(img,
          {
            x: -50,
            scale: 1.1
          },
          {
            x: 50,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "left right",
              end: "right left",
              containerAnimation: tween,
              scrub: true,
              invalidateOnRefresh: true
            }
          }
        );
      });

      // Simple image load fix (images might change layout after load)
      const images = horizontalRef.current.querySelectorAll('img');
      images.forEach(img => {
        if (!img.complete) {
          img.onload = () => ScrollTrigger.refresh();
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [photos]);

  return (
    <section ref={sectionRef} id="gallery-section" className="h-screen bg-white overflow-hidden flex flex-col justify-center relative">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50 blur-[120px] rounded-full opacity-50" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-red-50 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-10 mb-8 w-full relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 bg-[#0071e3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Showcase Premium</span>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs font-bold italic">Evidencia Táctil Real</span>
            </div>
          </div>
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter italic leading-[0.95]">
          GALERÍA DE <span className="gradient-brand">ÉXITOS.</span>
        </h2>
      </div>

      <div className="relative w-full h-[65vh]">
        <div ref={horizontalRef} className="absolute top-0 left-0 flex items-center gap-16 px-[5vw] h-full w-max">
          {photos.map((img, i) => (
            <div
              key={i}
              className="gallery-item shrink-0 w-[450px] md:w-[950px] h-full bg-slate-50 rounded-[4rem] overflow-hidden relative shadow-3xl border border-slate-100 group"
              style={{ perspective: '1500px', transformOrigin: 'center center' }}
            >
              <img
                src={`/${img}`}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                alt="work"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0071e3] mb-2 px-3 py-1 bg-white inline-block w-fit rounded-full">Calidad Certificada</span>
                <h4 className="text-4xl font-bold italic tracking-tighter text-white">Muestra #0{i + 1}</h4>
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

      {/* UI Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-30 italic">Desliza para explorar</span>
          <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#0071e3] w-1/4 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
