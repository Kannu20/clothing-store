"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cats = [
  {
    label: "Women",
    href: "/shop?category=Women",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    count: "120+ Styles",
  },
  {
    label: "Men",
    href: "/shop?category=Men",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
    count: "90+ Styles",
  },
  {
    label: "Kids",
    href: "/shop?category=Kids",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
    count: "60+ Styles",
  },
];

export default function CategoriesSection() {
  return (
    <section className="max-w-screen-xl mx-auto px-6 md:px-8 py-20 md:py-28">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
        <div>
          <p className="section-subtitle">Collections</p>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <Link
          href="/shop"
          className="hidden md:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-500 hover:text-stone-900 transition-colors mt-4 md:mt-0 group"
        >
          All Products
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cats.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.12 }}
          >
            <Link href={cat.href} className="group block relative overflow-hidden aspect-[4/5]">
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7">
                <p className="font-body text-xs tracking-[0.25em] uppercase text-white/60 mb-1">
                  {cat.count}
                </p>
                <h3 className="font-display text-4xl text-white font-light mb-3">{cat.label}</h3>
                <span className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-white border-b border-white/50 pb-0.5 group-hover:border-white transition-colors">
                  Explore <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
