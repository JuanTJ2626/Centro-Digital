'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Copy, Plus, Send, MessageSquareText, ShieldCheck, Sparkles, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

interface Recipient {
  phone: string;
  name: string;
}

const seedRecipients: Recipient[] = [
  { name: 'Cliente 1', phone: '5512345678' },
  { name: 'Cliente 2', phone: '5587654321' },
];

const apiTemplate = `// Configura esto en tu .env.local
const WHATSAPP_API_URL = process.env.WHATSAPP_API_URL;
const WHATSAPP_API_KEY = process.env.WHATSAPP_API_KEY;

// Envía un texto a un número
await fetch(WHATSAPP_API_URL!, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer TU_TOKEN_AQUI',
  },
  body: JSON.stringify({
    to: '52XXXXXXXXXX',
    message: 'Hola, este es un mensaje masivo',
  }),
});`;

export default function WhatsappBroadcastPage() {
  const [message, setMessage] = useState('Hola, tenemos una promoción especial en impresión digital. Responde a este mensaje si deseas más información.');
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [recipientText, setRecipientText] = useState(seedRecipients.map(r => `${r.name},${r.phone}`).join('\n'));
  const [status, setStatus] = useState('Listo para configurar');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null);

  const recipients = useMemo(() => {
    return recipientText
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [maybeName, maybePhone] = line.split(',').map(part => part.trim());
        if (!maybePhone) return { name: `Contacto ${index + 1}`, phone: maybeName };
        return { name: maybeName || `Contacto ${index + 1}`, phone: maybePhone };
      })
      .filter(item => item.phone.length > 0);
  }, [recipientText]);

  const copyTemplate = async () => {
    await navigator.clipboard.writeText(apiTemplate);
    setStatus('Plantilla copiada');
  };

  const handleSend = async () => {
    setSending(true);
    setResult(null);
    setStatus('Enviando mensajes...');

    try {
      const response = await fetch('/api/whatsapp/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiUrl, apiKey, message, recipients }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No se pudo enviar');

      setResult({ sent: data.sent ?? recipients.length, failed: data.failed ?? 0 });
      setStatus('Mensajes enviados');
    } catch (error: any) {
      setStatus(error.message || 'Error al enviar');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(37,211,102,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(0,113,227,0.10),_transparent_28%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link href="/admin/orders" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.35em] text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Volver a pedidos
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-white shadow-sm px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-[#25D366]">
            <MessageSquareText className="h-4 w-4" />
            WhatsApp Broadcast
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8">
          <section className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="p-6 md:p-8 border-b border-slate-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#25D366] mb-3">Módulo nuevo</p>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic leading-[0.92]">Envío masivo de WhatsApp</h1>
                  <p className="mt-4 text-sm md:text-base text-[#86868b] max-w-2xl">
                    Pega tu API de WhatsApp Business, carga tus destinatarios y envía mensajes desde el panel de administrador con la misma estética del proyecto.
                  </p>
                </div>
                <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-3xl bg-[#25D366]/10 text-[#25D366]">
                  <Sparkles className="h-7 w-7" />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">URL de la API</label>
                  <input
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="https://tu-api-whatsapp.com/send"
                    className="w-full rounded-3xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold outline-none transition-all focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">API Key / Token</label>
                  <input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Pega tu token aquí"
                    className="w-full rounded-3xl border border-slate-100 bg-slate-50 px-6 py-4 text-sm font-bold outline-none transition-all focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mensaje</label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-[1.75rem] border border-slate-100 bg-slate-50 px-6 py-5 text-sm font-medium outline-none transition-all focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/10 resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3 px-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Destinatarios</label>
                  <button
                    type="button"
                    onClick={() => setRecipientText(prev => prev + '\nNuevo cliente,521234567890')}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-white transition-transform hover:scale-[1.02]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Agregar línea
                  </button>
                </div>
                <textarea
                  rows={8}
                  value={recipientText}
                  onChange={(e) => setRecipientText(e.target.value)}
                  placeholder={'Nombre,telefono\nNombre,telefono'}
                  className="w-full rounded-[1.75rem] border border-slate-100 bg-slate-50 px-6 py-5 text-sm font-medium outline-none transition-all focus:border-[#25D366] focus:ring-4 focus:ring-[#25D366]/10 resize-none"
                />
                <p className="px-4 text-[11px] text-slate-500">
                  Formato sugerido: <span className="font-bold">Nombre,5512345678</span>. Una línea por contacto.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={sending || recipients.length === 0}
                  className="inline-flex flex-1 items-center justify-center gap-3 rounded-3xl bg-[#25D366] px-6 py-5 text-[11px] font-black uppercase tracking-[0.4em] text-white shadow-xl shadow-green-500/20 transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <Send className="h-4 w-4" />
                  {sending ? 'Enviando...' : `Enviar a ${recipients.length} contactos`}
                </button>
                <button
                  type="button"
                  onClick={copyTemplate}
                  className="inline-flex items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white px-6 py-5 text-[11px] font-black uppercase tracking-[0.4em] text-slate-700 transition-all hover:border-slate-300"
                >
                  <Copy className="h-4 w-4" />
                  Copiar plantilla
                </button>
              </div>

              <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50/70 p-5">
                <div className="flex items-center gap-2 mb-3 text-[#25D366] font-black uppercase tracking-[0.35em] text-[10px]">
                  <ShieldCheck className="h-4 w-4" />
                  Estado
                </div>
                <p className="text-sm text-slate-700 font-medium">{status}</p>
                {result && (
                  <p className="mt-2 text-sm text-slate-500">
                    Enviados: <span className="font-bold text-slate-900">{result.sent}</span> · Fallidos: <span className="font-bold text-slate-900">{result.failed}</span>
                  </p>
                )}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white bg-white/80 backdrop-blur-xl shadow-xl p-6 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">Cómo conectar tu API</h2>
                  <p className="text-sm text-[#86868b]">Solo pega tu endpoint y token cuando te lo den.</p>
                </div>
              </div>

              <ol className="space-y-3 text-sm text-slate-600">
                <li className="rounded-2xl bg-slate-50 p-4"><span className="font-black text-slate-900">1.</span> Define la URL de tu API de WhatsApp Business.</li>
                <li className="rounded-2xl bg-slate-50 p-4"><span className="font-black text-slate-900">2.</span> Pega tu token o API key.</li>
                <li className="rounded-2xl bg-slate-50 p-4"><span className="font-black text-slate-900">3.</span> Captura destinatarios y mensaje.</li>
                <li className="rounded-2xl bg-slate-50 p-4"><span className="font-black text-slate-900">4.</span> Cuando tu API esté lista, el endpoint ya queda preparado en <span className="font-bold">/api/whatsapp/broadcast</span>.</li>
              </ol>
            </div>

            <div className="rounded-[2rem] border border-white bg-white/80 backdrop-blur-xl shadow-xl p-6 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">Formato de contactos</h2>
                  <p className="text-sm text-[#86868b]">Más simple imposible.</p>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-slate-950 text-white p-5 text-[11px] leading-6 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{`Nombre,5512345678
Nombre 2,5587654321
5511111111`}</pre>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white bg-white/80 backdrop-blur-xl shadow-xl p-6 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">Plantilla rápida</h2>
                  <p className="text-sm text-[#86868b]">Pégala en tu backend cuando te den la API.</p>
                </div>
              </div>

              <button
                type="button"
                onClick={copyTemplate}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-[11px] font-mono text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <pre className="whitespace-pre-wrap">{apiTemplate}</pre>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
