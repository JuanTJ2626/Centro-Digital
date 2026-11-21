'use client';
import { MessageCircle, MapPin } from 'lucide-react';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

export default function MobileBottomBar() {
  const whatsappUrl = "https://wa.me/528342091016?text=Hola%20Publideas%2C%20vengo%20de%20la%20web%20y%20quiero%20comprar%20o%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n.";

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-3 py-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.08)] flex items-center gap-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
      <a
        href="#contacto"
        className="flex flex-col items-center justify-center min-w-[56px] h-11 rounded-2xl bg-slate-100 text-slate-700 active:scale-95 transition-all text-[10px] font-bold"
        aria-label="Ver ubicación"
      >
        <MapPin className="w-4 h-4 text-[#ff3b30]" />
        <span>Taller</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick({
          buttonName: 'Barra Inferior Móvil: Comprar Ahora',
          targetNumber: '834 209 1016',
          message: 'Hola Publideas, vengo de la web y quiero comprar o cotizar un proyecto de impresión.'
        })}
        className="flex-1 h-11 bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] transition-all rounded-2xl flex items-center justify-center gap-2 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-green-500/30"
      >
        <MessageCircle className="w-5 h-5 shrink-0 fill-white" />
        <span>Comprar Ahora por WhatsApp</span>
      </a>
    </div>
  );
}
