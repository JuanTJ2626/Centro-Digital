'use client';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function LegalesPage() {
  return (
    <main className="min-h-screen bg-[#0f1115] text-[#f0f0f2] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Volver al inicio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic mb-16">
            Información <span className="text-premium">Legal.</span>
          </h1>

          <div className="space-y-20">
            {/* Política de Privacidad */}
            <section className="bg-white/5 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-white/10">
              <h2 className="text-3xl font-black italic text-white mb-8 uppercase tracking-tight flex items-center gap-4">
                <div className="w-1.5 h-10 bg-blue-500 rounded-full" />
                Política de Privacidad
              </h2>
              <div className="space-y-6 text-slate-400 font-medium italic text-lg leading-relaxed">
                <p>
                  En Publideas, valoramos profundamente la confianza que deposita en nosotros al entregarnos sus proyectos. Sus datos están protegidos bajo los más altos estándares de seguridad.
                </p>
                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase text-sm tracking-widest">1. Información Recopilada</h3>
                  <p>Únicamente solicitamos los datos necesarios para procesar su cotización y pedido: nombre, teléfono de contacto y correo electrónico.</p>
                  
                  <h3 className="text-white font-bold uppercase text-sm tracking-widest">2. Uso de la Información</h3>
                  <p>Sus datos se utilizan exclusivamente para la gestión de sus pedidos, facturación y comunicación directa sobre el estatus de sus impresiones.</p>
                  
                  <h3 className="text-white font-bold uppercase text-sm tracking-widest">3. Confidencialidad</h3>
                  <p>Sus archivos de diseño y datos personales son estrictamente confidenciales. No compartimos ni vendemos información a terceros.</p>
                </div>
              </div>
            </section>

            {/* Condiciones del Servicio */}
            <section className="bg-white/5 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-white/10">
              <h2 className="text-3xl font-black italic text-white mb-8 uppercase tracking-tight flex items-center gap-4">
                <div className="w-1.5 h-10 bg-red-500 rounded-full" />
                Condiciones del Servicio
              </h2>
              <div className="space-y-6 text-slate-400 font-medium italic text-lg leading-relaxed">
                <p>
                  Al solicitar nuestros servicios de impresión, el cliente acepta los siguientes términos operativos para garantizar la mejor calidad final.
                </p>
                <div className="space-y-4">
                  <h3 className="text-white font-bold uppercase text-sm tracking-widest">1. Calidad de Archivos</h3>
                  <p>Es responsabilidad del cliente entregar archivos en CMYK con resolución mínima de 300 DPI. No nos hacemos responsables por variaciones de color debidas a perfiles RGB o baja resolución de origen.</p>
                  
                  <h3 className="text-white font-bold uppercase text-sm tracking-widest">2. Tiempos de Entrega</h3>
                  <p>El servicio Express (mismo día) está sujeto a la recepción del archivo antes de las 11:00 AM y a la disponibilidad de carga de producción.</p>
                  
                  <h3 className="text-white font-bold uppercase text-sm tracking-widest">3. Pagos</h3>
                  <p>Todo trabajo requiere la liquidación o anticipo pactado antes de entrar a prensa. No se realizan cancelaciones una vez impreso el material.</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
