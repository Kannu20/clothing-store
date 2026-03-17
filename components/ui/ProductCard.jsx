"use client";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useStore } from "../../lib/store";
import { useState } from "react";

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wishlisted = isWishlisted(product.id);
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, product.sizes[0], product.colors[0], 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        {/* Image container */}
        <div className="relative overflow-hidden bg-stone-100 aspect-[3/4]">
          <img
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Tag badge */}
          {product.tag && (
            <span className="absolute top-3 left-3 bg-white text-stone-900 font-body text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
              {product.tag}
            </span>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-stone-900 text-white font-body text-[9px] tracking-wider px-2.5 py-1">
              -{discount}%
            </span>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`absolute top-12 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm transition-all duration-200 ${
              wishlisted ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
            }`}
            aria-label="Wishlist"
          >
            <Heart
              size={14}
              className={wishlisted ? "fill-stone-900 text-stone-900" : "text-stone-400"}
            />
          </button>

          {/* Quick view */}
          <Link
            href={`/product/${product.id}`}
            className="absolute bottom-0 right-3 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 mb-3"
            aria-label="View product"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye size={14} className="text-stone-500" />
          </Link>

          {/* Quick add overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full bg-stone-900 text-white font-body text-xs tracking-widest uppercase py-3.5 hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={13} />
              {added ? "Added!" : "Quick Add"}
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 pb-2">
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">
            {product.category}
          </p>
          <h3 className="font-display text-lg font-light text-stone-900 leading-snug">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-body text-sm font-medium text-stone-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-body text-xs text-stone-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color dots */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((c) => (
              <span
                key={c}
                title={c}
                className="w-3 h-3 rounded-full border border-stone-200 ring-1 ring-offset-1 ring-transparent hover:ring-stone-400 transition-all"
                style={{ background: product.colorHex?.[c] || "#ccc" }}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
