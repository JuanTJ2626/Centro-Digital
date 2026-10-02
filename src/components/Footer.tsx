'use client';
import { ArrowRight, Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="quote" className="bg-[#111113] text-white border-t border-white/10 relative overflow-hidden">
      {/* Sutil resplandor de fondo */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* ── CTA SUPERIOR NORMAL & EQUILIBRADO ──────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-3 md:pt-6 pb-4 md:pb-6 relative z-10 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#0071e3] block mb-2">
              Cotización Express Inmediata
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight italic text-white leading-tight">
              ¿Listo para imprimir tu proyecto?
            </h2>
            <p className="text-white/60 text-sm md:text-base italic mt-2">
              Envíanos tus archivos o requisitos y te respondemos en minutos con la mejor tarifa y tiempo de entrega.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20proyecto%20de%20impresi%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-500/20 text-center flex items-center justify-center gap-2"
            >
              Cotizar por WhatsApp <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── COLUMNAS DE CONTENIDO Y ENLACES (PROPORCIÓN ESTÁNDAR) ──────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Columna 1: Marca y descripción */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo mejorado.png"
                alt="Logo Publideas"
                className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-sm"
              />
              <div>
                <span className="block font-black italic tracking-tighter text-lg leading-none text-white">PUBLIDEAS</span>
                <span className="block text-[9px] font-bold text-[#0071e3] uppercase tracking-widest">Impresión Digital CDMX</span>
              </div>
            </div>
            <p className="text-white/50 text-xs md:text-sm font-medium italic leading-relaxed">
              Impresión digital en CMYK sobre couché, bond, opalina, sulfatada y vinil adhesivo. Libros, anuarios, stickers y calendarios en la Ciudad de México.
            </p>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40 mb-4">Navegación</h3>
            <ul className="space-y-2.5 text-xs font-semibold text-white/70">
              <li>
                <a href="#productos" className="hover:text-[#0071e3] transition-colors">Catálogo de Productos</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[#0071e3] transition-colors">Dónde Ubicarnos</a>
              </li>
              <li>
                <a
                  href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20proyecto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  Cotizar por WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horarios de Atención */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40 mb-4">Horarios</h3>
            <div className="space-y-2 text-xs text-white/70">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#ffcc00] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Lunes a Viernes:</p>
                  <p className="text-white/50 font-medium">8:00 AM – 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#ffcc00] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Sábados:</p>
                  <p className="text-white/50 font-medium">9:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 4: Contacto & Ubicación */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40 mb-4">WhatsApp & Ubicación</h3>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0071e3] shrink-0 mt-0.5" />
                <span>Manuel Caballero 131, Col. La Obrera, Cuauhtémoc, CDMX</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <a
                  href="https://wa.me/525568081606?text=Hola%20Publideas%2C%20me%20gustar%C3%ADa%20cotizar%20una%20impresi%C3%B3n."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Local: 55 6808 1606
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#128C7E]" />
                <a
                  href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20proyecto."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-bold text-white/90"
                >
                  WhatsApp 24/7: 834 209 1016
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff3b30] shrink-0" />
                <a href="mailto:publideas.impresiondigital@gmail.com" className="hover:text-white transition-colors break-all">
                  publideas.impresiondigital@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── BARRA INFERIOR / COPYRIGHT Y LEGALES ────────── */}
      <div className="border-t border-white/10 px-4 md:px-6 py-6 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-white/40">
          <div>
            © {currentYear} Publideas Impresión Digital. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://www.facebook.com/profile.php?id=61573867649251"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1877F2] transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/publideas.impresiondigital"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href="/aviso-de-privacidad"
              className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
            >
              Aviso de Privacidad
            </a>
            <a
              href="/legales"
              className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
            >
              Términos Legales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
