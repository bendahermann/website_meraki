"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Sparkles, MessageCircle, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Columna 1: Marca y Propuesta */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-zinc-950 font-black">
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-black uppercase text-white tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              {siteConfig.contact.instagram && (
                <a
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {/* YouTube */}
              {siteConfig.contact.youtube && (
                <a
                  href={siteConfig.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {/* WhatsApp */}
              {siteConfig.contact.whatsapp && (
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Explorar
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.features.store && (
                <li>
                  <Link href="/tienda" className="hover:text-amber-400 transition-colors">
                    Catálogo de Productos
                  </Link>
                </li>
              )}
              {siteConfig.features.courses && (
                <li>
                  <Link href="/cursos" className="hover:text-amber-400 transition-colors">
                    Cursos & Programas
                  </Link>
                </li>
              )}
              {siteConfig.features.testimonials && (
                <li>
                  <Link href="/#testimonios" className="hover:text-amber-400 transition-colors">
                    Reseñas & Opiniones
                  </Link>
                </li>
              )}
              {siteConfig.features.auth && (
                <li>
                  <Link href="/login" className="hover:text-amber-400 transition-colors">
                    Área de Miembros
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Columna 3: Contacto & Confianza */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.contact.location}</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-400">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
              {siteConfig.contact.phone && (
                <li className="flex items-center gap-2 text-zinc-400">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{siteConfig.contact.phone}</span>
                </li>
              )}
              <li className="flex items-center gap-2 text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pagos Seguros en {siteConfig.currency.code}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
            </p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <p className="text-zinc-400 font-medium">
              Powered by <span className="text-zinc-200 font-bold hover:text-amber-400 transition-colors">BCSmartData</span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-zinc-600">
              Precios en Moneda ({siteConfig.currency.code})
            </span>
            {siteConfig.features.admin && (
              <Link href="/admin" className="text-zinc-600 hover:text-zinc-400">
                Acceso Staff
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
