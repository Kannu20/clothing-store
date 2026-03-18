// "use client";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search, ShoppingBag, Heart, Menu, X, ChevronDown
// } from "lucide-react";

// import { products } from "../../lib/products";
// import { useStore } from "../../lib/store";


// export default function Navbar() {
//   const pathname = usePathname();
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const cartCount = useStore((s) => s.cartCount());
//   const wishlistCount = useStore((s) => s.wishlist.length);
//   const searchRef = useRef(null);

//   const navLinks = [
//     {label: "Home", href: "/"},
//     { label: "Shop", href: "/shop" },
//     { label: "About", href: "/about" },
//     { label: "Contact", href: "/contact" },
//   ];

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handler);
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   useEffect(() => {
//     if (searchQuery.trim().length < 2) {
//       setSearchResults([]);
//       return;
//     }
//     const q = searchQuery.toLowerCase();
//     setSearchResults(
//       products
//         .filter(
//           (p) =>
//             p.name.toLowerCase().includes(q) ||
//             p.category.toLowerCase().includes(q) ||
//             p.description.toLowerCase().includes(q)
//         )
//         .slice(0, 5)
//     );
//   }, [searchQuery]);

//   // Close search on outside click
//   useEffect(() => {
//     const handler = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setSearchOpen(false);
//         setSearchQuery("");
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const isHome = pathname === "/";

//   return (
//     <>
//       {/* Announcement bar */}
//       <div className="bg-stone-900 text-white text-center py-2.5 font-body text-[10px] tracking-[0.25em] uppercase">
//         Free Shipping on Orders Above ₹2,999 &nbsp;·&nbsp; Use Code{" "}
//         <span className="font-medium">LUXE10</span> for 10% Off
//       </div>

//       <header
//         className={`sticky top-0 z-50 transition-all duration-300 ${
//           scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
//         }`}
//       >
//         <nav className="max-w-screen-xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
//           {/* Left: nav links (desktop) */}
//           <div className="hidden lg:flex items-center gap-8">
//             {navLinks.map((l) => (
//               <Link
//                 key={l.label}
//                 href={l.href}
//                 className="font-body text-xs tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900 transition-colors relative group"
//               >
//                 {l.label}
//                 <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
//               </Link>
//             ))}
//           </div>

//           {/* Center: Logo */}
//           <Link
//             href="/"
//             className="absolute left-1/2 -translate-x-1/2 font-display text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-stone-900"
//           >
//             Luxe
//           </Link>

//           {/* Right: icons */}
//           <div className="flex items-center gap-3 md:gap-5 ml-auto">
//             {/* Search */}
//             <button
//               onClick={() => setSearchOpen(true)}
//               className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
//               aria-label="Search"
//             >
//               <Search size={18} />
//             </button>

//             {/* Wishlist */}
//             <Link
//               href="/wishlist"
//               className="relative p-1 text-stone-600 hover:text-stone-900 transition-colors"
//               aria-label="Wishlist"
//             >
//               <Heart size={18} />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
//                   {wishlistCount}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link
//               href="/cart"
//               className="relative p-1 text-stone-600 hover:text-stone-900 transition-colors"
//               aria-label="Cart"
//             >
//               <ShoppingBag size={18} />
//               {cartCount > 0 && (
//                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {/* Mobile menu */}
//             <button
//               className="lg:hidden p-1 text-stone-600 hover:text-stone-900"
//               onClick={() => setMobileOpen(true)}
//               aria-label="Menu"
//             >
//               <Menu size={20} />
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Search overlay */}
//       <AnimatePresence>
//         {searchOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ y: -40, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -40, opacity: 0 }}
//               ref={searchRef}
//               className="bg-white w-full max-w-2xl mx-auto mt-24 md:mt-32 rounded-none shadow-2xl"
//             >
//               <div className="flex items-center gap-4 px-6 py-4 border-b border-stone-100">
//                 <Search size={18} className="text-stone-400 shrink-0" />
//                 <input
//                   autoFocus
//                   type="text"
//                   placeholder="Search products…"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="flex-1 font-body text-base text-stone-900 placeholder:text-stone-300 bg-transparent focus:outline-none"
//                 />
//                 <button
//                   onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
//                   className="text-stone-400 hover:text-stone-700"
//                 >
//                   <X size={18} />
//                 </button>
//               </div>

//               {searchResults.length > 0 && (
//                 <ul className="divide-y divide-stone-50">
//                   {searchResults.map((p) => (
//                     <li key={p.id}>
//                       <Link
//                         href={`/product/${p.id}`}
//                         onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
//                         className="flex items-center gap-4 px-6 py-3 hover:bg-stone-50 transition-colors"
//                       >
//                         <img
//                           src={p.images[0]}
//                           alt={p.name}
//                           className="w-12 h-14 object-cover"
//                         />
//                         <div>
//                           <p className="font-body text-sm text-stone-900">{p.name}</p>
//                           <p className="font-body text-xs text-stone-400 mt-0.5">
//                             {p.category} · ₹{p.price.toLocaleString()}
//                           </p>
//                         </div>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               {searchQuery.length > 1 && searchResults.length === 0 && (
//                 <p className="px-6 py-6 font-body text-sm text-stone-400 text-center">
//                   No results for "{searchQuery}"
//                 </p>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Mobile menu */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileOpen(false)}
//               className="fixed inset-0 z-[70] bg-black/50"
//             />
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "tween", duration: 0.3 }}
//               className="fixed top-0 right-0 bottom-0 z-[80] w-72 bg-white flex flex-col"
//             >
//               <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
//                 <span className="font-display text-xl tracking-widest uppercase">Luxe</span>
//                 <button onClick={() => setMobileOpen(false)}>
//                   <X size={20} className="text-stone-500" />
//                 </button>
//               </div>
//               <nav className="flex-1 px-6 py-8 space-y-6">
//                 {navLinks.map((l) => (
//                   <Link
//                     key={l.label}
//                     href={l.href}
//                     onClick={() => setMobileOpen(false)}
//                     className="block font-body text-sm tracking-[0.15em] uppercase text-stone-700 hover:text-stone-900"
//                   >
//                     {l.label}
//                   </Link>
//                 ))}
//                 <hr className="border-stone-100" />
//                 <Link href="/wishlist" onClick={() => setMobileOpen(false)}
//                   className="flex items-center gap-3 font-body text-sm text-stone-700">
//                   <Heart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
//                 </Link>
//                 <Link href="/cart" onClick={() => setMobileOpen(false)}
//                   className="flex items-center gap-3 font-body text-sm text-stone-700">
//                   <ShoppingBag size={16} /> Cart {cartCount > 0 && `(${cartCount})`}
//                 </Link>
//               </nav>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ShoppingBag, Heart, Menu, X, User, LogOut,
  ChevronDown, Package, Settings
} from "lucide-react";
import { useStore } from "/lib/store";
import { products } from "/lib/products";
import { useAuth } from "/contexts/AuthContext";

