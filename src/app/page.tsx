'use client';
import { FileText, BookOpen, CreditCard, Tag, BookMarked, LayoutGrid,
  Mail, Clipboard, Image as ImageIcon, Calendar, Sparkles, FileCheck, ArrowUpRight
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

export default function Home() {
  const productos = [
    {
      Icon: BookOpen,
      label: 'Libros',
      color: '#0071e3',
      bgLight: 'linear-gradient(135deg, #e8f2fe 0%, #d8eaff 100%)',
      borderLight: '#b8d7fb',
      desc: 'Edición pasta suave y dura, tirajes cortos y medianos',
      badge: 'Destacado'
    },
    {
      Icon: BookMarked,
      label: 'Anuarios',
      color: '#7c3aed',
      bgLight: 'linear-gradient(135deg, #f3ebff 0%, #e6d7fe 100%)',
      borderLight: '#d3bcfe',
      desc: 'Escolares, corporativos e institucionales a todo color',
      badge: 'Popular'
    },
    {
      Icon: Calendar,
      label: 'Calendarios',
      color: '#ff9500',
      bgLight: 'linear-gradient(135deg, #fff3e3 0%, #fee5c7 100%)',
      borderLight: '#fed09b',
      desc: 'De escritorio, pared, bolsillo y formato personalizado',
      badge: 'Temporada'
    },
    {
      Icon: Sparkles,
      label: 'Stickers & Calcomanías',
      color: '#34c759',
      bgLight: 'linear-gradient(135deg, #e8faee 0%, #d2f6dd 100%)',
      borderLight: '#abedbf',
      desc: 'Vinil mate, brillante, papel adhesivo y medio corte',
      badge: 'Top Ventas'
    },
    {
      Icon: CreditCard,
      label: 'Tarjetas de Presentación',
      color: '#0071e3',
      bgLight: 'linear-gradient(135deg, #e8f2fe 0%, #d8eaff 100%)',
      borderLight: '#b8d7fb',
      desc: 'Couché 300g, laminado mate y barniz a registro'
    },
    {
      Icon: ImageIcon,
      label: 'Posters y Carteles',
      color: '#ff3b30',
      bgLight: 'linear-gradient(135deg, #ffebee 0%, #ffd7dc 100%)',
      borderLight: '#fcaeb7',
      desc: 'Tabloide rebasado en couché y sulfatada con alta nitidez'
    },
    {
      Icon: LayoutGrid,
      label: 'Trípticos y Dípticos',
      color: '#0071e3',
      bgLight: 'linear-gradient(135deg, #e8f2fe 0%, #d8eaff 100%)',
      borderLight: '#b8d7fb',
      desc: 'Folletería publicitaria con dobleces precisos'
    },
    {
      Icon: FileText,
      label: 'Constancias y Diplomas',
      color: '#ffcc00',
      bgLight: 'linear-gradient(135deg, #fffbe6 0%, #fef3b3 100%)',
      borderLight: '#fee680',
      desc: 'Opalina y sulfatada con máxima nitidez tipográfica'
    },
    {
      Icon: Clipboard,
      label: 'Comprobantes y Blocs',
      color: '#ff3b30',
      bgLight: 'linear-gradient(135deg, #ffebee 0%, #ffd7dc 100%)',
      borderLight: '#fcaeb7',
      desc: 'Blocs de notas, notas de remisión y papel membretado'
    },
    {
      Icon: Tag,
      label: 'Etiquetas para Producto',
      color: '#ff9500',
      bgLight: 'linear-gradient(135deg, #fff3e3 0%, #fee5c7 100%)',
      borderLight: '#fed09b',
      desc: 'Para empaques, botellas, tarros y cajas comerciales'
    },
    {
      Icon: Mail,
      label: 'Postales y Flyers',
      color: '#34c759',
      bgLight: 'linear-gradient(135deg, #e8faee 0%, #d2f6dd 100%)',
      borderLight: '#abedbf',
      desc: 'Volantes publicitarios promocionales de alto tiraje'
    },
    {
      Icon: FileCheck,
      label: 'Manuales y Catálogos',
      color: '#0071e3',
      bgLight: 'linear-gradient(135deg, #e8f2fe 0%, #d8eaff 100%)',
      borderLight: '#b8d7fb',
      desc: 'Grapados o encuadernados para empresas y escuelas'
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#fbfbfd] text-[#1d1d1f] font-sans selection:bg-[#0071e3] selection:text-white overflow-x-hidden">
      <Navbar />

      <Hero photos={[
        'WhatsApp Image 2026-09-30 at 10.47.09 PM.jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.09 PM (1).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.09 PM (2).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM.jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (1).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (2).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (3).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (4).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (5).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.10 PM (6).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.11 PM.jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.11 PM (1).jpeg',
        'WhatsApp Image 2026-09-30 at 10.47.12 PM.jpeg',
        'WhatsApp Image 2026-04-21 at 12.43.31 PM.jpeg',
        'WhatsApp Image 2026-04-21 at 12.43.32 PM.jpeg',
        'Image to PDF 20260509 15.12.58_1.jpg.jpeg',
        'Image to PDF 20260509 15.12.58_4.jpg.jpeg',
      ]} />

      {/* SECCIÓN PRODUCTOS DESTACADOS & CATÁLOGO */}
      <section id="productos" className="pt-6 pb-4 md:pt-12 md:pb-8 px-4 md:px-6 bg-transparent relative text-[#1d1d1f] z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0071e3]/10 backdrop-blur-md border border-[#0071e3]/20 shadow-sm text-[10px] font-black uppercase tracking-[0.35em] text-[#0071e3] mb-3">
                <span>Catálogo Integral</span>
              </div>
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter italic leading-[0.95] text-[#1d1d1f]">
                PRODUCTOS DE <br />
                <span className="text-[#0071e3]">IMPRESIÓN DIGITAL.</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-[#1d1d1f]/75 text-xs md:text-base italic leading-relaxed font-medium">
                Fabricamos proyectos editoriales, publicitarios y de empaque con máxima fidelidad de color: <strong>libros, anuarios escolares, calendarios comerciales y stickers troquelados</strong> listos para entrega inmediata.
              </p>
            </div>
          </div>

          {/* Grid de Productos con colores claros temáticos (no blancos) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            {productos.map(({ Icon, label, color, bgLight, borderLight, desc, badge }) => (
              <a
                key={label}
                href={`https://wa.me/528342091016?text=${encodeURIComponent(`Hola Publideas, me interesa cotizar: ${label}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({
                  buttonName: `Catálogo: ${label}`,
                  targetNumber: '834 209 1016',
                  message: `Hola Publideas, me interesa cotizar: ${label}.`
                })}
                style={{
                  background: bgLight,
                  borderColor: borderLight,
                }}
                className="group relative border rounded-[2rem] p-5 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-black/5 overflow-hidden cursor-pointer"
              >
                {/* Sutil resplandor de profundidad estética */}
                <div
                  className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/50 blur-2xl pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                    <div
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm bg-white/85 border border-white transition-transform duration-300 group-hover:scale-105"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} />
                    </div>
                    {badge && (
                      <span
                        className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm"
                        style={{ backgroundColor: color }}
                      >
                        {badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold italic tracking-tight text-[#1d1d1f] mb-2 group-hover:opacity-85 transition-opacity">
                    {label}
                  </h3>
                  <p className="text-[#1d1d1f]/75 text-xs sm:text-sm font-medium italic leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Micro-CTA directo a WhatsApp */}
                <div className="relative z-10 mt-5 pt-3.5 border-t border-black/[0.07] flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider" style={{ color }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                    Cotizar ahora
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color }} />
                </div>
              </a>
            ))}
          </div>

          {/* Banner de llamada rápida con fondo translúcido dark glass */}
          <div className="mt-6 md:mt-8 bg-[#111113]/90 backdrop-blur-2xl border border-white/15 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl shadow-black/15 text-white">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#34c759] block mb-1">¿Tienes un proyecto especial o formato a medida?</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold italic tracking-tight text-white">¿No ves lo que buscas? Si se puede imprimir, lo producimos.</h3>
            </div>
            <a
              href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20quiero%20cotizar%20un%20producto%20especial."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({
                buttonName: 'Catálogo: Consultar con un Asesor',
                targetNumber: '834 209 1016',
                message: 'Hola Publideas, quiero cotizar un producto especial.'
              })}
              className="w-full sm:w-auto text-center shrink-0 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/25"
            >
              Consultar con un Asesor
            </a>
          </div>
        </div>
      </section>



      <Contacto />
      <Footer />
    </main>
  );
}
