"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";

export function StorePreview() {
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  if (!siteConfig.features.store) return null;

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section id="tienda" className="py-20 bg-zinc-900 border-t border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Catálogo Oficial
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Productos Destacados
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Artículos seleccionados con los más altos estándares de calidad y diseño contemporáneo.
            </p>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase"
          >
            <span>Ver toda la tienda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid de Productos Físicos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes?.[0] || "";

            return (
              <div
                key={product.id}
                className="rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all hover:shadow-2xl group"
              >
                <div>
                  {/* Imagen y Badges */}
                  <div className="relative aspect-square overflow-hidden bg-zinc-800">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Información */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Selector de opciones si tiene */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                          Opción / Talla:
                        </span>
                        <div className="flex gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => handleSizeChange(product.id, size)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                                currentSize === size
                                  ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-sm"
                                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer de Tarjeta con Precios y Botón de Carrito */}
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">
                        {siteConfig.currency.symbol}
                        {product.price.toLocaleString(siteConfig.currency.locale)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-zinc-500 line-through">
                          {siteConfig.currency.symbol}
                          {product.compareAtPrice.toLocaleString(siteConfig.currency.locale)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        addItem({
                          id: currentSize ? `${product.id}-${currentSize}` : product.id,
                          productId: product.id,
                          type: "physical",
                          title: product.title,
                          price: product.price,
                          image: product.images[0],
                          selectedSize: currentSize,
                        })
                      }
                      className="p-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 transition-colors shadow-md shadow-amber-400/20 active:scale-95"
                      title="Agregar al carrito"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
