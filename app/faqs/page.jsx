"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Plus, Minus, MessageCircle, Search } from "lucide-react";
import Navbar from "/components/layout/Navbar";
import Footer from "/components/layout/Footer";
import Link from "next/link";

const categories = ["All", "Orders", "Payments", "Shipping", "Returns", "Products", "Account"];

const faqs = [
  // ── Orders ────────────────────────────────────────────────────────────────
  {
    cat: "Orders",
    q: "How do I place an order?",
    a: "Browse our collection, add items to your cart, and proceed to checkout. Fill in your delivery details, complete payment via Razorpay (card, UPI, net banking, wallets), and your order details are sent to us via WhatsApp instantly.",
  },
  {
    cat: "Orders",
    q: "Can I modify or cancel my order after placing it?",
    a: "Yes — but only if the order hasn't been dispatched yet. WhatsApp us immediately at +91 98765 43210. Once dispatched, we cannot cancel or modify the order, but you can return it after delivery under our 30-day return policy.",
  },
  {
    cat: "Orders",
    q: "How will I know my order has been confirmed?",
    a: "You'll receive a WhatsApp message from us within 30 minutes of placing your order, confirming all details. If you don't hear from us, please WhatsApp us directly.",
  },
  {
    cat: "Orders",
    q: "Can I order by phone or WhatsApp directly?",
    a: "Absolutely. You can WhatsApp us at +91 98765 43210 with the product names, sizes, and colours you want, and we'll create a manual order for you.",
  },
  {
    cat: "Orders",
    q: "Do I need to create an account to order?",
    a: "No account is needed. Just fill in your delivery details at checkout and complete payment — it's that simple.",
  },

  // ── Payments ──────────────────────────────────────────────────────────────
  {
    cat: "Payments",
    q: "What payment methods do you accept?",
    a: "We accept Credit/Debit Cards (Visa, Mastercard, Amex, RuPay), UPI (GPay, PhonePe, Paytm), Net Banking (all major banks), Wallets, and EMI — all securely processed via Razorpay.",
  },
  {
    cat: "Payments",
    q: "Is it safe to pay on your website?",
    a: "Yes. All payments are processed by Razorpay, which is PCI DSS Level 1 certified and uses 256-bit SSL encryption. We never store your card details.",
  },
  {
    cat: "Payments",
    q: "What should I do if my payment fails?",
    a: "Please try a different payment method or browser. If the amount was deducted but the order wasn't confirmed, WhatsApp us immediately with your Razorpay payment ID and we'll sort it out within 2 hours.",
  },
  {
    cat: "Payments",
    q: "Do you offer EMI options?",
    a: "Yes. EMI is available on credit cards and select debit cards via Razorpay. EMI options will appear on the payment screen based on your card and bank eligibility.",
  },
  {
    cat: "Payments",
    q: "Will I get an invoice for my purchase?",
    a: "Yes. A digital invoice is sent to you via WhatsApp along with your order confirmation. You can also request a copy at any time.",
  },

  // ── Shipping ──────────────────────────────────────────────────────────────
  {
    cat: "Shipping",
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available in 50+ major cities. Same-day delivery is available within Mumbai for orders placed before 12pm.",
  },
  {
    cat: "Shipping",
    q: "Is there a free shipping threshold?",
    a: "Yes — standard delivery is free on all orders above ₹2,999. Express delivery is free on orders above ₹5,999.",
  },
  {
    cat: "Shipping",
    q: "Do you ship internationally?",
    a: "Currently we ship within India only. International shipping is being planned — follow us on Instagram @luxestore.in for updates.",
  },
  {
    cat: "Shipping",
    q: "How do I track my order?",
    a: "You'll receive a WhatsApp message with a tracking link once your order is dispatched. You can also visit our Order Tracking page and enter your Order ID.",
  },
  {
    cat: "Shipping",
    q: "What happens if I'm not home for delivery?",
    a: "Our courier partner will attempt delivery twice. If both attempts fail, the parcel will be held at the nearest hub for 3 days before being returned to us. WhatsApp us and we'll reattempt delivery.",
  },

  // ── Returns ───────────────────────────────────────────────────────────────
  {
    cat: "Returns",
    q: "What is your return policy?",
    a: "We offer 30-day returns on all unworn, unwashed items with original tags and packaging. Returns are free — we'll arrange a doorstep pickup at no charge.",
  },
  {
    cat: "Returns",
    q: "How do I initiate a return?",
    a: "WhatsApp us at +91 98765 43210 with your Order ID and the reason for return. We'll confirm within 2 hours and schedule a pickup.",
  },
  {
    cat: "Returns",
    q: "How long does a refund take?",
    a: "Once we receive and inspect the returned item, your refund is processed within 5–7 business days back to your original payment method.",
  },
  {
    cat: "Returns",
    q: "Can I exchange instead of return?",
    a: "Yes — exchanges for a different size or colour are available, subject to stock availability. WhatsApp us with your Order ID and the item you'd like instead.",
  },
  {
    cat: "Returns",
    q: "I received a damaged item. What do I do?",
    a: "We're sorry! WhatsApp us within 48 hours of delivery with a photo of the damaged item. We'll dispatch a replacement immediately or issue a full refund — whichever you prefer.",
  },

  // ── Products ──────────────────────────────────────────────────────────────
  {
    cat: "Products",
    q: "How do I find my size?",
    a: "Visit our Size Guide page for detailed measurements across Women, Men, and Kids. If you're between sizes, we recommend sizing up. You can also WhatsApp us and we'll help find your perfect fit.",
  },
  {
    cat: "Products",
    q: "Are your fabrics authentic?",
    a: "Yes. Every fabric we use is certified and sourced directly from verified mills. We publish fabric details on each product page including fabric composition and care instructions.",
  },
  {
    cat: "Products",
    q: "Will out-of-stock items be restocked?",
    a: "Most popular styles are restocked regularly. WhatsApp us with the item name and size and we'll notify you as soon as it's back.",
  },
  {
    cat: "Products",
    q: "Do colours look accurate in photos?",
    a: "We photograph all products under consistent, calibrated studio lighting to represent colours as accurately as possible. Minor variations may occur across different screens.",
  },

  // ── Account ───────────────────────────────────────────────────────────────
  {
    cat: "Account",
    q: "Do I need an account to shop?",
    a: "No account is required. However, creating an account lets us remember your details for faster checkout in future.",
  },
  {
    cat: "Account",
    q: "How do I contact customer support?",
    a: "The fastest way is WhatsApp at +91 98765 43210. You can also email us at hello@luxestore.in or use the Contact form on our website. We respond within 2 hours, 7 days a week.",
  },
];

