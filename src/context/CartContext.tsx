"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  shippingCost: number;
  total: number;
  hasPhysicalItems: boolean;
  hasCourseItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cargar carrito de localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("titan_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignorar error de JSON
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("titan_cart", JSON.stringify(items));
    } catch {
      // Ignorar error
    }
  }, [items, mounted]);

  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((prev) => {
      const qty = newItem.quantity || 1;
      const existingIndex = prev.findIndex((i) => i.id === newItem.id);

      if (existingIndex > -1) {
        // Si es un curso digital, no aumentamos cantidad (solo se compra 1 vez)
        if (newItem.type === "course") {
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }

      return [...prev, { ...newItem, quantity: qty }];
    });
    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  
  const hasPhysicalItems = items.some((i) => i.type === "physical");
  const hasCourseItems = items.some((i) => i.type === "course");

  // Envío gratis en México para ropa a partir de $999 MXN o si solo son cursos digitales
  const shippingCost = !hasPhysicalItems ? 0 : subtotal >= 999 ? 0 : 120;
  const total = subtotal + shippingCost;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        shippingCost,
        total,
        hasPhysicalItems,
        hasCourseItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
