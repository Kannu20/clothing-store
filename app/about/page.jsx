"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Award, Leaf, Heart, Users, Package, Star } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const stats = [
  { value: "12+", label: "Years of Craft" },
  { value: "40K+", label: "Happy Customers" },
  { value: "500+", label: "Premium Styles" },
  { value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    Icon: Award,
    title: "Uncompromising Quality",
    desc: "Every piece in our collection is sourced from certified mills and crafted by skilled artisans. We never cut corners — from the thread count to the final stitch.",
  },
  {
    Icon: Leaf,
    title: "Conscious Fashion",
    desc: "We partner with suppliers who share our commitment to ethical labour and sustainable practices. Luxury shouldn't cost the earth.",
  },
  {
    Icon: Heart,
    title: "Customer First",
    desc: "From personalised WhatsApp ordering to our no-questions-asked return policy, every decision we make starts and ends with you.",
  },
  {
    Icon: Users,
    title: "Community Rooted",
    desc: "Born in Mumbai, built for India. We celebrate local craftsmanship and work with weavers, embroiderers, and dyers across the country.",
  },
];

const team = [
  {
    name: "Ananya Mehta",
    role: "Founder & Creative Director",
    bio: "Former fashion editor with 15 years at leading publications. Ananya launched LUXE with a single belief — that premium fashion should be accessible to every Indian household.",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  },
  {
    name: "Vikram Nair",
    role: "Head of Design",
    bio: "Trained at NIFT Delhi and mentored in Milan, Vikram brings a global sensibility to every collection while keeping each piece rooted in Indian craftsmanship.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
  },
  {
    name: "Preethi Rajan",
    role: "Operations & Customer Experience",
    bio: "Preethi built our WhatsApp-first ordering system from the ground up. She obsesses over packaging, delivery times, and every touchpoint of the customer journey.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
  },
];

const milestones = [
  { year: "2012", title: "The Beginning", desc: "LUXE opens its first 400 sq ft showroom in Bandra West, Mumbai, with a curated edit of 30 styles." },
  { year: "2015", title: "First Collection", desc: "We launch our own in-house label, working with weavers from Varanasi and embroiderers from Lucknow." },
  { year: "2018", title: "10,000 Customers", desc: "Word-of-mouth growth takes us past 10,000 loyal customers — entirely without paid advertising." },
  { year: "2021", title: "Going Digital", desc: "We launch WhatsApp ordering, making it effortless for customers nationwide to shop our collections." },
  { year: "2023", title: "New Showroom", desc: "A larger, redesigned flagship opens — 3,000 sq ft of curated luxury in the heart of Bandra West." },
  { year: "2025", title: "Online Store", desc: "LUXE goes fully digital with this website — bringing our premium experience to every corner of India." },
];

