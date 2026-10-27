"use client";

import React, { useState } from "react";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Truck } from "lucide-react";

export default function StorePage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const categories = [
    { id: "todos", label: "Todos los Productos" },
    { id: "destacados", label: "Destacados" },
    { id: "accesorios", label: "Accesorios" },
    { id: "general", label: "Colección General" },
  ];

  const filteredProducts = MOCK_PRODUCTS.filter((prod) => {
    if (selectedCategory === "todos") return true;
    return prod.category === selectedCategory;
  });

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            Catálogo Oficial
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Productos & Colecciones
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Artículos seleccionados con los más altos estándares de calidad y durabilidad. Envíos disponibles a toda la República.
          </p>

          {/* Categorías */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-md shadow-amber-400/20"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes?.[0] || "";

            return (
              <div
                key={product.id}
                className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all hover:shadow-2xl group"
              >
                <div>
                  <div className="relative aspect-square overflow-hidden bg-zinc-800">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {product.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/90 backdrop-blur-md border border-zinc-700 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <h2 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {product.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                      {product.description}
                    </p>

                    {product.sizes && product.sizes.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                          Opción: {currentSize}
                        </span>
                        <div className="flex gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => handleSizeChange(product.id, size)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                                currentSize === size
                                  ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-md"
                                  : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-zinc-700"
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

                <div className="p-6 pt-0 mt-2">
                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-zinc-500 block">
                        Precio
                      </span>
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
                      className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 active:scale-95 shadow-md shadow-amber-400/20"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