export default function FAQsPage() {
  const [activeCat, setActiveCat]   = useState("All");
  const [openIdx,   setOpenIdx]     = useState(null);
  const [query,     setQuery]       = useState("");

  const filtered = faqs.filter((f) => {
    const matchesCat   = activeCat === "All" || f.cat === activeCat;
    const matchesQuery = !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const grouped = categories
    .filter((c) => c !== "All")
    .reduce((acc, cat) => {
      const items = filtered.filter((f) => f.cat === cat);
      if (items.length) acc[cat] = items;
      return acc;
    }, {});

  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="bg-stone-900 py-16 md:py-20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-800 mb-6">
                <HelpCircle size={24} className="text-white" />
              </div>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-stone-500 mb-4">
                Got Questions?
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-6">
                Frequently Asked Questions
              </h1>
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setOpenIdx(null); setActiveCat("All"); }}
                  placeholder="Search questions…"
                  className="w-full bg-stone-800 text-white placeholder:text-stone-500 font-body text-sm pl-11 pr-5 py-4 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category filters */}
        <div className="sticky top-[72px] z-30 bg-white border-b border-stone-100 shadow-sm overflow-x-auto">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex gap-0 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setOpenIdx(null); setQuery(""); }}
                className={`font-body text-xs tracking-[0.15em] uppercase px-5 py-4 border-b-2 whitespace-nowrap transition-all ${
                  activeCat === cat
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ content */}
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16">

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <HelpCircle size={48} className="text-stone-200 mx-auto mb-4" strokeWidth={1} />
              <p className="font-display text-2xl text-stone-300 font-light mb-3">No results found</p>
              <p className="font-body text-sm text-stone-400">
                Try a different search term, or{" "}
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-stone-700 underline">
                  WhatsApp us directly
                </a>.
              </p>
            </div>
          ) : activeCat === "All" && !query ? (
            // Grouped by category
            Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="mb-12">
                <h2 className="font-body text-xs tracking-[0.25em] uppercase text-stone-400 mb-5 pb-3 border-b border-stone-100">
                  {cat}
                </h2>
                <FaqList items={items} openIdx={openIdx} setOpenIdx={setOpenIdx} offset={faqs.indexOf(items[0])} />
              </div>
            ))
          ) : (
            // Flat filtered list
            <FaqList items={filtered} openIdx={openIdx} setOpenIdx={setOpenIdx} offset={0} />
          )}

          {/* Still need help CTA */}
          <div className="mt-14 bg-stone-900 p-8 md:p-10 text-center">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-500 mb-3">
              Didn't find what you were looking for?
            </p>
            <h3 className="font-display text-3xl font-light text-white mb-3">
              We're here to help
            </h3>
            <p className="font-body text-sm text-stone-400 mb-7 max-w-md mx-auto">
              Our team is available 7 days a week, 10am – 9pm. WhatsApp us and we'll respond within 2 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919876543210?text=Hi, I have a question about LUXE Store."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-white text-stone-900 hover:bg-stone-100 gap-2"
              >
                <MessageCircle size={14} />
                WhatsApp Us
              </a>
              <Link href="/contact" className="btn-outline border-stone-600 text-stone-300 hover:bg-stone-700 hover:border-stone-700">
                Contact Form
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}

function FaqList({ items, openIdx, setOpenIdx, offset }) {
  return (
    <div className="divide-y divide-stone-100">
      {items.map((faq, i) => {
        const globalIdx = offset + i;
        const isOpen = openIdx === globalIdx;
        return (
          <motion.div
            key={globalIdx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
              className="w-full flex items-start justify-between gap-6 py-5 text-left"
            >
              <span className="font-display text-lg font-light text-stone-900 leading-snug">
                {faq.q}
              </span>
              <span className={`shrink-0 w-6 h-6 border flex items-center justify-center transition-colors mt-0.5 ${isOpen ? "bg-stone-900 border-stone-900 text-white" : "border-stone-200 text-stone-400"}`}>
                {isOpen ? <Minus size={12} /> : <Plus size={12} />}
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-sm text-stone-500 leading-relaxed pb-6">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}