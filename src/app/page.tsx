'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Components
import ThreeBackground from '@/components/ThreeBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MateriaPrima from '@/components/MateriaPrima';
import Gallery from '@/components/Gallery';
import ValorAgregado from '@/components/ValorAgregado';
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
    "WhatsApp Image 2026-04-21 at 12.43.32 PM.jpeg"
  ];

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal logic for elements NOT handled by components
      // Using a more specific selector
      gsap.utils.toArray('.main-reveal').forEach((el: any) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          scale: 0.98,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      
      <Hero photos={photos} />
      <MateriaPrima />
      <Gallery photos={photos} />
      <ValorAgregado />
      <Footer />
    </main>
  );
}