const press = [
  { name: "Vogue India", quote: "One of Mumbai's best-kept fashion secrets." },
  { name: "Harper's Bazaar", quote: "The label redefining accessible luxury in India." },
  { name: "Elle India", quote: "A masterclass in understated elegance." },
  { name: "Femina", quote: "The store every style-conscious woman needs to know." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── 1. HERO ─────────────────────────────────── */}
        <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          </div>
          <div className="relative h-full max-w-screen-xl mx-auto px-8 md:px-12 flex flex-col justify-end pb-24">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-body text-xs tracking-[0.35em] uppercase text-white/60 mb-5"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-light text-white leading-none mb-8"
            >
              Dressed in<br />Purpose
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.35 }}
              className="font-body text-base text-white/70 max-w-md leading-relaxed"
            >
              Born in Mumbai. Inspired by India. Built for the world. LUXE is more than a clothing store — it's a philosophy of dressing with intention.
            </motion.p>
          </div>
        </section>

        {/* ── 2. STATS BAR ────────────────────────────── */}
        <section className="bg-stone-900">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y-2 md:divide-y-0 md:divide-x divide-stone-700">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center py-6 md:py-2"
                >
                  <span className="font-display text-5xl md:text-6xl font-light text-white mb-2">
                    {value}
                  </span>
                  <span className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-400">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. OUR STORY ────────────────────────────── */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <p className="section-subtitle">Who We Are</p>
              <h2 className="section-title mb-8">A Store Built on Obsession</h2>
              <div className="space-y-5 font-body text-sm text-stone-500 leading-[1.85]">
                <p>
                  LUXE started in 2012 as a 400 sq ft showroom in Bandra West, Mumbai. Founder Ananya Mehta had spent over a decade as a fashion editor, watching her readers struggle to find clothing that felt truly premium without requiring a foreign shopping trip or a luxury-brand price tag.
                </p>
                <p>
                  So she built it herself. Starting with a hand-curated selection of 30 styles sourced from Italy, Japan, and India's own heritage textile regions, LUXE quickly earned a devoted following among stylists, architects, and creatives who valued craft over logo.
                </p>
                <p>
                  Today, LUXE houses over 500 styles across Women, Men, and Kids, with an in-house label made in collaboration with artisan communities from Varanasi, Lucknow, and Jaipur. Every piece is chosen or designed with one question in mind: <em>would we be proud to wear this ourselves?</em>
                </p>
              </div>
              <Link href="/shop" className="btn-primary mt-10 inline-flex gap-2 group">
                Explore the Collection
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=85"
                  alt="LUXE Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 bg-champagne px-8 py-6 hidden md:block">
                <p className="font-display text-3xl font-light text-stone-900">Est. 2012</p>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-stone-400 mt-1">
                  Bandra West, Mumbai
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 4. VALUES ───────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="section-subtitle">What We Stand For</p>
              <h2 className="section-title">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="flex flex-col"
                >
                  <div className="w-12 h-12 bg-stone-900 flex items-center justify-center mb-6 shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-light text-stone-900 mb-3">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-stone-500 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. TIMELINE ─────────────────────────────── */}
        <section className="max-w-screen-xl mx-auto px-6 md:px-8 py-20 md:py-28">
          <div className="text-center mb-16">
            <p className="section-subtitle">Our Journey</p>
            <h2 className="section-title">Thirteen Years of LUXE</h2>
          </div>

          <div className="relative">
            {/* Vertical line desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-1/2" />

            <div className="space-y-12 md:space-y-0">
              {milestones.map(({ year, title, desc }, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className={`md:flex md:items-center md:gap-0 relative ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`md:w-[calc(50%-32px)] ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="bg-white border border-stone-100 p-6 md:p-8 hover:border-stone-300 transition-colors">
                        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2 block">
                          {year}
                        </span>
                        <h3 className="font-display text-2xl font-light text-stone-900 mb-3">
                          {title}
                        </h3>
                        <p className="font-body text-sm text-stone-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-stone-900 rounded-full items-center justify-center z-10 shrink-0">
                      <span className="font-body text-[9px] text-white font-medium">{year.slice(2)}</span>
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-[calc(50%-32px)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. TEAM ─────────────────────────────────── */}
        <section className="bg-stone-900 py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-500 mb-4">
                The People Behind LUXE
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white font-light">
                Meet the Team
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map(({ name, role, bio, img }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.12 }}
                  className="group"
                >
                  <div className="aspect-[3/4] overflow-hidden mb-6 bg-stone-800">
                    <img
                      src={img}
                      alt={name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-500 mb-2">
                    {role}
                  </p>
                  <h3 className="font-display text-2xl text-white font-light mb-3">{name}</h3>
                  <p className="font-body text-sm text-stone-400 leading-relaxed">{bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CRAFT FEATURE ────────────────────────── */}
        <section className="grid md:grid-cols-2 min-h-[60vh]">
          <div
            className="relative min-h-72 overflow-hidden"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="bg-champagne flex flex-col justify-center px-10 md:px-16 py-16"
          >
            <p className="section-subtitle">The LUXE Standard</p>
            <h2 className="section-title mb-8">Craft at Every Step</h2>
            <div className="space-y-6">
              {[
                { n: "01", t: "Material Sourcing", d: "We visit mills in Italy, Japan, and India personally. If we wouldn't wear the fabric ourselves, it doesn't make the cut." },
                { n: "02", t: "Artisan Production", d: "Each garment is made by skilled craftspeople in certified workshops with fair wages and safe working conditions." },
                { n: "03", t: "Quality Control", d: "Every piece passes a 22-point inspection before it reaches you. Stitching, finishing, colour-fastness — nothing is overlooked." },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-5">
                  <span className="font-display text-3xl font-light text-stone-300 shrink-0 leading-none mt-1">
                    {n}
                  </span>
                  <div>
                    <p className="font-display text-xl font-light text-stone-900 mb-1">{t}</p>
                    <p className="font-body text-sm text-stone-500 leading-relaxed">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── 8. PRESS ────────────────────────────────── */}
        <section className="py-16 md:py-20 border-b border-stone-100">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8">
            <p className="text-center section-subtitle mb-10">As Seen In</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {press.map(({ name, quote }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col items-center text-center p-6 border border-stone-100 hover:border-stone-300 transition-colors"
                >
                  <p className="font-display text-xl font-light text-stone-900 mb-3">{name}</p>
                  <p className="font-body text-xs text-stone-400 italic leading-relaxed">"{quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. CTA ──────────────────────────────────── */}
        <section className="bg-stone-900 py-20 md:py-28">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <p className="font-body text-xs tracking-[0.35em] uppercase text-stone-500 mb-5">
                Ready to Experience LUXE?
              </p>
              <h2 className="font-display text-5xl md:text-7xl text-white font-light leading-tight mb-10">
                Shop the Collection
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/shop" className="btn-primary bg-white text-stone-900 hover:bg-stone-100 gap-2">
                  Browse All Styles <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-outline border-stone-500 text-stone-300 hover:bg-stone-700 hover:border-stone-700">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}