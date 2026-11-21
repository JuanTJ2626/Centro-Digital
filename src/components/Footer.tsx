'use client';
import { MessageCircle, MapPin, Mail, Clock, ArrowRight } from 'lucide-react';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-10 sm:pt-14 pb-8 sm:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Banner CTA Superior dentro del footer */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-800 rounded-3xl p-6 sm:p-10 mb-10 sm:mb-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#25D366] block mb-1.5">
              Atención Express Inmediata
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              ¿Listo para mandar a imprimir hoy?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Escríbenos en WhatsApp con tus cantidades y archivos. Te respondemos con precio final y fecha de entrega en minutos.
            </p>
          </div>

          <a
            href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({
              buttonName: 'Footer: Cotizar WhatsApp Express',
              targetNumber: '834 209 1016',
              message: 'Hola Publideas, quiero cotizar un proyecto de impresión.'
            })}
            className="w-full md:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-green-500/25 shrink-0 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Comprar Ahora por WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Columnas del Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 pb-10 border-b border-slate-800/80">
          
          {/* Marca */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/logo mejorado.png"
                alt="Publideas"
                className="w-9 h-9 rounded-full object-cover border border-slate-700"
              />
              <span className="text-lg font-black text-white tracking-tight">PUBLIDEAS</span>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-4">
              Imprenta digital en la Ciudad de México. Libros, anuarios escolares, stickers, calendarios y folletería publicitaria en tirajes cortos y medianos.
            </p>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
              <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
              <span className="w-2 h-2 rounded-full bg-[#34c759]" />
              <span className="w-2 h-2 rounded-full bg-[#ffcc00]" />
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-3">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li>
                <a href="#catalogo" className="hover:text-white transition-colors">
                  Catálogo de Productos
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">
                  Ubicación y Horarios
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20hacer%20un%20pedido."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({
                    buttonName: 'Footer Link: Pedido WhatsApp',
                    targetNumber: '834 209 1016',
                    message: 'Hola Publideas, quiero hacer un pedido.'
                  })}
                  className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-3">
              Horario de Atención
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#ffcc00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Lunes a Viernes</p>
                  <p>8:00 AM – 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#ffcc00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Sábados</p>
                  <p>9:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-3">
              Taller CDMX
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#ff3b30] shrink-0 mt-0.5" />
                <span>Manuel Caballero 131, La Obrera, Cuauhtémoc, CDMX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
                <a href="mailto:publideas.impresiondigital@gmail.com" className="hover:text-white transition-colors truncate">
                  publideas.impresiondigital@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra Legal y Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <p>© {currentYear} Publideas Impresión Digital. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61573867649251"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/publideas.impresiondigital"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a href="/aviso-de-privacidad" className="hover:text-white transition-colors underline">
              Aviso de Privacidad
            </a>
            <a href="/legales" className="hover:text-white transition-colors underline">
              Términos
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
