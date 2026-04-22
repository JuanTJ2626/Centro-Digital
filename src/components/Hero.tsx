'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Zap } from 'lucide-react';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface HeroProps {
  photos: string[];
}

export default function Hero({ photos }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Entrance
      const tl = gsap.timeline();
      tl.from('.hero-tag', {
        opacity: 0,
        scale: 0.8,
        y: -10,
        duration: 1,
        ease: 'back.out(1.7)'
      })
        .from('.hero-title span', {
          y: 120,
          rotateX: -30,
          opacity: 0,
          duration: 1.8,
          stagger: 0.15,
          ease: 'expo.out'
        }, '-=0.6')
        .from('.hero-p', {
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=1.2')
        .from('.hero-btns', {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power4.out'
        }, '-=0.8');

      // 2. Continuous Floating Photos
      const images = gsap.utils.toArray('.hero-float');

      images.forEach((img: any, i: number) => {
        gsap.to(img, {
          y: '+=20',
          xOrigin: 'center',
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.3
        });
      });

      // Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 40;
        const y = (clientY / window.innerHeight - 0.5) * 40;

        images.forEach((img: any, i: number) => {
          gsap.to(img, {
            x: x * (i + 1) * 0.25,
            y: y * (i + 1) * 0.25,
            duration: 4,
            ease: 'power2.out'
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-red-400/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none z-0">
        {photos.slice(0, 5).map((img, i) => (
          <div
            key={i}
            className="hero-float absolute w-24 md:w-36 aspect-[3/4] rounded-2xl shadow-2xl border-[3px] border-white overflow-hidden pointer-events-auto cursor-pointer transition-shadow hover:shadow-blue-500/30 ring-1 ring-black/5"
            style={{
              top: i === 0 ? '15%' : i === 1 ? '70%' : i === 2 ? '10%' : i === 3 ? '78%' : '45%',
              left: i === 0 ? '10%' : i === 1 ? '15%' : undefined,
              right: i === 2 ? '10%' : i === 3 ? '18%' : i === 4 ? '6%' : undefined,
              opacity: 0.98
            }}
          >
            <img src={`/${img}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="work" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center px-6 relative z-10 hero-content">
        <div className="hero-tag inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-md shadow-xl rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/50">
          {/* <Zap className="w-3.5 h-3.5 text-yellow-500 fill-current" /> */}
          {/* <span className="text-[#0071e3]">Elite Digital SLP</span> */}
        </div>

        <h1 className="hero-title text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] mb-8 flex flex-col items-center">
          <span className="block overflow-hidden"><span className="block">PULSO</span></span>
          <span className="block overflow-hidden"><span className="block gradient-brand italic">SUPREMO.</span></span>
        </h1>

        <p className="hero-p text-xl md:text-3xl text-[#1d1d1f]/60 max-w-4xl mx-auto font-medium leading-tight mb-20 italic">
          Donde la precisión se encuentra con la pasión. <br />
          <span className="text-[#1d1d1f] font-bold">Impresiones que no solo se ven, se viven.</span>
        </p>

        <div className="hero-btns flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* <button className="px-16 py-8 bg-[#1d1d1f] text-white rounded-full font-bold text-3xl hover:scale-105 active:scale-95 transition-all shadow-5xl shadow-black/30 group">
             Iniciar Proyecto <ArrowRight className="inline-block ml-3 group-hover:translate-x-4 transition-transform w-10 h-10" />
          </button> */}

          {/* <div className="flex flex-col items-start text-left bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white/40">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0071e3]">Status Online</span>
            <span className="text-xl font-bold flex items-center gap-2">WhatsApp Directo <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" /></span>
          </div> */}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#1d1d1f] to-transparent" />
      </div>
    </section>
  );
}
