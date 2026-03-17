"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Search, CheckCircle, Truck, MapPin, Clock, MessageCircle, AlertCircle } from "lucide-react";
import Navbar from "/components/layout/Navbar";
import Footer from "/components/layout/Footer";

// ── Demo orders (in real use, query your backend/Razorpay) ───────────────────
const DEMO_ORDERS = {
  "LX2025001": {
    id: "LX2025001",
    date: "12 March 2025",
    name: "Priya Sharma",
    items: [
      { name: "Ivory Linen Blazer", size: "S", color: "Ivory", qty: 1, price: 4299 },
      { name: "Slim-Fit Oxford Shirt", size: "M", color: "Sky Blue", qty: 1, price: 2499 },
    ],
    total: 6997,
    status: "delivered",
    address: "23, Palm Grove Apts, Mumbai — 400050",
    timeline: [
      { label: "Order Placed",  date: "12 Mar, 10:32am",  done: true  },
      { label: "Payment Confirmed", date: "12 Mar, 10:33am", done: true },
      { label: "Dispatched",    date: "12 Mar, 3:15pm",   done: true  },
      { label: "Out for Delivery", date: "14 Mar, 9:00am", done: true },
      { label: "Delivered",     date: "14 Mar, 1:47pm",   done: true  },
    ],
  },
  "LX2025002": {
    id: "LX2025002",
    date: "15 March 2025",
    name: "Arjun Mehta",
    items: [
      { name: "Merino Wool Crewneck", size: "L", color: "Navy", qty: 1, price: 3999 },
    ],
    total: 4198,
    status: "out_for_delivery",
    address: "7, Green Park, Delhi — 110016",
    timeline: [
      { label: "Order Placed",     date: "15 Mar, 2:10pm", done: true  },
      { label: "Payment Confirmed",date: "15 Mar, 2:11pm", done: true  },
      { label: "Dispatched",       date: "15 Mar, 6:00pm", done: true  },
      { label: "Out for Delivery", date: "17 Mar, 8:30am", done: true  },
      { label: "Delivered",        date: "Expected today", done: false },
    ],
  },
  "LX2025003": {
    id: "LX2025003",
    date: "16 March 2025",
    name: "Kavya Nair",
    items: [
      { name: "Silk Satin Midi Dress", size: "S", color: "Champagne", qty: 1, price: 5799 },
      { name: "Cashmere Turtleneck",   size: "XS", color: "Oatmeal",  qty: 1, price: 6499 },
    ],
    total: 12497,
    status: "dispatched",
    address: "15, Koregaon Park, Pune — 411001",
    timeline: [
      { label: "Order Placed",     date: "16 Mar, 11:45am", done: true  },
      { label: "Payment Confirmed",date: "16 Mar, 11:46am", done: true  },
      { label: "Dispatched",       date: "16 Mar, 5:30pm",  done: true  },
      { label: "Out for Delivery", date: "Expected 18 Mar", done: false },
      { label: "Delivered",        date: "Expected 18 Mar", done: false },
    ],
  },
};

