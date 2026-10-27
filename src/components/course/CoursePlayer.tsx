"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Course } from "@/types";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/context/AuthContext";
import {
  Play,
  CheckCircle2,
  Circle,
  Lock,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileText,
} from "lucide-react";

interface CoursePlayerProps {
  course: Course;
}

export function CoursePlayer({ course }: CoursePlayerProps) {
  const { user, hasAccessToCourse, markLessonCompleted, isLessonCompleted } = useAuth();

  const allLessons = course.modules.flatMap((m) => m.lessons);

  const [activeLessonId, setActiveLessonId] = useState<string>(
    allLessons[0]?.id || ""
  );

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeLessonIndex = allLessons.findIndex((l) => l.id === activeLessonId);

  const hasAccess = user ? hasAccessToCourse(course.id) : false;

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-black uppercase text-white">Contenido Bloqueado</h1>
          <p className="text-xs text-zinc-400">
            No tienes una inscripción activa a <strong>{course.title}</strong> o tu sesión no ha sido iniciada.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/checkout"
              className="px-6 py-3 rounded-xl bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider hover:bg-amber-300 transition-colors"
            >
              Inscribirme a este Curso
            </Link>
            <Link
              href="/academia"
              className="text-xs text-zinc-500 hover:text-white transition-colors"
            >
              Volver a mi panel de cursos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isCurrentCompleted = activeLesson
    ? isLessonCompleted(course.id, activeLesson.id)
    : false;

  const handleNextLesson = () => {
    if (activeLessonIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[activeLessonIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonId(allLessons[activeLessonIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Barra Superior del Reproductor */}
      <div className="border-b border-zinc-800 bg-zinc-900/80 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/academia"
            className="flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Volver a Mis Cursos</span>
          </Link>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <h1 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md hidden sm:block">
            {course.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-400">
            <Shield className="w-3.5 h-3.5" /> Reproductor Protegido
          </span>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Columna Izquierda: Reproductor y Controles */}
        <div className="lg:col-span-8 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Contenedor del Video con protección contra descargas */}
          <div
            className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-zinc-800 shadow-2xl select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            {activeLesson ? (
              <video
                key={activeLesson.videoUrl}
                src={activeLesson.videoUrl}
                controls
                controlsList="nodownload noplaybackrate"
                disablePictureInPicture
                className="w-full h-full object-contain"
                onEnded={() => {
                  if (activeLesson) {
                    markLessonCompleted(course.id, activeLesson.id);
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
                Selecciona una lección para comenzar
              </div>
            )}

            {/* Marca de Agua Dinámica Antipiratería */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-40 hover:opacity-60 transition-opacity bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10 text-[10px] text-zinc-300 font-mono">
              {siteConfig.name} • Usuario: {user?.email}
            </div>
          </div>

          {/* Info de la Lección */}
          {activeLesson && (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Lección {activeLessonIndex + 1} de {allLessons.length}
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5">
                    {activeLesson.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Duración: {activeLesson.duration} minutos
                  </p>
                </div>

                <button
                  onClick={() => markLessonCompleted(course.id, activeLesson.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 border ${
                    isCurrentCompleted
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                  }`}
                >
                  {isCurrentCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Completada</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 text-zinc-400" />
                      <span>Marcar como vista</span>
                    </>
                  )}
                </button>
              </div>

              {activeLesson.description && (
                <div className="pt-4 border-t border-zinc-800 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-1">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>Notas del Coach:</span>
                  </div>
                  {activeLesson.description}
                </div>
              )}

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <button
                  onClick={handlePrevLesson}
                  disabled={activeLessonIndex === 0}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-zinc-300 transition-colors flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleNextLesson}
                  disabled={activeLessonIndex === allLessons.length - 1}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:pointer-events-none text-xs font-black uppercase text-zinc-950 transition-colors flex items-center gap-1.5"
                >
                  <span>Siguiente Lección</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha: Temario */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-zinc-800 bg-zinc-900/40 p-4 sm:p-6 lg:min-h-[calc(100vh-65px)]">
          <div className="space-y-4 sticky top-6">
            <div className="space-y-1">
              <span className="text-[11px] uppercase font-black tracking-wider text-amber-400">
                Temario del Curso
              </span>
              <h3 className="text-base font-black uppercase text-white">
                Contenido & Lecciones
              </h3>
            </div>

            <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
              {course.modules.map((mod) => (
                <div
                  key={mod.id}
                  className="rounded-2xl bg-zinc-900 border border-zinc-800/80 overflow-hidden"
                >
                  <div className="px-4 py-3 bg-zinc-800/50 border-b border-zinc-800/80">
                    <p className="text-xs font-bold text-white line-clamp-1">
                      {mod.title}
                    </p>
                  </div>

                  <div className="divide-y divide-zinc-800/50">
                    {mod.lessons.map((lesson) => {
                      const isActive = lesson.id === activeLessonId;
                      const isDone = isLessonCompleted(course.id, lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonId(lesson.id)}
                          className={`w-full p-3.5 flex items-center justify-between text-left transition-colors text-xs ${
                            isActive
                              ? "bg-amber-400/10 text-amber-300 border-l-2 border-amber-400"
                              : "hover:bg-zinc-800/60 text-zinc-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0 pr-2">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            )}
                            <span className="line-clamp-2">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500 shrink-0 font-mono">
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
