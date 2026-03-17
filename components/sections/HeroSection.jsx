"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Effortless\nElegance",
    subtitle: "New Season Collection",
    cta: "Explore Women",
    href: "/shop?category=Women",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=85",
    position: "center",
  },
  {
    id: 2,
    title: "Refined\nMasculinity",
    subtitle: "Men's Essentials",
    cta: "Shop Men",
    href: "/shop?category=Men",
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1600&q=85",
    position: "top",
  },
];

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[560px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slides[0].image})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-screen-xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-20 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-body text-xs tracking-[0.35em] uppercase text-white/70 mb-5"
        >
          {slides[0].subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-none whitespace-pre-line mb-10"
        >
          {slides[0].title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href={slides[0].href} className="btn-primary group">
            {slides[0].cta}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/shop" className="btn-outline border-white text-white hover:bg-white hover:text-stone-900">
            View All
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-white/50 rotate-90 mb-4">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-12 bg-white/30"
        />
      </motion.div>
    </section>
  );
}
