'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin/orders');
      } else {
        const data = await res.json();
        setError(data.error || 'Acceso denegado');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-4 font-sans selection:bg-brand-blue selection:text-white relative overflow-hidden">
      {/* Logo de Fondo (Marca de Agua Vibrante) */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.15] select-none">
        <img src="/logo mejorado.png" alt="" className="w-[600px] md:w-[800px] h-auto object-contain rotate-12" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-white rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
          {/* CMYK Progress line at top */}
          <div className="absolute top-0 left-0 w-full h-2 line-cmyk" />
          
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 mx-auto mb-6 relative"
            >
              <img 
                src="/logo mejorado.png" 
                alt="Logo Publideas" 
                className="w-full h-full rounded-full object-cover border-2 border-white shadow-2xl" 
              />
              <div className="absolute inset-0 rounded-full border-2 border-slate-900/5 shadow-inner pointer-events-none" />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 italic">PUBLIDEAS</h1>
            <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] w-4 bg-slate-200" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Acceso Restringido</p>
                <div className="h-[1px] w-4 bg-slate-200" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-brand-blue transition-all duration-300" />
              <input 
                type="password" 
                placeholder="Contraseña Maestra" 
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl pl-16 pr-6 py-6 text-sm font-bold outline-none focus:ring-8 focus:ring-brand-blue/5 focus:border-brand-blue focus:bg-white transition-all duration-500 shadow-inner"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <AnimatePresence>
                {error && (
                <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-50 py-3 rounded-xl border border-red-100"
                >
                    ⚠️ {error}
                </motion.p>
                )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={loading}
              className="group relative w-full bg-slate-900 text-white rounded-3xl py-6 font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-brand-blue hover:shadow-2xl hover:shadow-brand-blue/30 transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">{loading ? 'Verificando...' : 'Entrar al Panel'}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="mt-12 text-center space-y-4">
             <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] leading-relaxed">
                Este panel contiene información confidencial de clientes. <br/> El acceso no autorizado está prohibido.
             </p>
             <div className="flex justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#34c759]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffcc00]" />
             </div>
          </div>
        </div>

        {/* Floating link to main site */}
        <div className="mt-8 text-center">
            <a href="/" className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors inline-flex items-center gap-2">
                ← Volver al sitio principal
            </a>
        </div>
      </motion.div>
    </div>
  );
}
