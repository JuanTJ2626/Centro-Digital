'use client';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  ArrowRight, FileText, Layers, Clock, Phone,
  Package, Scissors, Printer, Zap, CheckCircle,
  BookOpen, CreditCard, Tag, BookMarked, LayoutGrid,
  Mail, Clipboard, Image as ImageIcon
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
    { gramaje: '150 g', precio: '$8.50', desc: 'El mas solicitado', popular: true },
    { gramaje: '250 g', precio: '$8.50', desc: 'Grosor profesional', popular: false },
    { gramaje: '300 g', precio: '$9.00', desc: 'Premium y rigido', popular: false },
  ];

  const otros = [
    { material: 'Adhesivo Dimasa', precio: '$9.00', desc: 'Pega en cualquier superficie' },
    { material: 'Sulfatada 12 pts', precio: '$10.00', desc: 'Ideal para empaques' },
    { material: 'Bond 90 g', precio: '$8.00', desc: 'Documentos y escritura' },
    { material: 'Albanene Tabloide', precio: '$14.00', desc: 'Translucido para bocetos' },
  ];

  const productos = [
    { Icon: FileText, label: 'Flyers', color: '#0071e3' },
    { Icon: CreditCard, label: 'Tarjetas', color: '#ff3b30' },
    { Icon: Mail, label: 'Postales', color: '#34c759' },
    { Icon: ImageIcon, label: 'Posters', color: '#ffcc00' },
    { Icon: BookOpen, label: 'Manuales', color: '#0071e3' },
    { Icon: Tag, label: 'Etiquetas', color: '#ff3b30' },
    { Icon: LayoutGrid, label: 'Tripticos', color: '#34c759' },
    { Icon: Clipboard, label: 'Blocks', color: '#ffcc00' },
    { Icon: BookMarked, label: 'Revistas', color: '#0071e3' },
    { Icon: Package, label: 'Y mas...', color: '#86868b' },
  ];

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white overflow-x-hidden">
      <ThreeBackground />
      <Navbar />

      <Hero photos={[
        'WhatsApp Image 2026-04-21 at 12.43.29 PM.jpeg',
        'WhatsApp Image 2026-04-21 at 12.43.29 PM (1).jpeg',
        'WhatsApp Image 2026-04-21 at 12.43.31 PM.jpeg',
        'WhatsApp Image 2026-04-21 at 12.43.31 PM (1).jpeg',
        'WhatsApp Image 2026-04-21 at 12.43.32 PM.jpeg',
      ]} />

      {/* PRODUCTOS */}
      <section className="py-8 md:py-12 px-4 md:px-6 bg-[#1d1d1f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6 md:mb-8">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]">Que imprimimos</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2 text-white">
                CUALQUIER<br />PRODUCTO.
              </h2>
            </div>
            <p className="text-white/40 text-sm italic max-w-xs md:text-right leading-relaxed">
              Si tu producto no esta en la lista, contactanos.<br />Si se puede imprimir, lo hacemos.
            </p>
          </div>
          <div className="reveal grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {productos.map(({ Icon, label, color }) => (
              <div
                key={label}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/[0.08] rounded-2xl px-4 py-4 transition-all cursor-default"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}22` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <span className="text-white/80 font-bold text-sm leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGO DE PRECIOS */}
      <section id="precios" className="py-10 md:py-14 px-4 md:px-6 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-6 md:mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Catalogo</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
              PRECIOS POR PIEZA.
            </h2>
            <p className="text-[#86868b] text-base italic mt-3">
              Simplex (4x0) o Duplex (4x4). Sin cargos ocultos.
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {otros.map((item) => (
                <div key={item.material} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex flex-col gap-1 hover:shadow-md transition-shadow">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#86868b] leading-snug">{item.material}</span>
                  <span className="text-3xl font-black tracking-tighter text-[#1d1d1f]">{item.precio}</span>
                  <span className="text-[10px] text-[#86868b] italic">{item.desc}</span>
                </div>
              ))}
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
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Especificaciones</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
              MEDIDAS & FORMATOS.
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
                  { label: 'Carta', dim: '21.6 x 27.9 cm' },
                  { label: 'Tabloide', dim: '27.9 x 43.2 cm' },
                  { label: 'Tabloide Rebasado', dim: '33 x 47 cm' },
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
                  <p className="text-xs text-[#86868b] italic mt-1">Frente y reverso a color</p>
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

      {/* ACABADOS + MAQUILA */}
      <section id="acabados" className="py-10 md:py-14 px-4 md:px-6 bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-6 md:mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Extras</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
              ACABADOS & MAQUILA.
            </h2>
            <div className="flex gap-1 mt-5">
              <div className="w-12 h-1 bg-[#0071e3]" />
              <div className="w-12 h-1 bg-[#ff3b30]" />
              <div className="w-12 h-1 bg-[#34c759]" />
              <div className="w-12 h-1 bg-[#ffcc00]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="reveal bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-11 h-11 bg-[#ff3b30] rounded-xl flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight text-[#1d1d1f]">Acabados</h3>
                  <p className="text-xs text-[#86868b] italic">Sobre el precio base por pieza</p>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  { label: 'Laminado Mate', extra: '+$2 / pieza', desc: 'Acabado suave y elegante', accent: true },
                  { label: 'Laminado Brillante', extra: '+$2 / pieza', desc: 'Colores mas vibrantes', accent: true },
                  { label: 'Medio Corte', extra: 'Consultar', desc: 'Para etiquetas troqueladas', accent: false },
                  { label: 'Sin acabado', extra: 'Estandar', desc: 'Incluido en el precio base', accent: false },
                ].map((row) => (
                  <li key={row.label} className="flex items-center gap-4 bg-[#f5f5f7] rounded-2xl px-4 py-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${row.accent ? 'bg-[#0071e3]' : 'bg-slate-300'}`} />
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-sm text-[#1d1d1f] block">{row.label}</span>
                      <span className="text-[10px] text-[#86868b] italic">{row.desc}</span>
                    </div>
                    <span className={`text-sm font-black whitespace-nowrap ${row.extra.startsWith('+') ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                      {row.extra}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="reveal relative rounded-[2rem] overflow-hidden p-8 flex flex-col"
              style={{ background: 'linear-gradient(145deg, #0d1b3e 0%, #001a6e 100%)' }}
            >
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#0071e3]/30 blur-[70px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 bg-[#ffcc00] rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#1d1d1f]" />
                  </div>
                  <h3 className="text-2xl font-black italic tracking-tight text-white">Servicio de Maquila</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-300/60">Desde</span>
                  <span className="text-5xl font-black text-white tracking-tighter ml-1">$5.00</span>
                  <span className="text-lg text-white/40 font-medium">/ pieza</span>
                </div>
                <p className="text-white/50 text-sm italic mb-4">El costo varia segun:</p>
                <ul className="space-y-2 mb-6">
                  {['Material utilizado', 'Grosor', 'Complejidad del trabajo'].map((v) => (
                    <li key={v} className="flex items-center gap-2 text-sm text-white/70 font-medium">
                      <CheckCircle className="w-4 h-4 text-[#ffcc00] shrink-0" />
                      {v}
                    </li>
                  ))}
                </ul>
                <a href="/cotizar" className="mt-auto inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1d1d1f] rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all self-start">
                  Cotizar maquila <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIEMPOS DE ENTREGA */}
      <section className="py-10 md:py-16 px-4 md:px-6 bg-[#111113] relative overflow-hidden">
        <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="text-[240px] md:text-[380px] font-black tracking-tighter text-white/[0.025] italic leading-none pr-6">24h</span>
        </div>
        <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-[#ffcc00]/10 border border-[#ffcc00]/20 rounded-full px-5 py-2 mb-6">
              <Clock className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffcc00]">Tiempos de Entrega</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter italic text-white leading-[0.95]">
              ENTREGAS <span className="text-[#ffcc00]">RAPIDAS.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            <div className="bg-[#0f2d1a] border border-[#34c759]/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#34c759] block mb-5">Pedido antes de</span>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-[76px] font-black text-white italic leading-none">12</span>
                <span className="text-3xl font-black text-white/40 pb-1">pm</span>
              </div>
              <div className="h-px bg-white/10 mb-5" />
              <span className="text-2xl font-black text-white italic">Entrega mismo dia</span>
              <div className="mt-auto pt-6">
                <div className="inline-flex items-center px-4 h-9 bg-[#34c759] rounded-xl text-white font-black text-[10px] uppercase tracking-widest">Normal</div>
              </div>
            </div>
            <div className="bg-[#061829] border border-[#0071e3]/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#60a5fa] block mb-5">Pedido despues de</span>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-[76px] font-black text-white italic leading-none">12</span>
                <span className="text-3xl font-black text-white/40 pb-1">pm</span>
              </div>
              <div className="h-px bg-white/10 mb-5" />
              <span className="text-2xl font-black text-white italic">Dia siguiente</span>
              <div className="mt-auto pt-6">
                <div className="inline-flex items-center px-4 h-9 bg-[#0071e3] rounded-xl text-white font-black text-[10px] uppercase tracking-widest">Express</div>
              </div>
            </div>
            <div className="bg-[#1e1600] border border-[#ffcc00]/25 rounded-[2.5rem] p-8 md:p-10 flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <Phone className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#ffcc00]">Horario</span>
              </div>
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-[66px] font-black text-white italic leading-none">8:30</span>
              </div>
              <div className="h-px bg-white/10 mb-5" />
              <span className="text-xl font-black text-white/80 italic">a.m. - 6:00 p.m.</span>
              <div className="mt-auto pt-6">
                <a href="tel:+5568081606" className="text-sm font-bold text-[#ffcc00]/60 hover:text-[#ffcc00] transition-colors">55 6808 1606</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contacto />
      <Footer />
    </main>
  );
}
