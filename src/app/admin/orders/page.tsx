'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle, XCircle, Clock, RefreshCw, Phone,
  Search, Filter, ChevronLeft, ChevronRight,
  ShoppingBag, Calendar, ExternalLink, DollarSign,
  Package, Layout, ArrowRight, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Order {
  id: number;
  orderNumber: string;
  timestamp: string;
  name: string;
  phone: string;
  details: string;
  status: string;
  precio: string | number;
  fecha: string;
  producto: string;
  medida: string;
  material: string;
  gramaje: string;
  impresion: string;
  cantidad: string | number;
  acabados: string;
}

const ITEMS_PER_PAGE = 12;

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (Array.isArray(data)) {
        // Mapeamos los datos para incluir precio y fecha real del excel
        const mappedData = data.map(item => ({
          ...item,
          precio: item.raw?.Precio || '0',
          fecha: item.raw?.Fecha || item.timestamp
        }));
        setOrders([...mappedData].reverse());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/login', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  const updateStatus = async (rowId: number, newStatus: string) => {
    setUpdatingId(rowId);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rowId, status: newStatus }),
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === rowId ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const searchStr = `${order.name} ${order.orderNumber} ${order.phone} ${order.details}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans overflow-x-hidden relative">
      {/* Logo de Fondo Gigante en Esquina Superior Derecha */}
      <div className="fixed -top-20 -right-20 pointer-events-none z-0 opacity-[0.08] select-none">
        <img src="/logo mejorado.png" alt="" className="w-[500px] md:w-[700px] h-auto object-contain rotate-12" />
      </div>

      {/* Navbar Estilo Apple */}
      <nav className="fixed top-0 w-full z-50 px-4 md:px-8 py-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-6xl bg-white/70 backdrop-blur-2xl border border-white/40 rounded-full px-6 py-3 flex justify-between items-center shadow-[0_8px_32px_rgba(0,0,0,0.05)] pointer-events-auto relative overflow-hidden">
          <div className="absolute bottom-0 left-0 h-1 line-cmyk w-full opacity-30" />

          <div className="flex items-center gap-3">
            <img src="/logo mejorado.png" alt="Logo" className="h-10 w-10 rounded-full aspect-square object-cover border border-slate-200" />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter leading-none uppercase">PUBLIDEAS</span>
              <span className="text-[8px] font-black text-[#0071e3] tracking-[0.2em] uppercase">Panel de Control</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchOrders}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors group"
              title="Sincronizar"
            >
              <RefreshCw className={`w-4 h-4 text-slate-600 group-hover:text-brand-blue transition-colors ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 transition-colors group"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-600 transition-colors" />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-widest shadow-lg shadow-black/10">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              LIVE
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <header className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic"
          >
            Gestión de <span className="text-premium">Pedidos.</span>
          </motion.h2>
          <div className="line-cmyk w-48 rounded-full mb-8" />
        </header>

        {/* Métrica Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Entrantes', value: orders.length, icon: ShoppingBag, color: 'text-slate-900' },
            { label: 'Pendientes', value: orders.filter(o => o.status !== 'Completado' && o.status !== 'Rechazado').length, icon: Clock, color: 'text-amber-500' },
            { label: 'Listos', value: orders.filter(o => o.status === 'Completado').length, icon: CheckCircle, color: 'text-green-500' },
            { label: 'Ventas Est.', value: `$${orders.reduce((acc, o) => acc + (parseFloat(String(o.precio).replace(/[^0-9.]/g, '')) || 0), 0).toLocaleString()}`, icon: DollarSign, color: 'text-brand-blue' },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
              className="bg-white border border-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 relative z-10"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <h3 className="text-2xl font-black tracking-tighter">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Toolbar Interactivo */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors" />
            <input
              type="text"
              placeholder="Buscar por cliente o código de pedido..."
              className="w-full bg-white border border-slate-200 rounded-3xl pl-14 pr-6 py-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            {['Todos', 'Pendiente', 'Completado', 'Rechazado'].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-6 py-3 rounded-[1.2rem] text-[10px] font-black tracking-widest uppercase transition-all ${statusFilter === f ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Pedidos en GRID COMPACTO */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {loading && orders.length === 0 ? (
              <div className="col-span-full py-40 text-center">
                <RefreshCw className="w-12 h-12 animate-spin mx-auto text-slate-300" />
              </div>
            ) : paginatedOrders.map((order, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03 }}
                key={order.id}
                className="group bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between relative z-10"
              >
                <div>
                  {/* Header de la Tarjeta */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.status === 'Completado' ? 'bg-green-50 text-green-500' :
                        order.status === 'Rechazado' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
                      }`}>
                      {order.status === 'Completado' ? <CheckCircle size={20} /> :
                        order.status === 'Rechazado' ? <XCircle size={20} /> : <Clock size={20} className="animate-pulse" />}
                    </div>
                    <span className="text-[9px] font-black bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-lg uppercase tracking-tighter">
                      {order.orderNumber}
                    </span>
                  </div>

                  {/* Cliente e Info básica */}
                  <div className="mb-4">
                    <h4 className="text-lg font-black tracking-tighter truncate">{order.name}</h4>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {order.timestamp.split(',')[0]}</span>
                      <span className="text-brand-green font-black">{order.precio}</span>
                    </div>
                  </div>

                  {/* Grid de Detalles Técnico (Muy compacto) */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl mb-4 border border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-slate-400 uppercase">Producto</span>
                      <span className="text-[10px] font-bold text-slate-700 truncate">{order.producto}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-slate-400 uppercase">Cantidad</span>
                      <span className="text-[10px] font-bold text-brand-blue">{order.cantidad}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-slate-400 uppercase">Material</span>
                      <span className="text-[10px] font-bold text-slate-700 truncate">{order.material}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[7px] font-black text-slate-400 uppercase">Acabados</span>
                      <span className="text-[10px] font-bold text-amber-600 truncate">{order.acabados || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción compactos */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => updateStatus(order.id, 'Completado')}
                    disabled={updatingId === order.id || order.status === 'Completado'}
                    className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${order.status === 'Completado' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-green-500 hover:text-white'
                      }`}
                  >
                    {updatingId === order.id ? <RefreshCw size={12} className="animate-spin" /> : 'Listo'}
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, 'Rechazado')}
                    disabled={updatingId === order.id || order.status === 'Rechazado'}
                    className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${order.status === 'Rechazado' ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-red-500 hover:text-white'
                      }`}
                  >
                    {updatingId === order.id ? <RefreshCw size={12} className="animate-spin" /> : 'No'}
                  </button>
                  <a
                    href={`tel:${order.phone}`}
                    className="p-2.5 bg-slate-100 text-slate-400 rounded-xl hover:bg-brand-blue hover:text-white transition-all"
                  >
                    <Phone size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Paginación Apple-Style */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all disabled:opacity-20 shadow-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="text-sm font-black tracking-tighter">
              PÁGINA <span className="text-brand-blue text-lg">{currentPage}</span> DE {totalPages}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all disabled:opacity-20 shadow-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <footer className="mt-32 pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
              <Layout className="w-5 h-5 text-brand-blue" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 leading-none mb-1">Sistema Integrado</p>
              <p className="text-sm font-black tracking-tighter uppercase">Cloud Connection Engine</p>
            </div>
          </div>

          <div className="flex gap-4">
            <a href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-blue flex items-center gap-2">
              IR AL SITIO <ArrowRight size={12} />
            </a>
            <a href="https://docs.google.com/spreadsheets/d/1qMud5g2lAN1eKyu3frhEQNX3Zo3YCfkMLT6YPYO1a0s/edit" target="_blank" className="text-[10px] font-black uppercase tracking-widest text-[#1d1d1f] hover:text-brand-blue flex items-center gap-2">
              GOOGLE SHEETS <ExternalLink size={12} />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
