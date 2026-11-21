import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MasonryCatalog from '@/components/MasonryCatalog';
import Contacto from '@/components/Contacto';
import Footer from '@/components/Footer';

export default function Home() {
  const samplePhotos = [
    'WhatsApp Image 2026-09-30 at 10.47.09 PM.jpeg',
    'WhatsApp Image 2026-09-30 at 10.47.09 PM (1).jpeg',
    'WhatsApp Image 2026-09-30 at 10.47.09 PM (2).jpeg',
    'WhatsApp Image 2026-09-30 at 10.47.10 PM.jpeg',
    'WhatsApp Image 2026-09-30 at 10.47.10 PM (1).jpeg',
    'WhatsApp Image 2026-09-30 at 10.47.10 PM (2).jpeg',
    'WhatsApp Image 2026-09-30 at 10.47.10 PM (3).jpeg',
    'WhatsApp Image 2026-09-30 at 10.47.10 PM (4).jpeg',
  ];

  return (
    <main className="relative min-h-screen bg-[#fbfbfd] text-slate-900 overflow-x-hidden selection:bg-[#0071e3] selection:text-white">
      <Navbar />
      <Hero photos={samplePhotos} />
      <MasonryCatalog />
      <Contacto />
      <Footer />
    </main>
  );
}
