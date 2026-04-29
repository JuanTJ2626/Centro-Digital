'use client';
import { useEffect, useState } from 'react';
import { Bot, MessageCircle, FileText, Sparkles, Package, Palette } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CotizarPage() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const tryOpen = () => {
      if (typeof window !== 'undefined' && (window as any).botpress?.open) {
        (window as any).botpress.open();
        setChatOpen(true);
        return true;
      }
      return false;
    };
    if (!tryOpen()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (tryOpen() || attempts > 16) clearInterval(interval);
      }, 300);
      return () => clearInterval(interval);
    }
  }, []);

  const facebookUrl = 'https://m.me/61573867649251';

  const steps = [
    { num: '01', icon: FileText, title: 'Cuéntale qué necesitas', desc: 'El asesor te pregunta qué quieres imprimir: volantes, tarjetas, lonas, etiquetas…', color: '#7c3aed', bg: '#f3f0ff' },
    { num: '02', icon: Palette, title: 'Te sugiere material y acabado', desc: 'Couché, Bond, Opalina, Vinyl. Mate o brillante. Gramaje ideal según tu uso.', color: '#0071e3', bg: '#e8f0fb' },
    { num: '03', icon: Package, title: 'Registra tu pedido', desc: 'El bot captura todos los detalles: cantidad, formato, archivo y fecha de entrega.', color: '#34c759', bg: '#e6f8ec' },
    { num: '04', icon: Sparkles, title: 'Producción inmediata', desc: 'Pedido antes de las 12:00 → entrega mismo día. Después → día siguiente.', color: '#d97706', bg: '#fef3e2' },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[#fbfbfd] text-[#1d1d1f] font-sans overflow-x-hidden">

        <section className="relative bg-[#111113] min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 md:px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#7c3aed]/10 blur-[160px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#0071e3]/8 blur-[160px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a78bfa]">Asesor Virtual</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic text-white leading-[0.95] mb-6">
                  COTIZA TU<br />
                  <span className="text-[#7c3aed]">IMPRESIÓN.</span>
                </h1>

                <p className="text-white/50 text-base md:text-lg font-medium italic leading-relaxed mb-8 max-w-md">
                  El asesor ya está listo para ayudarte. Cuéntale qué necesitas imprimir y te guía con el mejor material, formato y precio.
                </p>

                <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-full border mb-8 transition-all duration-500 ${chatOpen ? 'border-[#34c759]/40 bg-[#34c759]/10' : 'border-white/10 bg-white/5'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${chatOpen ? 'bg-[#34c759] animate-pulse' : 'bg-white/30'}`} />
                  <span className={`text-xs font-black uppercase tracking-widest ${chatOpen ? 'text-[#34c759]' : 'text-white/40'}`}>
                    {chatOpen ? 'Chat abierto — escríbenos' : 'Cargando asesor...'}
                  </span>
                </div>

                <p className="text-white/30 text-xs font-medium italic">
                  Busca el ícono del asesor en la esquina inferior derecha de la pantalla.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 flex flex-col items-center gap-6 text-center backdrop-blur-sm">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#7c3aed] to-[#0071e3] rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-violet-500/30">
                    <Bot className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-[#7c3aed]/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute -inset-3 rounded-[2.5rem] border border-[#7c3aed]/15 animate-ping" style={{ animationDuration: '2.5s' }} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold italic text-white mb-2">Asesor Publideas</h3>
                  <p className="text-white/40 text-sm font-medium italic">Impresión digital CMYK · CDMX</p>
                </div>

                <div className="w-full space-y-3 text-left">
                  <div className="bg-[#7c3aed]/20 border border-[#7c3aed]/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-white/80 text-sm font-medium">¡Hola! 👋 Soy el asesor de Publideas. ¿Qué necesitas imprimir hoy?</p>
                  </div>
                  <div className="bg-[#7c3aed]/20 border border-[#7c3aed]/30 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-white/80 text-sm font-medium">Puedo sugerirte el material ideal, calcular el costo y registrar tu pedido 🖨️</p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-white/10 border border-white/10 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      <p className="text-white/40 text-sm italic">Escríbeme en el chat →</p>
                    </div>
                  </div>
                </div>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#1877F2]/20 border border-[#1877F2]/30 text-white rounded-2xl font-black text-sm hover:bg-[#1877F2]/30 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#60a5fa]" />
                  También por Facebook Messenger
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#7c3aed]">¿Cómo funciona?</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter italic leading-[0.95] mt-2">
                EL ASESOR LO HACE TODO.
              </h2>
              <div className="flex gap-1 mt-5">
                <div className="w-12 h-1 bg-[#7c3aed]" />
                <div className="w-12 h-1 bg-[#0071e3]" />
                <div className="w-12 h-1 bg-[#34c759]" />
                <div className="w-12 h-1 bg-[#ffcc00]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {steps.map((s) => (
                <div key={s.num} className="bg-[#f5f5f7] rounded-[2.5rem] p-8 flex gap-5 border border-slate-100">
                  <div>
                    <span className="text-5xl font-black italic leading-none" style={{ color: s.color }}>{s.num}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <h3 className="text-lg font-bold italic tracking-tight text-[#1d1d1f]">{s.title}</h3>
                    <p className="text-[#86868b] text-sm font-medium italic leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#111113] rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="shrink-0 w-16 h-16 bg-[#1877F2] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#60a5fa] mb-2">Alternativa</p>
                <h3 className="text-2xl font-bold italic tracking-tight text-white mb-1">¿Prefieres Facebook?</h3>
                <p className="text-white/40 text-sm font-medium italic">Escríbenos por Messenger y un agente te atiende directamente.</p>
              </div>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-3 px-8 py-5 bg-[#1877F2] text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                Abrir Messenger
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
