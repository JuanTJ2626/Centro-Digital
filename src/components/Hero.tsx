'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface HeroProps {
  photos: string[];
}

export default function Hero({ photos }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    // En móviles, omitir animaciones pesadas de GSAP para máximo rendimiento
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Continuous Floating Photos (desktop only)
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
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[auto] md:min-h-screen flex items-center justify-center pt-20 md:pt-20 pb-8 md:pb-0 overflow-hidden">
      {/* Halftone Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />

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
              <img src={`/${img}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="work" loading="lazy" decoding="async" />
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
              <img src={`/${img}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="work" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL ADAPTADO Y NÍTIDO EN MÓVIL Y DESKTOP */}
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative z-10 hero-content py-4 md:py-0">
        <h1 className="hero-title text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] sm:leading-[0.95] mb-2 sm:mb-4 md:mb-8 flex flex-col items-center">
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
                  decoding="async"
                  alt={`Muestra ${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        <div className="hero-btns flex flex-col items-center w-full max-w-[280px] sm:max-w-md mx-auto mt-2">
          {/* Botón Primario: WhatsApp */}
          <div className="w-full relative mb-4 sm:mb-6">
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20vengo%20de%20la%20web%20y%20quiero%20cotizar%20mi%20proyecto%20de%20impresi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({
                buttonName: 'Hero: Cotizar Rápido',
                targetNumber: '834 209 1016',
                message: 'Hola Publideas, vengo de la web y quiero cotizar mi proyecto de impresión.'
              })}
              className="animate-whatsapp-vibrate w-full px-6 py-4 sm:py-5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-black text-sm sm:text-base tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all shadow-[0_8px_30px_rgb(37,211,102,0.3)] flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              Cotizar Rápido ⚡
            </a>
            <span className="block text-center text-[#1d1d1f]/60 text-[11px] sm:text-xs font-semibold mt-3">
              🟢 Respondemos en menos de 5 minutos
            </span>
          </div>

          {/* Botón Secundario: Ver Productos (Menos prominente) */}
          <a
            href="#productos"
            className="text-[#1d1d1f]/60 hover:text-[#0071e3] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-1 group transition-colors"
          >
            Ver catálogo de productos <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
