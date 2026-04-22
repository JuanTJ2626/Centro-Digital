'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface HeroProps {
  photos: string[];
}

export default function Hero({ photos }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ top: string; left: string; color: string }[]>([]);

  // Generate random positions only on the client to avoid hydration mismatch
  useEffect(() => {
    const colors = ['#0071e3', '#ff3b30', '#34c759', '#ffcc00'];
    const newParticles = [...Array(6)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: colors[i % 4]
    }));
    setParticles(newParticles);
  }, []);

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
          y: '+=25',
          rotation: i % 2 === 0 ? 5 : -5,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3
        });
      });

      // 3. Floating "Ink Drops" (Particles)
      const particleEls = gsap.utils.toArray('.hero-particle');
      particleEls.forEach((p: any) => {
        gsap.to(p, {
          y: 'random(-100, 100)',
          x: 'random(-100, 100)',
          duration: 'random(10, 20)',
          repeat: -1,
          yoyo: true,
          ease: 'none'
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
  }, [particles]); // Re-run GSAP when particles are generated

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Halftone Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />
      
      {/* Dynamic Colored Blurs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/15 blur-[180px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-500/15 blur-[180px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-yellow-400/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Ink drops (Particles) */}
      {particles.map((p, i) => (
        <div 
          key={i} 
          className="hero-particle absolute w-3 h-3 rounded-full opacity-20 pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            backgroundColor: p.color,
            filter: 'blur(2px)'
          }}
        />
      ))}

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
        <div className="hero-tag inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-md shadow-xl rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/50" />

        <h1 className="hero-title text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] mb-8 flex flex-col items-center">
          <span className="block overflow-hidden"><span className="block italic">IMPRESIÓN</span></span>
          <span className="block overflow-hidden"><span className="block text-premium italic uppercase">Digital.</span></span>
        </h1>

        <p className="hero-p text-xl md:text-3xl text-[#1d1d1f]/60 max-w-4xl mx-auto font-medium leading-tight mb-20 italic">
          Donde la precisión se encuentra con la pasión. <br />
          <span className="text-[#1d1d1f] font-bold">Impresiones que no solo se ven, se viven.</span>
        </p>

        <div className="hero-btns flex flex-col md:flex-row gap-6 justify-center items-center">
          <a href="#services" className="px-12 py-5 bg-[#1d1d1f] text-white rounded-full font-black text-xs md:text-sm tracking-[0.2em] uppercase hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-black/20 flex items-center gap-4 group">
             Explorar Catálogo <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>

          <div className="flex items-center gap-4 bg-white/40 backdrop-blur-xl px-6 py-4 rounded-full border border-white/60 shadow-sm">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute inset-0" />
              <div className="relative w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1d1d1f]">Status Live</span>
              <span className="text-[11px] font-bold text-slate-500 italic mt-1">Listo para imprimir</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#1d1d1f] to-transparent" />
      </div>
    </section>
  );
}
