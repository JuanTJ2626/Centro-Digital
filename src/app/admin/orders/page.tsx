'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle, XCircle, Clock, RefreshCw, Phone,
  Search, Filter, ChevronLeft, ChevronRight,
  ShoppingBag, Calendar, ExternalLink, DollarSign,
  Package, Layout, ArrowRight, LogOut, Plus, Edit2, X, HelpCircle,
  TrendingUp, BarChart3, PieChart, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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
  raw?: any;
}

const ITEMS_PER_PAGE = 12;

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState<{label: string, count: number, pct: number, color: string} | null>(null);

  // Estados para el Modal de Agregar/Editar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    producto: '',
    medida: '',
    material: '',
    gramaje: '',
    impresion: '',
    cantidad: '',
    acabados: '',
    precio: '',
    status: 'Pendiente'
  });

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

  const openAddModal = () => {
    setEditingOrder(null);
    setFormData({
      name: '',
      phone: '',
      producto: '',
      medida: '',
      material: '',
      gramaje: '',
      impresion: '',
      cantidad: '',
      acabados: '',
      precio: '',
      status: 'Pendiente'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (order: Order) => {
    setEditingOrder(order);
    setFormData({
      name: order.name,
      phone: order.phone,
      producto: order.producto,
      medida: order.medida,
      material: order.material,
      gramaje: order.gramaje,
      impresion: order.impresion,
      cantidad: order.cantidad.toString(),
      acabados: order.acabados,
      precio: order.precio.toString(),
      status: order.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        rowId: editingOrder?.id || null, // Si es null, el API creará uno nuevo
        action: editingOrder ? 'UPDATE' : 'CREATE'
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchOrders(); // Recargamos para ver los cambios
      }
    } catch (error) {
      console.error('Error saving order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const searchStr = `${order.name} ${order.orderNumber} ${order.phone} ${order.details}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter;

      let matchesDates = true;
      if (startDate || endDate) {
        const orderDateStr = order.raw?.Fecha || order.timestamp;
        const orderTime = new Date(orderDateStr).getTime();

        if (startDate) {
          const start = new Date(startDate + 'T00:00:00').getTime();
          if (isNaN(orderTime) || orderTime < start) {
            matchesDates = false;
          }
        }
        if (endDate) {
          const end = new Date(endDate + 'T23:59:59').getTime();
          if (isNaN(orderTime) || orderTime > end) {
            matchesDates = false;
          }
        }
      }

      return matchesSearch && matchesStatus && matchesDates;
    });
  }, [orders, searchTerm, statusFilter, startDate, endDate]);

  // Desglose por canal de origen
  const channelBreakdown = useMemo(() => {
    let asesor = 0;
    let whatsapp = 0;
    let directo = 0;

    filteredOrders.forEach(o => {
      const status = o.status || '';
      if (status === 'Asesor solicitado') {
        asesor++;
      } else if (status.includes('WhatsApp')) {
        whatsapp++;
      } else {
        directo++;
      }
    });

    return { asesor, whatsapp, directo, total: filteredOrders.length };
  }, [filteredOrders]);


  
  // Desglose por estado de pedido
  const statusBreakdown = useMemo(() => {
    let pendiente = 0;
    let finalizado = 0;
    let rechazado = 0;
    let whatsapp = 0;
    let asesor = 0;

    filteredOrders.forEach(o => {
      const status = o.status || 'Pendiente';
      if (status === 'Finalizado') finalizado++;
      else if (status === 'Rechazado') rechazado++;
      else if (status === 'Asesor solicitado') asesor++;
      else if (status.includes('WhatsApp')) whatsapp++;
      else pendiente++;
    });

    const total = filteredOrders.length || 1;
    return {
      pendiente,
      finalizado,
      rechazado,
      whatsapp,
      asesor,
      total,
      pendientePct: (pendiente / total) * 100,
      finalizadoPct: (finalizado / total) * 100,
      rechazadoPct: (rechazado / total) * 100,
      whatsappPct: (whatsapp / total) * 100,
      asesorPct: (asesor / total) * 100,
    };
  }, [filteredOrders]);

  // Datos para el donut chart de estado
  const donutData = useMemo(() => {
    const { pendiente, finalizado, rechazado, whatsapp, asesor, total } = statusBreakdown;
    if (total === 0) return [];

    const segments = [
      { label: 'Pendiente', count: pendiente, color: '#f59e0b', pct: ((pendiente / total) * 100) },
      { label: 'Finalizado', count: finalizado, color: '#22c55e', pct: ((finalizado / total) * 100) },
      { label: 'Rechazado', count: rechazado, color: '#ef4444', pct: ((rechazado / total) * 100) },
      { label: 'Cotización WhatsApp', count: whatsapp, color: '#34d399', pct: ((whatsapp / total) * 100) },
      { label: 'Asesor', count: asesor, color: '#a855f7', pct: ((asesor / total) * 100) },
    ].filter(s => s.count > 0);

    // Calcular arcos SVG
    const cx = 90, cy = 90, r = 70, innerR = 45;
    let cumAngle = -90; // start at top

    return segments.map(seg => {
      const angle = (seg.count / total) * 360;
      const startAngle = cumAngle;
      const endAngle = cumAngle + angle;
      cumAngle = endAngle;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1Outer = cx + r * Math.cos(startRad);
      const y1Outer = cy + r * Math.sin(startRad);
      const x2Outer = cx + r * Math.cos(endRad);
      const y2Outer = cy + r * Math.sin(endRad);
      const x1Inner = cx + innerR * Math.cos(endRad);
      const y1Inner = cy + innerR * Math.sin(endRad);
      const x2Inner = cx + innerR * Math.cos(startRad);
      const y2Inner = cy + innerR * Math.sin(startRad);

      const largeArc = angle > 180 ? 1 : 0;

      const path = [
        `M ${x1Outer} ${y1Outer}`,
        `A ${r} ${r} 0 ${largeArc} 1 ${x2Outer} ${y2Outer}`,
        `L ${x1Inner} ${y1Inner}`,
        `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2Inner} ${y2Inner}`,
        'Z'
      ].join(' ');

      return { ...seg, path };
    });
  }, [statusBreakdown]);

  const analyticsKPIs = useMemo(() => {
    const totalOrders = filteredOrders.length;
    const { asesor, whatsapp } = channelBreakdown;

    return {
      totalOrders,
      asesor,
      whatsapp,
      asesorPct: totalOrders > 0 ? ((asesor / totalOrders) * 100).toFixed(1) : '0.0',
      whatsappPct: totalOrders > 0 ? ((whatsapp / totalOrders) * 100).toFixed(1) : '0.0',
    };
  }, [filteredOrders, channelBreakdown]);

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
            {/* 
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-[10px] font-black tracking-widest hover:bg-brand-blue transition-all shadow-xl shadow-black/10 active:scale-95"
            >
              <Plus size={14} />
              NUEVO PEDIDO
            </button> 
            */}
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
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-20">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic"
            >
              Gestión de <span className="text-premium">Pedidos.</span>
            </motion.h2>
            <div className="line-cmyk w-48 rounded-full" />
          </div>
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="flex items-center gap-2 bg-white hover:bg-slate-900 border border-slate-200 hover:text-white px-6 py-4 rounded-3xl text-[10px] font-black tracking-widest uppercase transition-all shadow-sm active:scale-95 z-10 self-start md:self-auto cursor-pointer"
          >
            <TrendingUp size={14} className={showAnalytics ? 'rotate-180 transition-transform' : 'transition-transform'} />
            {showAnalytics ? 'Ocultar Analíticas' : 'Ver Analíticas'}
          </button>
        </header>

        <div className="mb-8 flex justify-end">
          <Link
            href="/admin/whatsapp"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-3xl text-[10px] font-black tracking-[0.35em] uppercase shadow-lg shadow-green-500/20 hover:scale-[1.02] transition-transform"
          >
            <Phone size={14} />
            WhatsApp Masivo
          </Link>
        </div>

        {/* Métrica Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Entrantes', value: orders.length, icon: ShoppingBag, color: 'text-slate-900' },
            { label: 'Pendientes', value: orders.filter(o => o.status !== 'Finalizado' && o.status !== 'Rechazado').length, icon: Clock, color: 'text-amber-500' },
            { label: 'Listos', value: orders.filter(o => o.status === 'Finalizado').length, icon: CheckCircle, color: 'text-green-500' },
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

        {/* Panel de Analíticas Colapsable */}
        <AnimatePresence>
          {showAnalytics && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="overflow-hidden bg-white border border-slate-200 rounded-[3rem] shadow-sm z-10 relative"
            >
              <div className="p-6 md:p-8 space-y-8">
                {/* Header interna de Analíticas */}
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Módulo de Business Intelligence</h3>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Información calculada en tiempo real según filtros activos</p>
                  </div>
                </div>

                {/* KPIs: Total Pedidos, Vía Asesor, Vía WhatsApp */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-brand-blue">
                      <ShoppingBag size={18} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Pedidos</p>
                      <h4 className="text-lg font-black tracking-tight">{analyticsKPIs.totalOrders}</h4>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500">
                      <HelpCircle size={18} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Vía Asesor</p>
                      <h4 className="text-lg font-black tracking-tight">{analyticsKPIs.asesor} <span className="text-xs font-bold text-slate-400">({analyticsKPIs.asesorPct}%)</span></h4>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Vía WhatsApp</p>
                      <h4 className="text-lg font-black tracking-tight">{analyticsKPIs.whatsapp} <span className="text-xs font-bold text-slate-400">({analyticsKPIs.whatsappPct}%)</span></h4>
                    </div>
                  </div>
                </div>

                {/* Gráficos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico 1: Pedidos por Canal (Donut) */}
                  <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50 flex flex-col">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-tight mb-1 flex items-center gap-2">
                        <PieChart size={16} className="text-brand-blue" />
                        Pedidos por Canal
                      </h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Origen de cada pedido</p>
                    </div>

                    <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6">
                      {donutData.length === 0 ? (
                        <p className="text-xs font-bold text-slate-400 italic">No hay pedidos en este período</p>
                      ) : (
                        <>
                          {/* SVG Donut */}
                          <div className="w-[180px] h-[180px] flex-shrink-0 relative">
                            <svg viewBox="0 0 180 180" className="w-full h-full group">
                              {donutData.map((seg, idx) => (
                                <path
                                  key={idx}
                                  d={seg.path}
                                  fill={seg.color}
                                  className="hover:opacity-80 transition-all duration-300 cursor-pointer hover:scale-[1.02] origin-center"
                                  stroke="#f8fafc"
                                  strokeWidth="2"
                                  onMouseEnter={() => setHoveredSegment(seg)}
                                  onMouseLeave={() => setHoveredSegment(null)}
                                >
                                  <title>{seg.label}: {seg.count} pedidos ({seg.pct.toFixed(1)}%)</title>
                                </path>
                              ))}
                              {/* Center text */}
                              <text x="90" y="85" textAnchor="middle" fill={hoveredSegment ? hoveredSegment.color : "#1e293b"} fontSize={hoveredSegment ? "22" : "24"} fontWeight="900" className="font-sans transition-colors duration-300">
                                {hoveredSegment ? hoveredSegment.count : statusBreakdown.total}
                              </text>
                              <text x="90" y="102" textAnchor="middle" fill="#94a3b8" fontSize={hoveredSegment ? "8" : "8"} fontWeight="800" letterSpacing="1.5" className="font-sans uppercase">
                                {hoveredSegment ? hoveredSegment.label : 'PEDIDOS'}
                              </text>
                              {hoveredSegment && (
                                <text x="90" y="115" textAnchor="middle" fill={hoveredSegment.color} fontSize="9" fontWeight="bold" className="font-sans">
                                  {hoveredSegment.pct.toFixed(1)}%
                                </text>
                              )}
                            </svg>
                          </div>

                          {/* Leyenda interactiva */}
                          <div className="flex flex-col gap-3">
                            {donutData.map((seg, idx) => (
                              <div 
                                key={idx} 
                                className={`flex items-center gap-3 transition-opacity duration-300 cursor-pointer ${hoveredSegment && hoveredSegment.label !== seg.label ? 'opacity-30' : 'opacity-100'}`}
                                onMouseEnter={() => setHoveredSegment(seg)}
                                onMouseLeave={() => setHoveredSegment(null)}
                              >
                                <div className="w-3.5 h-3.5 rounded-md flex-shrink-0" style={{ backgroundColor: seg.color }} />
                                <div>
                                  <p className="text-[11px] font-bold text-slate-700 leading-tight">{seg.label}</p>
                                  <p className="text-[9px] font-black text-slate-400">{seg.count} pedidos · {seg.pct.toFixed(1)}%</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Gráfico 2: Estado de Pedidos (Barras) */}
                  <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50 flex flex-col">
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-tight mb-1 flex items-center gap-2">
                        <BarChart3 size={16} className="text-brand-blue" />
                        Estado de Pedidos
                      </h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">Distribución actual por estado</p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-5">
                      {/* Barra Pendiente */}
                      <div className="space-y-1.5 group p-1.5 -m-1.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer" title={`Pendiente: ${statusBreakdown.pendiente} pedidos (${statusBreakdown.pendientePct.toFixed(1)}%)`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-amber-500" />
                            <span className="text-[11px] font-bold text-slate-700">Pendiente</span>
                          </div>
                          <span className="text-[11px] font-black text-amber-500">{statusBreakdown.pendiente} <span className="text-slate-400 font-bold text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">({statusBreakdown.pendientePct.toFixed(1)}%)</span></span>
                        </div>
                        <div className="w-full h-3 bg-slate-200/60 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full transition-all duration-1000 group-hover:brightness-110" style={{ width: `${statusBreakdown.pendientePct}%` }} />
                        </div>
                      </div>

                      {/* Barra finalizado */}
                      <div className="space-y-1.5 group p-1.5 -m-1.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer" title={`Finalizado: ${statusBreakdown.finalizado} pedidos (${statusBreakdown.finalizadoPct.toFixed(1)}%)`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-500" />
                            <span className="text-[11px] font-bold text-slate-700">Finalizado</span>
                          </div>
                          <span className="text-[11px] font-black text-green-500">{statusBreakdown.finalizado} <span className="text-slate-400 font-bold text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">({statusBreakdown.finalizadoPct.toFixed(1)}%)</span></span>
                        </div>
                        <div className="w-full h-3 bg-slate-200/60 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full transition-all duration-1000 group-hover:brightness-110" style={{ width: `${statusBreakdown.finalizadoPct}%` }} />
                        </div>
                      </div>

                      {/* Barra Rechazado */}
                      <div className="space-y-1.5 group p-1.5 -m-1.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer" title={`Rechazado: ${statusBreakdown.rechazado} pedidos (${statusBreakdown.rechazadoPct.toFixed(1)}%)`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <XCircle size={14} className="text-red-500" />
                            <span className="text-[11px] font-bold text-slate-700">Rechazado</span>
                          </div>
                          <span className="text-[11px] font-black text-red-500">{statusBreakdown.rechazado} <span className="text-slate-400 font-bold text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">({statusBreakdown.rechazadoPct.toFixed(1)}%)</span></span>
                        </div>
                        <div className="w-full h-3 bg-slate-200/60 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full transition-all duration-1000 group-hover:brightness-110" style={{ width: `${statusBreakdown.rechazadoPct}%` }} />
                        </div>
                      </div>

                      {/* Barra Cotización WhatsApp */}
                      <div className="space-y-1.5 group p-1.5 -m-1.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer" title={`WhatsApp: ${statusBreakdown.whatsapp} pedidos (${statusBreakdown.whatsappPct.toFixed(1)}%)`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-emerald-400" />
                            <span className="text-[11px] font-bold text-slate-700">WhatsApp</span>
                          </div>
                          <span className="text-[11px] font-black text-emerald-400">{statusBreakdown.whatsapp} <span className="text-slate-400 font-bold text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">({statusBreakdown.whatsappPct.toFixed(1)}%)</span></span>
                        </div>
                        <div className="w-full h-3 bg-slate-200/60 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000 group-hover:brightness-110" style={{ width: `${statusBreakdown.whatsappPct}%` }} />
                        </div>
                      </div>

                      {/* Barra Asesor Solicitado */}
                      <div className="space-y-1.5 group p-1.5 -m-1.5 rounded-xl hover:bg-slate-100/80 transition-colors cursor-pointer" title={`Asesor: ${statusBreakdown.asesor} pedidos (${statusBreakdown.asesorPct.toFixed(1)}%)`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <HelpCircle size={14} className="text-purple-500" />
                            <span className="text-[11px] font-bold text-slate-700">Asesor Solicitado</span>
                          </div>
                          <span className="text-[11px] font-black text-purple-500">{statusBreakdown.asesor} <span className="text-slate-400 font-bold text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">({statusBreakdown.asesorPct.toFixed(1)}%)</span></span>
                        </div>
                        <div className="w-full h-3 bg-slate-200/60 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full transition-all duration-1000 group-hover:brightness-110" style={{ width: `${statusBreakdown.asesorPct}%` }} />
                        </div>
                      </div>

                      {/* Barra visual combinada */}
                      <div className="mt-2 pt-4 border-t border-slate-200/50 group cursor-pointer" title="Vista combinada">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-slate-700 transition-colors">Vista general</p>
                        <div className="w-full h-4 bg-slate-200/60 rounded-full overflow-hidden flex transform transition-transform group-hover:scale-[1.01]">
                          <div className="h-full bg-amber-400 transition-all duration-1000 hover:opacity-80" style={{ width: `${statusBreakdown.pendientePct}%` }} title={`Pendiente: ${statusBreakdown.pendientePct.toFixed(1)}%`} />
                          <div className="h-full bg-green-500 transition-all duration-1000 hover:opacity-80" style={{ width: `${statusBreakdown.finalizadoPct}%` }} title={`Finalizado: ${statusBreakdown.finalizadoPct.toFixed(1)}%`} />
                          <div className="h-full bg-red-500 transition-all duration-1000 hover:opacity-80" style={{ width: `${statusBreakdown.rechazadoPct}%` }} title={`Rechazado: ${statusBreakdown.rechazadoPct.toFixed(1)}%`} />
                          <div className="h-full bg-emerald-400 transition-all duration-1000 hover:opacity-80" style={{ width: `${statusBreakdown.whatsappPct}%` }} title={`WhatsApp: ${statusBreakdown.whatsappPct.toFixed(1)}%`} />
                          <div className="h-full bg-purple-500 transition-all duration-1000 hover:opacity-80" style={{ width: `${statusBreakdown.asesorPct}%` }} title={`Asesor: ${statusBreakdown.asesorPct.toFixed(1)}%`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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

          <div className="flex items-center p-1 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm overflow-x-auto max-w-full">
            {['Todos', 'Pendiente', 'Finalizado', 'Rechazado', 'Cotización WhatsApp', 'Asesor solicitado'].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-6 py-3 rounded-[1.2rem] text-[10px] font-black tracking-widest uppercase whitespace-nowrap transition-all ${statusFilter === f ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Filtros de Fecha */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm items-center z-10 relative">
          <div className="flex items-center gap-2 text-slate-400 pl-2">
            <Filter size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Filtrar por fecha:</span>
          </div>

          <div className="grid grid-cols-2 sm:flex items-center gap-3 flex-1 w-full">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">Inicio</span>
              <input
                type="date"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-4 py-3 text-xs font-semibold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">Fin</span>
              <input
                type="date"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-4 py-3 text-xs font-semibold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {(startDate || endDate) && (
              <button
                onClick={() => {
                  setStartDate('');
                  setEndDate('');
                  setCurrentPage(1);
                }}
                className="col-span-2 sm:col-span-1 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-[10px] font-black tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <X size={12} />
                Limpiar Fechas
              </button>
            )}
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
                    <div className="flex gap-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${order.status === 'Finalizado' ? 'bg-green-50 text-green-500' :
                        order.status === 'Rechazado' ? 'bg-red-50 text-red-500' :
                          order.status === 'Asesor solicitado' ? 'bg-violet-50 text-violet-500' :
                            order.status.includes('WhatsApp') ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
                        }`}>
                        {order.status === 'Finalizado' ? <CheckCircle size={20} /> :
                          order.status === 'Rechazado' ? <XCircle size={20} /> :
                            order.status === 'Asesor solicitado' ? <HelpCircle size={20} /> : <Clock size={20} className="animate-pulse" />}
                      </div>
                      <button
                        onClick={() => openEditModal(order)}
                        className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-brand-blue hover:text-white transition-all flex items-center justify-center"
                        title="Editar Pedido"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[9px] font-black bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-lg uppercase tracking-tighter">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${order.status === 'Finalizado' ? 'bg-green-500 text-white' :
                        order.status === 'Rechazado' ? 'bg-red-500 text-white' :
                          order.status === 'Asesor solicitado' ? 'bg-violet-600 text-white' :
                            order.status.includes('WhatsApp') ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Cliente e Info básica */}
                  <div className="mb-4">
                    <h4 className="text-lg font-black tracking-tighter truncate">{order.name}</h4>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mt-1">
                      <span className="flex items-center gap-1"><Calendar size={12} /> {order.timestamp}</span>
                      <span className="text-brand-green font-black">${order.precio}</span>
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
                    onClick={() => updateStatus(order.id, 'Finalizado')}
                    disabled={updatingId === order.id || order.status === 'Finalizado'}
                    className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${order.status === 'Finalizado' ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-green-500 hover:text-white'
                      }`}
                  >
                    {updatingId === order.id ? <RefreshCw size={12} className="animate-spin" /> : 'Finalizado'}
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

      {/* Modal Formulario de Pedido */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 line-cmyk" />

              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase italic">
                      {editingOrder ? 'Editar Pedido' : 'Nuevo Pedido'}
                    </h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      {editingOrder ? `Pedido #${editingOrder.orderNumber}` : 'Captura de Venta'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nombre del Cliente</label>
                      <input
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Teléfono</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Producto</label>
                      <input
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.producto}
                        onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Medida</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.medida}
                        onChange={(e) => setFormData({ ...formData, medida: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Material</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Gramaje</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.gramaje}
                        onChange={(e) => setFormData({ ...formData, gramaje: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Impresión</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.impresion}
                        onChange={(e) => setFormData({ ...formData, impresion: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Cantidad</label>
                      <input
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.cantidad}
                        onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Precio ($)</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Estado</label>
                      <select
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="Cotización WhatsApp">Cotización WhatsApp</option>
                        <option value="Asesor solicitado">Asesor solicitado</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Acabados / Notas</label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-blue/5 focus:border-brand-blue transition-all resize-none"
                      value={formData.acabados}
                      onChange={(e) => setFormData({ ...formData, acabados: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-white rounded-3xl py-6 font-black text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-brand-blue transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? <RefreshCw className="animate-spin" size={16} /> : (editingOrder ? 'Actualizar Pedido' : 'Crear Pedido')}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
