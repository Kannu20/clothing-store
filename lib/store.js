"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // ── Cart ──────────────────────────────────────────
      cart: [],

      addToCart: (product, size, color, qty = 1) => {
        const cart = get().cart;
        const key = `${product.id}-${size}-${color}`;
        const existing = cart.find((i) => i.key === key);
        if (existing) {
          set({
            cart: cart.map((i) =>
              i.key === key ? { ...i, qty: i.qty + qty } : i
            ),
          });
        } else {
          set({
            cart: [...cart, { ...product, size, color, qty, key }],
          });
        }
      },

      removeFromCart: (key) =>
        set({ cart: get().cart.filter((i) => i.key !== key) }),

      updateQty: (key, qty) => {
        if (qty < 1) {
          get().removeFromCart(key);
          return;
        }
        set({ cart: get().cart.map((i) => (i.key === key ? { ...i, qty } : i)) });
      },

      clearCart: () => set({ cart: [] }),

      cartTotal: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.qty, 0),

      cartCount: () =>
        get().cart.reduce((sum, i) => sum + i.qty, 0),

      // ── Wishlist ──────────────────────────────────────
      wishlist: [],

      addToWishlist: (product) => {
        const exists = get().wishlist.find((i) => i.id === product.id);
        if (!exists) set({ wishlist: [...get().wishlist, product] });
      },

      removeFromWishlist: (id) =>
        set({ wishlist: get().wishlist.filter((i) => i.id !== id) }),

      toggleWishlist: (product) => {
        const inList = get().wishlist.find((i) => i.id === product.id);
        if (inList) get().removeFromWishlist(product.id);
        else get().addToWishlist(product);
      },

      isWishlisted: (id) => !!get().wishlist.find((i) => i.id === id),
    }),
    { name: "luxe-store" }
  )
);
