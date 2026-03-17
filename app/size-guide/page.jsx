"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Ruler, ChevronDown, ChevronUp, Info } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Link from "next/link";

const tabs = ["Women", "Men", "Kids"];

const womenSizes = {
  title: "Women's Clothing",
  note: "All measurements in centimetres (cm). For in-between sizes, size up.",
  headers: ["Size", "Bust", "Waist", "Hips", "UK", "US", "EU"],
  rows: [
    ["XS", "80–83",  "62–65",  "88–91",  "6",  "2",  "34"],
    ["S",  "84–87",  "66–69",  "92–95",  "8",  "4",  "36"],
    ["M",  "88–92",  "70–74",  "96–100", "10", "6",  "38"],
    ["L",  "93–97",  "75–79",  "101–105","12", "8",  "40"],
    ["XL", "98–103", "80–85",  "106–111","14", "10", "42"],
    ["XXL","104–109","86–92",  "112–118","16", "12", "44"],
  ],
};

const womenShoes = {
  title: "Women's Shoes",
  headers: ["UK", "EU", "US", "Foot Length (cm)"],
  rows: [
    ["3",   "36", "5",   "22.5"],
    ["4",   "37", "6",   "23.5"],
    ["5",   "38", "7",   "24.0"],
    ["6",   "39", "8",   "24.5"],
    ["7",   "40", "9",   "25.5"],
    ["8",   "41", "10",  "26.0"],
  ],
};

const menSizes = {
  title: "Men's Clothing",
  note: "All measurements in centimetres (cm).",
  headers: ["Size", "Chest", "Waist", "Hips", "UK/US", "EU"],
  rows: [
    ["S",   "88–92",  "74–78",  "88–92",  "36", "46"],
    ["M",   "94–98",  "80–84",  "94–98",  "38", "48"],
    ["L",   "100–104","86–90",  "100–104","40", "50"],
    ["XL",  "106–110","92–97",  "106–110","42", "52"],
    ["XXL", "112–117","98–104", "112–117","44", "54"],
  ],
};

const menTrousers = {
  title: "Men's Trousers — Waist",
  headers: ["Waist (in)", "Waist (cm)", "Typical UK/US Size"],
  rows: [
    ["28", "71", "XS"],
    ["30", "76", "S"],
    ["32", "81", "M"],
    ["34", "86", "L"],
    ["36", "91", "XL"],
    ["38", "96", "XXL"],
  ],
};

const kidsSizes = {
  title: "Kids' Clothing",
  note: "Sizes based on age and height. Always measure your child.",
  headers: ["Age", "Height (cm)", "Chest (cm)", "Waist (cm)", "Size Label"],
  rows: [
    ["2Y",  "86–92",  "52–54", "50–51", "2Y"],
    ["3Y",  "92–98",  "54–56", "51–52", "3Y"],
    ["4Y",  "98–104", "56–58", "52–53", "4Y"],
    ["5Y",  "104–110","58–60", "53–54", "5Y"],
    ["6Y",  "110–116","60–63", "54–55", "6Y"],
    ["8Y",  "122–128","65–68", "56–58", "8Y"],
    ["10Y", "134–140","70–73", "59–61", "10Y"],
    ["12Y", "146–152","75–79", "62–64", "12Y"],
  ],
};

const howToMeasure = [
  {
    title: "Bust / Chest",
    desc: "Measure around the fullest part of your bust/chest, keeping the tape parallel to the ground. Don't pull it tight — keep it comfortably snug.",
    icon: "📏",
  },
  {
    title: "Waist",
    desc: "Measure around your natural waistline — the narrowest part of your torso, usually about 2–3 cm above your belly button.",
    icon: "📐",
  },
  {
    title: "Hips",
    desc: "Stand with feet together and measure around the fullest part of your hips, approximately 20 cm below your natural waist.",
    icon: "📏",
  },
  {
    title: "Inside Leg (Inseam)",
    desc: "Measure from the crotch seam down the inside of your leg to the ankle bone. Best done with a friend.",
    icon: "📐",
  },
];

function SizeTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <h3 className="font-display text-2xl font-light text-stone-900 mb-1">
        {data.title}
      </h3>
      {data.note && (
        <p className="font-body text-xs text-stone-400 mb-4">{data.note}</p>
      )}
      <table className="w-full text-left border-collapse mb-10">
        <thead>
          <tr className="bg-stone-900">
            {data.headers.map((h) => (
              <th key={h} className="font-body text-[10px] tracking-[0.15em] uppercase text-white px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${
                i % 2 === 0 ? "bg-white" : "bg-stone-50/50"
              }`}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`font-body text-sm px-4 py-3 ${
                    j === 0
                      ? "text-stone-900 font-medium"
                      : "text-stone-600"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState("Women");

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-stone-900 py-16 md:py-20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-800 mb-6">
                <Ruler size={24} className="text-white" />
              </div>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-stone-500 mb-4">
                Find Your Perfect Fit
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-light text-white mb-4">
                Size Guide
              </h1>
              <p className="font-body text-sm text-stone-400 max-w-lg mx-auto">
                Every LUXE garment is cut to precise measurements. Use this guide to find your size before ordering — or{" "}
                <a href={`https://wa.me/919876543210?text=Hi, I need help finding my size at LUXE.`} target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2">
                  WhatsApp us
                </a>{" "}
                and we'll help personally.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab bar */}
        <div className="sticky top-[72px] z-30 bg-white border-b border-stone-100 shadow-sm">
          <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-body text-xs tracking-[0.2em] uppercase px-8 py-4 border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-stone-900 text-stone-900"
                    : "border-transparent text-stone-400 hover:text-stone-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-12 md:py-16">

          {/* Women */}
          {activeTab === "Women" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <SizeTable data={womenSizes} />
              <SizeTable data={womenShoes} />
            </motion.div>
          )}

          {/* Men */}
          {activeTab === "Men" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <SizeTable data={menSizes} />
              <SizeTable data={menTrousers} />
            </motion.div>
          )}

          {/* Kids */}
          {activeTab === "Kids" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <SizeTable data={kidsSizes} />
            </motion.div>
          )}

          {/* How to Measure */}
          <section className="mt-4 pt-12 border-t border-stone-100">
            <h2 className="font-display text-3xl font-light text-stone-900 mb-2">
              How to Measure
            </h2>
            <p className="font-body text-sm text-stone-400 mb-10">
              For the most accurate fit, use a flexible measuring tape and measure over light underwear.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howToMeasure.map(({ title, desc, icon }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="bg-stone-50 p-6 border border-stone-100"
                >
                  <span className="text-2xl mb-4 block">{icon}</span>
                  <h3 className="font-display text-lg font-light text-stone-900 mb-2">{title}</h3>
                  <p className="font-body text-xs text-stone-500 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Still unsure CTA */}
          <div className="mt-14 bg-stone-900 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-2">
                Still unsure?
              </p>
              <h3 className="font-display text-3xl font-light text-white">
                We'll find your size for you
              </h3>
              <p className="font-body text-sm text-stone-400 mt-2">
                Send us your measurements on WhatsApp and our team will recommend the perfect size.
              </p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hi! I need help finding my size at LUXE."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary bg-white text-stone-900 hover:bg-stone-100 shrink-0"
            >
              💬 Get Size Help
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}