// "use client";
// import { useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { User, Package, Heart, MapPin, LogOut, ShieldCheck, ChevronRight, AlertCircle } from "lucide-react";
// import Navbar from "/components/layout/Navbar";
// import Footer from "/components/layout/Footer";
// import { useAuth } from "/contexts/AuthContext";
// import { useStore } from "/lib/store";

// export default function AccountPage() {
//   const router = useRouter();
//   const { user, dbUser, loading, isLoggedIn, logout } = useAuth();
//   const wishlistCount = useStore((s) => s.wishlist.length);
//   const cartCount     = useStore((s) => s.cartCount());

//   useEffect(() => {
//     if (!loading && !isLoggedIn) router.replace("/login");
//   }, [isLoggedIn, loading, router]);

//   const handleLogout = async () => {
//     await logout();
//     router.push("/");
//   };

//   if (loading || !isLoggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="w-8 h-8 border-2 border-stone-200 border-t-stone-700 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   const displayName = dbUser?.name || user?.displayName || "Customer";
//   const email       = dbUser?.email || user?.email || "";
//   const avatar      = dbUser?.avatar || user?.photoURL || "";
//   const provider    = dbUser?.provider || "email";
//   const verified    = dbUser?.emailVerified || user?.emailVerified || false;
//   const initials    = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

//   const quickLinks = [
//     { icon: Package, label: "Track Orders",   href: "/order-tracking", badge: null },
//     { icon: Heart,   label: "My Wishlist",     href: "/wishlist",       badge: wishlistCount || null },
//     { icon: MapPin,  label: "Saved Addresses", href: "/account",        badge: dbUser?.addresses?.length || null },
//   ];

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16 min-h-[70vh]">

//         {/* Header */}
//         <div className="mb-10">
//           <p className="section-subtitle">My Account</p>
//           <h1 className="section-title">Welcome back</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

         

//           {/* ── Right panel ──────────────────────────── */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Quick links */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
//                 Quick Access
//               </h3>
//               <div className="divide-y divide-stone-50 border border-stone-100">
//                 {quickLinks.map(({ icon: Icon, label, href, badge }) => (
//                   <Link
//                     key={label}
//                     href={href}
//                     className="flex items-center justify-between px-6 py-5 hover:bg-stone-50 transition-colors group"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-9 h-9 bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
//                         <Icon size={16} className="text-stone-600" />
//                       </div>
//                       <span className="font-body text-sm text-stone-700">{label}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       {badge > 0 && (
//                         <span className="w-5 h-5 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
//                           {badge}
//                         </span>
//                       )}
//                       <ChevronRight size={15} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Account details */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
//                 Account Details
//               </h3>
//               <div className="border border-stone-100 divide-y divide-stone-50">
//                 {[
//                   { label: "Full Name",    value: displayName },
//                   { label: "Email",        value: email },
//                   { label: "Phone",        value: dbUser?.phone || "—" },
//                   { label: "Member Since", value: dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "—" },
//                   { label: "Auth Method",  value: provider === "google" ? "Google Sign-In" : "Email & Password" },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="flex items-center justify-between px-6 py-4">
//                     <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">{label}</span>
//                     <span className="font-body text-sm text-stone-700 text-right">{value}</span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Saved addresses */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
//                 Saved Addresses
//               </h3>
//               {dbUser?.addresses?.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {dbUser.addresses.map((addr, i) => (
//                     <div key={i} className="border border-stone-100 p-5">
//                       <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-2">{addr.label}</p>
//                       <p className="font-body text-sm text-stone-800 font-medium">{addr.phone}</p>
//                       <p className="font-body text-xs text-stone-500 leading-relaxed mt-1">
//                         {addr.line1}, {addr.city} — {addr.pincode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="border border-stone-100 p-8 text-center">
//                   <MapPin size={32} className="text-stone-200 mx-auto mb-3" strokeWidth={1} />
//                   <p className="font-body text-sm text-stone-400">No saved addresses yet.</p>
//                   <p className="font-body text-xs text-stone-300 mt-1">
//                     Addresses are saved automatically when you place an order.
//                   </p>
//                 </div>
//               )}
//             </motion.div>

//             {/* Shop CTA */}
//             <div className="bg-stone-50 border border-stone-100 p-7 flex items-center justify-between gap-4">
//               <div>
//                 <p className="font-display text-2xl font-light text-stone-900 mb-1">Continue Shopping</p>
//                 <p className="font-body text-xs text-stone-400">Explore new arrivals and trending styles</p>
//               </div>
//               <Link href="/shop" className="btn-primary shrink-0 gap-2">
//                 Shop Now <ChevronRight size={13} />
//               </Link>
//             </div>

//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

// function GoogleIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 18 18">
//       <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
//       <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
//       <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
//       <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
//     </svg>
//   );
// }

// "use client";
// import { useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   User, Package, Heart, MapPin, LogOut,
//   ShieldCheck, ChevronRight, AlertCircle,
//   Phone, CheckCircle2, X, RefreshCw, KeyRound
// } from "lucide-react";
// import Navbar from "/components/layout/Navbar";       // ✅ fixed alias
// import Footer from "/components/layout/Footer";       // ✅ fixed alias
// import { useAuth } from "/contexts/AuthContext";       // ✅ fixed alias
// import { useStore } from "/lib/store";                // ✅ fixed alias

// // Firebase phone auth imports
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// export default function AccountPage() {
//   const router = useRouter();
//   const { user, dbUser, loading, isLoggedIn, logout, getToken } = useAuth();
//   const wishlistCount = useStore((s) => s.wishlist.length);
//   const cartCount     = useStore((s) => s.cartCount());

