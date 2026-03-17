"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/ui/ProductCard";
import { products } from "../../lib/products";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "2Y", "3Y", "4Y", "5Y", "6Y", "8Y", "10Y", "28", "30", "32", "34", "36"];
const COLORS = ["White", "Black", "Navy", "Ivory", "Camel", "Cream", "Olive", "Charcoal", "Blush", "Champagne", "Mint", "Sage"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Trending", value: "trending" },
  { label: "Top Rated", value: "rating" },
];

function FilterPanel({ filters, setFilters, onClose, isMobile }) {
  const [openSections, setOpenSections] = useState({ category: true, price: true, size: false, color: false });

  const toggle = (section) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const toggleArr = (key, val) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
      };
    });
  };

  const SectionHeader = ({ label, section }) => (
    <button
      onClick={() => toggle(section)}
      className="w-full flex items-center justify-between py-4 font-body text-xs tracking-[0.2em] uppercase text-stone-700 border-b border-stone-100"
    >
      {label}
      {openSections[section] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
  );

  return (
    <div className="w-full">
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-body text-sm font-medium tracking-widest uppercase">Filters</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
      )}

      {/* Category */}
      <SectionHeader label="Category" section="category" />
      <AnimatePresence>
        {openSections.category && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="py-4 space-y-2.5">
              {["All", "Women", "Men", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <span
                    onClick={() => setFilters((p) => ({ ...p, category: cat }))}
                    className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      filters.category === cat ? "bg-stone-900 border-stone-900" : "border-stone-300 group-hover:border-stone-500"
                    }`}
                  >
                    {filters.category === cat && (
                      <svg viewBox="0 0 10 8" className="w-2.5 fill-white">
                        <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" />
                      </svg>
                    )}
                  </span>
                  <span
                    onClick={() => setFilters((p) => ({ ...p, category: cat }))}
                    className="font-body text-sm text-stone-600 cursor-pointer"
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price */}
      <SectionHeader label="Price Range" section="price" />
      <AnimatePresence>
        {openSections.price && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="py-4 space-y-2.5">
              {[
                { label: "Under ₹2,000", min: 0, max: 2000 },
                { label: "₹2,000 – ₹5,000", min: 2000, max: 5000 },
                { label: "₹5,000 – ₹8,000", min: 5000, max: 8000 },
                { label: "Above ₹8,000", min: 8000, max: Infinity },
              ].map(({ label, min, max }) => {
                const active = filters.priceMin === min && filters.priceMax === max;
                return (
                  <label key={label} className="flex items-center gap-3 cursor-pointer group">
                    <span
                      onClick={() => setFilters((p) => ({ ...p, priceMin: active ? 0 : min, priceMax: active ? Infinity : max }))}
                      className={`w-4 h-4 border flex items-center justify-center transition-colors ${active ? "bg-stone-900 border-stone-900" : "border-stone-300 group-hover:border-stone-500"}`}
                    >
                      {active && (
                        <svg viewBox="0 0 10 8" className="w-2.5 fill-white">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" />
                        </svg>
                      )}
                    </span>
                    <span
                      onClick={() => setFilters((p) => ({ ...p, priceMin: active ? 0 : min, priceMax: active ? Infinity : max }))}
                      className="font-body text-sm text-stone-600"
                    >
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Size */}
      <SectionHeader label="Size" section="size" />
      <AnimatePresence>
        {openSections.size && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="py-4 flex flex-wrap gap-2">
              {SIZES.map((s) => {
                const active = (filters.sizes || []).includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleArr("sizes", s)}
                    className={`px-3 py-1.5 font-body text-xs border transition-colors ${active ? "bg-stone-900 text-white border-stone-900" : "border-stone-200 text-stone-600 hover:border-stone-400"}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color */}
      <SectionHeader label="Color" section="color" />
      <AnimatePresence>
        {openSections.color && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="py-4 flex flex-wrap gap-2">
              {COLORS.map((c) => {
                const active = (filters.colors || []).includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleArr("colors", c)}
                    className={`font-body text-xs px-3 py-1.5 border transition-all rounded-full ${active ? "bg-stone-900 text-white border-stone-900" : "border-stone-200 text-stone-600 hover:border-stone-400"}`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset */}
      <button
        onClick={() => setFilters({ category: "All", priceMin: 0, priceMax: Infinity, sizes: [], colors: [] })}
        className="mt-6 w-full btn-outline text-xs py-3"
      >
        Clear All Filters
      </button>
    </div>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initCategory = searchParams.get("category") || "All";

  const [filters, setFilters] = useState({
    category: initCategory,
    priceMin: 0,
    priceMax: Infinity,
    sizes: [],
    colors: [],
  });
  const [sort, setSort] = useState("newest");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category);
    }
    result = result.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);
    if (filters.sizes?.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }
    if (filters.colors?.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c)));
    }

    switch (sort) {
      case "price_asc": result.sort((a, b) => a.price - b.price); break;
      case "price_desc": result.sort((a, b) => b.price - a.price); break;
      case "trending": result = result.filter((p) => p.trending).concat(result.filter((p) => !p.trending)); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [filters, sort]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="mb-8">
        <p className="section-subtitle">Discover</p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-stone-900">
          {filters.category === "All" ? "All Products" : filters.category}
        </h1>
        <p className="font-body text-sm text-stone-400 mt-2">{filtered.length} items</p>
      </div>

      <div className="flex gap-10">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-60 shrink-0">
          <FilterPanel filters={filters} setFilters={setFilters} />
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-7 pb-4 border-b border-stone-100">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-600 border border-stone-200 px-4 py-2.5 hover:border-stone-500"
            >
              <SlidersHorizontal size={13} /> Filters
            </button>

            <div className="flex items-center gap-3 ml-auto">
              <span className="font-body text-xs text-stone-400 hidden sm:block">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="font-body text-xs text-stone-700 border border-stone-200 px-3 py-2 bg-white focus:outline-none focus:border-stone-400 cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="font-display text-3xl text-stone-300 font-light mb-3">No products found</p>
              <p className="font-body text-sm text-stone-400">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 z-50 bg-black/40"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-white overflow-y-auto p-6 shadow-xl"
            >
              <FilterPanel filters={filters} setFilters={setFilters} onClose={() => setMobileFilterOpen(false)} isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div className="h-96 flex items-center justify-center font-body text-stone-400">Loading…</div>}>
          <ShopContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
