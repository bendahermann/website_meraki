"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_COURSES } from "@/data/mockData";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Clock, BookOpen, Check, PlayCircle, Sparkles, Filter } from "lucide-react";

export default function CoursesPage() {
  const { addItem } = useCart();
  const { hasAccessToCourse } = useAuth();
  const [filterLevel, setFilterLevel] = useState<string>("Todos");

  const levels = ["Todos", "Principiante", "Intermedio", "Avanzado", "Todos los niveles"];

  const filteredCourses = MOCK_COURSES.filter((course) => {
    if (filterLevel === "Todos") return true;
    return course.level === filterLevel;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400">
            Academia Digital
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Programas & Cursos de Entrenamiento
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Metodologías estructuradas con videos explicativos, técnicas de sobrecarga y soporte para que alcances tus metas.
          </p>

          {/* Filtros de nivel */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <span className="text-xs text-zinc-500 font-bold uppercase flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" /> Nivel:
            </span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  filterLevel === lvl
                    ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-md shadow-amber-400/20"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isOwned = hasAccessToCourse(course.id);

            return (
              <div
                key={course.id}
                className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all hover:shadow-2xl group"
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-zinc-800">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                    {course.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 text-[11px] font-black uppercase tracking-wider shadow-md">
                        {course.badge}
                      </span>
                    )}

                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {course.durationWeeks} semanas
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      <span className="text-amber-400 font-semibold">{course.level}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {course.totalLessons} lecciones
                      </span>
                    </div>

                    <h2 className="text-xl font-black text-white group-hover:text-amber-400 transition-colors">
                      {course.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-800/80">
                      {course.whatYouWillLearn.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-4">
                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-zinc-500 block">
                        Inversión
                      </span>
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
                    </div>

                    {isOwned ? (
                      <Link
                        href={`/academia/curso/${course.slug}`}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Continuar</span>
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
                        className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-400/20 active:scale-95 flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Inscribirme</span>
                      </button>
                    )}
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
