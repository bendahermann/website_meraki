"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Shield, ArrowRight, Dumbbell } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, "student");
    router.push("/academia");
  };

  const handleDemoStudent = () => {
    login("alumno@demo.mx", "student");
    router.push("/academia");
  };

  const handleDemoAdmin = () => {
    login("admin@titanathletics.mx", "admin");
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-zinc-950 mx-auto flex items-center justify-center shadow-lg shadow-amber-400/20">
            <Dumbbell className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black uppercase text-white">
            Área de Alumnos
          </h1>
          <p className="text-xs text-zinc-400">
            Ingresa para acceder a tus cursos de entrenamiento y continuar tus lecciones.
          </p>
        </div>

        {/* Acceso Rápido Demo (Ideal para presentación al cliente) */}
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
            Acceso Rápido de Prueba (1 Clic)
          </span>
          <button
            onClick={handleDemoStudent}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>Entrar como Alumno (Alejandro)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          <button
            onClick={handleDemoAdmin}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-zinc-200 flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Entrar como Administrador (Coach)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-800 w-full" />
          <span className="bg-zinc-900 px-3 text-[11px] text-zinc-500 uppercase">
            o con tu correo
          </span>
        </div>

        {/* Formulario Estándar */}
        <form onSubmit={handleCustomLogin} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-400/20"
          >
            Ingresar a la Plataforma
          </button>
        </form>
      </div>
    </div>
  );
}
