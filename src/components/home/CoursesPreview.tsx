"use client";

import React from "react";
import Link from "next/link";
import { MOCK_COURSES } from "@/data/mockData";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { PlayCircle, Clock, BookOpen, Check, ArrowRight, Sparkles } from "lucide-react";

export function CoursesPreview() {
  const { addItem } = useCart();
  const { hasAccessToCourse } = useAuth();

  if (!siteConfig.features.courses) return null;

  return (
    <section id="cursos" className="py-20 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Formación & Crecimiento
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Cursos & Programas Digitales
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl">
              Aprende a tu propio ritmo con lecciones prácticas en video, recursos descargables y contenido actualizado.
            </p>
          </div>
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase"
          >
            <span>Ver todos los cursos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COURSES.map((course) => {
            const isOwned = hasAccessToCourse(course.id);

            return (
              <div
                key={course.id}
                className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all hover:shadow-2xl hover:shadow-amber-500/5 group"
              >
                <div>
                  {/* Thumbnail & Badges */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-800">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                    {course.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider">
                        {course.badge}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 text-xs bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-zinc-300 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {course.totalHours}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold">
                        <span>{course.level}</span>
                        <span>{course.totalLessons} Lecciones</span>
                      </div>
                      <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {course.subtitle}
                      </p>
                    </div>

                    {/* Lo que aprenderás */}
                    <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                      {course.whatYouWillLearn.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer de Tarjeta con Precios y CTA */}
                <div className="p-6 pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">
                          {siteConfig.currency.symbol}
                          {course.price.toLocaleString(siteConfig.currency.locale)}
                        </span>
                        {course.compareAtPrice && (
                          <span className="text-xs text-zinc-500 line-through">
                            {siteConfig.currency.symbol}
                            {course.compareAtPrice.toLocaleString(siteConfig.currency.locale)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                        Acceso Permanente
                      </span>
                    </div>

                    {isOwned ? (
                      <Link
                        href={`/academia/curso/${course.slug}`}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Ver Curso</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() =>
                          addItem({
                            id: course.id,
                            productId: course.id,
                            type: "course",
                            title: course.title,
                            price: course.price,
                            image: course.thumbnail,
                          })
                        }
                        className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors shadow-md shadow-amber-400/20"
                      >
                        Inscribirme
                      </button>
                    )}
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
