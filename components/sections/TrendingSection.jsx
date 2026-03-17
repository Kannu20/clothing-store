"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "../../lib/products";
import ProductCard from "../../components/ui/ProductCard";

export default function TrendingSection() {
  const trending = products.filter((p) => p.trending).slice(0, 4);

  return (
    <section className="max-w-screen-xl mx-auto px-6 md:px-8 py-20 md:py-28">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
        <div>
          <p className="section-subtitle">Right Now</p>
          <h2 className="section-title">Trending</h2>
        </div>
        <Link
          href="/shop"
          className="hidden md:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors group"
        >
          Shop All <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
        {trending.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
