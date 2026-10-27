"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Shield,
  LogOut,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const { itemCount, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Filtrar enlaces de navegación según las funciones habilitadas en siteConfig
  const navItems = siteConfig.navigation.filter((item) => {
    if (!item.featureKey) return true;
    return siteConfig.features[item.featureKey];
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo / Marca */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-zinc-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white uppercase block leading-none">
                {siteConfig.name}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mt-1 truncate max-w-[180px]">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* Menú de Navegación Escritorio */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold tracking-wide text-zinc-300 hover:text-amber-400 transition-colors uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Acciones del Lado Derecho */}
          <div className="flex items-center gap-3">
            {/* Botón Carrito */}
            {siteConfig.features.cart && (
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-amber-400 hover:border-zinc-700 transition-all"
                aria-label="Abrir carrito"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[11px] font-black text-zinc-950 shadow-md">
                    {itemCount}
                  </span>
                )}
              </button>
            )}

            {/* Menú de Usuario / Login */}
            {siteConfig.features.auth && (
              <div className="relative">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-700 transition-all text-sm font-medium"
                    >
                      <img
                        src={user.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                        alt={user.name}
                        className="w-7 h-7 rounded-lg object-cover"
                      />
                      <span className="hidden sm:inline-block text-xs font-bold text-zinc-200">
                        {user.name.split(" ")[0]}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    </button>

                    {/* Dropdown flotante */}
                    {userDropdownOpen && (
                      <div
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                        onMouseLeave={() => setUserDropdownOpen(false)}
                      >
                        <div className="px-4 py-2 border-b border-zinc-800 text-xs">
                          <p className="font-semibold text-white">{user.name}</p>
                          <p className="text-zinc-500 truncate">{user.email}</p>
                        </div>

                        {siteConfig.features.courses && (
                          <Link
                            href="/academia"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 font-medium transition-colors"
                          >
                            <BookOpen className="w-4 h-4 text-amber-400" />
                            <span>Mis Contenidos & Cursos</span>
                          </Link>
                        )}

                        {siteConfig.features.admin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 font-medium transition-colors"
                          >
                            <Shield className="w-4 h-4 text-indigo-400" />
                            <span>Panel Administrador</span>
                          </Link>
                        )}

                        <div className="border-t border-zinc-800 mt-1 pt-1">
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              logout();
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-zinc-800/80 font-medium transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Cerrar Sesión</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-bold text-zinc-200 transition-colors uppercase tracking-wider"
                  >
                    <UserIcon className="w-4 h-4 text-amber-400" />
                    <span>Entrar</span>
                  </Link>
                )}
              </div>
            )}

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 md:hidden hover:text-white"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-bold text-zinc-300 hover:text-amber-400 uppercase tracking-wide"
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <div className="pt-3 border-t border-zinc-800 space-y-2">
              {siteConfig.features.courses && (
                <Link
                  href="/academia"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-bold text-amber-400"
                >
                  <BookOpen className="w-4 h-4" /> Mis Contenidos
                </Link>
              )}
              {siteConfig.features.admin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-bold text-indigo-400"
                >
                  <Shield className="w-4 h-4" /> Panel de Administrador
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
