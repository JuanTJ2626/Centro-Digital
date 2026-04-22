'use client';
import { ArrowRight, Zap, Gem, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <section id="quote" className="py-24 md:py-40 px-4 md:px-6 bg-[#0a0a0b] relative overflow-hidden">
      {/* Subtle Color Glows in background */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -ml-48 -mb-48 opacity-40" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[150px] rounded-full pointer-events-none -mr-48 -mt-48 opacity-40" />
      <div className="reveal max-w-7xl mx-auto relative z-10">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] md:blur-[150px] pointer-events-none -mr-48 -mt-48" />

        <div className="mb-14 px-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col items-start text-left relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 bg-[#0071e3]/20 rounded-2xl flex items-center justify-center border border-[#0071e3]/30 shrink-0">
                <Gem className="w-5 h-5 text-[#0071e3]" />
              </div>
              <div className="text-left">
                <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3] mb-1">Empieza tu proyecto</span>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold italic text-slate-400">Cotización Inmediata</span>
                </div>
              </div>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-bold tracking-tighter mb-4 italic leading-[0.95] text-white">
              HAGÁMOSLO <br className="hidden md:block"/> <span className="text-premium">REALIDAD.</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium text-slate-400 italic max-w-2xl px-2 md:px-0">
              La más alta precisión CMYK y acabados premium están a un mensaje de distancia.
            </p>
            <div className="flex gap-1 mt-8">
              <div className="w-12 h-0.5 bg-[#0071e3]/50" />
              <div className="w-12 h-0.5 bg-[#ff3b30]/50" />
              <div className="w-12 h-0.5 bg-[#34c759]/50" />
              <div className="w-12 h-0.5 bg-[#ffcc00]/50" />
            </div>
          </div>
          
          <button className="relative z-10 w-full md:w-auto px-10 md:px-12 py-6 md:py-8 bg-[#25D366] text-white rounded-[2rem] md:rounded-full font-bold text-2xl md:text-3xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(37,211,102,0.3)] flex items-center justify-center gap-4 group mt-6 md:mt-0">
            <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />
            WhatsApp <ArrowRight className="group-hover:translate-x-4 transition-transform w-8 h-8 opacity-50" />
          </button>
        </div>

        {/* Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 mt-16 px-2 relative z-10">
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 flex flex-col justify-center">
             <h4 className="text-xl md:text-2xl font-bold italic text-white mb-8">Para tu cotización exacta:</h4>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10 text-slate-300 font-medium italic text-lg lg:text-xl">
               <li className="flex items-center gap-4"><div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs md:text-sm font-black ring-1 ring-blue-500/50">1</div> Tamaño final</li>
               <li className="flex items-center gap-4"><div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs md:text-sm font-black ring-1 ring-blue-500/50">2</div> Tipo de Papel</li>
               <li className="flex items-center gap-4"><div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs md:text-sm font-black ring-1 ring-blue-500/50">3</div> Cantidad exacta</li>
               <li className="flex items-center gap-4"><div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs md:text-sm font-black ring-1 ring-blue-500/50">4</div> Acabados Extra</li>
             </ul>
          </div>
          
          <div className="bg-gradient-to-br from-[#0071e3]/20 to-purple-600/20 p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] border border-[#0071e3]/20 flex flex-col justify-center relative overflow-hidden">
             <Zap className="absolute -right-5 -top-5 w-48 h-48 text-[#0071e3]/20 fill-current" />
             <span className="block text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 mb-6">Logística</span>
             <h4 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 leading-none italic uppercase">Entregas <br /> Express</h4>
             <p className="text-slate-400 font-medium italic mt-2 text-lg">Mismo día o siguiente.</p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/10 pt-16 px-2 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 opacity-50 hover:opacity-100 transition-all cursor-pointer">
            <img src="/LOGO PUBLIDEAS.jpeg" alt="Logo" className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-white/10 grayscale" />
            <div className="text-center md:text-left">
              <span className="block font-black italic tracking-tighter text-xl md:text-2xl text-white uppercase">Miguel Premium Print</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <span className="block text-lg font-bold italic text-white/50 uppercase">CMYK Digital en SLP</span>
            <span className="block text-xs text-white/20 font-medium mt-1">© {new Date().getFullYear()} Garantía de Fidelidad Total</span>
          </div>
        </div>
      </div>
      <div className="w-full mt-24 line-cmyk opacity-20" />
    </section>
  );
}
