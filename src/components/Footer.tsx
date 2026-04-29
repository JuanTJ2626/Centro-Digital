'use client';
import { ArrowRight, Zap, Gem, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="quote" className="bg-[#0a0a0b] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-blue-600/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none" />

      {/* ── MAIN CTA ─────────────────────────────────── */}
      <div className="px-4 md:px-6 pt-20 md:pt-28 pb-14 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-[#0071e3]/20 border border-[#0071e3]/30 rounded-xl flex items-center justify-center">
              <Gem className="w-4 h-4 text-[#0071e3]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Empieza tu proyecto</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              <span className="text-xs font-bold italic text-slate-500">Cotización inmediata</span>
            </div>
          </div>

          {/* Headline + WhatsApp button */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-10">
            <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter italic leading-[0.9] text-white">
              HAGÁMOSLO<br />
              <span className="text-premium">REALIDAD.</span>
            </h2>
            <a
              href="/cotizar"
              className="group flex-shrink-0 flex items-center gap-4 px-10 py-6 bg-[#0071e3] text-white rounded-[2rem] font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,113,227,0.25)]"
            >
              Cotizar
              <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* CMYK line */}
          <div className="flex gap-1 mb-12">
            <div className="w-12 h-1 bg-[#0071e3]" />
            <div className="w-12 h-1 bg-[#ff3b30]" />
            <div className="w-12 h-1 bg-[#34c759]" />
            <div className="w-12 h-1 bg-[#ffcc00]" />
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Cotización */}
            <div className="md:col-span-2 bg-white/[0.04] border border-white/[0.08] rounded-[2rem] p-8 md:p-10">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/30 mb-6">Para cotizar exacto:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Tamaño final',
                  'Tipo de Papel',
                  'Cantidad exacta',
                  'Acabados Extra',
                  'Simplex (4×0) o Dúplex (4×4)',
                ].map((item, i) => (
                  <li key={i} className={`flex items-center gap-3 ${i === 4 ? 'sm:col-span-2' : ''}`}>
                    <div className="w-7 h-7 shrink-0 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/40 flex items-center justify-center text-[11px] font-black text-[#0071e3]">
                      {i + 1}
                    </div>
                    <span className="text-base font-medium italic text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Entrega */}
            <div className="bg-gradient-to-br from-[#0071e3]/20 to-blue-900/20 border border-[#0071e3]/20 rounded-[2rem] p-8 relative overflow-hidden">
              <Zap className="absolute -right-4 -top-4 w-40 h-40 text-[#0071e3]/10 fill-current pointer-events-none" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 block mb-5">Entrega Express</span>
              <p className="text-white font-bold italic text-lg leading-loose">
                Antes 12:00 → mismo día<br />
                Después 12:00 → día siguiente
              </p>
              <span className="block text-[#0071e3] font-bold italic text-sm mt-3">Horario: 8:30 – 6:00 pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BIG WORDMARK ─────────────────────────────── */}
      <div className="overflow-hidden select-none pointer-events-none">
        <div className="text-[120px] md:text-[210px] font-black tracking-tighter italic text-white/[0.028] text-center leading-none whitespace-nowrap py-2">
          PUBLIDEAS
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────── */}
      <div className="border-t border-white/[0.06] px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo + brand */}
          <div className="flex items-center gap-4">
            <img
              src="/LOGO PUBLIDEAS.jpeg"
              alt="Logo Publideas"
              className="w-11 h-11 rounded-xl border border-white/10 object-cover grayscale opacity-50"
            />
            <div>
              <span className="block font-black italic tracking-tighter text-lg text-white/50 uppercase">Publideas</span>
              <span className="block text-[9px] font-bold text-white/20 uppercase tracking-widest">Impresión Digital CMYK</span>
            </div>
          </div>
          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <a
              href="tel:+5568081606"
              className="flex items-center gap-2 text-white/30 hover:text-white transition-colors font-bold"
            >
              <Phone className="w-3.5 h-3.5" /> 55 6808 1606
            </a>
            <span className="hidden sm:block text-white/10">|</span>
            <a
              href="mailto:publideas.impresiondigital@gmail.com"
              className="flex items-center gap-2 text-white/30 hover:text-blue-400 transition-colors font-bold"
            >
              <Mail className="w-3.5 h-3.5" /> publideas.impresiondigital@gmail.com
            </a>
          </div>
          {/* Social + copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-5">
              <a
                href="https://www.facebook.com/profile.php?id=61573867649251"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/20 hover:text-[#1877F2] transition-colors text-[10px] font-black uppercase tracking-widest"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/publideas.impresiondigital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/20 hover:text-pink-400 transition-colors text-[10px] font-black uppercase tracking-widest"
              >
                Instagram
              </a>
            </div>
            <a
              href="/aviso-de-privacidad"
              className="text-[9px] font-bold text-white/20 hover:text-white/50 uppercase tracking-widest transition-colors"
            >
              Aviso de Privacidad
            </a>
            <span className="text-[9px] font-bold text-white/15 uppercase tracking-widest">
              © {new Date().getFullYear()} Publideas
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
