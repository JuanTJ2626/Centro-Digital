'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface HeroProps {
  photos: string[];
}

export default function Hero({ photos }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ top: string; left: string; color: string }[]>([]);

  // Generate random positions only on desktop to avoid overhead on mobile
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }
    const colors = ['#0071e3', '#ff3b30', '#34c759', '#ffcc00'];
    const newParticles = [...Array(6)].map((_, i) => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      color: colors[i % 4]
    }));
    setParticles(newParticles);
  }, []);

  useIsomorphicLayoutEffect(() => {
    // En móviles, mostrar el texto de inmediato sin animación de entrada que pueda ocultarlo
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Text Entrance - Eliminado para máxima optimización y visualización inmediata

      // 2. Continuous Floating Photos (desktop only)
      if (!isMobile) {
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
      }
    }, heroRef);

    return () => ctx.revert();
  }, [particles]);

  return (
    <section ref={heroRef} className="relative min-h-[auto] md:min-h-screen flex items-center justify-center pt-20 md:pt-20 pb-8 md:pb-0 overflow-hidden">
      {/* Halftone Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      {/* Dynamic Colored Blurs (Ocultos o reducidos en móvil para alto rendimiento) */}
      <div className="hidden md:block absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-500/15 blur-[180px] rounded-full pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 left-0 w-[450px] h-[450px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="hidden md:block absolute top-1/4 right-0 w-[450px] h-[450px] bg-yellow-400/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Floating Ink drops (solo en desktop) */}
      <div className="hidden md:block">
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
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll-v {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scroll-v-reverse {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        @keyframes scroll-h {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-h-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes whatsapp-vibrate {
          0%, 78%, 100% { transform: translateX(0) rotate(0); }
          80% { transform: translateX(-4px) rotate(-2deg); }
          82% { transform: translateX(4px) rotate(2deg); }
          84% { transform: translateX(-4px) rotate(-2deg); }
          86% { transform: translateX(4px) rotate(2deg); }
          88% { transform: translateX(0) rotate(0); }
        }

        .animate-whatsapp-vibrate {
          animation: whatsapp-vibrate 2.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-whatsapp-vibrate {
            animation: none;
          }
        }
        
        .animate-slider-1 {
          animation: scroll-h 150s linear infinite;
        }
        .animate-slider-2 {
          animation: scroll-h-reverse 180s linear infinite;
        }
        
        @media (min-width: 768px) {
          .animate-slider-1 {
            animation: scroll-v 150s linear infinite;
          }
          .animate-slider-2 {
            animation: scroll-v-reverse 180s linear infinite;
          }
        }
      `}} />

      {/* SLIDER 1 (Izquierda en PC - oculto en móvil para legibilidad limpia) */}
      <div className="hidden md:block absolute left-12 top-0 bottom-0 md:w-44 overflow-hidden pointer-events-none z-0">
        <div className="animate-slider-1 flex flex-col gap-6 md:w-full pt-6">
          {[...photos, ...photos, ...photos].map((img, i) => (
            <div key={i} className="relative md:w-full aspect-[3/4] rounded-2xl shadow-2xl border-[3px] border-white overflow-hidden pointer-events-auto shrink-0 ring-1 ring-black/5 hover:shadow-blue-500/30 transition-all duration-500">
              <img src={`/${img}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="work" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* SLIDER 2 (Derecha en PC - oculto en móvil para legibilidad limpia) */}
      <div className="hidden md:block absolute right-12 top-0 bottom-0 md:w-44 overflow-hidden pointer-events-none z-0">
        <div className="animate-slider-2 flex flex-col gap-6 md:w-full pt-6">
          {[...photos].reverse().concat([...photos].reverse()).concat([...photos].reverse()).map((img, i) => (
            <div key={`r-${i}`} className="relative md:w-full aspect-[3/4] rounded-2xl shadow-2xl border-[3px] border-white overflow-hidden pointer-events-auto shrink-0 ring-1 ring-black/5 hover:shadow-blue-500/30 transition-all duration-500">
              <img src={`/${img}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="work" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL ADAPTADO Y NÍTIDO EN MÓVIL Y DESKTOP */}
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative z-10 hero-content py-4 md:py-0">
        {/* Badge superior compacto en móvil */}

        <h1 className="hero-title text-2xl sm:text-4xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] sm:leading-[0.95] mb-2 sm:mb-4 md:mb-8 flex flex-col items-center">
          <span className="block overflow-hidden"><span className="block italic text-[#1d1d1f]">PUBLIDEAS</span></span>
          <span className="block overflow-hidden"><span className="block text-premium italic uppercase">Impresión Digital.</span></span>
        </h1>

        <p className="hero-p text-xs sm:text-base md:text-2xl text-[#1d1d1f]/75 max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto font-medium leading-relaxed mb-4 sm:mb-6 md:mb-12 italic">
          Especialistas en impresión digital CMYK de alta resolución: <strong className="text-[#1d1d1f] font-bold">libros, anuarios, stickers, posters y folletería</strong>. Entrega express en CDMX.
        </p>

        {/* Carrusel móvil deslizante con fotos más compactas */}
        <div className="md:hidden w-full mb-4">
          <div className="flex items-center justify-between px-2 mb-1.5">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0071e3]">Muestras reales</span>
            <span className="text-[9px] text-[#1d1d1f]/50 font-bold uppercase tracking-wider">Desliza →</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {photos.map((img, i) => (
              <div
                key={i}
                className="w-24 h-32 shrink-0 rounded-xl overflow-hidden shadow-md border-2 border-white snap-center relative ring-1 ring-black/5 bg-slate-100 group"
              >
                <img
                  src={`/${img}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  alt={`Muestra ${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="hero-btns flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center w-full max-w-xs sm:max-w-none mx-auto">
          <a
            href="#productos"
            className="w-full sm:w-auto px-5 sm:px-10 py-3 sm:py-5 bg-[#1d1d1f] hover:bg-black text-white rounded-full font-black text-[11px] sm:text-sm tracking-[0.15em] uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2 group"
          >
            Ver Productos <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20mi%20proyecto%20de%20impresi%C3%B3n%20ahora%20mismo."
            target="_blank"
            rel="noopener noreferrer"
            className="animate-whatsapp-vibrate w-full sm:w-auto px-5 sm:px-10 py-3 sm:py-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-black text-[11px] sm:text-sm tracking-[0.1em] uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            ¡Cotiza por WhatsApp!
          </a>
        </div>
      </div>

      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 opacity-40">
        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Desliza</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#1d1d1f] to-transparent" />
      </div>
    </section>
  );
}
