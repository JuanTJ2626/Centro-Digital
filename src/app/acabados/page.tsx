'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreeBackground from '@/components/ThreeBackground';
import { Droplets, Scissors, Layers, ArrowRight } from 'lucide-react';

export default function AcabadosPage() {
  return (
    <main className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans overflow-x-hidden">
      <ThreeBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-4 md:px-6 overflow-hidden z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 right-0 text-[22vw] font-black italic tracking-tighter text-[#1d1d1f]/[0.04] leading-none select-none">ACB</div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex gap-2 mb-8">
            <div className="w-5 h-5 rounded-full bg-[#0071e3]" />
            <div className="w-5 h-5 rounded-full bg-[#ff3b30]" />
            <div className="w-5 h-5 rounded-full bg-[#34c759]" />
            <div className="w-5 h-5 rounded-full bg-[#ffcc00]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3] block mb-3">Diferenciadores de Calidad</span>
          <h1 className="text-6xl md:text-[9rem] font-black tracking-tighter italic leading-[0.9] mb-6 text-[#1d1d1f]">
            ACA<span className="text-[#0071e3]">BADOS</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#86868b] italic font-medium max-w-2xl">
            Terminaciones que elevan la calidad y durabilidad de cada impresión.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* Section label: Laminados */}
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#86868b] px-2">— Laminados</p>

          {/* Laminado Brillante + Mate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Brillante */}
            <div className="relative rounded-[3rem] overflow-hidden" style={{ background: 'linear-gradient(145deg, #001933 0%, #003580 60%, #0055cc 100%)' }}>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0071e3]/30 blur-[80px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0055cc]/40 blur-[60px] rounded-full" />
              </div>
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#0071e3] shadow-lg shadow-blue-500/50 flex items-center justify-center">
                    <Droplets className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-200/50 bg-blue-900/40 px-3 py-2 rounded-full border border-blue-700/30">Acabado Continuo</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic text-white mb-4 leading-[0.95]">
                  Laminado<br />Brillante
                </h2>
                <p className="text-blue-200/50 text-base font-medium italic leading-relaxed mb-8">
                  Intensifica los colores y protege la impresión con una capa brillante de alta resistencia.
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[9px] font-black uppercase tracking-widest text-blue-300/40 mr-1">Por hoja</span>
                  <span className="text-6xl font-black tracking-tighter text-white">$2</span>
                  <span className="text-sm font-bold text-blue-300/40 italic">MXN</span>
                </div>
                {/* Gloss bar */}
                <div className="h-1.5 rounded-full overflow-hidden bg-white/10">
                  <div className="h-full rounded-full" style={{ width: '100%', background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.2) 70%, rgba(255,255,255,0.6) 100%)' }} />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-300/30 mt-2">Alta reflexión · Saturación máxima</p>
              </div>
            </div>

            {/* Mate */}
            <div className="relative rounded-[3rem] overflow-hidden bg-[#f0f0f2]">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-300/40 blur-[80px] rounded-full" />
              </div>
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#1d1d1f] flex items-center justify-center">
                    <Layers className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 bg-white px-3 py-2 rounded-full border border-slate-200">Acabado Continuo</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic text-[#1d1d1f] mb-4 leading-[0.95]">
                  Laminado<br />Mate
                </h2>
                <p className="text-slate-500 text-base font-medium italic leading-relaxed mb-8">
                  Acabado suave y opaco sin reflejos. Ideal para tarjetas y presentaciones elegantes.
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mr-1">Por hoja</span>
                  <span className="text-6xl font-black tracking-tighter text-[#1d1d1f]">$2</span>
                  <span className="text-sm font-bold text-slate-300 italic">MXN</span>
                </div>
                {/* Matte bar */}
                <div className="h-1.5 rounded-full overflow-hidden bg-slate-200">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '100%' }} />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">Sin reflejos · Tacto sedoso</p>
              </div>
            </div>
          </div>

          {/* Section label: Cortes */}
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#86868b] px-2 pt-6">— Cortes</p>

          {/* Medio Corte + Guillotina */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Medio Corte */}
            <div className="relative bg-white rounded-[3rem] p-8 md:p-12 overflow-hidden border border-slate-100 shadow-sm">
              <div className="absolute right-6 bottom-6 pointer-events-none select-none">
                <span className="text-[9rem] font-black italic tracking-tighter leading-none text-[#ff3b30]/[0.07]">03</span>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff3b30]/5 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#ff3b30]/10 flex items-center justify-center">
                    <Scissors className="w-7 h-7 text-[#ff3b30]" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#ff3b30] bg-[#ff3b30]/10 px-3 py-2 rounded-full border border-[#ff3b30]/20">Para Adhesivos</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic text-[#1d1d1f] mb-4">Medio Corte</h2>
                <p className="text-[#86868b] text-base font-medium italic leading-relaxed mb-8">
                  Corte parcial del adhesivo para facilitar el desprendimiento sin cortar el material de respaldo.
                </p>
                {/* Visual cut line */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-px border-t-2 border-dashed border-[#ff3b30]/30" />
                  <Scissors className="w-4 h-4 text-[#ff3b30]/50" />
                </div>
                <span className="text-sm text-slate-300 italic font-medium">Precio según trabajo — Consultar</span>
              </div>
            </div>

            {/* Guillotina */}
            <div className="relative bg-white rounded-[3rem] p-8 md:p-12 overflow-hidden border border-slate-100 shadow-sm">
              <div className="absolute right-6 bottom-6 pointer-events-none select-none">
                <span className="text-[9rem] font-black italic tracking-tighter leading-none text-[#34c759]/[0.07]">04</span>
              </div>
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#34c759]/5 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-[#34c759]/10 flex items-center justify-center">
                    <Scissors className="w-7 h-7 text-[#34c759]" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#34c759] bg-[#34c759]/10 px-3 py-2 rounded-full border border-[#34c759]/20">Corte de Precisión</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic text-[#1d1d1f] mb-4">Guillotina</h2>
                <p className="text-[#86868b] text-base font-medium italic leading-relaxed mb-8">
                  Corte recto de precisión para formatos estándar y personalizados.
                </p>
                {/* Visual cut line */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 h-px bg-[#34c759]/30" />
                  <Scissors className="w-4 h-4 text-[#34c759]/50" />
                </div>
                <span className="text-sm text-slate-300 italic font-medium">Precio según trabajo — Consultar</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative bg-[#0071e3] rounded-[3rem] p-10 md:p-16 text-center overflow-hidden mt-4 shadow-2xl shadow-blue-500/20">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 blur-[80px] rounded-full" />
              <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-white/5 blur-[60px] rounded-full" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-200 mb-4">¿Necesitas un acabado?</p>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter italic text-white mb-3">
                Dinos el trabajo.<br />Te cotizamos.
              </h3>
              <p className="text-white/70 text-lg font-medium italic mb-10">Acabado incluido al momento.</p>
              <a
                href="/cotizar"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#0071e3] text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
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
