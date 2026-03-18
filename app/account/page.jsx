"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Package, Heart, MapPin, LogOut, ShieldCheck, ChevronRight, AlertCircle } from "lucide-react";
import Navbar from "/components/layout/Navbar";
import Footer from "/components/layout/Footer";
import { useAuth } from "/contexts/AuthContext";
import { useStore } from "/lib/store";

export default function AccountPage() {
  const router = useRouter();
  const { user, dbUser, loading, isLoggedIn, logout } = useAuth();
  const wishlistCount = useStore((s) => s.wishlist.length);
  const cartCount     = useStore((s) => s.cartCount());

  useEffect(() => {
    if (!loading && !isLoggedIn) router.replace("/login");
  }, [isLoggedIn, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (loading || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-stone-200 border-t-stone-700 rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = dbUser?.name || user?.displayName || "Customer";
  const email       = dbUser?.email || user?.email || "";
  const avatar      = dbUser?.avatar || user?.photoURL || "";
  const provider    = dbUser?.provider || "email";
  const verified    = dbUser?.emailVerified || user?.emailVerified || false;
  const initials    = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const quickLinks = [
    { icon: Package, label: "Track Orders",   href: "/order-tracking", badge: null },
    { icon: Heart,   label: "My Wishlist",     href: "/wishlist",       badge: wishlistCount || null },
    { icon: MapPin,  label: "Saved Addresses", href: "/account",        badge: dbUser?.addresses?.length || null },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16 min-h-[70vh]">

        {/* Header */}
        <div className="mb-10">
          <p className="section-subtitle">My Account</p>
          <h1 className="section-title">Welcome back</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Profile card ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-stone-900 p-8 text-center">
              {/* Avatar */}
              <div className="mx-auto mb-5 relative w-20 h-20">
                {avatar ? (
                  <img src={avatar} alt={displayName} className="w-20 h-20 rounded-full object-cover border-2 border-stone-700" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-stone-700 flex items-center justify-center">
                    <span className="font-display text-2xl font-light text-white">{initials}</span>
                  </div>
                )}
                {provider === "google" && (
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                    <GoogleIcon size={14} />
                  </span>
                )}
              </div>

              <h2 className="font-display text-2xl font-light text-white mb-1">{displayName}</h2>
              <p className="font-body text-xs text-stone-400 mb-4">{email}</p>

              {/* Verification badge */}
              {!verified && provider === "email" && (
                <div className="flex items-center justify-center gap-2 bg-amber-900/30 border border-amber-700/30 px-3 py-2 mb-4">
                  <AlertCircle size={12} className="text-amber-400" />
                  <p className="font-body text-[10px] text-amber-400">Email not verified</p>
                </div>
              )}
              {verified && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <p className="font-body text-[10px] text-emerald-400 tracking-wider uppercase">Verified</p>
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 mb-6">
                <span className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-500">
                  {provider === "google" ? "Google Account" : "Email Account"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 border border-stone-700 text-stone-400 font-body text-xs tracking-widest uppercase py-3 hover:border-stone-500 hover:text-stone-200 transition-all"
              >
                <LogOut size={13} />
                Sign Out
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-stone-100 mt-px">
              {[
                { label: "Wishlist",  value: wishlistCount },
                { label: "Cart",      value: cartCount },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white py-5 text-center">
                  <p className="font-display text-3xl font-light text-stone-900">{value}</p>
                  <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right panel ──────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
                Quick Access
              </h3>
              <div className="divide-y divide-stone-50 border border-stone-100">
                {quickLinks.map(({ icon: Icon, label, href, badge }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-between px-6 py-5 hover:bg-stone-50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                        <Icon size={16} className="text-stone-600" />
                      </div>
                      <span className="font-body text-sm text-stone-700">{label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {badge > 0 && (
                        <span className="w-5 h-5 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                          {badge}
                        </span>
                      )}
                      <ChevronRight size={15} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Account details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
                Account Details
              </h3>
              <div className="border border-stone-100 divide-y divide-stone-50">
                {[
                  { label: "Full Name",    value: displayName },
                  { label: "Email",        value: email },
                  { label: "Phone",        value: dbUser?.phone || "—" },
                  { label: "Member Since", value: dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "—" },
                  { label: "Auth Method",  value: provider === "google" ? "Google Sign-In" : "Email & Password" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-6 py-4">
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">{label}</span>
                    <span className="font-body text-sm text-stone-700 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Saved addresses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
                Saved Addresses
              </h3>
              {dbUser?.addresses?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dbUser.addresses.map((addr, i) => (
                    <div key={i} className="border border-stone-100 p-5">
                      <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-2">{addr.label}</p>
                      <p className="font-body text-sm text-stone-800 font-medium">{addr.phone}</p>
                      <p className="font-body text-xs text-stone-500 leading-relaxed mt-1">
                        {addr.line1}, {addr.city} — {addr.pincode}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-stone-100 p-8 text-center">
                  <MapPin size={32} className="text-stone-200 mx-auto mb-3" strokeWidth={1} />
                  <p className="font-body text-sm text-stone-400">No saved addresses yet.</p>
                  <p className="font-body text-xs text-stone-300 mt-1">
                    Addresses are saved automatically when you place an order.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Shop CTA */}
            <div className="bg-stone-50 border border-stone-100 p-7 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-light text-stone-900 mb-1">Continue Shopping</p>
                <p className="font-body text-xs text-stone-400">Explore new arrivals and trending styles</p>
              </div>
              <Link href="/shop" className="btn-primary shrink-0 gap-2">
                Shop Now <ChevronRight size={13} />
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function GoogleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  );
}