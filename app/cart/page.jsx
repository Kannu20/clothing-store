"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useStore } from "../../lib/store";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore();
  const total = cartTotal();
  const shipping = total >= 2999 ? 0 : 199;
  const grandTotal = total + shipping;

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16 min-h-[60vh]">
        <div className="mb-10">
          <p className="section-subtitle">Review</p>
          <h1 className="section-title">Shopping Cart</h1>
          {cart.length > 0 && (
            <p className="font-body text-sm text-stone-400 mt-1">
              {cart.reduce((s, i) => s + i.qty, 0)} item{cart.reduce((s, i) => s + i.qty, 0) !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 text-center"
          >
            <ShoppingBag size={56} className="text-stone-200 mb-6" strokeWidth={1} />
            <h2 className="font-display text-3xl text-stone-400 font-light mb-4">
              Your cart is empty
            </h2>
            <p className="font-body text-sm text-stone-400 mb-8 max-w-xs">
              Looks like you haven't added anything yet. Explore our collection to find something you love.
            </p>
            <Link href="/shop" className="btn-primary">
              Continue Shopping <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
            {/* Items */}
            <div className="flex-1">
              {/* Free shipping notice */}
              {shipping > 0 && (
                <div className="mb-6 p-4 bg-stone-50 border border-stone-100 flex items-center gap-3">
                  <Truck size={16} className="text-stone-400 shrink-0" />
                  <p className="font-body text-xs text-stone-500">
                    Add ₹{(2999 - total).toLocaleString()} more to get <span className="font-medium text-stone-800">free shipping</span>
                  </p>
                </div>
              )}
              {shipping === 0 && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                  <Truck size={16} className="text-emerald-500 shrink-0" />
                  <p className="font-body text-xs text-emerald-700 font-medium">
                    🎉 You qualify for free shipping!
                  </p>
                </div>
              )}

              <div className="divide-y divide-stone-100">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.key}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-5 py-6"
                    >
                      {/* Image */}
                      <Link href={`/product/${item.id}`} className="shrink-0">
                        <div className="w-24 h-32 md:w-28 md:h-36 overflow-hidden bg-stone-100">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 flex flex-col min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">
                              {item.category}
                            </p>
                            <Link href={`/product/${item.id}`}>
                              <h3 className="font-display text-lg md:text-xl font-light text-stone-900 leading-snug hover:text-stone-600 transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            className="shrink-0 text-stone-300 hover:text-stone-700 transition-colors p-1"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-3">
                          <span className="font-body text-xs text-stone-500 bg-stone-50 px-2.5 py-1">
                            Size: {item.size}
                          </span>
                          <span className="font-body text-xs text-stone-500 bg-stone-50 px-2.5 py-1 flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block border border-stone-200"
                              style={{ background: item.colorHex?.[item.color] || "#ccc" }}
                            />
                            {item.color}
                          </span>
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                          {/* Qty controls */}
                          <div className="flex items-center border border-stone-200">
                            <button
                              onClick={() => updateQty(item.key, item.qty - 1)}
                              className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-body text-sm text-stone-900">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.key, item.qty + 1)}
                              className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-display text-xl text-stone-900 font-light">
                              ₹{(item.price * item.qty).toLocaleString()}
                            </p>
                            {item.qty > 1 && (
                              <p className="font-body text-xs text-stone-400">
                                ₹{item.price.toLocaleString()} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:w-80 xl:w-96 shrink-0">
              <div className="bg-stone-50 p-7 sticky top-24">
                <h2 className="font-body text-xs tracking-[0.25em] uppercase text-stone-700 mb-6 pb-4 border-b border-stone-200">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-stone-500">Subtotal</span>
                    <span className="font-body text-sm text-stone-900">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-stone-500">Shipping</span>
                    <span className="font-body text-sm text-stone-900">
                      {shipping === 0 ? (
                        <span className="text-emerald-600">Free</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-4 mb-7">
                  <div className="flex justify-between items-baseline">
                    <span className="font-body text-sm font-medium text-stone-900">Total</span>
                    <span className="font-display text-2xl text-stone-900 font-light">
                      ₹{grandTotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="font-body text-[10px] text-stone-400 mt-1">Including all taxes</p>
                </div>

                {/* Coupon */}
                <div className="flex gap-0 mb-6">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 border border-stone-200 bg-white px-4 py-2.5 font-body text-xs text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-stone-400"
                  />
                  <button className="bg-stone-900 text-white px-4 py-2.5 font-body text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors">
                    Apply
                  </button>
                </div>

                <Link href="/checkout" className="btn-primary w-full justify-center text-center">
                  Proceed to Checkout <ArrowRight size={14} />
                </Link>

                <Link
                  href="/shop"
                  className="mt-3 block text-center font-body text-xs text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
