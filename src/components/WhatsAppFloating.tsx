'use client';
import { useState, useEffect } from 'react';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

export default function WhatsAppFloating() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappUrl = "https://wa.me/528342091016?text=Hola%20Publideas%2C%20vengo%20de%20la%20web%20y%20quiero%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n.";

  useEffect(() => {
    // Mostrar tooltip después de 2.5 segundos
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <aside
      aria-label="Contacto por WhatsApp"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-end sm:items-center flex-col sm:flex-row group"
    >
      {/* Tooltip estilizado */}
      <div
        onClick={() => setShowTooltip(false)}
        className={`mb-2 sm:mb-0 sm:mr-3.5 relative transition-all duration-300 ease-out origin-bottom-right sm:origin-right cursor-pointer ${
          showTooltip ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto'
        }`}
      >
        <div className="bg-white text-slate-800 text-xs font-semibold rounded-2xl p-3 shadow-xl border border-slate-100 max-w-[210px]">
          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-black uppercase text-[#25D366]">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
            En línea ahora
          </div>
          <p className="text-[11px] leading-snug text-slate-600">
            ¿Cotizamos tu impresión? Da clic y te respondemos en menos de 5 min.
          </p>
        </div>
        <div className="absolute -bottom-1.5 right-4 sm:-right-1.5 sm:top-1/2 sm:-translate-y-1/2 sm:bottom-auto w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100 sm:border-b-0 sm:border-l sm:-rotate-45" />
      </div>

      {/* Botón flotante WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Comprar ahora por WhatsApp"
        onClick={() => trackWhatsAppClick({
          buttonName: 'Botón Flotante WhatsApp',
          targetNumber: '834 209 1016',
          message: 'Hola Publideas, vengo de la web y quiero cotizar un proyecto de impresión.'
        })}
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 relative shrink-0 ring-4 ring-white"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white relative z-10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </aside>
  );
}
