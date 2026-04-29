'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';
import { FileText, StickyNote, Layers, Printer, Image as ImageIcon, Ruler, ArrowRight, Sparkles } from 'lucide-react';

export default function MaterialesPage() {
  return (
    <main className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans overflow-x-hidden">
      <ThreeBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 md:px-6 overflow-hidden z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 right-0 text-[25vw] font-black italic tracking-tighter text-[#1d1d1f]/[0.04] leading-none select-none">MAT</div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex gap-2 mb-8">
            <div className="w-5 h-5 rounded-full bg-[#0071e3]" />
            <div className="w-5 h-5 rounded-full bg-[#ff3b30]" />
            <div className="w-5 h-5 rounded-full bg-[#34c759]" />
            <div className="w-5 h-5 rounded-full bg-[#ffcc00]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3] block mb-3">Catálogo Completo</span>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter italic leading-[0.9] mb-6 text-[#1d1d1f]">
            MATE<span className="text-[#0071e3]">RIALES</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#86868b] italic font-medium max-w-2xl">
            Todos los sustratos y formatos disponibles para tu impresión digital CMYK.
          </p>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="pb-20 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* 01 — Papel Couché: Feature card */}
          <div className="relative bg-white rounded-[3rem] p-8 md:p-14 overflow-hidden border border-slate-100 shadow-sm">
            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-8 pointer-events-none select-none">
              <span className="text-[20rem] font-black italic tracking-tighter text-[#0071e3]/[0.04] leading-none">01</span>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071e3]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0071e3] block mb-2">Alta Calidad · Papel</span>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic text-[#1d1d1f] mb-4">Papel Couché</h2>
              <p className="text-[#86868b] text-lg font-medium italic mb-8 max-w-xl">
                Superficie tratada que intensifica colores y define bordes. La base ideal para flyers, posters y catálogos de alto impacto.
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Flyers', 'Pósters', 'Menús', 'Dípticos', 'Catálogos'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-[#f5f5f7] text-[#86868b] text-xs font-black uppercase tracking-widest border border-slate-100">{tag}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {[
                  { g: '135 grs', p: '$7' },
                  { g: '150 grs', p: '$7' },
                  { g: '200 grs', p: '$8' },
                  { g: '250 grs', p: null },
                  { g: '300 grs', p: '$8.5' },
                ].map((item, idx) => (
                  <div key={idx} className={`p-5 rounded-[1.5rem] flex flex-col gap-2 ${item.p ? 'bg-[#0071e3]/10 border border-[#0071e3]/20' : 'bg-[#f5f5f7] border border-slate-100'}`}>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#86868b]">{item.g}</span>
                    {item.p
                      ? <span className="text-3xl font-black tracking-tighter text-[#0071e3]">{item.p}</span>
                      : <span className="text-sm italic font-medium text-slate-300">Consultar</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 02 Bond + 03 Sulfatada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative bg-white rounded-[3rem] p-8 md:p-12 overflow-hidden border border-slate-100 shadow-sm">
              <div className="absolute right-6 bottom-6 pointer-events-none select-none">
                <span className="text-[9rem] font-black italic tracking-tighter text-slate-100 leading-none">02</span>
              </div>
              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 block mb-2">Uso Estándar · Papel</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic text-[#1d1d1f] mb-3">Bond</h2>
                <p className="text-[#86868b] italic font-medium mb-8 text-sm">Para impresiones de uso diario, documentos y material educativo.</p>
                <div className="flex flex-col gap-0">
                  {['90 grs', '120 grs'].map((g, idx) => (
                    <div key={idx} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                      <span className="font-black text-[#1d1d1f]">{g}</span>
                      <span className="text-slate-300 italic font-medium text-sm">Consultar</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-[3rem] p-8 md:p-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', border: '1px solid #fed7aa' }}>
              <div className="absolute right-6 bottom-6 pointer-events-none select-none">
                <span className="text-[9rem] font-black italic tracking-tighter leading-none" style={{ color: '#fed7aa' }}>03</span>
              </div>
              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-orange-500 block mb-2">Resistente · Cartulina</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic text-[#1d1d1f] mb-3">Sulfatada</h2>
                <p className="text-orange-900/50 italic font-medium mb-8 text-sm">Cartulina de alta rigidez para cajas, empaque y material de durabilidad superior.</p>
                <div className="flex flex-col gap-0">
                  {['8 puntos', '10 puntos', '12 puntos'].map((g, idx) => (
                    <div key={idx} className="flex items-center justify-between py-4 border-b border-orange-100 last:border-0">
                      <span className="font-black text-[#1d1d1f]">{g}</span>
                      <span className="text-orange-300 italic font-medium text-sm">Consultar</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 04 — Opalina: Premium accent card (dark by design) */}
          <div className="relative rounded-[3rem] p-8 md:p-14 overflow-hidden bg-[#1d1d1f]">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ffcc00]/8 blur-[120px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-800/10 blur-[80px] rounded-full" />
              <div className="absolute right-8 top-0 bottom-0 flex items-center pointer-events-none select-none">
                <span className="text-[20rem] font-black italic tracking-tighter text-white/[0.025] leading-none">04</span>
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#ffcc00]">Premium · Cartulina</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic text-white mb-4">Opalina</h2>
              <p className="text-white/40 text-lg font-medium italic mb-10 max-w-xl">
                Textura suave y acabado exclusivo. La elección para invitaciones, tarjetas de presentación y materiales de alto impacto visual.
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Invitaciones', 'Tarjetas de Presentación', 'Postales Premium', 'Diplomas'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-[#ffcc00]/10 text-[#ffcc00]/70 text-xs font-black uppercase tracking-widest border border-[#ffcc00]/20">{tag}</span>
                ))}
              </div>
              <div className="inline-flex flex-col gap-1 p-6 rounded-[1.5rem] bg-[#ffcc00]/15 border border-[#ffcc00]/30">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#ffcc00]/50">225 grs · Por hoja</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter text-white">$7</span>
                  <span className="text-sm font-bold text-white/30 italic">MXN</span>
                </div>
              </div>
            </div>
          </div>

          {/* 05 Vinyl + 06 Adhesivos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative bg-white rounded-[3rem] p-8 md:p-10 overflow-hidden border border-slate-100 shadow-sm">
              <div className="absolute right-4 bottom-4 pointer-events-none select-none">
                <span className="text-[7rem] font-black italic tracking-tighter text-slate-100 leading-none">05</span>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] flex items-center justify-center mb-5">
                  <StickyNote className="w-6 h-6 text-[#86868b]" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-400 block mb-2">Adhesivo Sintético</span>
                <h2 className="text-4xl font-black tracking-tighter italic text-[#1d1d1f] mb-3">Vinyl</h2>
                <p className="text-[#86868b] italic font-medium text-sm mb-6">Resistente para interiores y exteriores. Adherencia de larga duración.</p>
                <span className="text-sm text-slate-300 italic font-medium">Precio según tamaño y cantidad — Consultar</span>
              </div>
            </div>

            <div className="relative bg-white rounded-[3rem] p-8 md:p-10 overflow-hidden border border-slate-100 shadow-sm md:col-span-2">
              <div className="absolute right-6 top-6 pointer-events-none select-none">
                <span className="text-[7rem] font-black italic tracking-tighter leading-none text-[#ff3b30]/[0.06]">06</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#ff3b30]" />
                  <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#ff3b30]">Adhesivos</span>
                </div>
                <h2 className="text-4xl font-black tracking-tighter italic text-[#1d1d1f] mb-3">Adhesivos</h2>
                <p className="text-[#86868b] italic font-medium text-sm mb-8">Con opciones de medio corte o corte de forma exacto.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { n: 'Couché Adhesivo', p: 'Desde $9' },
                    { n: 'Adhesivo Dimasa', p: '$12' },
                    { n: 'Metalizados / Holográficos', p: 'Desde $17' },
                    { n: 'Vinil Fotoluminiscente', p: '$180' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#f5f5f7] border border-slate-100">
                      <span className="text-sm font-bold text-[#86868b]">{item.n}</span>
                      <span className="text-xl font-black text-[#ff3b30] italic ml-3 shrink-0">{item.p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 07 — Banners */}
          <div className="relative bg-white rounded-[3rem] p-8 md:p-12 overflow-hidden border border-slate-100 shadow-sm">
            <div className="absolute right-8 top-0 bottom-0 flex items-center pointer-events-none select-none">
              <span className="text-[16rem] font-black italic tracking-tighter leading-none text-[#34c759]/[0.06]">07</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <ImageIcon className="w-5 h-5 text-[#34c759]" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#34c759]">Gran Formato</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic text-[#1d1d1f] mb-3">Banners</h2>
              <p className="text-[#86868b] italic font-medium mb-10 max-w-lg text-sm">Formatos amplios para máxima visibilidad. Precio varía según gramaje y cantidad.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { size: '30 × 70 cm', p: 'Desde $19' },
                  { size: '33 × 95 cm', p: 'Desde $24' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-[#f0faf0] border border-[#34c759]/20">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-[#86868b] block mb-1">Tamaño</span>
                      <span className="text-xl font-black text-[#1d1d1f]">{item.size}</span>
                    </div>
                    <span className="text-3xl font-black text-[#34c759] italic">{item.p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 08 — Pósters */}
          <div className="relative bg-white rounded-[3rem] p-8 md:p-12 overflow-hidden border border-slate-100 shadow-sm">
            <div className="absolute right-8 top-0 bottom-0 flex items-center pointer-events-none select-none">
              <span className="text-[16rem] font-black italic tracking-tighter leading-none text-[#0071e3]/[0.04]">08</span>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-[#0071e3]" />
                <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#0071e3]">Gran Formato · Impresión</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic text-[#1d1d1f] mb-3">Pósters</h2>
              <p className="text-[#86868b] italic font-medium mb-8 max-w-lg text-sm">Impresión en Tabloide Rebasado. Ideal para publicidad, decoración y comunicación visual de alto impacto.</p>
              <div className="flex flex-wrap gap-2">
                {['Tabloide Rebasado', 'Alta Resolución', 'CMYK', 'Papel Couché'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-[#f5f5f7] text-[#86868b] text-xs font-black uppercase tracking-widest border border-slate-100">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Medidas + Tipo + Archivos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-[#0071e3]" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Formatos</span>
              </div>
              <h3 className="text-3xl font-black tracking-tighter italic text-[#1d1d1f] mb-6">Medidas</h3>
              <div className="space-y-2">
                {['Carta', 'Tabloide', 'Tabloide Rebasado', '33 × 47 cm (Adhesivo)', '33 × 48 cm'].map((m, idx) => (
                  <div key={idx} className="px-4 py-3 rounded-2xl bg-[#f5f5f7] border border-slate-100 text-sm font-bold text-[#1d1d1f]">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="rounded-[3rem] p-8 md:p-10 border border-[#0071e3]/15" style={{ background: 'linear-gradient(135deg, #e8f1ff 0%, #f0f7ff 100%)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#0071e3] rounded-2xl flex items-center justify-center">
                    <Printer className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Tipo de Impresión</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { label: 'Simplex', sub: '4 × 0', desc: 'Un solo lado' },
                    { label: 'Dúplex', sub: '4 × 4', desc: 'Frente y Vuelta' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1">{item.label}</span>
                      <span className="text-2xl font-black text-[#0071e3] tracking-tighter">{item.sub}</span>
                      <span className="text-sm font-bold text-[#86868b] block mt-1">{item.desc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 italic font-medium leading-relaxed">
                  En dúplex el mismo archivo debe contener las 2 imágenes (F y V), incluso si un lado se repite.
                </p>
              </div>

              <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-6">Formatos Aceptados</span>
                <div className="flex gap-4 mb-6">
                  {['PDF', 'PNG'].map(f => (
                    <div key={f} className="flex items-center gap-3 flex-1 p-4 rounded-2xl bg-[#f5f5f7] border border-slate-100">
                      <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 flex items-center justify-center text-sm font-black text-[#0071e3]">{f}</div>
                      <span className="font-bold text-[#86868b]">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  {['CorelDRAW', 'Adobe'].map(p => (
                    <span key={p} className="px-4 py-2 bg-[#f5f5f7] rounded-full text-sm font-bold text-[#86868b]">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Nivel de Servicio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#34c759] block mb-6">Nivel de Servicio</span>
              <h3 className="text-3xl font-black tracking-tighter italic text-[#1d1d1f] mb-6">Tiempos de Entrega</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f0faf0] border border-[#34c759]/20">
                  <div className="w-10 h-10 rounded-xl bg-[#34c759] flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-black">AM</span>
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#34c759] block">Antes de las 12:00</span>
                    <span className="text-sm font-bold text-[#1d1d1f]">Entrega el mismo día</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f5f5f7] border border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-[#86868b] flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-black">PM</span>
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#86868b] block">Después de las 12:00</span>
                    <span className="text-sm font-bold text-[#1d1d1f]">Entrega día siguiente</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-[#0071e3]/20">
                  <div className="w-10 h-10 rounded-xl bg-[#0071e3] flex items-center justify-center shrink-0">
                    <span className="text-white text-[10px] font-black">EXP</span>
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#0071e3] block">Express</span>
                    <span className="text-sm font-bold text-[#1d1d1f]">Disponible según trabajo</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#ffcc00] block mb-6">Horarios</span>
                <h3 className="text-3xl font-black tracking-tighter italic text-[#1d1d1f] mb-4">Atención</h3>
                <div className="p-6 rounded-2xl bg-[#fffbeb] border border-[#ffcc00]/30 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#86868b] block mb-1">Lunes a Sábado</span>
                  <span className="text-4xl font-black tracking-tighter text-[#1d1d1f]">8:30 <span className="text-[#86868b] text-2xl">—</span> 6:00 pm</span>
                </div>
              </div>
              <p className="text-xs text-[#86868b] italic font-medium">Pedidos urgentes disponibles — consulta disponibilidad.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="relative bg-[#0071e3] rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl shadow-blue-500/20 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 blur-[80px] rounded-full" />
              <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-white/5 blur-[60px] rounded-full" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 mb-4">¿Todo listo?</p>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic mb-4">¿Listo para imprimir?</h3>
              <p className="text-white/70 text-lg font-medium italic mb-10">Cuéntanos tamaño, material, cantidad y acabado. Te damos precio al momento.</p>
              <a
                href="/cotizar"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0071e3] rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
              >
                <ArrowRight className="w-4 h-4" />
                Cotizar
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
