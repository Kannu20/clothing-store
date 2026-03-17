"use client"
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* Newsletter */}
      <div className="border-b border-stone-800">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-500 mb-2">
              Stay in the loop
            </p>
            <h3 className="font-display text-3xl md:text-4xl text-white font-light">
              Subscribe to our newsletter
            </h3>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full md:w-auto gap-0"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 bg-stone-800 border border-stone-700 text-white px-5 py-3.5 font-body text-sm placeholder:text-stone-500 focus:outline-none focus:border-stone-500"
            />
            <button
              type="submit"
              className="bg-white text-stone-900 px-6 py-3.5 font-body text-xs tracking-widest uppercase font-medium hover:bg-stone-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="font-display text-4xl text-white font-light tracking-widest uppercase mb-6">
              Luxe
            </h2>
            <p className="font-body text-sm text-stone-400 leading-relaxed mb-6">
              Curated luxury fashion crafted for the discerning individual. Quality, elegance, and timeless style — delivered to your door.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:border-white hover:text-white transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-white mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {[
                ["New Arrivals", "/shop?tag=New Arrival"],
                ["Women", "/shop?category=Women"],
                ["Men", "/shop?category=Men"],
                ["Kids", "/shop?category=Kids"],
                ["Sale", "/shop"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-body text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-white mb-6">
              Help
            </h4>

            <ul className="space-y-3">

              <li>
                <a
                  href="/size-guide"
                  className="font-body text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Size Guide
                </a>
              </li>

              <li>
                <a
                  href="/shipping-returns"
                  className="font-body text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>

              <li>
                <a
                  href="/order-tracking"
                  className="font-body text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Order Tracking
                </a>
              </li>

              <li>
                <a
                  href="/faqs"
                  className="font-body text-sm text-stone-400 hover:text-white transition-colors"
                >
                  FAQs
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="font-body text-sm text-stone-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>

            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-white mb-6">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-stone-500 shrink-0 mt-0.5" />
                <span className="font-body text-sm text-stone-400">
                  23, Fashion Street, Bandra West,<br />Mumbai — 400050
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-stone-500 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="font-body text-sm text-stone-400 hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-stone-500 shrink-0" />
                <a
                  href="mailto:hello@luxestore.in"
                  className="font-body text-sm text-stone-400 hover:text-white transition-colors"
                >
                  hello@luxestore.in
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-stone-800 rounded-sm">
              <p className="font-body text-xs text-stone-400 mb-1 uppercase tracking-wider">Store Hours</p>
              <p className="font-body text-sm text-stone-300">Mon – Sat: 10am – 9pm</p>
              <p className="font-body text-sm text-stone-300">Sunday: 11am – 7pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-stone-800">
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-stone-600">
            © {new Date().getFullYear()} Luxe Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
              <a key={item} href="#" className="font-body text-xs text-stone-600 hover:text-stone-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
