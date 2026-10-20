import React from "react";
import { siteConfig } from "@/config/site";
import { Award, CheckCircle2, MessageCircle, Calendar } from "lucide-react";

export function AboutTrainer() {
  return (
    <section id="asesorias" className="py-20 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Imagen */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                alt={siteConfig.trainerName}
                className="w-full h-[520px] object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-amber-400/90 text-zinc-950 text-xs font-black uppercase tracking-wider">
                Certificado NSCA & CSCS
              </div>
            </div>
          </div>

          {/* Información */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Sobre Tu Entrenador
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {siteConfig.trainerName}
              </h2>
              <p className="text-sm font-bold text-zinc-400">
                {siteConfig.trainerTitle}
              </p>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Con más de 9 años de experiencia en el acondicionamiento físico de alto rendimiento y culturismo natural, mi objetivo es eliminar la desinformación en el gimnasio. Cada rutina, porcentaje y serie que enseño cuenta con sustento fisiológico y resultados comprobables.
            </p>

            {/* Credenciales y Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Especialista en Hipertrofia & Fuerza",
                "Asesorías Nutricionales Deportivas",
                "Prevención y Rehabilitación de Lesiones",
                "Más de 1,800 transformaciones exitosas",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Tarjeta de Asesoría 1 a 1 */}
            {siteConfig.features.coaching && (
              <div className="mt-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      ¿Buscas Asesoría Personalizada 1 a 1?
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Cupos limitados por mes. Rutina individual, plan alimenticio semanal y seguimiento directo por WhatsApp.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hola%20Coach,%20me%20interesa%20información%20sobre%20la%20asesoría%20personalizada`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Cotizar por WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