//   // ── Phone verification state ──────────────────────────────────────────────
//   const [phoneState, setPhoneState] = useState("idle");
//   // idle | entering | sending | otp | verifying | done | error
//   const [phoneInput,       setPhoneInput]       = useState("");
//   const [phoneError,       setPhoneError]       = useState("");
//   const [otpDigits,        setOtpDigits]        = useState(["", "", "", "", "", ""]);
//   const [otpError,         setOtpError]         = useState("");
//   const [resendCountdown,  setResendCountdown]  = useState(0);
//   const [localPhoneData,   setLocalPhoneData]   = useState(null); // { phone, phoneVerified }
//   const confirmResultRef   = useRef(null);
//   const recaptchaRef       = useRef(null);
//   const otpInputsRef       = useRef([]);
//   const countdownRef       = useRef(null);

//   useEffect(() => {
//     if (!loading && !isLoggedIn) router.replace("/login");
//   }, [isLoggedIn, loading, router]);

//   // Cleanup recaptcha on unmount
//   useEffect(() => {
//     return () => {
//       if (recaptchaRef.current) {
//         try { recaptchaRef.current.clear(); } catch {}
//       }
//       clearInterval(countdownRef.current);
//     };
//   }, []);

//   if (loading || !isLoggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="w-8 h-8 border-2 border-stone-200 border-t-stone-700 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   const displayName    = dbUser?.name      || user?.displayName || "Customer";
//   const email          = dbUser?.email     || user?.email       || "";
//   const avatar         = dbUser?.avatar    || user?.photoURL    || "";
//   const provider       = dbUser?.provider  || "email";
//   const emailVerified  = dbUser?.emailVerified || user?.emailVerified || false;

//   // Use local override if OTP was just verified this session
//   const phone          = localPhoneData?.phone         ?? dbUser?.phone         ?? "";
//   const phoneVerified  = localPhoneData?.phoneVerified ?? dbUser?.phoneVerified ?? false;

//   const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

//   // ── Start countdown timer ────────────────────────────────────────────────
//   const startCountdown = (secs = 30) => {
//     setResendCountdown(secs);
//     clearInterval(countdownRef.current);
//     countdownRef.current = setInterval(() => {
//       setResendCountdown((p) => {
//         if (p <= 1) { clearInterval(countdownRef.current); return 0; }
//         return p - 1;
//       });
//     }, 1000);
//   };

//   // ── Step 1: Send OTP ─────────────────────────────────────────────────────
//   const sendOtp = async (phoneNum) => {
//     const digits = phoneNum.replace(/\D/g, "");
//     if (!/^[6-9]\d{9}$/.test(digits)) {
//       setPhoneError("Enter a valid 10-digit Indian mobile number");
//       return;
//     }
//     setPhoneError("");
//     setPhoneState("sending");

//     const auth = getAuth();

//     try {
//       // Clear previous recaptcha
//       if (recaptchaRef.current) {
//         try { recaptchaRef.current.clear(); } catch {}
//       }

//       // Invisible reCAPTCHA — renders on the hidden div
//       const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//         size: "invisible",
//         callback: () => {},
//       });
//       recaptchaRef.current = verifier;

//       const fullPhone = `+91${digits}`;
//       const confirmation = await signInWithPhoneNumber(auth, fullPhone, verifier);
//       confirmResultRef.current = confirmation;

//       setPhoneState("otp");
//       setOtpDigits(["", "", "", "", "", ""]);
//       setOtpError("");
//       startCountdown(30);

//       // Focus first OTP box
//       setTimeout(() => otpInputsRef.current[0]?.focus(), 100);
//     } catch (err) {
//       console.error("Send OTP error:", err);
//       setPhoneState("entering");

//       if (err.code === "auth/invalid-phone-number") {
//         setPhoneError("Invalid phone number. Check the number and try again.");
//       } else if (err.code === "auth/too-many-requests") {
//         setPhoneError("Too many attempts. Please wait a few minutes.");
//       } else {
//         setPhoneError("Could not send OTP. Please try again.");
//       }
//     }
//   };

//   // ── Step 2: Verify OTP ───────────────────────────────────────────────────
//   const verifyOtp = async () => {
//     const code = otpDigits.join("");
//     if (code.length < 6) {
//       setOtpError("Enter all 6 digits of the OTP.");
//       return;
//     }
//     if (!confirmResultRef.current) {
//       setOtpError("Session expired. Please start over.");
//       setPhoneState("entering");
//       return;
//     }

//     setPhoneState("verifying");
//     setOtpError("");

//     try {
//       await confirmResultRef.current.confirm(code);

//       // OTP confirmed by Firebase — now update MongoDB
//       const token    = await getToken();
//       const digits   = phoneInput.replace(/\D/g, "");
//       const fullPhone = `+91${digits}`;

//       const res = await fetch("/api/auth/verify-phone", {
//         method:  "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:  `Bearer ${token}`,
//         },
//         body: JSON.stringify({ phone: fullPhone }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         // Update local state immediately (no need to reload)
//         setLocalPhoneData({ phone: fullPhone, phoneVerified: true });
//         setPhoneState("done");
//       } else {
//         setOtpError("Verification failed. Please try again.");
//         setPhoneState("otp");
//       }
//     } catch (err) {
//       console.error("Verify OTP error:", err);
//       if (err.code === "auth/invalid-verification-code") {
//         setOtpError("Incorrect OTP. Please check and try again.");
//       } else if (err.code === "auth/code-expired") {
//         setOtpError("OTP has expired. Please request a new one.");
//       } else {
//         setOtpError("Verification failed. Please try again.");
//       }
//       setPhoneState("otp");
//     }
//   };

