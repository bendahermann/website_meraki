"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Download, CheckCircle, Mail, Sparkles } from "lucide-react";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!siteConfig.features.newsletter) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-950 to-black text-white border-t border-zinc-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-zinc-800 text-center relative overflow-hidden shadow-2xl">
          {/* Luz decorativa */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-32 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Recurso 100% Gratuito
            </span>

            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Descarga la Guía de Rutinas & Nutrición para Hipertrofia
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400">
              Aprende a estructurar tus series, repeticiones y descansos sin costo. Más de 20 páginas de puro contenido práctico.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>¡Guía enviada con éxito! Revisa tu bandeja de entrada en los próximos minutos.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    placeholder="Tu correo electrónico..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Obtener Guía PDF</span>
                </button>
              </form>
            )}

            <p className="text-[11px] text-zinc-500 pt-1">
              Cero spam. Solo consejos de entrenamiento y ofertas exclusivas de la comunidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
