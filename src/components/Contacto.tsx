'use client';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

export default function Contacto() {
  return (
    <section id="contacto" className="pt-8 pb-14 md:pt-10 md:pb-20 px-4 md:px-6 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-[#0071e3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Encontranos</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter italic leading-[0.95] mb-4">
            UBICACION{' '}
            <span className="text-[#0071e3]">{'&'} CONTACTO.</span>
          </h2>
          <div className="flex gap-1 mt-6">
            <div className="w-12 h-1 bg-[#0071e3]" />
            <div className="w-12 h-1 bg-[#ff3b30]" />
            <div className="w-12 h-1 bg-[#34c759]" />
            <div className="w-12 h-1 bg-[#ffcc00]" />
          </div>
        </div>

        {/* MAP CARD — centered, full width */}
        <div className="relative rounded-[2.5rem] overflow-hidden h-[400px] md:h-[480px] flex flex-col items-center justify-center text-center mb-6"
          style={{ background: 'linear-gradient(145deg, #0a0a1a 0%, #0d1b3e 40%, #001a6e 100%)' }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          />
          {/* Glow blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0071e3]/25 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#ff3b30]/10 blur-[80px] rounded-full pointer-events-none" />
          {/* CMYK dots */}
          <div className="absolute top-6 left-6 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0071e3]" />
            <div className="w-3 h-3 rounded-full bg-[#ff3b30]" />
            <div className="w-3 h-3 rounded-full bg-[#34c759]" />
            <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
          </div>
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-5 px-6">
            <div className="w-20 h-20 rounded-full bg-[#0071e3] shadow-2xl shadow-blue-500/40 flex items-center justify-center">
              <MapPin className="w-9 h-9 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-300/70 mb-2">¿Dónde estamos?</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tighter italic text-white leading-tight mb-1">
                Encuéntranos en<br /><span className="text-[#0071e3]">La Obrera, CDMX</span>
              </h3>
              <p className="text-white/40 text-sm font-medium mt-1">Manuel Caballero 131 · Col. La Obrera</p>
              <p className="text-white/30 text-xs font-medium italic mt-1">A menos de 5 min del Metro Pino Suárez (L1-L2) y La Merced (L1)</p>
            </div>
            <a
              href="https://maps.google.com/?q=Manuel+Caballero+131,+La+Obrera,+Cuauhtémoc,+06800+Ciudad+de+México,+CDMX"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-white text-[#1d1d1f] rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/30"
            >
              <MapPin className="w-4 h-4 text-[#0071e3]" />
              Ver en Google Maps
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          {/* Coordinate watermark */}
          <div className="absolute bottom-5 right-6 pointer-events-none select-none">
            <span className="text-[10px] font-black tracking-widest text-white/10">19.4225° N · 99.1298° W</span>
          </div>
        </div>

        {/* CONTACT ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Address */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-6 flex items-start gap-4">
            <div className="w-11 h-11 bg-[#0071e3] rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Dirección</span>
              <p className="text-sm font-bold text-[#1d1d1f] leading-snug">Manuel Caballero 131</p>
              <p className="text-xs text-[#86868b] italic mt-0.5">Col. La Obrera, CDMX</p>
              <p className="text-[11px] text-[#86868b] mt-1">Metro Pino Suárez · La Merced<br /><span className="italic">Menos de 5 min a pie</span></p>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-6 flex items-start gap-4">
            <div className="w-11 h-11 bg-[#ffcc00] rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#1d1d1f]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Horario</span>
              <p className="text-sm font-bold text-[#1d1d1f]">8:30 a.m. – 6:00 p.m.</p>
              <p className="text-[11px] text-[#86868b] italic mt-0.5">AM → mismo día · PM → día siguiente</p>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-6 flex items-start gap-4">
            <div className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Tel / WhatsApp</span>
              <a href="tel:+5568081606" className="text-sm font-bold text-[#1d1d1f] hover:text-[#25D366] transition-colors block">55 6808 1606</a>
              <a
                href="https://wa.me/5568081606?text=Hola%20Publideas%2C%20me%20gustar%C3%ADa%20cotizar%20una%20impresi%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-[#25D366] text-[11px] font-black uppercase tracking-widest hover:underline block"
              >
                Abrir WhatsApp
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="bg-[#f5f5f7] rounded-[2rem] p-6 flex items-start gap-4">
            <div className="w-11 h-11 bg-[#ff3b30] rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Correo</span>
              <a
                href="mailto:publideas.impresiondigital@gmail.com"
                className="text-xs font-bold text-[#1d1d1f] hover:text-[#ff3b30] transition-colors break-all leading-snug block"
              >
                publideas.impresiondigital<br />@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