//   // ── Handle OTP digit input ────────────────────────────────────────────────
//   const handleOtpInput = (idx, val) => {
//     const digit = val.replace(/\D/g, "").slice(-1);
//     const newDigits = [...otpDigits];
//     newDigits[idx] = digit;
//     setOtpDigits(newDigits);
//     setOtpError("");
//     // Auto-advance
//     if (digit && idx < 5) otpInputsRef.current[idx + 1]?.focus();
//     // Auto-submit when all 6 filled
//     if (newDigits.every((d) => d) && newDigits.join("").length === 6) {
//       setTimeout(() => {
//         setOtpDigits(newDigits);
//         verifyOtp();
//       }, 120);
//     }
//   };

//   const handleOtpKeyDown = (idx, e) => {
//     if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
//       otpInputsRef.current[idx - 1]?.focus();
//     }
//   };

//   const handleOtpPaste = (e) => {
//     const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
//     if (pasted.length === 6) {
//       const newDigits = pasted.split("");
//       setOtpDigits(newDigits);
//       otpInputsRef.current[5]?.focus();
//     }
//   };

//   const handleLogout = async () => {
//     await logout();
//     router.push("/");
//   };

//   // ── Quick links ──────────────────────────────────────────────────────────
//   const quickLinks = [
//     { icon: Package, label: "Track Orders",   href: "/order-tracking", badge: null },
//     { icon: Heart,   label: "My Wishlist",    href: "/wishlist",       badge: wishlistCount || null },
//     { icon: MapPin,  label: "Saved Addresses",href: "/account",        badge: dbUser?.addresses?.length || null },
//   ];

//   return (
//     <>
//       <Navbar />

//       {/* Hidden reCAPTCHA container — required for Firebase phone auth */}
//       <div id="recaptcha-container" style={{ position: "fixed", bottom: 0, left: 0, zIndex: -1 }} />

//       <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16 min-h-[70vh]">

//         {/* Header */}
//         <div className="mb-10">
//           <p className="section-subtitle">My Account</p>
//           <h1 className="section-title">Welcome back</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* ── Profile card ─────────────────────────── */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="lg:col-span-1"
//           >
//             <div className="bg-stone-900 p-8 text-center">
//               {/* Avatar */}
//               <div className="mx-auto mb-5 relative w-20 h-20">
//                 {avatar ? (
//                   <img
//                     src={avatar}
//                     alt={displayName}
//                     className="w-20 h-20 rounded-full object-cover border-2 border-stone-700"
//                   />
//                 ) : (
//                   <div className="w-20 h-20 rounded-full bg-stone-700 flex items-center justify-center">
//                     <span className="font-display text-2xl font-light text-white">{initials}</span>
//                   </div>
//                 )}
//                 {provider === "google" && (
//                   <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
//                     <GoogleIcon size={14} />
//                   </span>
//                 )}
//               </div>

//               <h2 className="font-display text-2xl font-light text-white mb-1">{displayName}</h2>
//               <p className="font-body text-xs text-stone-400 mb-4">{email}</p>

//               {/* Email verification badge */}
//               {emailVerified ? (
//                 <div className="flex items-center justify-center gap-1.5 mb-2">
//                   <ShieldCheck size={12} className="text-emerald-400" />
//                   <p className="font-body text-[10px] text-emerald-400 tracking-wider uppercase">Email Verified</p>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center gap-1.5 bg-amber-900/30 border border-amber-700/30 px-3 py-1.5 mb-2">
//                   <AlertCircle size={11} className="text-amber-400" />
//                   <p className="font-body text-[10px] text-amber-400">Email Not Verified</p>
//                 </div>
//               )}

//               {/* Phone badge */}
//               {phone && (
//                 <div className={`flex items-center justify-center gap-1.5 px-3 py-1.5 mb-4 ${
//                   phoneVerified
//                     ? "bg-emerald-900/20 border border-emerald-700/20"
//                     : "bg-stone-800 border border-stone-700"
//                 }`}>
//                   {phoneVerified ? (
//                     <CheckCircle2 size={11} className="text-emerald-400" />
//                   ) : (
//                     <Phone size={11} className="text-stone-400" />
//                   )}
//                   <p className={`font-body text-[10px] ${phoneVerified ? "text-emerald-400" : "text-stone-400"}`}>
//                     {phone} {phoneVerified ? "· Verified" : "· Unverified"}
//                   </p>
//                 </div>
//               )}

//               <div className="flex items-center justify-center gap-1.5 mb-6">
//                 <span className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-500">
//                   {provider === "google" ? "Google Account" : "Email Account"}
//                 </span>
//               </div>

//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-center gap-2 border border-stone-700 text-stone-400 font-body text-xs tracking-widest uppercase py-3 hover:border-stone-500 hover:text-stone-200 transition-all"
//               >
//                 <LogOut size={13} />
//                 Sign Out
//               </button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-px bg-stone-100 mt-px">
//               {[
//                 { label: "Wishlist", value: wishlistCount },
//                 { label: "Cart",     value: cartCount },
//               ].map(({ label, value }) => (
//                 <div key={label} className="bg-white py-5 text-center">
//                   <p className="font-display text-3xl font-light text-stone-900">{value}</p>
//                   <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mt-1">{label}</p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* ── Right panel ──────────────────────────── */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Quick links */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//             >
//               <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
//                 Quick Access
//               </h3>
//               <div className="divide-y divide-stone-50 border border-stone-100">
//                 {quickLinks.map(({ icon: Icon, label, href, badge }) => (
//                   <Link
//                     key={label}
//                     href={href}
//                     className="flex items-center justify-between px-6 py-5 hover:bg-stone-50 transition-colors group"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-9 h-9 bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
//                         <Icon size={16} className="text-stone-600" />
//                       </div>
//                       <span className="font-body text-sm text-stone-700">{label}</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       {badge > 0 && (
//                         <span className="w-5 h-5 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center font-medium">
//                           {badge}
//                         </span>
//                       )}
//                       <ChevronRight size={15} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Account details */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
//                 Account Details
//               </h3>
//               <div className="border border-stone-100 divide-y divide-stone-50">

