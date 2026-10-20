"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MOCK_COURSES, MOCK_PRODUCTS } from "@/data/mockData";
import {
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  Settings,
  BookOpen,
  Package,
  ShieldAlert,
  Check,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  // Estado local para los interruptores modulares
  const [features, setFeatures] = useState({ ...siteConfig.features });
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "store" | "modules">("overview");

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header de Administrador */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase">
                Panel de Administración
              </span>
              <span className="text-zinc-500 text-xs">•</span>
              <span className="text-xs text-zinc-400">Modo Staff</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Control General: {siteConfig.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-xs font-bold text-zinc-200 transition-colors"
            >
              Ver Sitio Público
            </Link>
          </div>
        </div>

        {/* Pestañas de Navegación del Admin */}
        <div className="flex gap-2 border-b border-zinc-800/80 pb-2">
          {[
            { id: "overview", label: "Métricas & Ventas", icon: TrendingUp },
            { id: "modules", label: "Interruptores Modulares", icon: Settings },
            { id: "courses", label: "Gestión de Cursos", icon: BookOpen },
            { id: "store", label: "Inventario de Ropa", icon: Package },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20 font-black"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs uppercase font-bold tracking-wider">Ingresos del Mes</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-3xl font-black text-white">
                  {siteConfig.currency.symbol}148,650{" "}
                  <span className="text-xs text-zinc-400 font-normal">{siteConfig.currency.code}</span>
                </p>
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs mes anterior
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs uppercase font-bold tracking-wider">Alumnos Registrados</span>
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-3xl font-black text-white">1,842</p>
                <p className="text-[11px] text-zinc-400">
                  +34 inscripciones esta semana
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs uppercase font-bold tracking-wider">Pedidos de Ropa</span>
                  <ShoppingBag className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-3xl font-black text-white">82</p>
                <p className="text-[11px] text-amber-400 font-bold">
                  6 pedidos pendientes por enviar
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="text-xs uppercase font-bold tracking-wider">Tasa de Conversión</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-3xl font-black text-white">4.8%</p>
                <p className="text-[11px] text-emerald-400 font-bold">
                  Excelente retención
                </p>
              </div>
            </div>

            {/* Pedidos Recientes */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Ventas y Transacciones Recientes (Stripe / Mercado Pago)
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider">
                      <th className="pb-3 font-bold">ID Pedido</th>
                      <th className="pb-3 font-bold">Cliente</th>
                      <th className="pb-3 font-bold">Tipo</th>
                      <th className="pb-3 font-bold">Total</th>
                      <th className="pb-3 font-bold">Estado</th>
                      <th className="pb-3 font-bold">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {[
                      { id: "ORD-92810", name: "Esteban R.", type: "Curso Hipertrofia", amount: "$1,299 MXN", status: "Completado", date: "Hoy, 18:20" },
                      { id: "ORD-92809", name: "Valeria M.", type: "Playera Oversize (M)", amount: "$549 MXN", status: "Por Enviar", date: "Hoy, 15:45" },
                      { id: "ORD-92808", name: "Héctor G.", type: "Curso Definición + Shaker", amount: "$1,379 MXN", status: "Completado", date: "Ayer" },
                      { id: "ORD-92807", name: "Rodrigo L.", type: "Hoodie Acid Wash (G)", amount: "$980 MXN", status: "Enviado", date: "Ayer" },
                    ].map((row) => (
                      <tr key={row.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3 font-mono text-zinc-400">{row.id}</td>
                        <td className="py-3 font-bold text-white">{row.name}</td>
                        <td className="py-3">{row.type}</td>
                        <td className="py-3 font-bold text-amber-400">{row.amount}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            row.status === "Completado"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : row.status === "Por Enviar"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 text-zinc-500">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERRUPTORES MODULARES (WHITE-LABEL CONFIG) */}
        {activeTab === "modules" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Arquitectura Modular & White-Label
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  Conexión y Desconexión de Funcionalidades
                </h2>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                  Esta es la ventaja de tu producto: si vendes esta plataforma a otro cliente que solo quiere cursos y no ropa, o solo asesorías, simplemente desactivas el módulo aquí y toda la interfaz se adapta al instante sin tocar código.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {[
                  { key: "store", label: "Tienda de Ropa & Merch Físico", desc: "Habilita el catálogo de ropa, selector de tallas y envíos." },
                  { key: "courses", label: "Academia de Cursos & Lecciones (LMS)", desc: "Venta de cursos en video y reproductor con protección." },
                  { key: "coaching", label: "Módulo de Asesorías 1 a 1", desc: "Botón directo de cotización por WhatsApp del entrenador." },
                  { key: "cart", label: "Carrito de Compras Global", desc: "Permite comprar ropa y cursos en un mismo checkout." },
                  { key: "auth", label: "Autenticación & Área de Miembros", desc: "Sistema de login para alumnos y tracking de avance." },
                  { key: "testimonials", label: "Casos de Éxito / Testimonios", desc: "Muestra métricas reales de transformación física." },
                  { key: "newsletter", label: "Lead Magnet (Guía Gratuita)", desc: "Captador de correos con entrega de PDF automatizada." },
                ].map((item) => {
                  const isEnabled = features[item.key as keyof typeof features];

                  return (
                    <div
                      key={item.key}
                      className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                        isEnabled
                          ? "bg-zinc-950 border-amber-400/40"
                          : "bg-zinc-950/60 border-zinc-800 opacity-60"
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-white">{item.label}</p>
                        <p className="text-[11px] text-zinc-400">{item.desc}</p>
                      </div>

                      <button
                        onClick={() => toggleFeature(item.key as keyof typeof features)}
                        className={`p-1 rounded-lg transition-colors ${
                          isEnabled ? "text-amber-400" : "text-zinc-600"
                        }`}
                        title={isEnabled ? "Desactivar" : "Activar"}
                      >
                        {isEnabled ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GESTIÓN DE CURSOS */}
        {activeTab === "courses" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Cursos en Catálogo</h2>
                  <p className="text-xs text-zinc-400">Total de 3 cursos creados con módulos y lecciones</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs uppercase">
                  + Crear Nuevo Curso
                </button>
              </div>

              <div className="divide-y divide-zinc-800">
                {MOCK_COURSES.map((course) => (
                  <div key={course.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{course.title}</h4>
                        <p className="text-xs text-zinc-500">
                          {course.modules.length} módulos • {course.totalLessons} lecciones • {course.level}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">
                        {siteConfig.currency.symbol}{course.price.toLocaleString(siteConfig.currency.locale)} {siteConfig.currency.code}
                      </p>
                      <span className="text-[10px] text-emerald-400 font-bold">Activo para venta</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: INVENTARIO */}
        {activeTab === "store" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white">Inventario de Ropa & Equipo</h2>
                  <p className="text-xs text-zinc-400">Control de existencias y tallas</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-bold text-xs uppercase">
                  + Agregar Producto
                </button>
              </div>

              <div className="divide-y divide-zinc-800">
                {MOCK_PRODUCTS.map((prod) => (
                  <div key={prod.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{prod.title}</h4>
                        <p className="text-xs text-zinc-500">
                          Stock: {prod.stock} unidades • Tallas: {prod.sizes?.join(", ") || "Unitalla"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-white">
                        {siteConfig.currency.symbol}{prod.price.toLocaleString(siteConfig.currency.locale)} {siteConfig.currency.code}
                      </p>
                      <span className="text-[10px] text-amber-400 font-bold">En tienda</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
