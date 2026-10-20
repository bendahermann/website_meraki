"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/config/site";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Lock,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, shippingCost, total, hasPhysicalItems, hasCourseItems, clearCart } = useCart();
  const { user, grantCourseAccess } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "Juan Pérez",
    email: user?.email || "juan.perez@ejemplo.com",
    phone: "5512345678",
    street: "Av. Insurgentes Sur 1450",
    city: "Ciudad de México",
    state: "CDMX",
    postalCode: "03920",
    paymentMethod: "card",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [purchasedCourseIds, setPurchasedCourseIds] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      // Activar cursos comprados
      const courseIds = items.filter((i) => i.type === "course").map((i) => i.productId);
      courseIds.forEach((id) => grantCourseAccess(id));
      setPurchasedCourseIds(courseIds);

      // Guardar pedido simulado
      const order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        items,
        total,
        formData,
        date: new Date().toLocaleDateString("es-MX"),
      };
      try {
        const pastOrders = JSON.parse(localStorage.getItem("titan_orders") || "[]");
        pastOrders.unshift(order);
        localStorage.setItem("titan_orders", JSON.stringify(pastOrders));
      } catch {}

      clearCart();
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-white">
              ¡Pago Exitoso!
            </h2>
            <p className="text-xs text-zinc-400 mt-2">
              Se ha enviado la confirmación y recibo digital a{" "}
              <strong className="text-amber-400">{formData.email}</strong>.
            </p>
          </div>

          {purchasedCourseIds.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-left space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase">
                <Sparkles className="w-4 h-4" /> Acceso a tus cursos habilitado
              </div>
              <p className="text-xs text-zinc-300">
                Tus cursos ya están disponibles en tu portal de alumno. Puedes empezar a ver las lecciones protegidas de inmediato.
              </p>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <Link
              href="/academia"
              className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
            >
              <span>Ir a Mi Academia de Alumno</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="block text-xs font-bold text-zinc-400 hover:text-white transition-colors"
            >
              Volver a la Página Principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
          <h2 className="text-xl font-bold text-white">Tu carrito está vacío</h2>
          <p className="text-xs text-zinc-400">
            Agrega ropa oficial o inscríbete a un curso para continuar al checkout.
          </p>
          <Link
            href="/"
            className="inline-block mt-2 px-6 py-2.5 rounded-xl bg-amber-400 text-zinc-950 text-xs font-black uppercase"
          >
            Ver Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            Checkout Seguro
          </span>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white mt-1">
            Finalizar Compra
          </h1>
        </div>

        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Formulario (Datos y Envío) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Datos de Contacto */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                1. Información del Comprador
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Correo Electrónico (Para tus cursos)</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-zinc-400 block mb-1">Teléfono / WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Dirección de Envío si hay productos físicos */}
            {hasPhysicalItems && (
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  2. Dirección de Envío (México)
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs text-zinc-400 block mb-1">Calle, Número y Colonia</label>
                    <input
                      type="text"
                      name="street"
                      required
                      value={formData.street}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Estado</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm focus:border-amber-400 focus:outline-none"
                    >
                      <option value="CDMX">Ciudad de México</option>
                      <option value="JAL">Jalisco</option>
                      <option value="NL">Nuevo León</option>
                      <option value="MEX">Estado de México</option>
                      <option value="PUE">Puebla</option>
                      <option value="QRO">Querétaro</option>
                      <option value="OTRO">Otro Estado</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Código Postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Método de Pago */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                {hasPhysicalItems ? "3." : "2."} Método de Pago Seguro
              </h2>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-amber-400/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className="text-amber-400 focus:ring-amber-400"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Tarjeta de Crédito / Débito (Stripe & Mercado Pago)</p>
                      <p className="text-[11px] text-zinc-400">Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="oxxo"
                      checked={formData.paymentMethod === "oxxo"}
                      onChange={handleInputChange}
                      className="text-amber-400 focus:ring-amber-400"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">Efectivo en OXXO</p>
                      <p className="text-[11px] text-zinc-400">Genera código de barras para pagar en cualquier tienda</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Resumen del Pedido (Sidebar) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 sticky top-28">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Resumen ({items.reduce((acc, i) => acc + i.quantity, 0)} artículos)
              </h2>

              <div className="divide-y divide-zinc-800/80 max-h-72 overflow-y-auto space-y-3 pt-1">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded-lg bg-zinc-800 shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-semibold text-white truncate">{item.title}</p>
                        <p className="text-zinc-500 text-[11px]">
                          {item.type === "course" ? "Curso Digital" : `Talla: ${item.selectedSize}`} • Cant: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-white shrink-0">
                      {siteConfig.currency.symbol}
                      {(item.price * item.quantity).toLocaleString(siteConfig.currency.locale)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200">
                    {siteConfig.currency.symbol}{subtotal.toLocaleString(siteConfig.currency.locale)} {siteConfig.currency.code}
                  </span>
                </div>
                {hasPhysicalItems && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Envío</span>
                    <span className="text-zinc-200">
                      {shippingCost === 0 ? "GRATIS" : `${siteConfig.currency.symbol}${shippingCost} ${siteConfig.currency.code}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total a Pagar</span>
                  <span className="text-amber-400 text-lg">
                    {siteConfig.currency.symbol}{total.toLocaleString(siteConfig.currency.locale)} {siteConfig.currency.code}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-zinc-950 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 active:scale-95"
              >
                {isProcessing ? (
                  <span>Procesando Pago Seguro...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pagar {siteConfig.currency.symbol}{total.toLocaleString(siteConfig.currency.locale)} {siteConfig.currency.code}</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-zinc-500 text-center leading-normal">
                Al confirmar tu compra aceptas los términos y condiciones de Titan Athletics. Los cursos se desbloquean inmediatamente tras procesar el cobro.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