//                 {/* Static rows */}
//                 {[
//                   { label: "Full Name",    value: displayName },
//                   { label: "Email",        value: email },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="flex items-center justify-between px-6 py-4">
//                     <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">
//                       {label}
//                     </span>
//                     <span className="font-body text-sm text-stone-700 text-right">{value}</span>
//                   </div>
//                 ))}

//                 {/* ── Phone row with verification ────── */}
//                 <div className="px-6 py-4">
//                   <div className="flex items-center justify-between gap-4 flex-wrap">
//                     <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">
//                       Mobile
//                     </span>

//                     <div className="flex-1 flex items-center justify-between gap-3 flex-wrap min-w-0">
//                       {/* Current phone value */}
//                       <div className="flex items-center gap-2 min-w-0">
//                         {phone ? (
//                           <>
//                             <span className="font-body text-sm text-stone-700">{phone}</span>
//                             {phoneVerified ? (
//                               <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 font-body text-[9px] tracking-widest uppercase px-2 py-0.5">
//                                 <CheckCircle2 size={9} />
//                                 Verified
//                               </span>
//                             ) : (
//                               <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-600 font-body text-[9px] tracking-widest uppercase px-2 py-0.5">
//                                 <AlertCircle size={9} />
//                                 Unverified
//                               </span>
//                             )}
//                           </>
//                         ) : (
//                           <span className="font-body text-sm text-stone-300">Not added</span>
//                         )}
//                       </div>

//                       {/* Action button */}
//                       {!phoneVerified && phoneState === "idle" && (
//                         <button
//                           onClick={() => {
//                             setPhoneInput(phone ? phone.replace("+91", "") : "");
//                             setPhoneState("entering");
//                           }}
//                           className="font-body text-xs tracking-widest uppercase text-stone-500 border border-stone-200 px-3 py-1.5 hover:border-stone-500 hover:text-stone-800 transition-all shrink-0"
//                         >
//                           <Phone size={11} className="inline mr-1.5" />
//                           {phone ? "Verify Now" : "Add & Verify"}
//                         </button>
//                       )}

//                       {/* Already done this session */}
//                       {phoneVerified && phoneState === "idle" && (
//                         <span className="font-body text-[10px] text-emerald-600 flex items-center gap-1 shrink-0">
//                           <CheckCircle2 size={12} /> Verified
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   {/* ── Inline OTP panel ─────────────── */}
//                   <AnimatePresence>
//                     {(phoneState !== "idle" && phoneState !== "done") && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.25 }}
//                         className="overflow-hidden mt-4"
//                       >
//                         <div className="bg-stone-50 border border-stone-100 p-5">

//                           {/* STEP A — Enter phone number */}
//                           {(phoneState === "entering" || phoneState === "sending") && (
//                             <div>
//                               <p className="font-body text-xs font-medium text-stone-700 mb-3">
//                                 {phone ? "Verify your mobile number" : "Add your mobile number"}
//                               </p>
//                               <div className="flex items-center gap-2">
//                                 <div className="relative flex-1">
//                                   <Phone size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300" />
//                                   <span className="absolute left-5 top-1/2 -translate-y-1/2 font-body text-sm text-stone-400 select-none">
//                                     +91
//                                   </span>
//                                   <input
//                                     type="tel"
//                                     inputMode="numeric"
//                                     maxLength={10}
//                                     value={phoneInput}
//                                     onChange={(e) => {
//                                       setPhoneInput(e.target.value.replace(/\D/g, "").slice(0, 10));
//                                       setPhoneError("");
//                                     }}
//                                     onKeyDown={(e) => e.key === "Enter" && sendOtp(phoneInput)}
//                                     placeholder="98765 43210"
//                                     className="w-full border-b border-stone-200 bg-transparent py-2.5 pl-12 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
//                                   />
//                                 </div>
//                                 <button
//                                   onClick={() => sendOtp(phoneInput)}
//                                   disabled={phoneState === "sending"}
//                                   className="btn-primary py-2.5 px-5 text-[10px] gap-2 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
//                                 >
//                                   {phoneState === "sending" ? (
//                                     <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                                   ) : (
//                                     "Send OTP"
//                                   )}
//                                 </button>
//                                 <button
//                                   onClick={() => setPhoneState("idle")}
//                                   className="text-stone-400 hover:text-stone-700 p-1"
//                                   title="Cancel"
//                                 >
//                                   <X size={15} />
//                                 </button>
//                               </div>
//                               {phoneError && (
//                                 <p className="font-body text-xs text-red-500 mt-2">{phoneError}</p>
//                               )}
//                             </div>
//                           )}

//                           {/* STEP B — Enter OTP */}
//                           {(phoneState === "otp" || phoneState === "verifying") && (
//                             <div>
//                               <div className="flex items-start justify-between mb-4">
//                                 <div>
//                                   <p className="font-body text-xs font-medium text-stone-700">
//                                     OTP sent to +91 {phoneInput}
//                                   </p>
//                                   <p className="font-body text-[10px] text-stone-400 mt-0.5">
//                                     Enter the 6-digit code from your SMS
//                                   </p>
//                                 </div>
//                                 <button
//                                   onClick={() => setPhoneState("entering")}
//                                   className="font-body text-[10px] text-stone-400 hover:text-stone-700 underline transition-colors"
//                                 >
//                                   Change number
//                                 </button>
//                               </div>

