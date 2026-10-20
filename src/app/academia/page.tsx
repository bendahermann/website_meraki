"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { MOCK_COURSES } from "@/data/mockData";
import { BookOpen, PlayCircle, Award, CheckCircle, ArrowRight, User } from "lucide-react";

export default function AcademiaDashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-zinc-400 text-sm">Cargando academia...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-4">
          <User className="w-12 h-12 text-amber-400 mx-auto" />
          <h1 className="text-xl font-bold">Inicia Sesión para Acceder</h1>
          <p className="text-xs text-zinc-400">
            Debes iniciar sesión con tu cuenta para ver tus cursos adquiridos y tu progreso.
          </p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider"
          >
            Ir a Inicio de Sesión
          </Link>
        </div>
      </div>
    );
  }

  // Cursos comprados por el usuario
  const userCourses = MOCK_COURSES.filter((c) =>
    user.purchasedCourseIds.includes(c.id)
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner de Bienvenida del Alumno */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-900/60 border border-zinc-800 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400/40"
            />
            <div>
              <span className="text-[11px] uppercase font-black tracking-widest text-amber-400">
                Portal de Alumno Activo
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                ¡Hola, {user.name}!
              </h1>
              <p className="text-xs text-zinc-400">
                {user.email} • Tienes {userCourses.length} programa(s) activo(s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/cursos"
              className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase transition-colors"
            >
              Explorar Más Cursos
            </Link>
          </div>
        </div>

        {/* Cursos del Alumno */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Tus Programas de Entrenamiento
            </h2>
          </div>

          {userCourses.length === 0 ? (
            <div className="p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 text-center space-y-4">
              <BookOpen className="w-12 h-12 text-zinc-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">Aún no tienes cursos inscritos</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Elige uno de nuestros programas de hipertrofia o definición para desbloquear tus clases en video de alta calidad.
              </p>
              <Link
                href="/cursos"
                className="inline-block px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider"
              >
                Ver Catálogo de Cursos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCourses.map((course) => {
                const progress = user.progress[course.id];
                const completedCount = progress?.completedLessonIds.length || 0;
                const totalLessons = course.totalLessons || 1;
                const percent = Math.min(
                  100,
                  Math.round((completedCount / totalLessons) * 100)
                );

                return (
                  <div
                    key={course.id}
                    className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all group"
                  >
                    <div>
                      <div className="relative aspect-video overflow-hidden bg-zinc-800">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-semibold text-zinc-300">
                          {course.level}
                        </span>
                      </div>

                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                          {course.title}
                        </h3>

                        {/* Barra de Progreso */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-zinc-400">Progreso del curso</span>
                            <span className="font-bold text-amber-400">{percent}%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                              className="h-full bg-amber-400 rounded-full transition-all duration-500"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-zinc-500">
                            {completedCount} de {totalLessons} lecciones completadas
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        href={`/academia/curso/${course.slug}`}
                        className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md shadow-amber-400/20"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Continuar Lecciones</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
