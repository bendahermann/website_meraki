"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight, Flame, ShieldCheck, Play, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-12 pb-20 md:pt-20 md:pb-32 border-b border-zinc-900">
      {/* Luces y efectos de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Lado Izquierdo: Copy y Llamados a la Acción */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge de confianza */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold tracking-wide uppercase">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Programas 2026 Basados en Evidencia Científica</span>
            </div>

            {/* Título Principal de Alto Impacto */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
              TRANSFORMA TU FÍSICO{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-500">
                SIN PERDER TIEMPO
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Deja de improvisar rutinas en el gimnasio. Domina la biomecánica, la sobrecarga progresiva y la nutrición inteligente con los programas en video del Coach{" "}
              <span className="text-white font-bold">{siteConfig.trainerName}</span>.
            </p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {siteConfig.features.courses && (
                <Link
                  href="/cursos"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-black tracking-wide text-sm uppercase hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 group"
                >
                  <span>Ver Cursos Disponibles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {siteConfig.features.store && (
                <Link
                  href="/tienda"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-white font-bold text-sm uppercase transition-all flex items-center justify-center gap-2"
                >
                  <span>Colección de Ropa</span>
                </Link>
              )}
            </div>

            {/* Micro-beneficios */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acceso de Por Vida</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Play className="w-4 h-4 text-amber-400 shrink-0" />
                <span>En Cualquier Dispositivo</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Garantía de Satisfacción</span>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Imagen del Entrenador / Mockup Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Marco con sombra y gradiente */}
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80"
                  alt={siteConfig.trainerName}
                  className="w-full h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                />
                
                {/* Overlay degradado inferior */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Tarjeta flotante con datos del Coach */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Head Coach
                      </p>
                      <p className="text-base font-extrabold text-white">
                        {siteConfig.trainerName}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        {siteConfig.trainerTitle}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex flex-col items-center justify-center text-center">
                      <span className="text-sm font-black text-amber-400">4.9</span>
                      <span className="text-[9px] text-zinc-400 font-bold">ESTRELLAS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