//                               {/* 6 OTP boxes */}
//                               <div className="flex gap-2 mb-4" onPaste={handleOtpPaste}>
//                                 {otpDigits.map((digit, idx) => (
//                                   <input
//                                     key={idx}
//                                     ref={(el) => (otpInputsRef.current[idx] = el)}
//                                     type="text"
//                                     inputMode="numeric"
//                                     maxLength={1}
//                                     value={digit}
//                                     onChange={(e) => handleOtpInput(idx, e.target.value)}
//                                     onKeyDown={(e) => handleOtpKeyDown(idx, e)}
//                                     disabled={phoneState === "verifying"}
//                                     className={`w-11 h-12 text-center font-body text-lg font-medium border-2 bg-white transition-all focus:outline-none ${
//                                       otpError
//                                         ? "border-red-300 text-red-700"
//                                         : digit
//                                         ? "border-stone-900 text-stone-900"
//                                         : "border-stone-200 text-stone-900 focus:border-stone-500"
//                                     } disabled:opacity-50`}
//                                   />
//                                 ))}
//                               </div>

//                               {otpError && (
//                                 <p className="font-body text-xs text-red-500 mb-3">{otpError}</p>
//                               )}

//                               <div className="flex items-center justify-between gap-3 flex-wrap">
//                                 <button
//                                   onClick={verifyOtp}
//                                   disabled={otpDigits.join("").length < 6 || phoneState === "verifying"}
//                                   className="btn-primary py-2.5 px-6 text-[10px] gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//                                 >
//                                   {phoneState === "verifying" ? (
//                                     <>
//                                       <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                                       Verifying…
//                                     </>
//                                   ) : (
//                                     <>
//                                       <KeyRound size={12} />
//                                       Verify OTP
//                                     </>
//                                   )}
//                                 </button>

//                                 {/* Resend */}
//                                 <button
//                                   onClick={() => sendOtp(phoneInput)}
//                                   disabled={resendCountdown > 0 || phoneState === "verifying"}
//                                   className="flex items-center gap-1.5 font-body text-xs text-stone-400 hover:text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//                                 >
//                                   <RefreshCw size={11} />
//                                   {resendCountdown > 0
//                                     ? `Resend in ${resendCountdown}s`
//                                     : "Resend OTP"}
//                                 </button>

//                                 <button
//                                   onClick={() => setPhoneState("idle")}
//                                   className="text-stone-400 hover:text-stone-700 p-1"
//                                   title="Cancel"
//                                 >
//                                   <X size={14} />
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </motion.div>
//                     )}

//                     {/* Success banner */}
//                     {phoneState === "done" && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -6 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-100 px-4 py-3"
//                       >
//                         <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
//                         <p className="font-body text-xs text-emerald-700 font-medium">
//                           Phone number verified successfully!
//                         </p>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>

//                 {/* Other detail rows */}
//                 {[
//                   {
//                     label: "Member Since",
//                     value: dbUser?.createdAt
//                       ? new Date(dbUser.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
//                       : "—",
//                   },
//                   {
//                     label: "Auth Method",
//                     value: provider === "google" ? "Google Sign-In" : "Email & Password",
//                   },
//                 ].map(({ label, value }) => (
//                   <div key={label} className="flex items-center justify-between px-6 py-4">
//                     <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">
//                       {label}
//                     </span>
//                     <span className="font-body text-sm text-stone-700 text-right">{value}</span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Saved addresses */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
//                 Saved Addresses
//               </h3>
//               {dbUser?.addresses?.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {dbUser.addresses.map((addr, i) => (
//                     <div key={i} className="border border-stone-100 p-5">
//                       <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-2">
//                         {addr.label}
//                       </p>
//                       <p className="font-body text-sm text-stone-800 font-medium">{addr.phone}</p>
//                       <p className="font-body text-xs text-stone-500 leading-relaxed mt-1">
//                         {addr.line1}, {addr.city} — {addr.pincode}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="border border-stone-100 p-8 text-center">
//                   <MapPin size={32} className="text-stone-200 mx-auto mb-3" strokeWidth={1} />
//                   <p className="font-body text-sm text-stone-400">No saved addresses yet.</p>
//                   <p className="font-body text-xs text-stone-300 mt-1">
//                     Addresses are saved automatically when you place an order.
//                   </p>
//                 </div>
//               )}
//             </motion.div>

//             {/* Shop CTA */}
//             <div className="bg-stone-50 border border-stone-100 p-7 flex items-center justify-between gap-4">
//               <div>
//                 <p className="font-display text-2xl font-light text-stone-900 mb-1">
//                   Continue Shopping
//                 </p>
//                 <p className="font-body text-xs text-stone-400">
//                   Explore new arrivals and trending styles
//                 </p>
//               </div>
//               <Link href="/shop" className="btn-primary shrink-0 gap-2">
//                 Shop Now <ChevronRight size={13} />
//               </Link>
//             </div>

//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

// // ── Google Icon ────────────────────────────────────────────────────────────────
// function GoogleIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 18 18">
//       <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
//       <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
//       <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
//       <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
//     </svg>
//   );
// }

"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Package, Heart, MapPin, LogOut,
  ShieldCheck, ChevronRight, AlertCircle,
  Phone, CheckCircle2, X, RefreshCw, KeyRound
} from "lucide-react";
import Navbar from "/components/layout/Navbar";
import Footer from "/components/layout/Footer";
import { useAuth } from "/contexts/AuthContext";
import { useStore } from "/lib/store";

// ✅ Correct approach for existing signed-in user:
//    PhoneAuthProvider.verifyPhoneNumber → verificationId
//    PhoneAuthProvider.credential(verificationId, OTP)
//    updatePhoneNumber(currentUser, credential)
import { auth } from "/lib/firebase";
import {
  RecaptchaVerifier,
  PhoneAuthProvider,
  updatePhoneNumber,
} from "firebase/auth";

