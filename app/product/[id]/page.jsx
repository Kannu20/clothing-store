"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ShoppingBag, Star, ChevronRight, Minus, Plus,
  Truck, RotateCcw, Shield, MessageCircle
} from "lucide-react";
import Footer from "../../../components/layout/Footer";
import ProductCard from "../../../components/ui/ProductCard";
import { products } from "../../../lib/products";
import { useStore } from "../../../lib/store";
import Navbar from "../../../components/layout/Navbar";

export default function ProductPage({ params }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("description");

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart(product, selectedSize, selectedColor, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const accordionItems = [
    {
      id: "description",
      label: "Description",
      content: product.description,
    },
    {
      id: "details",
      label: "Details & Fabric",
      content: `Fabric: ${product.fabric}\n\nCare Instructions: ${product.care}\n\nAvailable in ${product.colors.join(", ")}.`,
    },
    {
      id: "shipping",
      label: "Shipping & Returns",
      content:
        "Free standard shipping on orders above ₹2,999. Express delivery available. Easy 30-day returns on unworn items in original packaging.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 font-body text-xs text-stone-400">
          <Link href="/" className="hover:text-stone-700">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-stone-700">Shop</Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${product.category}`} className="hover:text-stone-700">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-stone-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* ── Left: Image gallery ─────────────────── */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-2 w-16 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-stone-900" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative overflow-hidden aspect-[3/4] bg-stone-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Tag */}
              {product.tag && (
                <span className="absolute top-4 left-4 bg-white font-body text-[9px] tracking-[0.2em] uppercase px-3 py-1.5">
                  {product.tag}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-stone-900 text-white font-body text-[9px] tracking-wider px-3 py-1.5">
                  -{discount}%
                </span>
              )}

              {/* Mobile thumbnails */}
              <div className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      selectedImage === i ? "bg-stone-900" : "bg-stone-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Product info ──────────────────── */}
          <div className="flex flex-col">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-stone-400 mb-2">
              {product.category}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-stone-900 leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-stone-200"}
                  />
                ))}
              </div>
              <span className="font-body text-xs text-stone-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-7">
              <span className="font-display text-3xl text-stone-900 font-light">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="font-body text-base text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span className="font-body text-sm text-emerald-600 font-medium">
                  {discount}% off
                </span>
              )}
            </div>

            {/* Color selector */}
            <div className="mb-6">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-stone-500 mb-3">
                Color: <span className="text-stone-900 font-medium">{selectedColor}</span>
              </p>
              <div className="flex gap-2.5">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-stone-900 scale-110"
                        : "border-transparent hover:border-stone-400"
                    }`}
                    style={{
                      background: product.colorHex?.[color] || "#ccc",
                      boxShadow: selectedColor === color ? "0 0 0 2px white, 0 0 0 3px #1a1a1a" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className={`font-body text-xs tracking-[0.2em] uppercase ${sizeError ? "text-red-500" : "text-stone-500"}`}>
                  {sizeError ? "Please select a size" : "Select Size"}
                </p>
                <button className="font-body text-xs text-stone-400 underline underline-offset-2 hover:text-stone-700">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`min-w-[3rem] px-3 py-2.5 font-body text-xs border transition-all ${
                      selectedSize === size
                        ? "bg-stone-900 text-white border-stone-900"
                        : "border-stone-200 text-stone-600 hover:border-stone-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-7">
              <p className="font-body text-xs tracking-[0.2em] uppercase text-stone-500">Qty:</p>
              <div className="flex items-center border border-stone-200">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-body text-sm text-stone-900">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 btn-primary gap-2 py-4 text-xs ${
                  added ? "bg-emerald-700" : ""
                }`}
              >
                <ShoppingBag size={15} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-14 h-14 border flex items-center justify-center transition-all ${
                  wishlisted
                    ? "bg-stone-900 border-stone-900 text-white"
                    : "border-stone-200 text-stone-500 hover:border-stone-400"
                }`}
                aria-label="Wishlist"
              >
                <Heart size={16} className={wishlisted ? "fill-white" : ""} />
              </button>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/919876543210?text=Hi, I'm interested in: ${encodeURIComponent(product.name)} (${selectedColor}, Size: ${selectedSize || "TBD"})`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-emerald-600 text-emerald-700 font-body text-xs tracking-widest uppercase py-3.5 hover:bg-emerald-50 transition-colors mb-8"
            >
              <MessageCircle size={14} />
              Enquire on WhatsApp
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-stone-100">
              {[
                { Icon: Truck, label: "Free Shipping", sub: "Orders above ₹2,999" },
                { Icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                { Icon: Shield, label: "100% Authentic", sub: "Premium quality" },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <Icon size={18} className="text-stone-400" />
                  <p className="font-body text-xs font-medium text-stone-700">{label}</p>
                  <p className="font-body text-[10px] text-stone-400">{sub}</p>
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div className="mt-6 space-y-0">
              {accordionItems.map((item) => (
                <div key={item.id} className="border-b border-stone-100">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="font-body text-xs tracking-[0.2em] uppercase text-stone-700">
                      {item.label}
                    </span>
                    {openAccordion === item.id ? (
                      <Minus size={14} className="text-stone-400" />
                    ) : (
                      <Plus size={14} className="text-stone-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openAccordion === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="font-body text-sm text-stone-500 leading-relaxed pb-5 whitespace-pre-line">
                          {item.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20 md:mt-28 pt-12 border-t border-stone-100">
            <div className="mb-10">
              <p className="section-subtitle">You May Also Like</p>
              <h2 className="section-title">Related Products</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
