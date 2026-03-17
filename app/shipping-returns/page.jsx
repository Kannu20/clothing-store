"use client";
import { motion } from "framer-motion";
import { Truck, RotateCcw, Clock, MapPin, Package, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";
import Navbar from "/components/layout/Navbar";
import Footer from "/components/layout/Footer";

const shippingOptions = [
  {
    icon: Truck,
    name: "Standard Delivery",
    time: "3–5 Business Days",
    cost: "₹199",
    free: "Free on orders above ₹2,999",
    desc: "Available across India. Tracked delivery with SMS & WhatsApp updates.",
    highlight: false,
  },
  {
    icon: Clock,
    name: "Express Delivery",
    time: "1–2 Business Days",
    cost: "₹349",
    free: "Free on orders above ₹5,999",
    desc: "Available in 50+ cities including Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune, and Kolkata.",
    highlight: true,
  },
  {
    icon: MapPin,
    name: "Same-Day Delivery",
    time: "Within 6–8 hours",
    cost: "₹499",
    free: "Mumbai only",
    desc: "Order before 12pm for same-day delivery within Mumbai city limits.",
    highlight: false,
  },
];

const returnSteps = [
  {
    step: "01",
    title: "Initiate Return",
    desc: "WhatsApp us at +91 98765 43210 with your order details and reason for return. We'll respond within 2 hours.",
  },
  {
    step: "02",
    title: "Pack Your Item",
    desc: "Place the item in its original packaging with all tags attached. Include the packing slip inside.",
  },
  {
    step: "03",
    title: "Free Pickup",
    desc: "Our courier partner will pick up the item from your doorstep at a time convenient for you — no drop-off needed.",
  },
  {
    step: "04",
    title: "Refund Processed",
    desc: "Once we receive and inspect the item, your refund is processed within 5–7 business days to your original payment method.",
  },
];

const returnPolicy = [
  { label: "Return Window", value: "30 days from delivery date" },
  { label: "Condition", value: "Unworn, unwashed, tags intact, original packaging" },
  { label: "Refund Method", value: "Original payment method (Razorpay / Bank Transfer)" },
  { label: "Refund Timeline", value: "5–7 business days after item inspection" },
  { label: "Exchange", value: "Available for size/colour — subject to stock" },
  { label: "Pickup", value: "Free doorstep pickup across India" },
];

const nonReturnItems = [
  "Innerwear, lingerie, and swimwear",
  "Items marked 'Final Sale' or 'Non-Returnable'",
  "Customised or personalised products",
  "Items without original tags or packaging",
  "Items that show signs of use, washing, or damage",
];

const faqs = [
  {
    q: "When will my order be dispatched?",
    a: "Orders placed before 2pm (Mon–Sat) are dispatched the same day. Orders placed after 2pm or on Sundays are dispatched the next business day.",
  },
  {
    q: "How do I track my order?",
    a: "You'll receive a tracking link via WhatsApp once your order is dispatched. You can also visit our Order Tracking page and enter your order details.",
  },
  {
    q: "Can I change my delivery address after placing an order?",
    a: "Yes, if the order hasn't been dispatched yet. WhatsApp us immediately and we'll update the address.",
  },
  {
    q: "What if I receive a damaged or wrong item?",
    a: "We sincerely apologise. WhatsApp us with a photo of the item within 48 hours of delivery and we'll arrange an immediate replacement or full refund — no questions asked.",
  },
  {
    q: "Do you ship internationally?",
    a: "Not yet. We currently ship within India only. International shipping is on our roadmap — follow us on Instagram for updates.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

export default function ShippingPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section
          className="relative py-20 md:py-28 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=80)" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative max-w-screen-xl mx-auto px-6 md:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-white/60 mb-4">
                Delivery & Returns
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-light text-white mb-5">
                Shipping & Returns
              </h1>
              <p className="font-body text-sm text-white/60 max-w-md mx-auto">
                Fast, tracked delivery across India. And if something's not right — a hassle-free 30-day return, guaranteed.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Shipping options */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">How We Deliver</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-stone-900">Shipping Options</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map(({ icon: Icon, name, time, cost, free, desc, highlight }, i) => (
              <motion.div
                key={name}
                {...fadeUp(i * 0.1)}
                className={`p-7 border-2 flex flex-col gap-4 ${
                  highlight
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-100 bg-white hover:border-stone-300 transition-colors"
                }`}
              >
                {highlight && (
                  <span className="self-start font-body text-[9px] tracking-[0.2em] uppercase bg-white text-stone-900 px-3 py-1 font-medium">
                    Most Popular
                  </span>
                )}
                <div className={`w-11 h-11 flex items-center justify-center ${highlight ? "bg-stone-800" : "bg-stone-100"}`}>
                  <Icon size={20} className={highlight ? "text-white" : "text-stone-600"} />
                </div>
                <div>
                  <h3 className={`font-display text-2xl font-light mb-1 ${highlight ? "text-white" : "text-stone-900"}`}>
                    {name}
                  </h3>
                  <p className={`font-body text-xs tracking-wider uppercase mb-3 ${highlight ? "text-stone-300" : "text-stone-400"}`}>
                    {time}
                  </p>
                  <p className={`font-body text-sm leading-relaxed ${highlight ? "text-stone-300" : "text-stone-500"}`}>
                    {desc}
                  </p>
                </div>
                <div className={`border-t pt-4 mt-auto ${highlight ? "border-stone-700" : "border-stone-100"}`}>
                  <p className={`font-display text-xl font-light mb-1 ${highlight ? "text-white" : "text-stone-900"}`}>
                    {cost}
                  </p>
                  <p className={`font-body text-xs ${highlight ? "text-emerald-400" : "text-emerald-600"}`}>
                    ✓ {free}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Returns section */}
        <section className="bg-stone-50 py-16 md:py-20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-400 mb-3">Hassle-Free</p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-stone-900">
                30-Day Returns
              </h2>
              <p className="font-body text-sm text-stone-400 mt-3 max-w-md mx-auto">
                Not happy with your purchase? We'll sort it — no stress, no hoops.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-stone-200 z-0" />

              {returnSteps.map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  {...fadeUp(i * 0.1)}
                  className="relative z-10 flex flex-col items-center text-center px-4 pb-8"
                >
                  <div className="w-16 h-16 bg-stone-900 text-white flex items-center justify-center font-display text-xl font-light mb-5">
                    {step}
                  </div>
                  <h3 className="font-display text-xl font-light text-stone-900 mb-2">{title}</h3>
                  <p className="font-body text-xs text-stone-500 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Policy details */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

            {/* Return policy table */}
            <motion.div {...fadeUp()}>
              <h2 className="font-display text-3xl font-light text-stone-900 mb-7">
                Return Policy at a Glance
              </h2>
              <div className="divide-y divide-stone-100">
                {returnPolicy.map(({ label, value }) => (
                  <div key={label} className="flex gap-6 py-4">
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-36 shrink-0 pt-0.5">
                      {label}
                    </span>
                    <span className="font-body text-sm text-stone-700 leading-relaxed">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Non-returnable items */}
            <motion.div {...fadeUp(0.1)}>
              <h2 className="font-display text-3xl font-light text-stone-900 mb-7">
                Non-Returnable Items
              </h2>
              <div className="bg-red-50 border border-red-100 p-6 mb-6 flex gap-3">
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <p className="font-body text-xs text-red-600 leading-relaxed">
                  The following items cannot be returned for hygiene or personalisation reasons. Please check size guides carefully before ordering.
                </p>
              </div>
              <ul className="space-y-3">
                {nonReturnItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2 shrink-0" />
                    <span className="font-body text-sm text-stone-600">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-emerald-50 border border-emerald-100 p-5 flex gap-3">
                <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-medium text-emerald-800 mb-1">
                    Received a damaged or wrong item?
                  </p>
                  <p className="font-body text-xs text-emerald-600 leading-relaxed">
                    This is completely different — WhatsApp us within 48 hours with a photo and we'll send a replacement or full refund immediately, no questions asked.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="bg-stone-900 py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <h2 className="font-display text-4xl font-light text-white text-center mb-12">
              Common Questions
            </h2>
            <div className="divide-y divide-stone-700">
              {faqs.map(({ q, a }, i) => (
                <motion.div key={i} {...fadeUp(i * 0.06)} className="py-6">
                  <p className="font-display text-lg font-light text-white mb-2">{q}</p>
                  <p className="font-body text-sm text-stone-400 leading-relaxed">{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 border-b border-stone-100">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-3xl font-light text-stone-900 mb-1">
                Still have questions?
              </h3>
              <p className="font-body text-sm text-stone-400">
                Our team is online 7 days a week, 10am – 9pm.
              </p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hi, I have a question about shipping or returns."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary gap-2 shrink-0"
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}