const STATUS_CONFIG = {
  dispatched:       { label: "Dispatched",        color: "text-blue-600",    bg: "bg-blue-50",    border: "border-blue-100" },
  out_for_delivery: { label: "Out for Delivery",  color: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-100" },
  delivered:        { label: "Delivered",         color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  processing:       { label: "Processing",        color: "text-stone-600",   bg: "bg-stone-50",   border: "border-stone-100" },
};

export default function OrderTrackingPage() {
  const [orderId, setOrderId]   = useState("");
  const [phone,   setPhone]     = useState("");
  const [result,  setResult]    = useState(null);
  const [error,   setError]     = useState("");
  const [loading, setLoading]   = useState(false);

  const handleTrack = () => {
    if (!orderId.trim()) { setError("Please enter your Order ID."); return; }
    setError("");
    setLoading(true);
    setResult(null);

    // Simulate API call delay
    setTimeout(() => {
      const order = DEMO_ORDERS[orderId.trim().toUpperCase()];
      if (order) {
        setResult(order);
      } else {
        setError("No order found with that ID. Please double-check and try again, or WhatsApp us for help.");
      }
      setLoading(false);
    }, 900);
  };

  const statusCfg = result ? (STATUS_CONFIG[result.status] || STATUS_CONFIG.processing) : null;
  const doneSteps = result ? result.timeline.filter((t) => t.done).length : 0;
  const progress  = result ? Math.round((doneSteps / result.timeline.length) * 100) : 0;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-stone-900 py-16 md:py-20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-800 mb-6">
                <Package size={24} className="text-white" />
              </div>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-stone-500 mb-4">
                Know Where Your Order Is
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-4">
                Order Tracking
              </h1>
              <p className="font-body text-sm text-stone-400 max-w-md mx-auto">
                Enter your Order ID from the confirmation message to see real-time status.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search */}
        <section className="max-w-2xl mx-auto px-6 md:px-8 py-12">
          <div className="bg-white border border-stone-100 p-7 shadow-sm">
            <h2 className="font-display text-2xl font-light text-stone-900 mb-6">
              Track Your Order
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                  Order ID *
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => { setOrderId(e.target.value); setError(""); }}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder="e.g. LX2025001"
                  className="input-field"
                />
                <p className="font-body text-[10px] text-stone-400 mt-1.5">
                  Found in your WhatsApp order confirmation message
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 bg-red-50 border border-red-100 p-4"
                >
                  <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-red-600 leading-relaxed">{error}</p>
                </motion.div>
              )}

              <button
                onClick={handleTrack}
                disabled={loading}
                className={`btn-primary w-full justify-center gap-2 ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Searching…
                  </>
                ) : (
                  <>
                    <Search size={14} />
                    Track Order
                  </>
                )}
              </button>
            </div>

            <p className="font-body text-xs text-stone-400 text-center mt-5">
              Demo IDs to try: <span className="font-medium text-stone-600">LX2025001</span> · <span className="font-medium text-stone-600">LX2025002</span> · <span className="font-medium text-stone-600">LX2025003</span>
            </p>
          </div>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
                className="mt-6"
              >
                {/* Status banner */}
                <div className={`flex items-center justify-between p-5 border ${statusCfg.bg} ${statusCfg.border} mb-5`}>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">
                      Order {result.id}
                    </p>
                    <p className={`font-body text-sm font-medium ${statusCfg.color}`}>
                      {statusCfg.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-[10px] text-stone-400">Ordered</p>
                    <p className="font-body text-xs text-stone-600 font-medium">{result.date}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="bg-white border border-stone-100 p-6 mb-5">
                  <div className="flex justify-between mb-2">
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-400">Progress</p>
                    <p className="font-body text-[10px] text-stone-500">{doneSteps} of {result.timeline.length} steps</p>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mb-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-stone-900 rounded-full"
                    />
                  </div>

                  {/* Timeline steps */}
                  <div className="space-y-4">
                    {result.timeline.map(({ label, date, done }, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${done ? "bg-stone-900 border-stone-900" : "bg-white border-stone-200"}`}>
                          {done && <CheckCircle size={12} className="text-white fill-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={`font-body text-sm ${done ? "text-stone-900 font-medium" : "text-stone-400"}`}>
                            {label}
                          </p>
                          <p className={`font-body text-xs mt-0.5 ${done ? "text-stone-500" : "text-stone-300"}`}>
                            {date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order items */}
                <div className="bg-white border border-stone-100 p-6 mb-5">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-4">
                    Items in this Order
                  </p>
                  <div className="space-y-3 divide-y divide-stone-50">
                    {result.items.map((item, i) => (
                      <div key={i} className={`flex justify-between gap-4 ${i > 0 ? "pt-3" : ""}`}>
                        <div>
                          <p className="font-display text-base font-light text-stone-900">{item.name}</p>
                          <p className="font-body text-xs text-stone-400 mt-0.5">
                            {item.color} · Size {item.size} · Qty {item.qty}
                          </p>
                        </div>
                        <p className="font-body text-sm text-stone-700 shrink-0">
                          ₹{(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-stone-100 mt-4 pt-4 flex justify-between">
                    <span className="font-body text-sm font-medium text-stone-700">Total Paid</span>
                    <span className="font-display text-xl font-light text-stone-900">
                      ₹{result.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Delivery address */}
                <div className="bg-white border border-stone-100 p-5 mb-5 flex items-start gap-3">
                  <MapPin size={15} className="text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">Delivering To</p>
                    <p className="font-body text-sm text-stone-700 font-medium">{result.name}</p>
                    <p className="font-body text-xs text-stone-500">{result.address}</p>
                  </div>
                </div>

                {/* Need help */}
                <div className="bg-stone-50 border border-stone-100 p-5 flex items-center justify-between gap-4">
                  <p className="font-body text-sm text-stone-600">
                    Have an issue with this order?
                  </p>
                  <a
                    href={`https://wa.me/919876543210?text=Hi, I need help with Order ID: ${result.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary shrink-0 py-2.5 gap-2 text-[10px]"
                  >
                    <MessageCircle size={12} />
                    Get Help
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Info strip */}
        <section className="bg-stone-900 py-10">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { Icon: Clock,     title: "Updates via WhatsApp", desc: "You'll get live tracking updates on WhatsApp the moment your order is dispatched." },
                { Icon: Truck,     title: "Tracked Delivery",     desc: "Every order is fully tracked with a courier tracking link sent to your phone." },
                { Icon: MessageCircle, title: "24hr Support",     desc: "WhatsApp us anytime and we'll update you on your order status within minutes." },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 bg-stone-800 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-white mb-1">{title}</p>
                    <p className="font-body text-xs text-stone-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}