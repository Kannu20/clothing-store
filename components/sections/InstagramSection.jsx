"use client";
import { Instagram } from "lucide-react";
import { instagramPosts } from "../../lib/products";
import { motion } from "framer-motion";

export default function InstagramSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center mb-12">
        <p className="section-subtitle">Follow Us</p>
        <h2 className="section-title mb-3">@luxestore.in</h2>
        <p className="font-body text-sm text-stone-400">
          Tag us in your looks for a chance to be featured
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2 max-w-screen-xl mx-auto px-2 md:px-8">
        {instagramPosts.map((url, i) => (
          <motion.a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="group relative overflow-hidden aspect-square block"
          >
            <img
              src={url}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <Instagram
                size={22}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
