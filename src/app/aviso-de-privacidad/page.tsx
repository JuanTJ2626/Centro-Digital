import { Shield, Eye, Database, Lock, Mail, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Aviso de Privacidad | Publideas',
  description: 'Aviso de Privacidad de Publideas conforme a la Ley Federal de Proteccion de Datos Personales en Posesion de los Particulares.',
};

export default function AvisoDePrivacidadPage() {
  const sections = [
    {
      icon: Database,
      color: '#0071e3',
      title: 'Responsable del tratamiento',
      content: `Publideas Impresion Digital, con domicilio en Manuel Caballero 131, Colonia La Obrera, Ciudad de Mexico, C.P. 06800, es responsable del tratamiento de sus datos personales conforme a lo previsto en la Ley Federal de Proteccion de Datos Personales en Posesion de los Particulares (LFPDPPP) y demas normativa aplicable.`,
    },
    {
      icon: Eye,
      color: '#7c3aed',
      title: 'Datos personales que recabamos',
      content: `Recabamos los siguientes datos personales con el proposito de brindarle nuestros servicios de impresion digital:\n\n• Nombre completo\n• Numero de telefono\n• Correo electronico\n• Informacion de contacto en redes sociales (Facebook / Instagram)\n• Datos del pedido: tipo de material, formato, acabado, cantidad y archivos de diseno\n\nNo recabamos datos personales sensibles (datos financieros, de salud, biometricos, etc.).`,
    },
    {
      icon: FileText,
      color: '#ff3b30',
      title: 'Finalidades del tratamiento',
      content: `Sus datos personales son utilizados para las siguientes finalidades primarias (necesarias para la prestacion del servicio):\n\n• Procesar y gestionar su pedido de impresion\n• Enviarle cotizaciones y confirmaciones\n• Coordinar la entrega de su pedido\n• Dar seguimiento y atencion a dudas o reclamaciones\n\nFinalidades secundarias (puede oponerse a estas):\n\n• Enviarle informacion sobre nuevos servicios, promociones o descuentos\n• Solicitar su opinion sobre nuestros servicios`,
    },
    {
      icon: Shield,
      color: '#34c759',
      title: 'Canales de recopilacion',
      content: `Sus datos pueden ser recopilados a traves de:\n\n• Conversacion con nuestro asesor virtual (chatbot Botpress)\n• Mensaje de WhatsApp al numero 55 6808 1606\n• Mensaje directo por Facebook o Instagram\n• Correo electronico a publideas.impresiondigital@gmail.com\n• Contacto presencial en nuestro local\n\nEl uso del chatbot implica que la conversacion puede ser almacenada en los servidores de Botpress (https://botpress.com) para mejorar el servicio. Consulte la politica de privacidad de Botpress en su sitio oficial.`,
    },
    {
      icon: Lock,
      color: '#d97706',
      title: 'Medidas de seguridad',
      content: `Implementamos medidas administrativas, tecnicas y fisicas para proteger sus datos personales contra dano, perdida, alteracion, destruccion o el uso, acceso o tratamiento no autorizado. Unicamente el personal autorizado de Publideas tiene acceso a sus datos.`,
    },
    {
      icon: Mail,
      color: '#0071e3',
      title: 'Derechos ARCO',
      content: `Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (derechos ARCO) al tratamiento de sus datos personales. Para ejercer sus derechos, envienos un correo a:\n\npublideas.impresiondigital@gmail.com\n\nIndique en el asunto: "Ejercicio de derechos ARCO". Responderemos en un plazo maximo de 20 dias habiles.`,
    },
  ];

  return (
    <>
      <Navbar />

      <main className="bg-[#fbfbfd] text-[#1d1d1f] font-sans">

        {/* Header */}
        <section className="relative bg-[#111113] pt-32 pb-16 px-4 md:px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0071e3]/8 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#0071e3] rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#60a5fa]">Privacidad y datos personales</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic text-white leading-[0.95] mb-4">
              AVISO DE<br />
              <span className="text-[#0071e3]">PRIVACIDAD.</span>
            </h1>
            <p className="text-white/40 text-sm font-medium italic">
              Ultima actualizacion: abril 2026 · Conforme a la LFPDPPP (Mexico)
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* Intro card */}
            <div className="bg-[#f5f5f7] border border-slate-100 rounded-[2.5rem] p-8 md:p-10">
              <p className="text-[#1d1d1f] text-base md:text-lg font-medium italic leading-relaxed">
                En Publideas valoramos y respetamos su privacidad. El presente Aviso de Privacidad describe como recabamos, usamos y protegemos sus datos personales, de conformidad con la{' '}
                <strong>Ley Federal de Proteccion de Datos Personales en Posesion de los Particulares</strong> y el Reglamento de dicha Ley.
              </p>
            </div>

            {sections.map((s, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + '18' }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold italic tracking-tight text-[#1d1d1f]">{s.title}</h2>
                </div>
                <div className="text-[#86868b] text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">
                  {s.content}
                </div>
              </div>
            ))}

            {/* Cookies */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#ffcc00]/20">
                  <FileText className="w-5 h-5 text-[#d97706]" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold italic tracking-tight text-[#1d1d1f]">Politica de cookies y tecnologias de rastreo</h2>
              </div>
              <div className="text-[#86868b] text-sm md:text-base font-medium leading-relaxed space-y-4">
                <p>
                  Nuestro sitio web puede utilizar tecnologias de rastreo (cookies y localStorage) con las siguientes finalidades:
                </p>
                <ul className="space-y-2 ml-4">
                  {[
                    'Cookies tecnicas: necesarias para el funcionamiento del sitio (no requieren consentimiento).',
                    'Chatbot Botpress: el widget de chat puede almacenar datos de sesion en localStorage para recordar la conversacion.',
                    'No utilizamos cookies de publicidad de terceros ni compartimos sus datos con redes publicitarias.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#d97706] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Puede deshabilitar las cookies desde la configuracion de su navegador; sin embargo, esto podria afectar la funcionalidad del sitio.
                </p>
              </div>
            </div>

            {/* Changes */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold italic tracking-tight text-[#1d1d1f] mb-4">Cambios al aviso de privacidad</h2>
              <p className="text-[#86868b] text-sm md:text-base font-medium leading-relaxed">
                Nos reservamos el derecho de actualizar este aviso en cualquier momento. Cuando se realicen cambios sustanciales, lo notificaremos a traves de nuestros canales de contacto o mediante un aviso visible en este sitio web.
              </p>
            </div>

            {/* Contact CTA */}
            <div className="bg-[#111113] rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#60a5fa] mb-2">¿Dudas sobre tus datos?</p>
                <h3 className="text-2xl font-bold italic text-white mb-1">Contacta a nuestro responsable</h3>
                <p className="text-white/40 text-sm italic font-medium">publideas.impresiondigital@gmail.com</p>
              </div>
              <a
                href="mailto:publideas.impresiondigital@gmail.com?subject=Ejercicio%20de%20derechos%20ARCO"
                className="shrink-0 inline-flex items-center gap-3 px-8 py-5 bg-[#0071e3] text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
              >
                <Mail className="w-4 h-4" />
                Escribir correo
              </a>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
