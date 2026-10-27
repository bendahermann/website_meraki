import React from "react";
import { MOCK_TESTIMONIALS } from "@/data/mockData";
import { siteConfig } from "@/config/site";
import { Star, CheckCircle } from "lucide-react";

export function Testimonials() {
  if (!siteConfig.features.testimonials) return null;

  return (
    <section id="testimonios" className="py-20 bg-zinc-950 text-white border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            Opiniones & Reseñas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Experiencias Reales de Clientes
          </h2>
          <p className="text-sm text-zinc-400">
            La confianza y satisfacción de quienes eligen nuestros productos y servicios nos respaldan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between space-y-6 relative hover:border-zinc-700 transition-colors"
            >
              <div className="space-y-4">
                {/* 5 Estrellas */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Logro destacado */}
                <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs font-black text-amber-300">
                  {test.achievement}
                </div>

                {/* Cita */}
                <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              {/* Perfil */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                <img
                  src={test.image}
                  alt={test.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-400/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-white">{test.name}</p>
                    {test.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500">
                    {test.location} • {test.program}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
