'use client';
import { MessageCircle, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

interface HeroProps {
  photos: string[];
}

export default function Hero({ photos }: HeroProps) {
  const heroPhotos = photos.slice(0, 8);

  const handleHeroCTA = () => {
    trackWhatsAppClick({
      buttonName: 'Hero: Comprar Ahora Principal',
      targetNumber: '834 209 1016',
      message: 'Hola Publideas, vengo de la web y quiero cotizar y comprar impresiones digitales.'
    });
  };

  return (
    <section className="relative pt-6 sm:pt-12 pb-10 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera Principal Limpia y Moderna */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          
          {/* Badge con acentos modernos CMYK */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 mb-4 sm:mb-6 shadow-sm">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
              <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
              <span className="w-2 h-2 rounded-full bg-[#34c759]" />
              <span className="w-2 h-2 rounded-full bg-[#ffcc00]" />
            </div>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-700">
              Imprenta Digital en CDMX • Col. La Obrera
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-4 sm:mb-6">
            Impresión digital limpia, rápida y{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-slate-950">sin mínimos.</span>
              <span className="absolute bottom-1.5 left-0 right-0 h-3 bg-[#0071e3]/15 -z-0 rounded-sm" />
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto">
            Fabricamos <strong className="text-slate-900">libros, anuarios, stickers, calendarios y folletería</strong> con fidelidad CMYK milimétrica. Entras, eliges y compras directamente en WhatsApp en 1 clic.
          </p>

          {/* Botón Principal Comprar Ahora en WhatsApp */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-6">
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20comprar%20o%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleHeroCTA}
              className="animate-pulse-whatsapp w-full sm:w-auto px-8 py-4 sm:py-4.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-green-500/30"
            >
              <MessageCircle className="w-5 h-5 fill-white shrink-0" />
              <span>Comprar Ahora por WhatsApp</span>
            </a>

            <a
              href="#catalogo"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Ver Catálogo Masonry</span>
              <ArrowDown className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Garantías y Trust Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
              Respuesta en &lt; 5 minutos
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0071e3]" />
              Entregas express en CDMX
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ff3b30]" />
              Desde 1 sola pieza
            </span>
          </div>
        </div>

        {/* Micro-Masonry Visual en Hero: Galería de fotos reales de trabajos */}
        <div className="mt-4 sm:mt-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-500 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#ffcc00]" />
              <span>Trabajos Reales Recientes</span>
            </div>
            <a
              href="#catalogo"
              className="text-xs font-bold text-[#0071e3] hover:underline"
            >
              Ver todos →
            </a>
          </div>

          {/* Masonry horizontal móvil / grid fluido en tablet y desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
            {heroPhotos.map((photo, idx) => (
              <a
                key={idx}
                href={`https://wa.me/528342091016?text=${encodeURIComponent(`Hola Publideas, vi esta muestra #${idx + 1} en su web y me interesa cotizar algo similar.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({
                  buttonName: `Hero Muestra #${idx + 1}`,
                  targetNumber: '834 209 1016',
                  message: `Hola Publideas, vi esta muestra #${idx + 1} en su web y me interesa cotizar algo similar.`
                })}
                className="group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow-md transition-all aspect-[4/5]"
              >
                <img
                  src={`/${photo}`}
                  alt={`Muestra de impresión ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-2.5 sm:p-3 flex flex-col justify-end">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">
                    Muestra #{idx + 1}
                  </span>
                  <span className="text-[10px] text-green-300 font-bold flex items-center gap-1 mt-0.5">
                    <MessageCircle className="w-3 h-3 fill-green-400" />
                    Comprar / Cotizar →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
