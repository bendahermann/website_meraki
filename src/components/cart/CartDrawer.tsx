"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotal,
    shippingCost,
    total,
    hasPhysicalItems,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-zinc-950 text-white border-l border-zinc-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold uppercase tracking-wider text-zinc-100">
                Tu Carrito ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Banner de Envío para artículos físicos */}
          {hasPhysicalItems && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5 flex items-center gap-2 text-xs text-amber-300">
              <Truck className="w-4 h-4 shrink-0" />
              <span>
                {subtotal >= 999
                  ? "¡Felicidades! Tienes Envío Gratis en tu compra."
                  : `Agrega ${siteConfig.currency.symbol}${999 - subtotal} más en productos para obtener Envío Gratis.`}
              </span>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-zinc-400 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-semibold text-zinc-200">Tu carrito está vacío</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    Explora nuestro catálogo y productos disponibles.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-amber-400 text-zinc-950 font-bold text-sm hover:bg-amber-300 transition-colors"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg bg-zinc-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-zinc-100 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.type === "course" ? (
                        <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                          <Sparkles className="w-3 h-3" /> Producto Digital (Acceso Inmediato)
                        </span>
                      ) : (
                        <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                          {item.selectedSize && (
                            <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-[11px] font-medium text-zinc-300">
                              Opción: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <span className="text-[11px] text-zinc-400">
                              {item.selectedColor}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60">
                      <span className="text-sm font-bold text-zinc-100">
                        {siteConfig.currency.symbol}
                        {(item.price * item.quantity).toLocaleString(siteConfig.currency.locale)}{" "}
                        <span className="text-[10px] text-zinc-400">{siteConfig.currency.code}</span>
                      </span>

                      {item.type === "physical" ? (
                        <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden bg-zinc-950">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-semibold text-zinc-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 text-sm"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-500">1 acceso</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-900/60 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 font-medium">
                    {siteConfig.currency.symbol}
                    {subtotal.toLocaleString(siteConfig.currency.locale)} {siteConfig.currency.code}
                  </span>
                </div>

                {hasPhysicalItems && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Costo de Envío Estimado</span>
                    <span className="text-zinc-200 font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-emerald-400 font-semibold uppercase text-xs">GRATIS</span>
                      ) : (
                        `${siteConfig.currency.symbol}${shippingCost} ${siteConfig.currency.code}`
                      )}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-amber-400 text-lg">
                    {siteConfig.currency.symbol}
                    {total.toLocaleString(siteConfig.currency.locale)} {siteConfig.currency.code}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-400 text-zinc-950 font-black tracking-wide text-sm uppercase hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 active:scale-[0.99]"
              >
                <span>Proceder al Pago</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pago 100% seguro y encriptado</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
