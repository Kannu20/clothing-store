"use client";
export default function MarqueeBar() {
  const items = [
    "Free Shipping Over ₹2,999",
    "New Arrivals Weekly",
    "100% Authentic Fabrics",
    "Easy WhatsApp Ordering",
    "Premium Quality Guaranteed",
    "Hassle-Free Returns",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="bg-stone-900 text-white overflow-hidden py-3.5">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="font-body text-xs tracking-[0.2em] uppercase mx-10 text-stone-300">
            <span className="text-stone-500 mr-10">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