export default function Navbar() {
  const pathname  = usePathname();
  const router    = useRouter();
  const { user, dbUser, isLoggedIn, logout } = useAuth();

  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]      = useState(false);
  const [searchOpen,     setSearchOpen]      = useState(false);
  const [searchQuery,    setSearchQuery]     = useState("");
  const [searchResults,  setSearchResults]   = useState([]);
  const [userMenuOpen,   setUserMenuOpen]    = useState(false);

  const cartCount     = useStore((s) => s.cartCount());
  const wishlistCount = useStore((s) => s.wishlist.length);
  const searchRef     = useRef(null);
  const userMenuRef   = useRef(null);

  const navLinks = [
    { label: "Home",   href: "/" },
    { label: "Shop",    href: "/shop" },
    { label: "About",   href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Scroll listener
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Live search
  useEffect(() => {
    if (searchQuery.trim().length < 2) { setSearchResults([]); return; }
    const q = searchQuery.toLowerCase();
    setSearchResults(
      products
        .filter((p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        )
        .slice(0, 5)
    );
  }, [searchQuery]);

  // Close search + user menu on outside click
  useEffect(() => {
    const h = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false); setSearchQuery("");
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    router.push("/");
  };

  const displayName = dbUser?.name || user?.displayName || "Account";
  const avatar      = dbUser?.avatar || user?.photoURL || "";
  const initials    = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-stone-900 text-white text-center py-2.5 font-body text-[10px] tracking-[0.25em] uppercase">
        Free Shipping on Orders Above ₹2,999 &nbsp;·&nbsp; Use Code{" "}
        <span className="font-medium">LUXE10</span> for 10% Off
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
      >
        <nav className="max-w-screen-xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">

          {/* Left: nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-body text-xs tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900 transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-2xl md:text-3xl font-light tracking-[0.3em] uppercase text-stone-900"
          >
            Luxe
          </Link>

          {/* Right: icons */}
          <div className="flex items-center gap-3 md:gap-4 ml-auto">

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-1 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-1 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* ── User / Auth button ── */}
            {isLoggedIn ? (
              /* Logged-in avatar + dropdown */
              <div className="relative hidden lg:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((p) => !p)}
                  className="flex items-center gap-2 p-1 hover:opacity-80 transition-opacity"
                  aria-label="Account"
                >
                  {avatar ? (
                    <img src={avatar} alt={displayName} className="w-7 h-7 rounded-full object-cover border border-stone-200" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-stone-900 flex items-center justify-center">
                      <span className="font-body text-[10px] text-white font-medium">{initials}</span>
                    </div>
                  )}
                  <ChevronDown
                    size={12}
                    className={`text-stone-500 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 top-full mt-3 w-56 bg-white border border-stone-100 shadow-xl z-50"
                    >
                      {/* User info */}
                      <div className="px-4 py-3.5 border-b border-stone-50">
                        <p className="font-body text-xs font-medium text-stone-900 truncate">{displayName}</p>
                        <p className="font-body text-[10px] text-stone-400 truncate mt-0.5">
                          {dbUser?.email || user?.email}
                        </p>
                      </div>

                      {/* Menu items */}
                      <div className="py-1.5">
                        {[
                          { Icon: User,    label: "My Account",    href: "/account" },
                          { Icon: Package, label: "Track Orders",  href: "/order-tracking" },
                          { Icon: Heart,   label: "Wishlist",      href: "/wishlist", badge: wishlistCount },
                        ].map(({ Icon, label, href, badge }) => (
                          <Link
                            key={label}
                            href={href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 font-body text-xs text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                          >
                            <span className="flex items-center gap-3">
                              <Icon size={14} className="text-stone-400" />
                              {label}
                            </span>
                            {badge > 0 && (
                              <span className="w-4 h-4 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center">
                                {badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      {/* Sign out */}
                      <div className="border-t border-stone-50 py-1.5">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 font-body text-xs text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Not logged in — Login button (desktop only) */
              <Link
                href="/signup"
                className="hidden lg:flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-stone-600 hover:text-stone-900 transition-colors border border-stone-200 px-4 py-2 hover:border-stone-500"
              >
                <User size={13} />
                Sign In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-1 text-stone-600 hover:text-stone-900"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Search overlay ─────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              ref={searchRef}
              className="bg-white w-full max-w-2xl mx-auto mt-24 md:mt-32 shadow-2xl"
            >
              <div className="flex items-center gap-4 px-6 py-4 border-b border-stone-100">
                <Search size={18} className="text-stone-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 font-body text-base text-stone-900 placeholder:text-stone-300 bg-transparent focus:outline-none"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X size={18} />
                </button>
              </div>

              {searchResults.length > 0 && (
                <ul className="divide-y divide-stone-50">
                  {searchResults.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/product/${p.id}`}
                        onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                        className="flex items-center gap-4 px-6 py-3 hover:bg-stone-50 transition-colors"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-12 h-14 object-cover" />
                        <div>
                          <p className="font-body text-sm text-stone-900">{p.name}</p>
                          <p className="font-body text-xs text-stone-400 mt-0.5">
                            {p.category} · ₹{p.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {searchQuery.length > 1 && searchResults.length === 0 && (
                <p className="px-6 py-6 font-body text-sm text-stone-400 text-center">
                  No results for "{searchQuery}"
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[70] bg-black/50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-[80] w-72 bg-white flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
                <span className="font-display text-xl tracking-widest uppercase">Luxe</span>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={20} className="text-stone-500" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-8 space-y-5 overflow-y-auto">
                {/* Auth status */}
                {isLoggedIn ? (
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                    {avatar ? (
                      <img src={avatar} alt={displayName} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center">
                        <span className="font-body text-xs text-white">{initials}</span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-body text-sm font-medium text-stone-900 truncate">{displayName}</p>
                      <Link
                        href="/account"
                        onClick={() => setMobileOpen(false)}
                        className="font-body text-xs text-stone-400 hover:text-stone-700 underline"
                      >
                        View Account
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-3 mb-6 pb-6 border-b border-stone-100">
                    <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 btn-primary text-center justify-center py-3 text-xs">
                      Sign In
                    </Link>
                    <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex-1 btn-outline text-center justify-center py-3 text-xs">
                      Sign Up
                    </Link>
                  </div>
                )}

                {/* Nav links */}
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-body text-sm tracking-[0.15em] uppercase text-stone-700 hover:text-stone-900"
                  >
                    {l.label}
                  </Link>
                ))}

                <hr className="border-stone-100" />

                <Link href="/wishlist" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 font-body text-sm text-stone-700">
                  <Heart size={16} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>
                <Link href="/cart" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 font-body text-sm text-stone-700">
                  <ShoppingBag size={16} /> Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
                <Link href="/order-tracking" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 font-body text-sm text-stone-700">
                  <Package size={16} /> Track Order
                </Link>

                {isLoggedIn && (
                  <>
                    <hr className="border-stone-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 font-body text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}