export default function AccountPage() {
  const router = useRouter();
  const { user, dbUser, loading, isLoggedIn, logout, getToken } = useAuth();
  const wishlistCount = useStore((s) => s.wishlist.length);
  const cartCount     = useStore((s) => s.cartCount());

  // ── Phone verification state ──────────────────────────────────────────────
  const [phoneState, setPhoneState] = useState("idle");
  // idle | entering | sending | otp | verifying | done | error
  const [phoneInput,       setPhoneInput]       = useState("");
  const [phoneError,       setPhoneError]       = useState("");
  const [otpDigits,        setOtpDigits]        = useState(["", "", "", "", "", ""]);
  const [otpError,         setOtpError]         = useState("");
  const [resendCountdown,  setResendCountdown]  = useState(0);
  const [localPhoneData,   setLocalPhoneData]   = useState(null); // { phone, phoneVerified }
  const confirmResultRef   = useRef(null);
  const recaptchaRef       = useRef(null);
  const otpInputsRef       = useRef([]);
  const countdownRef       = useRef(null);

  useEffect(() => {
    if (!loading && !isLoggedIn) router.replace("/login");
  }, [isLoggedIn, loading, router]);

  // Cleanup recaptcha on unmount
  useEffect(() => {
    return () => {
      if (recaptchaRef.current) {
        try { recaptchaRef.current.clear(); } catch {}
      }
      clearInterval(countdownRef.current);
    };
  }, []);

  if (loading || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-stone-200 border-t-stone-700 rounded-full animate-spin" />
      </div>
    );
  }

  const displayName    = dbUser?.name      || user?.displayName || "Customer";
  const email          = dbUser?.email     || user?.email       || "";
  const avatar         = dbUser?.avatar    || user?.photoURL    || "";
  const provider       = dbUser?.provider  || "email";
  const emailVerified  = dbUser?.emailVerified || user?.emailVerified || false;

  // Use local override if OTP was just verified this session
  const phone          = localPhoneData?.phone         ?? dbUser?.phone         ?? "";
  const phoneVerified  = localPhoneData?.phoneVerified ?? dbUser?.phoneVerified ?? false;

  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  // ── Start countdown timer ────────────────────────────────────────────────
  const startCountdown = (secs = 30) => {
    setResendCountdown(secs);
    clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setResendCountdown((p) => {
        if (p <= 1) { clearInterval(countdownRef.current); return 0; }
        return p - 1;
      });
    }, 1000);
  };

  // ── Step 1: Send OTP via PhoneAuthProvider (correct for existing user) ──────
  //
  //  signInWithPhoneNumber = creates a NEW Firebase session (wrong for existing user)
  //  PhoneAuthProvider.verifyPhoneNumber = sends OTP to link/update phone on the
  //  CURRENT user — this is what we want here
  //
  const sendOtp = async (phoneNum) => {
    const digits = phoneNum.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setPhoneError("Enter a valid 10-digit Indian mobile number");
      return;
    }
    setPhoneError("");
    setPhoneState("sending");

    if (!auth) {
      setPhoneError("Firebase is not configured. Check your .env.local file.");
      setPhoneState("entering");
      return;
    }

    if (!auth.currentUser) {
      setPhoneError("You must be logged in to verify a phone number.");
      setPhoneState("entering");
      return;
    }

    try {
      // Destroy previous verifier cleanly before creating a new one
      if (recaptchaRef.current) {
        try { recaptchaRef.current.clear(); } catch {}
        recaptchaRef.current = null;
      }

      // Create invisible reCAPTCHA verifier
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {},
        "expired-callback": () => {
          setPhoneError("reCAPTCHA expired. Please refresh and try again.");
          setPhoneState("entering");
        },
      });
      await verifier.render();
      recaptchaRef.current = verifier;

      // ✅ PhoneAuthProvider.verifyPhoneNumber — sends OTP to link to current user
      const provider       = new PhoneAuthProvider(auth);
      const fullPhone      = `+91${digits}`;
      const verificationId = await provider.verifyPhoneNumber(fullPhone, verifier);

      // Store verificationId (replaces confirmResult from signInWithPhoneNumber)
      confirmResultRef.current = verificationId;

      setPhoneState("otp");
      setOtpDigits(["", "", "", "", "", ""]);
      setOtpError("");
      startCountdown(60);
      setTimeout(() => otpInputsRef.current[0]?.focus(), 100);

    } catch (err) {
      console.error("Send OTP error:", err.code, err.message);
      setPhoneState("entering");

      const errorMap = {
        "auth/operation-not-allowed":
          "Phone sign-in not enabled. Enable it in Firebase Console → Authentication → Sign-in method → Phone.",
        "auth/invalid-phone-number":
          "Invalid phone number. Please check and try again.",
        "auth/too-many-requests":
          "Too many OTP requests. Please wait a few minutes.",
        "auth/quota-exceeded":
          "SMS quota exceeded. Please try again later.",
        "auth/captcha-check-failed":
          "reCAPTCHA failed. Refresh the page and try again.",
        "auth/provider-already-linked":
          "This phone number is already linked to another account.",
        "auth/requires-recent-login":
          "Please sign out and sign back in before verifying your phone.",
        "auth/app-not-authorized":
          "App not authorized. Add localhost to Firebase Console → Authentication → Settings → Authorized domains.",
      };

      setPhoneError(
        errorMap[err.code] ||
        `Error (${err.code || "unknown"}): ${err.message || "Could not send OTP."}`
      );
    }
  };

  // ── Step 2: Verify OTP and link phone to current user ─────────────────────
  const verifyOtp = async () => {
    const code = otpDigits.join("");
    if (code.length < 6) {
      setOtpError("Enter all 6 digits of the OTP.");
      return;
    }
    if (!confirmResultRef.current) {
      setOtpError("Session expired. Please click 'Send OTP' again.");
      setPhoneState("entering");
      return;
    }

    setPhoneState("verifying");
    setOtpError("");

    try {
      const digits    = phoneInput.replace(/\D/g, "");
      const fullPhone = `+91${digits}`;

      // ✅ Create credential from verificationId + OTP code
      const credential = PhoneAuthProvider.credential(
        confirmResultRef.current, // verificationId stored in step 1
        code
      );

      // ✅ Update/link the phone number on the current signed-in user
      await updatePhoneNumber(auth.currentUser, credential);

      // ── Save to MongoDB ───────────────────────────────────────────────────
      const token = await getToken();
      const res = await fetch("/api/auth/verify-phone", {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const data = await res.json();

      if (data.success) {
        setLocalPhoneData({ phone: fullPhone, phoneVerified: true });
        setPhoneState("done");
      } else {
        setOtpError("Phone verified but profile save failed. Please refresh.");
        setPhoneState("otp");
      }

    } catch (err) {
      console.error("Verify OTP error:", err.code, err.message);

      const errorMap = {
        "auth/invalid-verification-code": "Incorrect OTP. Please check and try again.",
        "auth/code-expired":              "OTP expired. Click 'Resend OTP' to get a new one.",
        "auth/credential-already-in-use": "This phone number is already used by another account.",
        "auth/provider-already-linked":   "Phone already linked to this account.",
        "auth/requires-recent-login":     "Please sign out and sign back in, then try again.",
      };

      setOtpError(
        errorMap[err.code] ||
        `Error (${err.code || "unknown"}): ${err.message || "Verification failed."}`
      );
      setPhoneState("otp");
    }
  };

  // ── Handle OTP digit input ────────────────────────────────────────────────
  const handleOtpInput = (idx, val) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const newDigits = [...otpDigits];
    newDigits[idx] = digit;
    setOtpDigits(newDigits);
    setOtpError("");
    // Auto-advance
    if (digit && idx < 5) otpInputsRef.current[idx + 1]?.focus();
    // Auto-submit when all 6 filled
    if (newDigits.every((d) => d) && newDigits.join("").length === 6) {
      setTimeout(() => {
        setOtpDigits(newDigits);
        verifyOtp();
      }, 120);
    }
  };

  const handleOtpKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otpDigits[idx] && idx > 0) {
      otpInputsRef.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newDigits = pasted.split("");
      setOtpDigits(newDigits);
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // ── Quick links ──────────────────────────────────────────────────────────
  const quickLinks = [
    { icon: Package, label: "Track Orders",   href: "/order-tracking", badge: null },
    { icon: Heart,   label: "My Wishlist",    href: "/wishlist",       badge: wishlistCount || null },
    { icon: MapPin,  label: "Saved Addresses",href: "/account",        badge: dbUser?.addresses?.length || null },
  ];

  return (
    <>
      <Navbar />

      {/* Hidden reCAPTCHA container — required for Firebase phone auth */}
      <div id="recaptcha-container" style={{ position: "fixed", bottom: 0, left: 0, zIndex: -1 }} />

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
                  <img
                    src={avatar}
                    alt={displayName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-stone-700"
                  />
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

              {/* Email verification badge */}
              {emailVerified ? (
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <p className="font-body text-[10px] text-emerald-400 tracking-wider uppercase">Email Verified</p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1.5 bg-amber-900/30 border border-amber-700/30 px-3 py-1.5 mb-2">
                  <AlertCircle size={11} className="text-amber-400" />
                  <p className="font-body text-[10px] text-amber-400">Email Not Verified</p>
                </div>
              )}

              {/* Phone badge */}
              {phone && (
                <div className={`flex items-center justify-center gap-1.5 px-3 py-1.5 mb-4 ${
                  phoneVerified
                    ? "bg-emerald-900/20 border border-emerald-700/20"
                    : "bg-stone-800 border border-stone-700"
                }`}>
                  {phoneVerified ? (
                    <CheckCircle2 size={11} className="text-emerald-400" />
                  ) : (
                    <Phone size={11} className="text-stone-400" />
                  )}
                  <p className={`font-body text-[10px] ${phoneVerified ? "text-emerald-400" : "text-stone-400"}`}>
                    {phone} {phoneVerified ? "· Verified" : "· Unverified"}
                  </p>
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
                { label: "Wishlist", value: wishlistCount },
                { label: "Cart",     value: cartCount },
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

                {/* Static rows */}
                {[
                  { label: "Full Name",    value: displayName },
                  { label: "Email",        value: email },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-6 py-4">
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">
                      {label}
                    </span>
                    <span className="font-body text-sm text-stone-700 text-right">{value}</span>
                  </div>
                ))}

                {/* ── Phone row with verification ────── */}
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">
                      Mobile
                    </span>

                    <div className="flex-1 flex items-center justify-between gap-3 flex-wrap min-w-0">
                      {/* Current phone value */}
                      <div className="flex items-center gap-2 min-w-0">
                        {phone ? (
                          <>
                            <span className="font-body text-sm text-stone-700">{phone}</span>
                            {phoneVerified ? (
                              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 font-body text-[9px] tracking-widest uppercase px-2 py-0.5">
                                <CheckCircle2 size={9} />
                                Verified
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-600 font-body text-[9px] tracking-widest uppercase px-2 py-0.5">
                                <AlertCircle size={9} />
                                Unverified
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="font-body text-sm text-stone-300">Not added</span>
                        )}
                      </div>

                      {/* Action button */}
                      {!phoneVerified && phoneState === "idle" && (
                        <button
                          onClick={() => {
                            setPhoneInput(phone ? phone.replace("+91", "") : "");
                            setPhoneState("entering");
                          }}
                          className="font-body text-xs tracking-widest uppercase text-stone-500 border border-stone-200 px-3 py-1.5 hover:border-stone-500 hover:text-stone-800 transition-all shrink-0"
                        >
                          <Phone size={11} className="inline mr-1.5" />
                          {phone ? "Verify Now" : "Add & Verify"}
                        </button>
                      )}

                      {/* Already done this session */}
                      {phoneVerified && phoneState === "idle" && (
                        <span className="font-body text-[10px] text-emerald-600 flex items-center gap-1 shrink-0">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Inline OTP panel ─────────────── */}
                  <AnimatePresence>
                    {(phoneState !== "idle" && phoneState !== "done") && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-4"
                      >
                        <div className="bg-stone-50 border border-stone-100 p-5">

                          {/* STEP A — Enter phone number */}
                          {(phoneState === "entering" || phoneState === "sending") && (
                            <div>
                              <p className="font-body text-xs font-medium text-stone-700 mb-3">
                                {phone ? "Verify your mobile number" : "Add your mobile number"}
                              </p>
                              <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                  <Phone size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300" />
                                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-body text-sm text-stone-400 select-none">
                                    +91
                                  </span>
                                  <input
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}
                                    value={phoneInput}
                                    onChange={(e) => {
                                      setPhoneInput(e.target.value.replace(/\D/g, "").slice(0, 10));
                                      setPhoneError("");
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && sendOtp(phoneInput)}
                                    placeholder="98765 43210"
                                    className="w-full border-b border-stone-200 bg-transparent py-2.5 pl-12 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
                                  />
                                </div>
                                <button
                                  onClick={() => sendOtp(phoneInput)}
                                  disabled={phoneState === "sending"}
                                  className="btn-primary py-2.5 px-5 text-[10px] gap-2 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                  {phoneState === "sending" ? (
                                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  ) : (
                                    "Send OTP"
                                  )}
                                </button>
                                <button
                                  onClick={() => setPhoneState("idle")}
                                  className="text-stone-400 hover:text-stone-700 p-1"
                                  title="Cancel"
                                >
                                  <X size={15} />
                                </button>
                              </div>
                              {phoneError && (
                                <p className="font-body text-xs text-red-500 mt-2">{phoneError}</p>
                              )}
                            </div>
                          )}

                          {/* STEP B — Enter OTP */}
                          {(phoneState === "otp" || phoneState === "verifying") && (
                            <div>
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <p className="font-body text-xs font-medium text-stone-700">
                                    OTP sent to +91 {phoneInput}
                                  </p>
                                  <p className="font-body text-[10px] text-stone-400 mt-0.5">
                                    Enter the 6-digit code from your SMS
                                  </p>
                                </div>
                                <button
                                  onClick={() => setPhoneState("entering")}
                                  className="font-body text-[10px] text-stone-400 hover:text-stone-700 underline transition-colors"
                                >
                                  Change number
                                </button>
                              </div>

                              {/* 6 OTP boxes */}
                              <div className="flex gap-2 mb-4" onPaste={handleOtpPaste}>
                                {otpDigits.map((digit, idx) => (
                                  <input
                                    key={idx}
                                    ref={(el) => (otpInputsRef.current[idx] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpInput(idx, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                    disabled={phoneState === "verifying"}
                                    className={`w-11 h-12 text-center font-body text-lg font-medium border-2 bg-white transition-all focus:outline-none ${
                                      otpError
                                        ? "border-red-300 text-red-700"
                                        : digit
                                        ? "border-stone-900 text-stone-900"
                                        : "border-stone-200 text-stone-900 focus:border-stone-500"
                                    } disabled:opacity-50`}
                                  />
                                ))}
                              </div>

                              {otpError && (
                                <p className="font-body text-xs text-red-500 mb-3">{otpError}</p>
                              )}

                              <div className="flex items-center justify-between gap-3 flex-wrap">
                                <button
                                  onClick={verifyOtp}
                                  disabled={otpDigits.join("").length < 6 || phoneState === "verifying"}
                                  className="btn-primary py-2.5 px-6 text-[10px] gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                  {phoneState === "verifying" ? (
                                    <>
                                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                      Verifying…
                                    </>
                                  ) : (
                                    <>
                                      <KeyRound size={12} />
                                      Verify OTP
                                    </>
                                  )}
                                </button>

                                {/* Resend */}
                                <button
                                  onClick={() => sendOtp(phoneInput)}
                                  disabled={resendCountdown > 0 || phoneState === "verifying"}
                                  className="flex items-center gap-1.5 font-body text-xs text-stone-400 hover:text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                  <RefreshCw size={11} />
                                  {resendCountdown > 0
                                    ? `Resend in ${resendCountdown}s`
                                    : "Resend OTP"}
                                </button>

                                <button
                                  onClick={() => setPhoneState("idle")}
                                  className="text-stone-400 hover:text-stone-700 p-1"
                                  title="Cancel"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Success banner */}
                    {phoneState === "done" && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-100 px-4 py-3"
                      >
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        <p className="font-body text-xs text-emerald-700 font-medium">
                          Phone number verified successfully!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other detail rows */}
                {[
                  {
                    label: "Member Since",
                    value: dbUser?.createdAt
                      ? new Date(dbUser.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                      : "—",
                  },
                  {
                    label: "Auth Method",
                    value: provider === "google" ? "Google Sign-In" : "Email & Password",
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-6 py-4">
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">
                      {label}
                    </span>
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
                      <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-2">
                        {addr.label}
                      </p>
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
                <p className="font-display text-2xl font-light text-stone-900 mb-1">
                  Continue Shopping
                </p>
                <p className="font-body text-xs text-stone-400">
                  Explore new arrivals and trending styles
                </p>
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

// ── Google Icon ────────────────────────────────────────────────────────────────
function GoogleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}