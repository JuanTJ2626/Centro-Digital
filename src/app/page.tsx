'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  ArrowRight, FileText, Layers, Clock, Phone,
  Package, Scissors, Printer, Zap, CheckCircle,
  BookOpen, CreditCard, Tag, BookMarked, LayoutGrid,
  Mail, Clipboard, Image as ImageIcon, Calendar, Sparkles, FileCheck
} from 'lucide-react';

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

  const couche = [
    { gramaje: '130 g', precio: '$8.00', desc: 'Brilloso y resistente', popular: false },
    { gramaje: '135 g', precio: '$8.00', desc: 'Estandar ligero', popular: false },
    { gramaje: '150 g', precio: '$8.50', desc: 'El mas solicitado', popular: true },
    { gramaje: '200 g', precio: '$8.50', desc: 'Grosor intermedio', popular: false },
    { gramaje: '250 g', precio: '$8.50', desc: 'Grosor profesional', popular: false },
    { gramaje: '300 g', precio: '$9.00', desc: 'Premium y rigido', popular: false },
  ];

  const otros = [
    { material: 'Opalina 225 g', precio: '$10.00', desc: 'Textura mate elegante' },
    { material: 'Adhesivo Dimasa', precio: '$9.00', desc: 'Pega en cualquier superficie' },
    { material: 'Sulfatada 12 pts', precio: '$10.00', desc: 'Ideal para empaques' },
    { material: 'Bond 90 g', precio: '$8.00', desc: 'Documentos y escritura' },
    { material: 'Albanene Tabloide', precio: '$14.00', desc: 'Translucido para bocetos' },
  ];

  const productos = [
    { Icon: BookOpen, label: 'Libros', color: '#0071e3', desc: 'Edición pasta suave y dura, tirajes cortos y medianos', badge: 'Destacado' },
    { Icon: BookMarked, label: 'Anuarios', color: '#7c3aed', desc: 'Escolares, corporativos e institucionales a todo color', badge: 'Popular' },
    { Icon: Calendar, label: 'Calendarios', color: '#ff9500', desc: 'De escritorio, pared, bolsillo y formato personalizado', badge: 'Temporada' },
    { Icon: Sparkles, label: 'Stickers & Calcomanías', color: '#34c759', desc: 'Vinil mate, brillante, papel adhesivo y medio corte', badge: 'Top Ventas' },
    { Icon: CreditCard, label: 'Tarjetas de Presentación', color: '#0071e3', desc: 'Couché 300g, laminado mate y barniz a registro' },
    { Icon: ImageIcon, label: 'Posters y Carteles', color: '#ff3b30', desc: 'Tabloide rebasado en couché y sulfatada con alta nitidez' },
    { Icon: LayoutGrid, label: 'Trípticos y Dípticos', color: '#0071e3', desc: 'Folletería publicitaria con dobleces precisos' },
    { Icon: FileText, label: 'Constancias y Diplomas', color: '#ffcc00', desc: 'Opalina y sulfatada con máxima nitidez tipográfica' },
    { Icon: Clipboard, label: 'Comprobantes y Blocs', color: '#ff3b30', desc: 'Blocs de notas, notas de remisión y papel membretado' },
    { Icon: Tag, label: 'Etiquetas para Producto', color: '#ff9500', desc: 'Para empaques, botellas, tarros y cajas comerciales' },
    { Icon: Mail, label: 'Postales y Flyers', color: '#34c759', desc: 'Volantes publicitarios promocionales de alto tiraje' },
    { Icon: FileCheck, label: 'Manuales y Catálogos', color: '#0071e3', desc: 'Grapados o encuadernados para empresas y escuelas' },
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white overflow-x-hidden">
      <ThreeBackground />
      <Navbar />

      <Hero photos={[
        'WhatsApp Image 2026-09-30 at 10.47.09 PM.jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.09 PM (1).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.09 PM (2).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM.jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (1).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (2).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (3).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (4).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (5).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (6).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.11 PM.jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.11 PM (1).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.12 PM.jpeg',
        'WhatsApp Image 2026-04-21 at 12.43.31 PM.jpeg',
        'WhatsApp Image 2026-04-21 at 12.43.32 PM.jpeg',
        'Image to PDF 20260509 15.12.58_1.jpg.jpeg',
        'Image to PDF 20260509 15.12.58_4.jpg.jpeg',
      ]} />

      {/* SECCIÓN PRODUCTOS DESTACADOS & CATÁLOGO (TRANSPARENTE / GLASSMORPHISM) */}
      <section id="productos" className="py-16 md:py-24 px-4 md:px-6 bg-transparent relative overflow-hidden text-[#1d1d1f] z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0071e3]/8 blur-[160px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm text-[10px] font-black uppercase tracking-[0.35em] text-[#0071e3] mb-4">
                <span>Catálogo Integral</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter italic leading-[0.95] text-[#1d1d1f]">
                PRODUCTOS DE <br />
                <span className="text-[#0071e3]">IMPRESIÓN DIGITAL.</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-[#1d1d1f]/75 text-sm md:text-base italic leading-relaxed font-medium">
                Fabricamos proyectos editoriales, publicitarios y de empaque con máxima fidelidad de color: <strong>libros, anuarios escolares, calendarios comerciales y stickers troquelados</strong> listos para entrega inmediata.
              </p>
            </div>
          </div>

          {/* Grid de Productos con fondo translúcido / Apple-glass */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {productos.map(({ Icon, label, color, desc, badge }) => (
              <div
                key={label}
                className="group relative bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/70 hover:border-white rounded-[2rem] p-7 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-black/5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: `${color}18`, border: `1px solid ${color}35` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    {badge && (
                      <span
                        className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm"
                        style={{ backgroundColor: color }}
                      >
                        {badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold italic tracking-tight text-[#1d1d1f] mb-2 group-hover:text-[#0071e3] transition-colors">
                    {label}
                  </h3>
                  <p className="text-[#1d1d1f]/65 text-xs md:text-sm font-medium italic leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Banner de llamada rápida con fondo translúcido dark glass */}
          <div className="reveal mt-12 bg-[#111113]/90 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-black/15 text-white">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#34c759] block mb-1">¿Tienes un proyecto especial o formato a medida?</span>
              <h3 className="text-2xl md:text-3xl font-bold italic tracking-tight text-white">¿No ves lo que buscas? Si se puede imprimir, lo producimos.</h3>
            </div>
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20producto%20especial."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/25"
            >
              Consultar con un Asesor
            </a>
          </div>
        </div>
      </section>

      {/* CATALOGO DE PRECIOS */}
      <section id="precios" className="py-10 md:py-14 px-4 md:px-6 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-6 md:mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Lista de Precios</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
              PRECIOS DE IMPRESIÓN DIGITAL EN CDMX.
            </h2>
            <p className="text-[#86868b] text-base italic mt-3">
              Precios transparentes por pieza para impresión Simplex (4x0). Impresión Duplex (4x4) al doble de precio.
            </p>
            <div className="flex gap-1 mt-5">
              <div className="w-12 h-1 bg-[#0071e3]" />
              <div className="w-12 h-1 bg-[#ff3b30]" />
              <div className="w-12 h-1 bg-[#34c759]" />
              <div className="w-12 h-1 bg-[#ffcc00]" />
            </div>
          </div>

          <div className="reveal mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#86868b]">Papel Couche</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {couche.map((item) => (
                <div
                  key={item.gramaje}
                  className={`relative bg-white rounded-[1.5rem] p-5 border shadow-sm flex flex-col gap-1 overflow-hidden transition-shadow hover:shadow-md ${item.popular ? 'border-[#0071e3]/30 shadow-blue-100' : 'border-slate-100'}`}
                >
                  {item.popular && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0071e3] to-[#00b4ff]" />
                  )}
                  {item.popular && (
                    <span className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-widest text-[#0071e3] bg-[#0071e3]/10 px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#86868b]">{item.gramaje}</span>
                  <span className="text-3xl font-black tracking-tighter text-[#1d1d1f]">{item.precio}</span>
                  <span className="text-[10px] text-[#86868b] italic">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#86868b]">Otros Materiales</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {otros.map((item) => (
                <div key={item.material} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex flex-col gap-1 hover:shadow-md transition-shadow">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#86868b] leading-snug">{item.material}</span>
                  <span className="text-3xl font-black tracking-tighter text-[#1d1d1f]">{item.precio}</span>
                  <span className="text-[10px] text-[#86868b] italic">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#86868b]">Tarjetas de Presentación (Millar)</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0071e3]">Couché 300g (4x1)</span>
                <span className="text-4xl font-black tracking-tighter text-[#1d1d1f]">$250</span>
                <span className="text-[10px] text-[#86868b] italic">Entrega: 3 a 5 días hábiles</span>
              </div>
              <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ff3b30]">Laminadas (4x4)</span>
                <span className="text-4xl font-black tracking-tighter text-[#1d1d1f]">$380</span>
                <span className="text-[10px] text-[#86868b] italic">Entrega: 3 a 5 días hábiles</span>
              </div>
              <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#34c759]">Barniz a registro (4x4)</span>
                <span className="text-4xl font-black tracking-tighter text-[#1d1d1f]">$580</span>
                <span className="text-[10px] text-[#86868b] italic">Entrega: 3 a 5 días hábiles</span>
              </div>
            </div>
          </div>

          <div className="reveal bg-gradient-to-r from-[#0071e3]/8 to-[#0071e3]/4 border border-[#0071e3]/15 rounded-[1.5rem] px-6 py-4 flex items-center gap-4">
            <Package className="w-5 h-5 text-[#0071e3] shrink-0" />
            <p className="text-sm font-bold text-[#1d1d1f]">
              Mas materiales disponibles{' '}
              <span className="font-black text-[#0071e3]">bajo pedido</span>{' '}
              — escribenos para cotizar el que necesitas.
            </p>
          </div>
        </div>
      </section>

      {/* MEDIDAS + IMPRESION + FORMATOS */}
      <section className="py-10 md:py-14 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-6 md:mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Especificaciones Técnicas</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
              FORMATOS Y MEDIDAS DE IMPRESIÓN DIGITAL.
            </h2>
            <div className="flex gap-1 mt-5">
              <div className="w-12 h-1 bg-[#0071e3]" />
              <div className="w-12 h-1 bg-[#ff3b30]" />
              <div className="w-12 h-1 bg-[#34c759]" />
              <div className="w-12 h-1 bg-[#ffcc00]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="reveal bg-[#f5f5f7] rounded-[2rem] p-8">
              <div className="w-11 h-11 bg-[#0071e3] rounded-xl flex items-center justify-center mb-5">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black italic tracking-tight mb-5 text-[#1d1d1f]">Medidas Disponibles</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Carta', dim: '21.5 x 28 cm' },
                  { label: 'Tabloide', dim: '33 x 47.5 cm' },
                  { label: 'Tabloide Rebasado', dim: '33 x 48 cm' },
                  { label: 'Adhesivo', dim: '33 x 48 cm' },
                ].map((m) => (
                  <li key={m.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
                    <span className="font-bold text-sm text-[#1d1d1f]">{m.label}</span>
                    <span className="text-[#86868b] font-mono text-xs bg-slate-100 px-2 py-0.5 rounded-lg">{m.dim}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal bg-[#f5f5f7] rounded-[2rem] p-8">
              <div className="w-11 h-11 bg-[#ff3b30] rounded-xl flex items-center justify-center mb-5">
                <Printer className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black italic tracking-tight mb-5 text-[#1d1d1f]">Tipo de Impresion</h3>
              <div className="space-y-3">
                <div className="bg-white rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#ff3b30]">Simplex</span>
                    <span className="text-[10px] font-bold text-[#86868b] bg-slate-100 px-2 py-0.5 rounded-full">1 cara</span>
                  </div>
                  <span className="text-3xl font-black text-[#1d1d1f]">4 x 0</span>
                  <p className="text-xs text-[#86868b] italic mt-1">Solo frente, sin reverso</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#ff3b30]">Duplex</span>
                    <span className="text-[10px] font-bold text-[#86868b] bg-slate-100 px-2 py-0.5 rounded-full">2 caras</span>
                  </div>
                  <span className="text-3xl font-black text-[#1d1d1f]">4 x 4</span>
                  <p className="text-xs text-[#86868b] italic mt-1">Frente y reverso a color (doble costo)</p>
                </div>
              </div>
            </div>

            <div className="reveal bg-[#f5f5f7] rounded-[2rem] p-8">
              <div className="w-11 h-11 bg-[#34c759] rounded-xl flex items-center justify-center mb-5">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-black italic tracking-tight mb-5 text-[#1d1d1f]">Formatos de Archivo</h3>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { ext: 'PDF', note: 'Vectorial' },
                  { ext: 'PNG', note: 'Alta resolucion' },
                ].map((f) => (
                  <div key={f.ext} className="bg-white border border-slate-100 rounded-2xl px-4 py-4 shadow-sm flex flex-col items-center gap-1">
                    <span className="text-2xl font-black text-[#1d1d1f]">{f.ext}</span>
                    <span className="text-[10px] text-[#86868b] italic">{f.note}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#86868b] italic">Compatible con CorelDRAW y Adobe Illustrator / Photoshop.</p>
            </div>
          </div>
        </div>
      </section>

      <Contacto />
      <Footer />
    </main>
  );
}
