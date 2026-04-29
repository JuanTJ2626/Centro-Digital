'use client';
import { MapPin, Phone, Mail, Clock, ArrowRight, Train } from 'lucide-react';

export default function Contacto() {
  return (
    <section id="contacto" className="py-14 md:py-20 px-4 md:px-6 bg-white">
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

        {/* MAP + CONTACT ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mb-6">
          {/* Google Maps embed — no API key needed with this URL format */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 h-[380px] md:h-[460px]">
            <iframe
              title="Ubicación Publideas — Col. La Obrera, CDMX"
              src="https://maps.google.com/maps?q=19.4225,-99.1298&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right panel */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#f5f5f7] rounded-[2rem] p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Tel / WhatsApp</span>
                <a href="tel:+5568081606" className="text-xl font-bold text-[#1d1d1f] hover:text-[#25D366] transition-colors">55 6808 1606</a>
                <a
                  href="https://wa.me/5568081606?text=Hola%20Publideas%2C%20me%20gustar%C3%ADa%20cotizar%20una%20impresi%C3%B3n."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-1 text-[#25D366] text-xs font-black uppercase tracking-widest hover:underline"
                >
                  Abrir WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-[#f5f5f7] rounded-[2rem] p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-[#ff3b30] rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Correo</span>
                <a
                  href="mailto:publideas.impresiondigital@gmail.com"
                  className="text-base font-bold text-[#1d1d1f] hover:text-[#ff3b30] transition-colors break-all"
                >
                  publideas.impresiondigital@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-[#1d1d1f] rounded-[2rem] p-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61573867649251"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 bg-white/10 hover:bg-[#1877F2] rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/publideas.impresiondigital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <div className="ml-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-0.5">Siguenos</span>
                <span className="text-sm font-bold italic text-white/70">Facebook · Instagram</span>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Manuel+Caballero+131,+Colonia+La+Obrera,+Ciudad+de+Mexico"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-5 bg-[#0071e3] text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/25"
            >
              Abrir en Google Maps <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* INFO ROW below map */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#f5f5f7] rounded-[2rem] p-6 flex items-start gap-4">
            <div className="w-11 h-11 bg-[#0071e3] rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Direccion</span>
              <p className="text-base font-bold text-[#1d1d1f] leading-snug">Manuel Caballero 131</p>
              <p className="text-sm text-[#86868b] font-medium italic">Col. La Obrera, CDMX</p>
            </div>
          </div>

          <div className="bg-[#f5f5f7] rounded-[2rem] p-6 flex items-start gap-4">
            <div className="w-11 h-11 bg-[#ffcc00] rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#1d1d1f]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Horario</span>
              <p className="text-base font-bold text-[#1d1d1f]">8:30 a.m. - 6:00 p.m.</p>
              <p className="text-xs text-[#86868b] font-medium italic mt-0.5">Antes 12:00 mismo dia / Despues dia siguiente</p>
            </div>
          </div>

          <div className="bg-[#1d1d1f] rounded-[2rem] p-6 flex items-start gap-4">
            <div className="w-11 h-11 bg-[#e05e00] rounded-xl flex items-center justify-center shrink-0">
              <Train className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 block mb-1">Metro mas cercano</span>
              <p className="text-base font-bold text-white leading-snug">Metro Pino Suarez</p>
              <p className="text-xs text-white/50 font-medium italic mt-0.5">Lineas 1 y 2 · 5 min a pie</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
