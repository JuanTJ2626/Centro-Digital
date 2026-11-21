'use client';
import { MapPin, Clock, MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

export default function Contacto() {
  const mapsSearchUrl = "https://www.google.com/maps/search/?api=1&query=Manuel+Caballero+131,+La+Obrera,+Cuauhtémoc,+06800+Ciudad+de+México,+CDMX";
  const mapsEmbedUrl = "https://maps.google.com/maps?q=Manuel%20Caballero%20131,%20La%20Obrera,%20Cuauht%C3%A9moc,%2006800%20Ciudad%20de%20M%C3%A9xico,%20CDMX&t=&z=16&ie=UTF8&iwloc=&output=embed";

  const waLocalUrl = "https://wa.me/525568081606?text=Hola%20Publideas%2C%20me%20gustar%C3%ADa%20cotizar%20o%20comprar%20una%20impresi%C3%B3n.";
  const wa247Url = "https://wa.me/528342091016?text=Hola%20Publideas%2C%20me%20gustar%C3%ADa%20atenci%C3%B3n%20para%20un%20pedido.";

  return (
    <section id="contacto" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#fbfbfd]">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado limpio */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-700 mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#34c759]" />
            Visítanos o Escríbenos
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-2">
            Ubicación del Taller y WhatsApp.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Estamos en el corazón gráfico de la Ciudad de México para entregas rápidas y atención en mostrador.
          </p>
        </div>

        {/* Tarjeta Principal de Mapa y Dirección */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.04)] overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Columna Izquierda: Información */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-4">
                  <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
                  <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
                  <span className="w-2 h-2 rounded-full bg-[#34c759]" />
                  <span className="w-2 h-2 rounded-full bg-[#ffcc00]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1.5">
                    Taller Publideas
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                  Manuel Caballero 131
                </h3>
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  Col. La Obrera, Alcaldía Cuauhtémoc, C.P. 06800, CDMX.
                </p>
                <p className="text-xs text-slate-500 font-medium mb-5">
                  A 3 calles de Calzada de Tlalpan. Metro más cercano: <strong>Metro Chabacano</strong> (Líneas 2, 8 y 9) y cerca de Metro Lázaro Cárdenas.
                </p>

                {/* Horarios */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-slate-800 tracking-wider mb-2">
                    <Clock className="w-4 h-4 text-[#0071e3]" />
                    <span>Horario de Atención:</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong className="text-slate-900">Lunes a Viernes:</strong> 8:00 AM – 6:00 PM</p>
                    <p><strong className="text-slate-900">Sábados:</strong> 9:00 AM – 2:00 PM</p>
                  </div>
                </div>
              </div>

              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all text-center"
              >
                <MapPin className="w-4 h-4 text-[#ff3b30]" />
                <span>Cómo llegar (Ruta en Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>

            {/* Columna Derecha: Mapa embebido */}
            <div className="lg:col-span-7 h-[300px] lg:h-auto min-h-[300px] relative bg-slate-100">
              <iframe
                title="Ubicación Google Maps Publideas"
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Canales de Contacto Directo en WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* WhatsApp Cotizaciones 24/7 */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 border border-green-100">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#25D366] block">
                  Canal Principal
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  WhatsApp Cotizaciones 24/7
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  834 209 1016 • Atención inmediata y presupuestos por archivo.
                </p>
              </div>
            </div>

            <a
              href={wa247Url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({
                buttonName: 'Contacto: WhatsApp 24/7 (834 209 1016)',
                targetNumber: '834 209 1016',
                message: 'Hola Publideas, me gustaría atención para un pedido.'
              })}
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-green-500/20 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Escribir al 834 209 1016</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* WhatsApp Local Taller CDMX */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                <MessageCircle className="w-6 h-6 text-[#0071e3]" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0071e3] block">
                  Mostrador Local CDMX
                </span>
                <h4 className="text-lg font-black text-slate-900">
                  WhatsApp Taller Local
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  55 6808 1606 • Entregas personales y recolección en mostrador.
                </p>
              </div>
            </div>

            <a
              href={waLocalUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({
                buttonName: 'Contacto: WhatsApp Local (55 6808 1606)',
                targetNumber: '55 6808 1606',
                message: 'Hola Publideas, me gustaría cotizar una impresión.'
              })}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Escribir al 55 6808 1606</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
