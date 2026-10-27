import React from "react";
import { siteConfig } from "@/config/site";
import { Award, CheckCircle2, MessageCircle } from "lucide-react";

export function About() {
  return (
    <section id="nosotros" className="py-20 bg-zinc-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Imagen de la marca / taller / estudio */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                alt={siteConfig.name}
                className="w-full h-[520px] object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-amber-400/90 text-zinc-950 text-xs font-black uppercase tracking-wider">
                {siteConfig.about.badge}
              </div>
            </div>
          </div>

          {/* Información Institucional */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                Sobre Nosotros
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                {siteConfig.about.title}
              </h2>
              <p className="text-sm font-bold text-zinc-400">
                {siteConfig.about.subtitle}
              </p>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {siteConfig.about.description}
            </p>

            {/* Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {siteConfig.about.pillars.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Tarjeta de Contacto / Asesoría si services está activo */}
            {siteConfig.features.services && (
              <div className="mt-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400" />
                      ¿Tienes un proyecto o requieres atención personalizada?
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Escríbenos directamente para asesorarte y resolver tus dudas sin compromiso.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hola,%20quisiera%20más%20información%20sobre%20sus%20servicios`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contactar por WhatsApp</span>
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
