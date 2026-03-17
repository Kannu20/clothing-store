"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../../lib/products";

export default function TestimonialsSection() {
  return (
    <section className="bg-stone-900 py-20 md:py-28 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">
            What Our Clients Say
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white font-light">
            Loved by Thousands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="bg-stone-800 p-7 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={11} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="font-display text-lg text-stone-200 font-light leading-relaxed flex-1 mb-6">
                "{t.text}"
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-body text-sm font-medium text-white">{t.name}</p>
                  <p className="font-body text-xs text-stone-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
