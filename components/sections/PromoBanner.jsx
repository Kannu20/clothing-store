"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="grid md:grid-cols-2 min-h-[50vh]">
      {/* Left panel */}
      <div
        className="relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative h-full flex flex-col justify-center items-start p-10 md:p-16 min-h-[350px]"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-white/60 mb-3">
            New Season
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white font-light mb-6 leading-tight">
            Summer<br />Edit 2025
          </h2>
          <Link href="/shop?category=Women" className="btn-primary bg-white text-stone-900 hover:bg-stone-100">
            Shop Women <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Right panel — split into two */}
      <div className="flex flex-col">
        <div
          className="relative overflow-hidden flex-1"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <div className="absolute inset-0 bg-stone-900/50" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-full flex flex-col justify-end p-8 min-h-[220px]"
          >
            <h3 className="font-display text-3xl text-white font-light mb-3">Men's Edit</h3>
            <Link href="/shop?category=Men" className="text-white font-body text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all">
              Explore <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>

        <div className="bg-champagne flex-1 flex flex-col justify-center p-8 md:p-12 min-h-[180px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">
              Limited Time
            </p>
            <h3 className="font-display text-4xl text-stone-900 font-light mb-1">
              Up to 40% Off
            </h3>
            <p className="font-body text-sm text-stone-500 mb-5">
              On selected styles across all categories
            </p>
            <Link href="/shop" className="btn-outline text-stone-900 border-stone-900">
              Shop Sale <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
