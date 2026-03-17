"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Instagram, Facebook, Twitter, Send, CheckCircle
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { SHOP_WHATSAPP } from "../../lib/products";
 
const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our collection, add items to your cart, and proceed to checkout. Your order is sent directly to us via WhatsApp — no account needed.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfer, and cash on delivery (COD) for select locations. Payment details are shared after order confirmation on WhatsApp.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–5 business days within India. Express delivery (1–2 days) is available for most metro cities.",
  },
  {
    q: "What is your return policy?",
    a: "We offer hassle-free 30-day returns on all unworn items in their original packaging. Simply WhatsApp us and we'll arrange a pickup.",
  },
  {
    q: "Do you ship internationally?",
    a: "Currently we ship within India only. International shipping is coming soon — follow us on Instagram for updates.",
  },
  {
    q: "How do I check my order status?",
    a: "After placing your order via WhatsApp, our team will send you a tracking link within 24 hours of dispatch.",
  },
];
 
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
 
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
 
    // Build a WhatsApp message from the contact form
    const msg =
      `📩 *CONTACT FORM — LUXE STORE*\n\n` +
      `👤 Name: ${form.name}\n` +
      `📧 Email: ${form.email}\n` +
      (form.phone ? `📞 Phone: ${form.phone}\n` : "") +
      (form.subject ? `📌 Subject: ${form.subject}\n` : "") +
      `\n💬 Message:\n${form.message}`;
 
    window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };
 
  const contactInfo = [
    {
      Icon: MapPin,
      label: "Visit Us",
      lines: ["23, Fashion Street, Bandra West", "Mumbai — 400050, Maharashtra"],
    },
    {
      Icon: Phone,
      label: "Call / WhatsApp",
      lines: ["+91 98765 43210"],
      href: `tel:+919876543210`,
    },
    {
      Icon: Mail,
      label: "Email Us",
      lines: ["hello@luxestore.in"],
      href: "mailto:hello@luxestore.in",
    },
    {
      Icon: Clock,
      label: "Store Hours",
      lines: ["Mon – Sat: 10am – 9pm", "Sunday: 11am – 7pm"],
    },
  ];
 
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80)",
            }}
          >
            <div className="absolute inset-0 bg-black/55" />
          </div>
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-xs tracking-[0.35em] uppercase text-white/60 mb-4"
            >
              We'd love to hear from you
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-light text-white"
            >
              Get in Touch
            </motion.h1>
          </div>
        </section>
 
        {/* ── Contact Info Cards ────────────────────────── */}
        <section className="bg-cream">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map(({ Icon, label, lines, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white p-7 flex flex-col items-start gap-4 border border-stone-100 hover:border-stone-300 transition-colors"
                >
                  <div className="w-10 h-10 bg-stone-900 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">
                      {label}
                    </p>
                    {lines.map((line, li) =>
                      href && li === 0 ? (
                        <a
                          key={li}
                          href={href}
                          className="block font-body text-sm text-stone-700 hover:text-stone-900 transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={li} className="font-body text-sm text-stone-700">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
 
        {/* ── Map + Form ───────────────────────────────── */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <p className="section-subtitle">Send a Message</p>
              <h2 className="section-title mb-8">Let's Talk</h2>
 
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-16 px-8 bg-stone-50 border border-stone-100"
                >
                  <CheckCircle size={52} className="text-emerald-500 mb-5" strokeWidth={1.5} />
                  <h3 className="font-display text-3xl font-light text-stone-900 mb-3">
                    Message Sent!
                  </h3>
                  <p className="font-body text-sm text-stone-500 mb-6">
                    Your message has been forwarded to our WhatsApp. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                    className="btn-outline"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                    {/* Name */}
                    <div>
                      <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: "" })); }}
                        placeholder="Your name"
                        className={`input-field ${errors.name ? "border-red-400" : ""}`}
                      />
                      {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>
 
                    {/* Email */}
                    <div>
                      <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => { setForm((p) => ({ ...p, email: e.target.value })); setErrors((p) => ({ ...p, email: "" })); }}
                        placeholder="your@email.com"
                        className={`input-field ${errors.email ? "border-red-400" : ""}`}
                      />
                      {errors.email && <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>
 
                  {/* Phone */}
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                      Phone Number (optional)
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+91 XXXXX XXXXX"
                      className="input-field"
                    />
                  </div>
 
                  {/* Subject */}
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      className="input-field bg-transparent cursor-pointer"
                    >
                      <option value="">Select a topic…</option>
                      <option>Order Enquiry</option>
                      <option>Product Question</option>
                      <option>Return / Exchange</option>
                      <option>Bulk / Wholesale Order</option>
                      <option>Collaboration</option>
                      <option>Other</option>
                    </select>
                  </div>
 
                  {/* Message */}
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => { setForm((p) => ({ ...p, message: e.target.value })); setErrors((p) => ({ ...p, message: "" })); }}
                      placeholder="Tell us how we can help…"
                      className={`input-field resize-none leading-relaxed ${errors.message ? "border-red-400" : ""}`}
                    />
                    {errors.message && <p className="font-body text-xs text-red-500 mt-1">{errors.message}</p>}
                  </div>
 
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button type="submit" className="btn-primary gap-2">
                      <Send size={13} />
                      Send via WhatsApp
                    </button>
                    <a
                      href={`https://wa.me/${SHOP_WHATSAPP}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline gap-2 text-emerald-700 border-emerald-600 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
                    >
                      <MessageCircle size={13} />
                      Chat Directly
                    </a>
                  </div>
                </form>
              )}
            </motion.div>
 
            {/* Right: Map + Social */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              {/* Map embed (static placeholder styled like a real map) */}
              <div className="relative overflow-hidden bg-stone-100 flex-1 min-h-72">
                <iframe
                  title="Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.9902618533!2d72.8254865!3d19.0583225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8d1f4c1c1c1%3A0x1234567890abcdef!2sBandra%20West%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "280px", filter: "grayscale(30%) contrast(1.05)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Map overlay card */}
                <div className="absolute bottom-4 left-4 bg-white px-5 py-4 shadow-lg max-w-[220px]">
                  <p className="font-display text-lg font-light text-stone-900 mb-1">LUXE Store</p>
                  <p className="font-body text-xs text-stone-500 leading-relaxed">
                    23, Fashion Street<br />Bandra West, Mumbai 400050
                  </p>
                  <a
                    href="https://maps.google.com/?q=Bandra+West+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 font-body text-[10px] tracking-widest uppercase text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
 
              {/* WhatsApp CTA card */}
              <div className="bg-stone-900 p-8 flex items-start gap-5">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <p className="font-display text-2xl text-white font-light mb-2">
                    Prefer WhatsApp?
                  </p>
                  <p className="font-body text-sm text-stone-400 leading-relaxed mb-5">
                    Chat with us directly for the fastest response. Our team is available 7 days a week, 10am – 9pm.
                  </p>
                  <a
                    href={`https://wa.me/${SHOP_WHATSAPP}?text=Hi%20LUXE!%20I%20have%20a%20question.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-500 text-white font-body text-xs tracking-widest uppercase px-6 py-3.5 hover:bg-emerald-400 transition-colors"
                  >
                    <MessageCircle size={13} />
                    Start Chat
                  </a>
                </div>
              </div>
 
              {/* Social links */}
              <div className="border border-stone-100 p-7">
                <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-5">
                  Follow Us
                </p>
                <div className="flex items-center gap-4">
                  {[
                    { Icon: Instagram, label: "Instagram", href: "https://instagram.com", color: "hover:text-pink-500" },
                    { Icon: Facebook, label: "Facebook", href: "https://facebook.com", color: "hover:text-blue-600" },
                    { Icon: Twitter, label: "Twitter / X", href: "https://twitter.com", color: "hover:text-stone-700" },
                  ].map(({ Icon, label, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2.5 font-body text-sm text-stone-500 ${color} transition-colors`}
                    >
                      <Icon size={18} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
 
        {/* ── FAQ ──────────────────────────────────────── */}
        <section className="bg-cream py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <div className="text-center mb-12">
              <p className="section-subtitle">Got Questions?</p>
              <h2 className="section-title">Frequently Asked</h2>
            </div>
 
            <div className="divide-y divide-stone-200">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left gap-6"
                  >
                    <span className="font-display text-lg font-light text-stone-900">
                      {faq.q}
                    </span>
                    <span className="shrink-0 w-6 h-6 border border-stone-300 flex items-center justify-center text-stone-400 font-body text-sm">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>
 
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === i ? "max-h-48 pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="font-body text-sm text-stone-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
 
            {/* Still need help? */}
            <div className="mt-14 text-center">
              <p className="font-body text-sm text-stone-500 mb-5">
                Still have questions? We're happy to help.
              </p>
              <a
                href={`https://wa.me/${SHOP_WHATSAPP}?text=Hi%2C%20I%20have%20a%20question%20about%20LUXE%20Store.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex gap-2"
              >
                <MessageCircle size={14} />
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}