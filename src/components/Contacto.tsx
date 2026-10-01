'use client';
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle } from 'lucide-react';

export default function Contacto() {
  const mapsSearchUrl = "https://www.google.com/maps/search/?api=1&query=Manuel+Caballero+131,+La+Obrera,+Cuauhtémoc,+06800+Ciudad+de+México,+CDMX";
  const mapsEmbedUrl = "https://maps.google.com/maps?q=Manuel%20Caballero%20131,%20La%20Obrera,%20Cuauht%C3%A9moc,%2006800%20Ciudad%20de%20M%C3%A9xico,%20CDMX&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const waLocalUrl = "https://wa.me/525568081606?text=Hola%20Publideas%2C%20me%20gustar%C3%ADa%20cotizar%20una%20impresi%C3%B3n.";
  const wa247Url = "https://wa.me/528342091016?text=Hola%20Publideas%2C%20me%20gustar%C3%ADa%20atenci%C3%B3n%20para%20un%20pedido.";

  return (
    <section id="contacto" className="pt-8 pb-14 md:pt-10 md:pb-20 px-4 md:px-6 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-[#0071e3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0071e3]">Encuéntranos</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter italic leading-[0.95] mb-4">
            UBICACIÓN{' '}
            <span className="text-[#0071e3]">{'&'} CONTACTO.</span>
          </h2>
          <div className="flex gap-1 mt-6">
            <div className="w-12 h-1 bg-[#0071e3]" />
            <div className="w-12 h-1 bg-[#ff3b30]" />
            <div className="w-12 h-1 bg-[#34c759]" />
            <div className="w-12 h-1 bg-[#ffcc00]" />
          </div>
        </div>

        {/* GOOGLE MAPS CARD & BANNER */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/80 bg-white mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
            {/* Left Info Overlay / Column */}
            <div className="lg:col-span-5 p-8 md:p-10 bg-[#111113] text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#0071e3]/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ff3b30]/15 blur-[90px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#0071e3]" />
                  <div className="w-3 h-3 rounded-full bg-[#ff3b30]" />
                  <div className="w-3 h-3 rounded-full bg-[#34c759]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 ml-2">Dirección Principal</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black tracking-tighter italic leading-tight text-white mb-4">
                  Manuel Caballero 131,<br />
                  <span className="text-[#0071e3]">La Obrera, CDMX</span>
                </h3>

                <p className="text-white/70 text-sm font-medium leading-relaxed mb-4">
                  Cuauhtémoc, C.P. 06800, Ciudad de México.
                </p>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white/90 font-medium mb-4">
                  <MapPin className="w-4 h-4 text-[#ff3b30] shrink-0" />
                  <span>A menos de 5 min de Metro Chabacano y cerca de Metro Lázaro Cárdenas</span>
                </div>

                {/* Horarios en la tarjeta de ubicación */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#ffcc00] mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Horarios de Atención:</span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Lunes a Viernes: <span className="font-normal text-white/80">8:00 AM a 6:00 PM</span>
                  </p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    Sábados: <span className="font-normal text-white/80">9:00 AM a 2:00 PM</span>
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10">
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 py-4 bg-[#0071e3] text-white rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-blue-500/25"
                >
                  <MapPin className="w-4 h-4" />
                  Cómo llegar (Ruta en Google Maps)
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Interactive Google Map */}
            <div className="lg:col-span-7 h-[360px] lg:h-auto min-h-[360px] relative bg-slate-100">
              <iframe
                title="Ubicación Google Maps Publideas"
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[360px]"
              />
            </div>
          </div>
        </div>

        {/* CONTACT & SCHEDULE ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Address Card */}
          <div className="bg-white rounded-[2rem] p-6 flex items-start gap-4 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 bg-[#0071e3] rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Ubicación</span>
              <p className="text-sm font-bold text-[#1d1d1f] leading-snug">Manuel Caballero 131</p>
              <p className="text-xs text-[#86868b] mt-0.5">La Obrera, Cuauhtémoc, CDMX</p>
              <p className="text-[11px] text-[#0071e3] font-semibold mt-1">Cerca de Metro Chabacano y Lázaro Cárdenas</p>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-[2rem] p-6 flex items-start gap-4 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 bg-[#ffcc00] rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <Clock className="w-5 h-5 text-[#1d1d1f]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">Horarios de Atención</span>
              <p className="text-xs font-bold text-[#1d1d1f] leading-snug">Lunes a Viernes:</p>
              <p className="text-xs text-[#86868b] font-medium mb-1">8:00 AM a 6:00 PM</p>
              <p className="text-xs font-bold text-[#1d1d1f] leading-snug">Sábados:</p>
              <p className="text-xs text-[#86868b] font-medium">9:00 AM a 2:00 PM</p>
            </div>
          </div>

          {/* WhatsApp Local Card */}
          <div className="bg-white rounded-[2rem] p-6 flex items-start gap-4 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 bg-[#25D366] rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-green-500/20">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">WhatsApp Local</span>
              <a
                href={waLocalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-[#1d1d1f] hover:text-[#25D366] transition-colors block"
              >
                55 6808 1606
              </a>
              <a
                href={waLocalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-[#25D366] text-[11px] font-black uppercase tracking-wider hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Escribir al WhatsApp local →
              </a>
            </div>
          </div>

          {/* WhatsApp Atención & Cotizaciones 8342091016 */}
          <div className="bg-white rounded-[2rem] p-6 flex items-start gap-4 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-11 h-11 bg-[#128C7E] rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-teal-500/20">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868b] block mb-1">WhatsApp Cotizaciones 24/7</span>
              <a
                href={wa247Url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-[#1d1d1f] hover:text-[#128C7E] transition-colors block"
              >
                834 209 1016
              </a>
              <a
                href={wa247Url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-[#128C7E] text-[11px] font-black uppercase tracking-wider hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Cotizar por WhatsApp 24/7 →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
