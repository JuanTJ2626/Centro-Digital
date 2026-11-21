'use client';
import { useState } from 'react';
import {
  BookOpen, Sparkles, BookMarked, Calendar, Image as ImageIcon,
  CreditCard, LayoutGrid, Tag, Award, FileText, ClipboardList,
  Flag, ShieldCheck, Scissors, MessageCircle, ArrowUpRight, TrendingUp, Clock, CheckCircle2, DollarSign
} from 'lucide-react';
import { trackWhatsAppClick } from '@/utils/trackWhatsApp';

interface ProductItem {
  id: string;
  name: string;
  category: 'libros' | 'stickers' | 'posters' | 'tarjetas' | 'papeleria' | 'acabados';
  icon: any;
  accentColor: string; // Acento del logo
  businessBenefit: string; // Tesis de valor comercial (Tiempo, ROI, Control, Cero Errores)
  desc: string; // Beneficio traducido a impacto en negocio
  kpi: string; // Indicador clave ejecutivo
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'libros',
    name: 'Libros y Cuadernos Bajo Demanda',
    category: 'libros',
    icon: BookOpen,
    accentColor: '#0071e3',
    businessBenefit: 'ROI y Cero Capital Congelado',
    desc: 'Imprime tirajes exactos según demanda real. Elimina costos de almacenaje, evita pérdidas por obsolescencia y produce solo lo que ya tienes vendido.',
    kpi: 'Desde 1 pieza • Protege tu flujo de caja'
  },
  {
    id: 'stickers',
    name: 'Stickers Troquelados de Rápido Desprendimiento',
    category: 'stickers',
    icon: Sparkles,
    accentColor: '#34c759',
    businessBenefit: 'Ahorro de Tiempo en Empaque (50%)',
    desc: 'Medio corte computarizado que permite despegar cada etiqueta en un segundo, reduciendo tiempos muertos y costos de mano de obra en tu línea de empaque.',
    kpi: 'Cero mermas • Desprendimiento ergonómico'
  },
  {
    id: 'anuarios',
    name: 'Anuarios Escolares & Memorias Corporativas',
    category: 'libros',
    icon: BookMarked,
    accentColor: '#ff3b30',
    businessBenefit: 'Control Gerencial y Cero Retrasos',
    desc: 'Cronograma de entrega garantizado bajo contrato para asambleas solemnes y graduaciones. Validación digital previa para evitar reimpresiones de último minuto.',
    kpi: 'Entrega en fecha límite pactada'
  },
  {
    id: 'calendarios',
    name: 'Calendarios de Marca para Clientes Clave',
    category: 'papeleria',
    icon: Calendar,
    accentColor: '#ffcc00',
    businessBenefit: 'Máximo ROI en Branding Anual',
    desc: 'Tu marca visible 365 días en el escritorio del tomador de decisiones. El costo por impresión publicitaria más bajo y duradero frente a campañas digitales.',
    kpi: 'Presencia diaria todo el año'
  },
  {
    id: 'posters',
    name: 'Posters Publicitarios de Respuesta Rápida',
    category: 'posters',
    icon: ImageIcon,
    accentColor: '#0071e3',
    businessBenefit: 'Activación Comercial en 24 Horas',
    desc: 'Comunica ofertas y promociones en punto de venta sin esperar días de imprenta tradicional. Aprovecha fines de semana y temporadas comerciales clave.',
    kpi: 'Time-to-market express de 24h'
  },
  {
    id: 'tarjetas',
    name: 'Tarjetas Ejecutivas de Alta Conversión',
    category: 'tarjetas',
    icon: CreditCard,
    accentColor: '#ff3b30',
    businessBenefit: 'Autoridad y Cierre en Reuniones',
    desc: 'Tacto de nivel corporativo que proyecta solvencia inmediata ante prospectos de alto ticket. Transmite confianza antes de iniciar la negociación de precios.',
    kpi: 'Estandarización comercial para tu equipo'
  },
  {
    id: 'tripticos',
    name: 'Trípticos y Folletería de Prospección',
    category: 'tarjetas',
    icon: LayoutGrid,
    accentColor: '#34c759',
    businessBenefit: 'Reducción del Costo de Adquisición',
    desc: 'Estructura comercial para ventas en campo que explica tu propuesta de valor, aclara dudas frecuentes y califica prospectos antes de la llamada de ventas.',
    kpi: 'Vendedores más productivos'
  },
  {
    id: 'etiquetas',
    name: 'Etiquetas de Producto Anti-Mermas',
    category: 'stickers',
    icon: Tag,
    accentColor: '#ffcc00',
    businessBenefit: 'Blindaje de Calidad ante el Cliente',
    desc: 'Adhesivos diseñados para resistir humedad, congelación y fricción en anaquel. Evita devoluciones de producto por etiquetas despegadas o manchadas.',
    kpi: 'Resistente a humedad y frío'
  },
  {
    id: 'diplomas',
    name: 'Constancias y Diplomas Oficiales',
    category: 'papeleria',
    icon: Award,
    accentColor: '#0071e3',
    businessBenefit: 'Prestigio y Validación Institucional',
    desc: 'Sustrato de archivo durable y tipografía micro-nítida que eleva el valor percibido de tus programas de formación, cursos o reconocimientos corporativos.',
    kpi: 'Acabado de archivo de larga duración'
  },
  {
    id: 'catalogos',
    name: 'Manuales y Catálogos de Operación',
    category: 'libros',
    icon: FileText,
    accentColor: '#ff3b30',
    businessBenefit: 'Reducción de Errores Operativos',
    desc: 'Documentación clara y legible que estandariza procesos técnicos y capacita a tu personal, previniendo fallas costosas en la prestación de tu servicio.',
    kpi: 'Procesos de trabajo estandarizados'
  },
  {
    id: 'blocs',
    name: 'Blocs de Remisiones y Control Diario',
    category: 'papeleria',
    icon: ClipboardList,
    accentColor: '#34c759',
    businessBenefit: 'Trazabilidad y Cobranza sin Fugas',
    desc: 'Hojas autocopiantes foliadas para respaldo contable y firma de conformidad. Elimina discrepancias en entregas físicas y facilita conciliaciones de cobranza.',
    kpi: 'Control administrativo infalible'
  },
  {
    id: 'banners',
    name: 'Banners Comerciales para Punto de Venta',
    category: 'posters',
    icon: Flag,
    accentColor: '#ffcc00',
    businessBenefit: 'Captura de Clientes en Tráfico Peatonal',
    desc: 'Visibilidad de alto impacto para escaparates, ferias y entradas comerciales. Convierte a transeúntes curiosos en clientes que entran a preguntar.',
    kpi: 'Atracción directa en calle'
  },
  {
    id: 'laminado',
    name: 'Laminado Térmico Protector',
    category: 'acabados',
    icon: ShieldCheck,
    accentColor: '#0071e3',
    businessBenefit: 'Protección de Activos Impresos (Vida Útil 3x)',
    desc: 'Barrera contra grasa, líquidos y manipulación constante en menús y manuales. Multiplica la durabilidad del material y ahorra en reimpresiones frecuentes.',
    kpi: 'Ahorro directo en reposiciones'
  },
  {
    id: 'corte',
    name: 'Suaje y Corte de Precisión Digital',
    category: 'acabados',
    icon: Scissors,
    accentColor: '#ff3b30',
    businessBenefit: 'Automatización y Cero Retrabajos',
    desc: 'Corte exacto al milímetro que elimina imperfecciones manuales y permite ensamblajes limpios en packaging y empaques de tus productos.',
    kpi: 'Corte exacto computarizado'
  }
];

