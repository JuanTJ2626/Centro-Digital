'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ThreeBackground from '@/components/ThreeBackground';
import { 
  Printer, FileText, StickyNote, Award, Clock, ArrowRight, Zap, CheckCircle, 
  UploadCloud, Box, HelpCircle, Plus, Minus, MapPin, Mail, Camera, ChevronRight, 
  Sparkles, Layers, ShieldCheck, Search, Droplets, Wand2, Star
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Animation
      const heroTl = gsap.timeline();
      heroTl.from('.hero-tag', { opacity: 0, y: 20, duration: 1, ease: 'power4.out' })
            .from('.hero-title span', { 
              y: 100, 
              opacity: 0, 
              duration: 1.5, 
              stagger: 0.1, 
              ease: 'expo.out' 
            }, '-=0.5')
            .from('.hero-p', { opacity: 0, y: 30, duration: 1 }, '-=1')
            .from('.hero-btns', { opacity: 0, y: 30, duration: 1 }, '-=0.8');

      // 2. Continuous Floating Animation + Parallax
      const heroImages = gsap.utils.toArray('.hero-float');
      
      // Infinite Breathing/Floating Effect
      heroImages.forEach((img: any, i: number) => {
        gsap.to(img, {
          y: '-=20',
          xOrigin: 'center',
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: i * 0.3
        });
      });

      // Mouse Parallax (Gentler)
      window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;
        
        heroImages.forEach((img: any, i: number) => {
          gsap.to(img, {
            x: xPos * (i + 1) * 0.2,
            y: yPos * (i + 1) * 0.2,
            duration: 3,
            ease: 'power2.out'
          });
        });
      });

      // 3. Apple-style Scroll Reveal
      gsap.utils.toArray('.reveal').forEach((el: any) => {
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

      // 4. 3D COVERFLOW GALLERY
      const galleryItems = gsap.utils.toArray('.gallery-item');
      gsap.set(galleryItems, { perspective: 1200 });

      galleryItems.forEach((item: any) => {
        gsap.fromTo(item, 
          { rotateY: 50, scale: 0.8, z: -150, opacity: 0.3, filter: 'grayscale(100%) blur(10px)' },
          {
            rotateY: 0, scale: 1, z: 0, opacity: 1, filter: 'grayscale(0%) blur(0px)',
            scrollTrigger: {
              trigger: item,
              start: 'left right-=20%',
              end: 'center center',
              scrub: true,
              horizontal: true,
              containerAnimation: gsap.to(galleryItems, {
                xPercent: -100 * (galleryItems.length - 1),
                ease: 'none',
                scrollTrigger: {
                  trigger: '#gallery-scroll-container',
                  pin: true,
                  scrub: 1.5,
                  end: () => `+=${(document.querySelector('#gallery-scroll-container') as HTMLElement).offsetWidth * 1.5}`,
                }
              })
            }
          }
        );
      });

      // 5. Tactile Card Light Effect (Valor Agregado)
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
            rotateX: (y - rect.height/2) / 15,
            rotateY: (x - rect.width/2) / -15,
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

      // 6. Materia Prima Card Hover Tilt
      const materiaCards = gsap.utils.toArray('.materia-card');
      materiaCards.forEach((card: any) => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(card, { 
            rotateX: (y - rect.height/2) / 20, 
            rotateY: (x - rect.width/2) / -20, 
            scale: 1.02, 
            duration: 0.5,
            perspective: 1000
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 1, ease: 'power2.out' });
        });
      });

    });

    return () => ctx.revert();
  }, []);

  const photos = [
    "WhatsApp Image 2026-04-21 at 12.43.29 PM (1).jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.29 PM.jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.31 PM (1).jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.31 PM.jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.32 PM (1).jpeg",
    "WhatsApp Image 2026-04-21 at 12.43.32 PM.jpeg"
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white overflow-x-hidden">
      <ThreeBackground />

      {/* Navigation */}
      <nav className="fixed w-full z-[100] px-6 py-4 flex justify-center">
        <div className="w-full max-w-5xl apple-glass rounded-[2rem] py-3 px-8 flex justify-between items-center shadow-lg shadow-black/[0.03] border border-white/40">
          <div className="flex items-center gap-3">
            <img src="/LOGO PUBLIDEAS.jpeg" alt="Logo" className="h-8 w-auto rounded-md shadow-sm" />
            <div className="flex flex-col">
               <span className="text-xl font-black tracking-tighter leading-none">MIGUEL</span>
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#0071e3]">Elite Print</span>
            </div>
          </div>
          <div className="hidden md:flex gap-10 text-[13px] font-medium text-[#1d1d1f]/70 uppercase tracking-widest font-black">
            <a href="#services" className="hover:text-[#1d1d1f] transition-colors">Materiales</a>
            <a href="#gallery-scroll-container" className="hover:text-[#1d1d1f] transition-colors">Galería</a>
            <a href="#quote" className="px-6 py-2 bg-[#1d1d1f] text-white rounded-full hover:scale-105 transition-all text-[10px] font-black">Cotizar</a>
          </div>
        </div>
      </nav>

      {/* Hero Section - SMALL FLOATING PHOTOGRAPHY */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
         {/* Floating Photos Mosaic - VERY SMALL & INFINITE FLOAT */}
         <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden max-w-[100vw]">
            {photos.slice(0, 5).map((img, i) => (
              <div 
                key={i} 
                className="hero-float absolute w-28 md:w-40 aspect-[3/4] rounded-[1.5rem] shadow-xl border-[4px] border-white overflow-hidden pointer-events-auto cursor-pointer transition-shadow hover:shadow-blue-500/30"
                style={{
                  top: i === 0 ? '15%' : i === 1 ? '70%' : i === 2 ? '10%' : i === 3 ? '75%' : '45%',
                  left: i === 0 ? '8%' : i === 1 ? '12%' : undefined,
                  right: i === 2 ? '8%' : i === 3 ? '15%' : i === 4 ? '5%' : undefined,
                  opacity: 0.95,
                  transform: `rotate(${i * 8 - 12}deg)`
                }}
              >
                 <img src={`/${img}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt="work" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            ))}
         </div>

         <div className="max-w-6xl mx-auto text-center px-6 relative z-10 hero-content">
            <div className="hero-tag inline-flex items-center gap-2 px-4 py-1.5 bg-white shadow-xl rounded-full text-[11px] font-black uppercase tracking-[0.3em] mb-8 border border-slate-100">
               <Zap className="w-3 h-3 text-yellow-500 fill-current" />
               <span className="text-[#0071e3]">Elite Print Experience</span>
            </div>
            <h1 className="hero-title text-7xl md:text-[11rem] font-bold tracking-tighter leading-[0.8] mb-12">
               <span>PULSO</span> <br />
               <span className="gradient-brand italic">DIGITAL.</span>
            </h1>
            <p className="hero-p text-xl md:text-3xl text-[#86868b] max-w-3xl mx-auto font-medium leading-tight mb-16 italic">
               Más que color, entregamos sensaciones. <br /> La imprenta del futuro, hoy en tus manos.
            </p>
            <div className="hero-btns flex gap-6 justify-center">
               <button className="px-14 py-6 bg-[#1d1d1f] text-white rounded-full font-bold text-2xl hover:scale-110 transition-all shadow-5xl shadow-black/30 group">
                  Iniciar Cotización <ArrowRight className="inline-block ml-3 group-hover:translate-x-3 transition-transform w-8 h-8" />
               </button>
            </div>
         </div>
      </section>

      {/* Materia Prima Section */}
      <section id="services" className="py-40 px-6 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
           <div className="reveal mb-24">
              <h2 className="text-6xl md:text-[9rem] font-bold tracking-tighter mb-8 italic leading-none">MATERIA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500">PRIMA.</span></h2>
              <p className="text-3xl font-medium text-[#86868b] italic">Suaves al tacto, eternos a la vista.</p>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="reveal materia-card lg:col-span-2 h-[550px] rounded-[4.5rem] bg-white p-16 flex flex-col justify-between shadow-2xl relative overflow-hidden group border border-white">
                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -mr-48 -mt-48 transition-colors group-hover:bg-blue-100/50" />
                 <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <h3 className="text-6xl font-bold tracking-tighter italic mb-8 text-[#1d1d1f]">Papel Couché</h3>
                      <p className="text-2xl text-[#86868b] max-w-md font-medium leading-snug italic">Máxima absorción de color. Disponible en acabados mate o brillante de alta densidad.</p>
                    </div>
                    <FileText className="w-16 h-16 text-[#0071e3] opacity-10" />
                 </div>
                 <div className="relative z-10 flex justify-between items-end border-t border-slate-50 pt-10">
                    <div className="flex gap-3">
                       {["130g", "250g", "350g"].map(g => <span key={g} className="px-6 py-3 rounded-2xl bg-[#f5f5f7] border border-slate-100 text-[10px] font-black uppercase tracking-widest">{g}</span>)}
                    </div>
                    <div className="text-7xl font-black tracking-tighter text-[#1d1d1f]">$7 <span className="text-xl opacity-30 italic">MXN</span></div>
                 </div>
              </div>

              <div className="reveal materia-card h-[550px] rounded-[4.5rem] bg-[#1d1d1f] p-16 flex flex-col justify-between shadow-2xl relative group overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-transparent transition-opacity group-hover:opacity-60" />
                 <div className="relative z-10">
                    <StickyNote className="w-16 h-16 text-[#ff3b30] mb-12 shadow-3xl" />
                    <h3 className="text-5xl font-bold tracking-tighter italic text-white mb-6">Adhesivos</h3>
                    <p className="text-white/40 text-xl font-medium leading-tight italic">Vinilos premium Dimasa con adherencia garantizada en cualquier superficie.</p>
                 </div>
                 <div className="relative z-10 text-6.5xl font-black tracking-tighter text-white italic">$12</div>
              </div>
           </div>
        </div>
      </section>

      {/* ADVANCED 3D EVIDENCIA TÁCTIL GALLERY */}
      <section id="gallery-scroll-container" className="h-screen bg-white flex flex-col justify-center overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 mb-16 w-full relative z-10">
            <div className="flex items-center gap-4 mb-4 text-[#0071e3]">
               <Camera className="w-6 h-6" />
               <span className="font-black uppercase tracking-[0.5em] text-xs">Exhibición Digital</span>
            </div>
            <h2 className="text-6xl md:text-[9rem] font-bold tracking-tighter italic">EVIDENCIA.</h2>
         </div>

         <div className="flex items-center gap-24 px-[15vw] h-[55vh]">
            {photos.map((img, i) => (
              <div key={i} className="gallery-item shrink-0 w-[450px] md:w-[750px] aspect-[16/10] bg-slate-50 rounded-[4rem] overflow-hidden relative group shadow-3xl ring-1 ring-black/5">
                 <img src={`/${img}`} alt={`Work ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
              </div>
            ))}
         </div>
      </section>

      {/* VALOR AGREGADO - SUPREME INTERACTION RESTORED */}
      <section className="py-40 px-6 bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto">
           <div className="reveal mb-32 flex flex-col items-center text-center">
              <div className="w-32 h-2.5 bg-gradient-to-r from-blue-600 via-red-500 to-yellow-400 rounded-full mb-12 shadow-xl" />
              <h2 className="text-6xl md:text-[12rem] font-bold tracking-tighter leading-none mb-8 italic">VALOR <br /> AGREGADO.</h2>
              <p className="text-3xl font-medium text-[#86868b] leading-tight italic max-w-4xl underline decoration-slate-200 decoration-1 underline-offset-12">
                 Detalles que se sienten. Acabados tridimensionales que transforman el papel en una experiencia inolvidable.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { name: "Laminado Pro", price: "$2", desc: "Acabado Mate Seda o Brillo Espejo de alta resistencia.", icon: Droplets, color: "from-blue-600/10 to-blue-600/5", accent: "#0071e3" },
                { name: "Soft Touch", price: "$8", desc: "Sensación aterciopelada premium incomparable.", icon: Wand2, color: "from-red-500/10 to-red-500/5", accent: "#ff3b30" },
                { name: "Barniz UV 3D", price: "+$48", desc: "Resaltado selectivo con volumen real y brillo táctil.", icon: Sparkles, color: "from-green-500/10 to-green-500/5", accent: "#34c759" },
                { name: "Foil Metálico", price: "Desde $19", desc: "Oro, Plata y Efectos Holografía de alto impacto.", icon: Star, color: "from-yellow-400/10 to-yellow-400/5", accent: "#ffcc00" }
              ].map((f, idx) => (
                 <div key={idx} className="value-card relative overflow-hidden h-[450px] flex flex-col justify-between p-14 rounded-[5rem] bg-gradient-to-br border border-white shadow-3xl cursor-none transition-all group" style={{ perspective: '1500px' }}>
                    <div className="gloss-effect absolute w-[400px] h-[400px] bg-white/40 blur-[80px] rounded-full pointer-events-none opacity-0 mix-blend-overlay" style={{ transform: 'translate(-50%, -50%)' }} />
                    <div className="relative z-10">
                       <div className="flex items-center gap-6 mb-12 text-black">
                          <div className="w-18 h-18 rounded-[2rem] flex items-center justify-center bg-white shadow-2xl group-hover:scale-110 transition-transform" style={{ color: f.accent }}>
                             <f.icon className="w-10 h-10" />
                          </div>
                          <h3 className="text-4xl font-black italic tracking-tighter uppercase">{f.name}</h3>
                       </div>
                       <p className="text-[#86868b] text-2xl font-medium italic leading-[1.3] max-w-[340px]">{f.desc}</p>
                    </div>
                    <div className="relative z-10 flex justify-between items-end border-t border-black/5 pt-12">
                       <span className="text-[11px] font-black uppercase tracking-[0.5em] opacity-30 italic">Lujo Táctil</span>
                       <div className="text-7xl font-black tracking-tighter leading-none" style={{ color: f.accent }}>{f.price}</div>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section id="quote" className="py-48 px-6 bg-white text-center">
         <div className="reveal max-w-5xl mx-auto">
            <h2 className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-none mb-12 italic">ESTÁNDAR <br /> ELITE.</h2>
            <button className="px-24 py-10 bg-[#1d1d1f] text-white rounded-full font-bold text-4xl hover:scale-110 active:scale-95 transition-all shadow-5xl shadow-black/40 mb-32 flex items-center gap-8 mx-auto group">
               Cotizar WhatsApp <ArrowRight className="group-hover:translate-x-4 transition-transform w-12 h-12" />
            </button>
            <div className="flex flex-col md:flex-row justify-between items-center gap-16 border-t border-slate-100 pt-20">
               <div className="flex items-center gap-8 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                  <img src="/LOGO PUBLIDEAS.jpeg" alt="Logo" className="h-16 rounded-xl shadow-lg border border-slate-100" />
                  <span className="font-black italic tracking-tighter text-2xl">MIGUEL PREMIUM PRINT</span>
               </div>
               <p className="text-xs font-black uppercase tracking-[0.6em] text-[#86868b]">© {new Date().getFullYear()} SAN LUIS POTOSÍ MX</p>
            </div>
         </div>
      </section>
    </main>
  );
}
