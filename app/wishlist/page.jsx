"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProductCard from "../../components/ui/ProductCard";
import { useStore } from "../../lib/store";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16 min-h-[60vh]">
        <div className="mb-10">
          <p className="section-subtitle">Saved</p>
          <h1 className="section-title">My Wishlist</h1>
          {wishlist.length > 0 && (
            <p className="font-body text-sm text-stone-400 mt-1">
              {wishlist.length} item{wishlist.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <Heart size={56} className="text-stone-200 mb-6" strokeWidth={1} />
            <h2 className="font-display text-3xl text-stone-400 font-light mb-4">
              Your wishlist is empty
            </h2>
            <p className="font-body text-sm text-stone-400 mb-8 max-w-xs">
              Save items you love to come back to them later.
            </p>
            <Link href="/shop" className="btn-primary">
              Browse Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            <AnimatePresence>
              {wishlist.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