export default function MasonryCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: '⭐ Todas las Soluciones' },
    { id: 'libros', label: '📚 Libros y Tirajes' },
    { id: 'stickers', label: '✨ Stickers y Etiquetas' },
    { id: 'posters', label: '📣 Publicidad en 24h' },
    { id: 'tarjetas', label: '📇 Ventas y Prospección' },
    { id: 'papeleria', label: '📋 Control Administrativo' },
    { id: 'acabados', label: '✂️ Acabados de Protección' },
  ];

  const filteredProducts = activeCategory === 'todos'
    ? PRODUCTS
    : PRODUCTS.filter((item) => item.category === activeCategory);

  const handleBuyClick = (productName: string) => {
    const message = `Hola Publideas, requiero cotización y tiempos de entrega para: ${productName}.`;
    trackWhatsAppClick({
      buttonName: `Catálogo Ejecutivo: ${productName}`,
      targetNumber: '834 209 1016',
      message
    });
  };

  return (
    <section id="catalogo" className="py-12 sm:py-20 px-4 sm:px-6 bg-[#fbfbfd] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera Estratégica Orientada a Negocio */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-700 mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0071e3]" />
              Producción Ágil sin Inmovilizar Capital
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
              Impresión que acelera ventas, <br className="hidden sm:block" />
              <span className="text-[#0071e3]">reduce errores y cuida tu flujo de caja.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md leading-relaxed">
            Eliminamos la fricción de cotizar con imprentas lentas. Selecciona tu solución y obtén <strong>precio cerrado, validación técnica y fecha de entrega directa en WhatsApp</strong>.
          </p>
        </div>

        {/* Filtros Táctiles con Scroll Suave */}
        <div className="sticky top-[72px] sm:top-[76px] z-30 py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 bg-[#fbfbfd]/95 backdrop-blur-md mb-8 border-y sm:border-y-0 sm:border-b border-slate-200/80">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/90'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* MASONRY GRID: ÍCONOS CENTRADOS, SIN BADGES INNECESARIOS, ENFOQUE 100% VALOR EJECUTIVO */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-5 [column-fill:_balance]">
          {filteredProducts.map((prod) => {
            const Icon = prod.icon;
            const waMessage = `Hola Publideas, requiero cotización y tiempos de entrega para: ${prod.name}.`;
            const waUrl = `https://wa.me/528342091016?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={prod.id}
                className="masonry-col mb-4 md:mb-5 group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* ÍCONO CENTRADO Y LIMPIO (SIN BADGES NI ETIQUETAS RESIDUALES) */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${prod.accentColor}12`,
                        color: prod.accentColor,
                        border: `1px solid ${prod.accentColor}25`
                      }}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Impacto en Negocio (Beneficio Comercial Central) */}
                  <div className="text-center mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                      {prod.businessBenefit}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#0071e3] transition-colors">
                      {prod.name}
                    </h3>
                  </div>
                  
                  {/* Copy Traducido a Ahorro de Tiempo / Reducción de Errores / ROI */}
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4 text-center">
                    {prod.desc}
                  </p>

                  {/* KPI Ejecutivo */}
                  <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-500 mb-6 text-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{prod.kpi}</span>
                  </div>
                </div>

                {/* Botón WhatsApp de Acción Inmediata */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleBuyClick(prod.name)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] transition-all text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-green-500/20"
                >
                  <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                  <span>Comprar Ahora por WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-80" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Banner CTA Estratégico para Empresas & Cuentas Corporativas */}
        <div className="mt-10 sm:mt-14 rounded-3xl bg-slate-900 text-white p-7 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 text-center lg:text-left max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#34c759] block mb-2">
              Atención Directa a Cuentas Corporativas y Escuelas
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              ¿Requieres crédito por volumen, facturación inmediata o contratos programados?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 leading-relaxed">
              Habla directamente con nuestro responsable operativo en CDMX. Te cotizamos con tarifa preferencial por volumen y tiempos de entrega protegidos.
            </p>
          </div>

          <a
            href="https://wa.me/528342091016?text=Hola%20Publideas%2C%20requiero%20atenci%C3%B3n%20para%20una%20cuenta%20corporativa%20o%20volumen%20recurrente."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({
              buttonName: 'Banner Catálogo: Cuenta Corporativa',
              targetNumber: '834 209 1016',
              message: 'Hola Publideas, requiero atención para una cuenta corporativa o volumen recurrente.'
            })}
            className="relative z-10 shrink-0 w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-green-500/30"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Hablar con un Asesor Corporativo</span>
          </a>
        </div>

      </div>
    </section>
  );
}
