// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { MessageCircle, ChevronRight, CheckCircle, Lock, ArrowLeft } from "lucide-react";
// import Navbar from "../../components/layout/Navbar";
// import Footer from "../../components/layout/Footer";
// import { useStore } from "../../lib/store";
// import { SHOP_WHATSAPP } from "../../lib/products";

// function buildWhatsAppMessage(cart, form, total, shipping) {
//   const itemLines = cart
//     .map(
//       (item, i) =>
//         `${i + 1}. ${item.name}\n   • Size: ${item.size}\n   • Color: ${item.color}\n   • Qty: ${item.qty}\n   • Price: ₹${(item.price * item.qty).toLocaleString()}`
//     )
//     .join("\n\n");

//   const msg =
//     `🛍️ *NEW ORDER — LUXE STORE*\n` +
//     `━━━━━━━━━━━━━━━━━━━━━\n\n` +
//     `👤 *CUSTOMER DETAILS*\n` +
//     `Name: ${form.name}\n` +
//     `Phone: ${form.phone}\n` +
//     `Address: ${form.address}\n` +
//     `City: ${form.city}\n` +
//     `Pincode: ${form.pincode}\n\n` +
//     `🧾 *ORDER DETAILS*\n` +
//     `━━━━━━━━━━━━━━━━━━━━━\n` +
//     `${itemLines}\n\n` +
//     `━━━━━━━━━━━━━━━━━━━━━\n` +
//     `📦 Subtotal: ₹${total.toLocaleString()}\n` +
//     `🚚 Shipping: ${shipping === 0 ? "FREE" : `₹${shipping}`}\n` +
//     `💰 *GRAND TOTAL: ₹${(total + shipping).toLocaleString()}*\n\n` +
//     (form.notes ? `📝 Notes: ${form.notes}\n\n` : "") +
//     `Thank you for shopping at LUXE! ✨`;

//   return encodeURIComponent(msg);
// }

// const STEPS = ["Cart", "Delivery", "Review"];

// export default function CheckoutPage() {
//   const { cart, cartTotal, clearCart } = useStore();
//   const total = cartTotal();
//   const shipping = total >= 2999 ? 0 : 199;
//   const grandTotal = total + shipping;

//   const [step, setStep] = useState(1); // 1 = form, 2 = review
//   const [placed, setPlaced] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: "",
//     notes: "",
//   });
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const errs = {};
//     if (!form.name.trim()) errs.name = "Name is required";
//     if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
//       errs.phone = "Enter a valid 10-digit Indian mobile number";
//     if (!form.address.trim()) errs.address = "Address is required";
//     if (!form.city.trim()) errs.city = "City is required";
//     if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim()))
//       errs.pincode = "Enter a valid 6-digit pincode";
//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleNext = () => {
//     if (validate()) setStep(2);
//   };

//   const handlePlaceOrder = () => {
//     const msg = buildWhatsAppMessage(cart, form, total, shipping);
//     const url = `https://wa.me/${SHOP_WHATSAPP}?text=${msg}`;
//     window.open(url, "_blank");
//     setPlaced(true);
//     clearCart();
//   };

//   const InputField = ({ label, name, type = "text", placeholder, className = "" }) => (
//     <div className={className}>
//       <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={form[name]}
//         onChange={(e) => {
//           setForm((prev) => ({ ...prev, [name]: e.target.value }));
//           if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
//         }}
//         placeholder={placeholder}
//         className={`input-field ${errors[name] ? "border-red-400" : ""}`}
//       />
//       {errors[name] && (
//         <p className="font-body text-xs text-red-500 mt-1">{errors[name]}</p>
//       )}
//     </div>
//   );

//   if (cart.length === 0 && !placed) {
//     return (
//       <>
//         <Navbar />
//         <main className="max-w-screen-xl mx-auto px-6 py-24 text-center min-h-[60vh]">
//           <h1 className="font-display text-4xl text-stone-400 font-light mb-4">Your cart is empty</h1>
//           <Link href="/shop" className="btn-primary mt-4 inline-flex">
//             Continue Shopping
//           </Link>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   // Success screen
//   if (placed) {
//     return (
//       <>
//         <Navbar />
//         <main className="max-w-xl mx-auto px-6 py-24 text-center min-h-[60vh]">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" strokeWidth={1.5} />
//             <h1 className="font-display text-5xl text-stone-900 font-light mb-4">Order Sent!</h1>
//             <p className="font-body text-sm text-stone-500 leading-relaxed mb-8">
//               Your order details have been sent to us via WhatsApp. We'll confirm your order shortly and keep you updated on delivery.
//             </p>
//             <div className="bg-stone-50 rounded p-5 mb-8 text-left">
//               <p className="font-body text-xs text-stone-400 mb-2 uppercase tracking-widest">Customer</p>
//               <p className="font-body text-sm text-stone-700 font-medium">{form.name}</p>
//               <p className="font-body text-sm text-stone-500">{form.phone}</p>
//             </div>
//             <Link href="/" className="btn-primary inline-flex mx-auto">
//               Back to Home
//             </Link>
//           </motion.div>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-14">
//         {/* Header */}
//         <div className="mb-10">
//           <p className="section-subtitle">Secure Checkout</p>
//           <h1 className="section-title">Checkout</h1>
//         </div>

//         {/* Step indicator */}
//         <div className="flex items-center gap-3 mb-10">
//           {STEPS.map((s, i) => (
//             <div key={s} className="flex items-center gap-3">
//               <div className={`flex items-center gap-2 ${i + 1 <= step ? "text-stone-900" : "text-stone-300"}`}>
//                 <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-body text-xs ${i + 1 < step ? "bg-stone-900 border-stone-900 text-white" : i + 1 === step ? "border-stone-900 text-stone-900" : "border-stone-200 text-stone-300"}`}>
//                   {i + 1 < step ? "✓" : i + 1}
//                 </span>
//                 <span className="font-body text-xs tracking-widest uppercase hidden sm:block">{s}</span>
//               </div>
//               {i < STEPS.length - 1 && (
//                 <div className={`h-px w-12 md:w-20 ${i + 1 < step ? "bg-stone-900" : "bg-stone-200"}`} />
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
//           {/* Left: Form or Review */}
//           <div className="flex-1">
//             {step === 1 && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <h2 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-7 pb-4 border-b border-stone-100">
//                   Delivery Information
//                 </h2>

//                 <div className="space-y-6">
//                   <InputField label="Full Name *" name="name" placeholder="e.g. Priya Sharma" />
//                   <InputField label="Mobile Number *" name="phone" type="tel" placeholder="10-digit mobile number" />
//                   <InputField label="Full Address *" name="address" placeholder="Flat/House No., Street, Locality" />
//                   <div className="grid grid-cols-2 gap-5">
//                     <InputField label="City *" name="city" placeholder="e.g. Mumbai" />
//                     <InputField label="Pincode *" name="pincode" placeholder="6-digit pincode" />
//                   </div>

//                   <div>
//                     <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
//                       Special Notes (optional)
//                     </label>
//                     <textarea
//                       rows={3}
//                       value={form.notes}
//                       onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
//                       placeholder="Any special instructions or requests…"
//                       className="w-full border-b border-stone-200 bg-transparent py-3 font-body text-sm text-stone-700 placeholder:text-stone-300 focus:border-stone-500 focus:outline-none resize-none transition-colors"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 mt-8">
//                   <Link href="/cart" className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700">
//                     <ArrowLeft size={13} /> Back to Cart
//                   </Link>
//                   <button onClick={handleNext} className="btn-primary ml-auto">
//                     Review Order <ChevronRight size={14} />
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {step === 2 && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <h2 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-7 pb-4 border-b border-stone-100">
//                   Review Your Order
//                 </h2>

//                 {/* Delivery summary */}
//                 <div className="bg-stone-50 p-5 mb-7">
//                   <div className="flex justify-between mb-2">
//                     <p className="font-body text-[10px] tracking-widest uppercase text-stone-400">Delivering To</p>
//                     <button onClick={() => setStep(1)} className="font-body text-xs text-stone-400 underline hover:text-stone-700">
//                       Edit
//                     </button>
//                   </div>
//                   <p className="font-body text-sm text-stone-800 font-medium">{form.name}</p>
//                   <p className="font-body text-sm text-stone-500">{form.phone}</p>
//                   <p className="font-body text-sm text-stone-500">{form.address}, {form.city} — {form.pincode}</p>
//                   {form.notes && <p className="font-body text-xs text-stone-400 mt-2 italic">"{form.notes}"</p>}
//                 </div>

//                 {/* Cart items review */}
//                 <div className="space-y-4 mb-8">
//                   {cart.map((item) => (
//                     <div key={item.key} className="flex gap-4 items-center">
//                       <img src={item.images[0]} alt={item.name} className="w-16 h-20 object-cover bg-stone-100 shrink-0" />
//                       <div className="flex-1 min-w-0">
//                         <p className="font-display text-base font-light text-stone-900 truncate">{item.name}</p>
//                         <p className="font-body text-xs text-stone-400 mt-0.5">
//                           {item.color} · Size {item.size} · Qty {item.qty}
//                         </p>
//                       </div>
//                       <p className="font-body text-sm text-stone-900 shrink-0">₹{(item.price * item.qty).toLocaleString()}</p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* WhatsApp notice */}
//                 <div className="bg-emerald-50 border border-emerald-100 p-4 mb-7 flex gap-3">
//                   <MessageCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
//                   <div>
//                     <p className="font-body text-sm text-emerald-800 font-medium">Order via WhatsApp</p>
//                     <p className="font-body text-xs text-emerald-600 mt-0.5">
//                       Clicking "Place Order" will open WhatsApp with your complete order details pre-filled. Simply send the message to confirm your order.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button onClick={() => setStep(1)} className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700">
//                     <ArrowLeft size={13} /> Edit Details
//                   </button>
//                   <button
//                     onClick={handlePlaceOrder}
//                     className="flex-1 bg-emerald-600 text-white font-body text-xs tracking-widest uppercase px-6 py-4 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
//                   >
//                     <MessageCircle size={15} />
//                     Place Order on WhatsApp
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-center gap-2 mt-5 text-stone-400">
//                   <Lock size={11} />
//                   <p className="font-body text-[10px] tracking-wider uppercase">Secure & encrypted connection</p>
//                 </div>
//               </motion.div>
//             )}
//           </div>

//           {/* Right: Order summary */}
//           <div className="lg:w-80 xl:w-96 shrink-0">
//             <div className="bg-stone-50 p-7 sticky top-24">
//               <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-6 pb-4 border-b border-stone-200">
//                 Order Summary
//               </h3>
//               <div className="space-y-3 mb-5">
//                 {cart.map((item) => (
//                   <div key={item.key} className="flex justify-between gap-3">
//                     <span className="font-body text-xs text-stone-500 flex-1 min-w-0 truncate">
//                       {item.name} × {item.qty}
//                     </span>
//                     <span className="font-body text-xs text-stone-800 shrink-0">
//                       ₹{(item.price * item.qty).toLocaleString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <div className="border-t border-stone-200 pt-4 space-y-2 mb-5">
//                 <div className="flex justify-between">
//                   <span className="font-body text-sm text-stone-500">Subtotal</span>
//                   <span className="font-body text-sm">₹{total.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-body text-sm text-stone-500">Shipping</span>
//                   <span className={`font-body text-sm ${shipping === 0 ? "text-emerald-600" : ""}`}>
//                     {shipping === 0 ? "FREE" : `₹${shipping}`}
//                   </span>
//                 </div>
//               </div>
//               <div className="border-t border-stone-200 pt-4">
//                 <div className="flex justify-between items-baseline">
//                   <span className="font-body text-sm font-medium text-stone-900">Total</span>
//                   <span className="font-display text-2xl font-light text-stone-900">
//                     ₹{grandTotal.toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   CreditCard, ChevronRight, CheckCircle, Lock,
//   ArrowLeft, ShieldCheck, MessageCircle, Smartphone
// } from "lucide-react";
// import Navbar from "../../components/layout/Navbar";
// import Footer from "../../components/layout/Footer";
// import { useStore } from "../../lib/store";
// import { SHOP_WHATSAPP } from "../../lib/products";

// // ─── RAZORPAY CONFIG ─────────────────────────────────────────────────────────
// // 1. Go to https://dashboard.razorpay.com → Settings → API Keys
// // 2. Replace the value below with your actual Key ID
// const RAZORPAY_KEY_ID = "rzp_test_SSC82A4rnlTeFx";
// const STORE_NAME      = "LUXE Store";
// const STORE_COLOR     = "#1c1917";
// // ─────────────────────────────────────────────────────────────────────────────

// /** Build WhatsApp message sent AFTER successful Razorpay payment */
// function buildWhatsAppMessage(cart, form, total, shipping, paymentId) {
//   const itemLines = cart
//     .map(
//       (item, i) =>
//         `${i + 1}. ${item.name}\n   • Size: ${item.size}\n   • Color: ${item.color}\n   • Qty: ${item.qty}\n   • Price: ₹${(item.price * item.qty).toLocaleString()}`
//     )
//     .join("\n\n");

//   return encodeURIComponent(
//     `✅ *PAYMENT CONFIRMED — LUXE STORE*\n` +
//     `━━━━━━━━━━━━━━━━━━━━━\n\n` +
//     `💳 *Payment ID:* ${paymentId}\n\n` +
//     `👤 *CUSTOMER DETAILS*\n` +
//     `Name: ${form.name}\n` +
//     `Phone: ${form.phone}\n` +
//     `Address: ${form.address}\n` +
//     `City: ${form.city} — ${form.pincode}\n\n` +
//     `🧾 *ORDER DETAILS*\n` +
//     `━━━━━━━━━━━━━━━━━━━━━\n` +
//     `${itemLines}\n\n` +
//     `━━━━━━━━━━━━━━━━━━━━━\n` +
//     `📦 Subtotal: ₹${total.toLocaleString()}\n` +
//     `🚚 Shipping: ${shipping === 0 ? "FREE" : `₹${shipping}`}\n` +
//     `💰 *GRAND TOTAL: ₹${(total + shipping).toLocaleString()}*\n\n` +
//     (form.notes ? `📝 Notes: ${form.notes}\n\n` : "") +
//     `Thank you for shopping at LUXE! ✨`
//   );
// }

// /** Dynamically inject the Razorpay checkout SDK */
// function useRazorpay() {
//   const [loaded, setLoaded] = useState(false);
//   useEffect(() => {
//     if (window.Razorpay) { setLoaded(true); return; }
//     const s = document.createElement("script");
//     s.src = "https://checkout.razorpay.com/v1/checkout.js";
//     s.onload  = () => setLoaded(true);
//     s.onerror = () => console.error("Failed to load Razorpay SDK");
//     document.body.appendChild(s);
//   }, []);
//   return loaded;
// }

// const STEPS = ["Cart", "Delivery", "Payment"];

// export default function CheckoutPage() {
//   const { cart, cartTotal, clearCart } = useStore();
//   const total      = cartTotal();
//   const shipping   = total >= 2999 ? 0 : 199;
//   const grandTotal = total + shipping;

//   const razorpayReady = useRazorpay();

//   const [step,      setStep]      = useState(1);
//   const [placed,    setPlaced]    = useState(false);
//   const [paymentId, setPaymentId] = useState("");
//   const [paying,    setPaying]    = useState(false);
//   const [payError,  setPayError]  = useState("");

//   const [form, setForm] = useState({
//     name: "", phone: "", address: "", city: "", pincode: "", notes: "",
//   });
//   const [errors, setErrors] = useState({});

//   // ── Validation ──────────────────────────────────────────────────────────
//   const validate = () => {
//     const e = {};
//     if (!form.name.trim())
//       e.name = "Name is required";
//     if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
//       e.phone = "Enter a valid 10-digit Indian mobile number";
//     if (!form.address.trim())
//       e.address = "Address is required";
//     if (!form.city.trim())
//       e.city = "City is required";
//     if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim()))
//       e.pincode = "Enter a valid 6-digit pincode";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleNext = () => { if (validate()) setStep(2); };

//   // ── Razorpay payment handler ─────────────────────────────────────────────
//   const handlePay = () => {
//     if (!razorpayReady) {
//       setPayError("Payment SDK not loaded — please refresh the page.");
//       return;
//     }
//     setPayError("");
//     setPaying(true);

//     // Snapshot cart now (it gets cleared on success)
//     const cartSnapshot = [...cart];

//     const options = {
//       key:         RAZORPAY_KEY_ID,
//       amount:      grandTotal * 100,   // Razorpay uses paise
//       currency:    "INR",
//       name:        STORE_NAME,
//       description: `Order — ${cart.length} item${cart.length !== 1 ? "s" : ""}`,
//       prefill: {
//         name:    form.name,
//         contact: form.phone,
//       },
//       theme:  { color: STORE_COLOR },
//       modal:  { ondismiss: () => setPaying(false) },

//       handler(response) {
//         // ── PAYMENT SUCCESSFUL ────────────────────────────────────
//         const pid = response.razorpay_payment_id;
//         setPaymentId(pid);
//         clearCart();
//         setPlaced(true);
//         setPaying(false);

//         // Auto-open WhatsApp with full order + payment confirmation
//         const msg = buildWhatsAppMessage(cartSnapshot, form, total, shipping, pid);
//         window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${msg}`, "_blank");
//       },
//     };

//     try {
//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", (res) => {
//         setPayError(`Payment failed: ${res.error.description}`);
//         setPaying(false);
//       });
//       rzp.open();
//     } catch (err) {
//       setPayError("Could not open payment window. Please verify your Razorpay Key ID.");
//       setPaying(false);
//     }
//   };

//   // ── Reusable input field ─────────────────────────────────────────────────
//   const Field = ({ label, name, type = "text", placeholder }) => (
//     <div>
//       <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={form[name]}
//         onChange={(e) => {
//           setForm((p) => ({ ...p, [name]: e.target.value }));
//           if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
//         }}
//         placeholder={placeholder}
//         className={`input-field ${errors[name] ? "border-red-400" : ""}`}
//       />
//       {errors[name] && (
//         <p className="font-body text-xs text-red-500 mt-1">{errors[name]}</p>
//       )}
//     </div>
//   );

//   // ── Empty cart guard ─────────────────────────────────────────────────────
//   if (cart.length === 0 && !placed) {
//     return (
//       <>
//         <Navbar />
//         <main className="max-w-screen-xl mx-auto px-6 py-24 text-center min-h-[60vh]">
//           <h1 className="font-display text-4xl text-stone-400 font-light mb-4">
//             Your cart is empty
//           </h1>
//           <Link href="/shop" className="btn-primary mt-4 inline-flex">
//             Continue Shopping
//           </Link>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   // ── Order success screen ─────────────────────────────────────────────────
//   if (placed) {
//     return (
//       <>
//         <Navbar />
//         <main className="max-w-xl mx-auto px-6 py-24 text-center min-h-[60vh]">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 200 }}
//           >
//             <CheckCircle
//               size={72}
//               className="text-emerald-500 mx-auto mb-6"
//               strokeWidth={1.2}
//             />
//             <h1 className="font-display text-5xl text-stone-900 font-light mb-3">
//               Payment Successful!
//             </h1>
//             <p className="font-body text-sm text-stone-500 leading-relaxed mb-8">
//               Your payment is confirmed and your order has been sent to us via WhatsApp. We'll dispatch within 24 hours.
//             </p>

//             {/* Confirmation card */}
//             <div className="bg-stone-50 border border-stone-100 p-6 mb-8 text-left space-y-4">
//               <div>
//                 <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-1">
//                   Razorpay Payment ID
//                 </p>
//                 <p className="font-body text-sm text-stone-700 font-medium tracking-wide font-mono">
//                   {paymentId}
//                 </p>
//               </div>
//               <div className="border-t border-stone-100 pt-4">
//                 <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-1">
//                   Delivering To
//                 </p>
//                 <p className="font-body text-sm text-stone-800 font-medium">{form.name}</p>
//                 <p className="font-body text-sm text-stone-500">{form.phone}</p>
//                 <p className="font-body text-sm text-stone-500">
//                   {form.address}, {form.city} — {form.pincode}
//                 </p>
//               </div>
//               <div className="border-t border-stone-100 pt-4 flex justify-between items-baseline">
//                 <p className="font-body text-[10px] tracking-widest uppercase text-stone-400">
//                   Amount Paid
//                 </p>
//                 <p className="font-display text-2xl font-light text-stone-900">
//                   ₹{grandTotal.toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             {/* Resend WhatsApp (in case auto-open was blocked) */}
//             <button
//               onClick={() => {
//                 const msg = buildWhatsAppMessage([], form, total, shipping, paymentId);
//                 window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${msg}`, "_blank");
//               }}
//               className="btn-outline w-full justify-center mb-4 flex gap-2 items-center"
//             >
//               <MessageCircle size={14} />
//               Resend Order Confirmation on WhatsApp
//             </button>

//             <Link
//               href="/"
//               className="btn-primary inline-flex w-full justify-center"
//             >
//               Back to Home
//             </Link>
//           </motion.div>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   // ── Main checkout layout ─────────────────────────────────────────────────
//   return (
//     <>
//       <Navbar />
//       <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-14">

//         {/* Page header */}
//         <div className="mb-10">
//           <p className="section-subtitle">Secure Checkout</p>
//           <h1 className="section-title">Checkout</h1>
//         </div>

//         {/* Step bar */}
//         <div className="flex items-center gap-3 mb-10">
//           {STEPS.map((s, i) => (
//             <div key={s} className="flex items-center gap-3">
//               <div className={`flex items-center gap-2 ${i + 1 <= step ? "text-stone-900" : "text-stone-300"}`}>
//                 <span
//                   className={`w-6 h-6 rounded-full border flex items-center justify-center font-body text-xs
//                     ${i + 1 < step
//                       ? "bg-stone-900 border-stone-900 text-white"
//                       : i + 1 === step
//                       ? "border-stone-900 text-stone-900"
//                       : "border-stone-200 text-stone-300"
//                     }`}
//                 >
//                   {i + 1 < step ? "✓" : i + 1}
//                 </span>
//                 <span className="font-body text-xs tracking-widest uppercase hidden sm:block">
//                   {s}
//                 </span>
//               </div>
//               {i < STEPS.length - 1 && (
//                 <div className={`h-px w-12 md:w-20 ${i + 1 < step ? "bg-stone-900" : "bg-stone-200"}`} />
//               )}
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

//           {/* ── LEFT: Form / Review ─────────────────────── */}
//           <div className="flex-1">

//             {/* ── STEP 1: Delivery form ── */}
//             {step === 1 && (
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <h2 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-7 pb-4 border-b border-stone-100">
//                   Delivery Information
//                 </h2>

//                 <div className="space-y-6">
//                   <Field label="Full Name *"     name="name"    placeholder="e.g. Priya Sharma" />
//                   <Field label="Mobile Number *" name="phone"   type="tel" placeholder="10-digit mobile number" />
//                   <Field label="Full Address *"  name="address" placeholder="Flat/House No., Street, Locality" />
//                   <div className="grid grid-cols-2 gap-5">
//                     <Field label="City *"    name="city"    placeholder="e.g. Mumbai" />
//                     <Field label="Pincode *" name="pincode" placeholder="6-digit pincode" />
//                   </div>
//                   <div>
//                     <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
//                       Special Notes (optional)
//                     </label>
//                     <textarea
//                       rows={3}
//                       value={form.notes}
//                       onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
//                       placeholder="Any special instructions or requests…"
//                       className="w-full border-b border-stone-200 bg-transparent py-3 font-body text-sm text-stone-700 placeholder:text-stone-300 focus:border-stone-500 focus:outline-none resize-none transition-colors"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 mt-8">
//                   <Link
//                     href="/cart"
//                     className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700"
//                   >
//                     <ArrowLeft size={13} /> Back to Cart
//                   </Link>
//                   <button onClick={handleNext} className="btn-primary ml-auto gap-2">
//                     Review Order <ChevronRight size={14} />
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* ── STEP 2: Review + Razorpay ── */}
//             {step === 2 && (
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <h2 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-7 pb-4 border-b border-stone-100">
//                   Review & Pay
//                 </h2>

//                 {/* Delivery address summary */}
//                 <div className="bg-stone-50 border border-stone-100 p-5 mb-7">
//                   <div className="flex justify-between mb-3">
//                     <p className="font-body text-[10px] tracking-widest uppercase text-stone-400">
//                       Delivering To
//                     </p>
//                     <button
//                       onClick={() => setStep(1)}
//                       className="font-body text-xs text-stone-400 underline underline-offset-2 hover:text-stone-700"
//                     >
//                       Edit
//                     </button>
//                   </div>
//                   <p className="font-body text-sm text-stone-800 font-medium">{form.name}</p>
//                   <p className="font-body text-sm text-stone-500">{form.phone}</p>
//                   <p className="font-body text-sm text-stone-500">
//                     {form.address}, {form.city} — {form.pincode}
//                   </p>
//                   {form.notes && (
//                     <p className="font-body text-xs text-stone-400 mt-2 italic">"{form.notes}"</p>
//                   )}
//                 </div>

//                 {/* Cart items */}
//                 <div className="space-y-4 mb-8">
//                   {cart.map((item) => (
//                     <div key={item.key} className="flex gap-4 items-center">
//                       <img
//                         src={item.images[0]}
//                         alt={item.name}
//                         className="w-16 h-20 object-cover bg-stone-100 shrink-0"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <p className="font-display text-base font-light text-stone-900 truncate">
//                           {item.name}
//                         </p>
//                         <p className="font-body text-xs text-stone-400 mt-0.5">
//                           {item.color} · Size {item.size} · Qty {item.qty}
//                         </p>
//                       </div>
//                       <p className="font-body text-sm text-stone-900 shrink-0">
//                         ₹{(item.price * item.qty).toLocaleString()}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Accepted payment methods */}
//                 <div className="border border-stone-100 p-5 mb-7">
//                   <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4">
//                     Accepted via Razorpay
//                   </p>
//                   <div className="flex flex-wrap gap-2.5">
//                     {[
//                       { icon: "💳", label: "Credit / Debit Card" },
//                       { icon: "📱", label: "UPI (GPay, PhonePe…)" },
//                       { icon: "🏦", label: "Net Banking" },
//                       { icon: "💰", label: "Wallets" },
//                       { icon: "📲", label: "EMI" },
//                     ].map(({ icon, label }) => (
//                       <span
//                         key={label}
//                         className="inline-flex items-center gap-1.5 bg-stone-50 font-body text-xs text-stone-600 px-3 py-2"
//                       >
//                         {icon} {label}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Post-payment WhatsApp note */}
//                 <div className="bg-emerald-50 border border-emerald-100 p-4 mb-7 flex gap-3">
//                   <MessageCircle size={17} className="text-emerald-500 shrink-0 mt-0.5" />
//                   <div>
//                     <p className="font-body text-sm text-emerald-800 font-medium">
//                       Confirmation via WhatsApp
//                     </p>
//                     <p className="font-body text-xs text-emerald-600 mt-0.5 leading-relaxed">
//                       Once Razorpay confirms your payment, your order details and Payment ID will be automatically sent to our WhatsApp for fulfilment.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Payment error */}
//                 {payError && (
//                   <div className="bg-red-50 border border-red-200 p-4 mb-5">
//                     <p className="font-body text-xs text-red-600">{payError}</p>
//                   </div>
//                 )}

//                 {/* Action row */}
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setStep(1)}
//                     className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors shrink-0"
//                   >
//                     <ArrowLeft size={13} /> Edit Details
//                   </button>

//                   <button
//                     onClick={handlePay}
//                     disabled={paying || !razorpayReady}
//                     className={`flex-1 font-body text-xs tracking-widest uppercase px-6 py-4 transition-all flex items-center justify-center gap-2
//                       ${paying || !razorpayReady
//                         ? "bg-stone-300 text-white cursor-not-allowed"
//                         : "bg-stone-900 text-white hover:bg-stone-700 cursor-pointer active:scale-[0.99]"
//                       }`}
//                   >
//                     <CreditCard size={15} />
//                     {paying
//                       ? "Opening Razorpay…"
//                       : `Pay ₹${grandTotal.toLocaleString()} Securely`}
//                   </button>
//                 </div>

//                 {/* Trust row */}
//                 <div className="flex flex-wrap items-center justify-center gap-5 mt-6">
//                   {[
//                     { Icon: Lock,        label: "256-bit SSL" },
//                     { Icon: ShieldCheck, label: "PCI DSS Compliant" },
//                     { Icon: Smartphone,  label: "UPI Supported" },
//                   ].map(({ Icon, label }) => (
//                     <div key={label} className="flex items-center gap-1.5 text-stone-400">
//                       <Icon size={11} />
//                       <span className="font-body text-[9px] tracking-wider uppercase">{label}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <p className="text-center font-body text-[10px] text-stone-300 mt-3">
//                   Payments powered by <span className="text-stone-400 font-medium">Razorpay</span>
//                 </p>
//               </motion.div>
//             )}
//           </div>

//           {/* ── RIGHT: Order Summary ─────────────────────── */}
//           <div className="lg:w-80 xl:w-96 shrink-0">
//             <div className="bg-stone-50 p-7 sticky top-24">
//               <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-6 pb-4 border-b border-stone-200">
//                 Order Summary
//               </h3>

//               <div className="space-y-3 mb-5">
//                 {cart.map((item) => (
//                   <div key={item.key} className="flex justify-between gap-3">
//                     <span className="font-body text-xs text-stone-500 flex-1 min-w-0 truncate">
//                       {item.name} × {item.qty}
//                     </span>
//                     <span className="font-body text-xs text-stone-800 shrink-0">
//                       ₹{(item.price * item.qty).toLocaleString()}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t border-stone-200 pt-4 space-y-2 mb-5">
//                 <div className="flex justify-between">
//                   <span className="font-body text-sm text-stone-500">Subtotal</span>
//                   <span className="font-body text-sm">₹{total.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-body text-sm text-stone-500">Shipping</span>
//                   <span className={`font-body text-sm ${shipping === 0 ? "text-emerald-600" : ""}`}>
//                     {shipping === 0 ? "Free" : `₹${shipping}`}
//                   </span>
//                 </div>
//               </div>

//               <div className="border-t border-stone-200 pt-4 mb-6">
//                 <div className="flex justify-between items-baseline">
//                   <span className="font-body text-sm font-medium text-stone-900">Total</span>
//                   <span className="font-display text-2xl font-light text-stone-900">
//                     ₹{grandTotal.toLocaleString()}
//                   </span>
//                 </div>
//                 <p className="font-body text-[10px] text-stone-400 mt-1">Including all taxes</p>
//               </div>

//               {/* Accepted card badges */}
//               <div className="pt-5 border-t border-stone-100">
//                 <p className="font-body text-[9px] tracking-[0.2em] uppercase text-stone-400 mb-3">
//                   We Accept
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {["VISA", "MC", "AMEX", "RuPay", "UPI", "GPay", "PhonePe"].map((b) => (
//                     <span
//                       key={b}
//                       className="font-body text-[9px] font-medium tracking-wider text-stone-500 border border-stone-200 px-2 py-1"
//                     >
//                       {b}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard, ChevronRight, CheckCircle, Lock,
  ArrowLeft, ShieldCheck, MessageCircle, Smartphone, AlertCircle
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useStore } from "../../lib/store";
import { SHOP_WHATSAPP } from "../../lib/products";

// ─── RAZORPAY CONFIG ──────────────────────────────────────────────────────────
// Key ID comes from .env.local → NEXT_PUBLIC_RAZORPAY_KEY_ID
// Key SECRET stays server-side only (never here)
// ─────────────────────────────────────────────────────────────────────────────
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const STORE_NAME      = "LUXE Store";
const STORE_COLOR     = "#1c1917";

/** Build WhatsApp message sent AFTER successful verified payment */
function buildWhatsAppMessage(cart, form, total, shipping, paymentId, orderId) {
  const itemLines = cart
    .map(
      (item, i) =>
        `${i + 1}. ${item.name}\n   • Size: ${item.size}\n   • Color: ${item.color}\n   • Qty: ${item.qty}\n   • Price: ₹${(item.price * item.qty).toLocaleString()}`
    )
    .join("\n\n");

  return encodeURIComponent(
    `✅ *PAYMENT CONFIRMED — LUXE STORE*\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `💳 *Razorpay Payment ID:* ${paymentId}\n` +
    `📋 *Order ID:* ${orderId}\n\n` +
    `👤 *CUSTOMER DETAILS*\n` +
    `Name: ${form.name}\n` +
    `Phone: ${form.phone}\n` +
    `Address: ${form.address}\n` +
    `City: ${form.city} — ${form.pincode}\n\n` +
    `🧾 *ORDER DETAILS*\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `${itemLines}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━\n` +
    `📦 Subtotal: ₹${total.toLocaleString()}\n` +
    `🚚 Shipping: ${shipping === 0 ? "FREE" : `₹${shipping}`}\n` +
    `💰 *GRAND TOTAL: ₹${(total + shipping).toLocaleString()}*\n\n` +
    (form.notes ? `📝 Notes: ${form.notes}\n\n` : "") +
    `Thank you for shopping at LUXE! ✨`
  );
}

/** Dynamically inject the Razorpay checkout SDK */
function useRazorpay() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Razorpay) { setLoaded(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload  = () => setLoaded(true);
    s.onerror = () => console.error("Failed to load Razorpay SDK");
    document.body.appendChild(s);
  }, []);
  return loaded;
}

const STEPS = ["Cart", "Delivery", "Payment"];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const total      = cartTotal();
  const shipping   = total >= 129999 ? 0 : 199;
  const grandTotal = total + shipping;

  const razorpayReady = useRazorpay();

  const [step,      setStep]      = useState(1);
  const [placed,    setPlaced]    = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [orderId,   setOrderId]   = useState("");
  const [paying,    setPaying]    = useState(false);
  const [payError,  setPayError]  = useState("");

  // Snapshot cart before clearing so WhatsApp message still has items
  const [cartSnapshot, setCartSnapshot] = useState([]);

  const [form, setForm] = useState({
    name: "", phone: "", address: "", city: "", pincode: "", notes: "",
  });
  const [errors, setErrors] = useState({});

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim())
      e.name = "Name is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
      e.phone = "Enter a valid 10-digit Indian mobile number";
    if (!form.address.trim())
      e.address = "Address is required";
    if (!form.city.trim())
      e.city = "City is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode.trim()))
      e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) setStep(2); };

  // ── Razorpay payment handler ─────────────────────────────────────────────
  //
  //  FLOW:
  //   1. POST /api/create-order   → server creates order on Razorpay → returns order_id
  //   2. Open Razorpay modal with order_id (required — this was the bug before)
  //   3. POST /api/verify-payment → server verifies HMAC signature → returns verified: true
  //   4. WhatsApp opens with full order + both IDs
  //
  const handlePay = async () => {
    if (!razorpayReady) {
      setPayError("Payment SDK not loaded — please refresh the page.");
      return;
    }
    if (!RAZORPAY_KEY_ID) {
      setPayError("Razorpay key not configured. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to .env.local");
      return;
    }

    setPayError("");
    setPaying(true);

    // ── STEP 1: Create Razorpay order on server ───────────────────────────
    let rzpOrder;
    try {
      const res = await fetch("/api/create-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount:  grandTotal,              // server multiplies × 100 to paise
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.id) {
        setPayError(data.error || "Could not create payment order. Please try again.");
        setPaying(false);
        return;
      }

      rzpOrder = data; // { id, amount, currency }
    } catch {
      setPayError("Network error. Please check your connection and try again.");
      setPaying(false);
      return;
    }

    // Snapshot cart now, before clearCart() wipes it on success
    const snapshot = [...cart];
    setCartSnapshot(snapshot);

    // ── STEP 2: Open Razorpay modal ───────────────────────────────────────
    const options = {
      key:         RAZORPAY_KEY_ID,   // public key from .env.local
      amount:      rzpOrder.amount,   // paise, as returned by server
      currency:    rzpOrder.currency,
      order_id:    rzpOrder.id,       // ← THE CRITICAL FIX — required by Razorpay
      name:        STORE_NAME,
      description: `Order — ${cart.length} item${cart.length !== 1 ? "s" : ""}`,
      prefill: {
        name:    form.name,
        contact: form.phone,
      },
      theme: { color: STORE_COLOR },
      modal: {
        ondismiss() {
          setPaying(false);
          setPayError("Payment was cancelled. You can try again.");
        },
      },

      // ── STEP 3: Payment captured → verify on server ───────────────────
      async handler(response) {
        try {
          const verifyRes = await fetch("/api/verify-payment", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (!verifyData.verified) {
            setPayError("Payment verification failed. Please contact support.");
            setPaying(false);
            return;
          }

          // ── STEP 4: Verified — update state, clear cart, open WhatsApp ─
          const pid = response.razorpay_payment_id;
          const oid = response.razorpay_order_id;

          setPaymentId(pid);
          setOrderId(oid);
          clearCart();
          setPlaced(true);
          setPaying(false);

          // Auto-open WhatsApp with full order + both IDs
          const msg = buildWhatsAppMessage(snapshot, form, total, shipping, pid, oid);
          window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${msg}`, "_blank");

        } catch {
          setPayError("Verification error. Please contact support with your Payment ID.");
          setPaying(false);
        }
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (res) => {
        setPayError(`Payment failed: ${res.error.description}. Please try a different method.`);
        setPaying(false);
      });
      rzp.open();
    } catch (err) {
      setPayError("Could not open payment window. Please refresh and try again.");
      setPaying(false);
    }
  };

  // ── Reusable input field ─────────────────────────────────────────────────
  const Field = ({ label, name, type = "text", placeholder }) => (
    <div>
      <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => {
          setForm((p) => ({ ...p, [name]: e.target.value }));
          if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
        }}
        placeholder={placeholder}
        className={`input-field ${errors[name] ? "border-red-400" : ""}`}
      />
      {errors[name] && (
        <p className="font-body text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );

  // ── Empty cart guard ─────────────────────────────────────────────────────
  if (cart.length === 0 && !placed) {
    return (
      <>
        <Navbar />
        <main className="max-w-screen-xl mx-auto px-6 py-24 text-center min-h-[60vh]">
          <h1 className="font-display text-4xl text-stone-400 font-light mb-4">
            Your cart is empty
          </h1>
          <Link href="/shop" className="btn-primary mt-4 inline-flex">
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // ── Order success screen ─────────────────────────────────────────────────
  if (placed) {
    return (
      <>
        <Navbar />
        <main className="max-w-xl mx-auto px-6 py-24 text-center min-h-[60vh]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle
              size={72}
              className="text-emerald-500 mx-auto mb-6"
              strokeWidth={1.2}
            />
            <h1 className="font-display text-5xl text-stone-900 font-light mb-3">
              Payment Successful!
            </h1>
            <p className="font-body text-sm text-stone-500 leading-relaxed mb-8">
              Your payment is confirmed and your order has been sent to us via WhatsApp. We'll dispatch within 24 hours.
            </p>

            {/* Confirmation card */}
            <div className="bg-stone-50 border border-stone-100 p-6 mb-8 text-left space-y-4">
              <div>
                <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-1">
                  Razorpay Payment ID
                </p>
                <p className="font-body text-sm text-stone-700 font-medium tracking-wide font-mono">
                  {paymentId}
                </p>
              </div>
              <div className="border-t border-stone-100 pt-4">
                <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-1">
                  Order ID
                </p>
                <p className="font-body text-xs text-stone-500 font-mono">
                  {orderId}
                </p>
              </div>
              <div className="border-t border-stone-100 pt-4">
                <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mb-1">
                  Delivering To
                </p>
                <p className="font-body text-sm text-stone-800 font-medium">{form.name}</p>
                <p className="font-body text-sm text-stone-500">{form.phone}</p>
                <p className="font-body text-sm text-stone-500">
                  {form.address}, {form.city} — {form.pincode}
                </p>
              </div>
              <div className="border-t border-stone-100 pt-4 flex justify-between items-baseline">
                <p className="font-body text-[10px] tracking-widests uppercase text-stone-400">
                  Amount Paid
                </p>
                <p className="font-display text-2xl font-light text-stone-900">
                  ₹{grandTotal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Resend WhatsApp (in case auto-open was blocked by browser) */}
            <button
              onClick={() => {
                const msg = buildWhatsAppMessage(cartSnapshot, form, total, shipping, paymentId, orderId);
                window.open(`https://wa.me/${SHOP_WHATSAPP}?text=${msg}`, "_blank");
              }}
              className="btn-outline w-full justify-center mb-4 flex gap-2 items-center"
            >
              <MessageCircle size={14} />
              Resend Order Confirmation on WhatsApp
            </button>

            <Link
              href="/"
              className="btn-primary inline-flex w-full justify-center"
            >
              Back to Home
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  // ── Main checkout layout ─────────────────────────────────────────────────
  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-14">

        {/* Page header */}
        <div className="mb-10">
          <p className="section-subtitle">Secure Checkout</p>
          <h1 className="section-title">Checkout</h1>
        </div>

        {/* Step bar */}
        <div className="flex items-center gap-3 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 ${i + 1 <= step ? "text-stone-900" : "text-stone-300"}`}>
                <span
                  className={`w-6 h-6 rounded-full border flex items-center justify-center font-body text-xs
                    ${i + 1 < step
                      ? "bg-stone-900 border-stone-900 text-white"
                      : i + 1 === step
                      ? "border-stone-900 text-stone-900"
                      : "border-stone-200 text-stone-300"
                    }`}
                >
                  {i + 1 < step ? "✓" : i + 1}
                </span>
                <span className="font-body text-xs tracking-widest uppercase hidden sm:block">
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px w-12 md:w-20 ${i + 1 < step ? "bg-stone-900" : "bg-stone-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

          {/* ── LEFT: Form / Review ─────────────────────── */}
          <div className="flex-1">

            {/* ── STEP 1: Delivery form ── */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-7 pb-4 border-b border-stone-100">
                  Delivery Information
                </h2>

                <div className="space-y-6">
                  <Field label="Full Name *"     name="name"    placeholder="e.g. Priya Sharma" />
                  <Field label="Mobile Number *" name="phone"   type="tel" placeholder="10-digit mobile number" />
                  <Field label="Full Address *"  name="address" placeholder="Flat/House No., Street, Locality" />
                  <div className="grid grid-cols-2 gap-5">
                    <Field label="City *"    name="city"    placeholder="e.g. Mumbai" />
                    <Field label="Pincode *" name="pincode" placeholder="6-digit pincode" />
                  </div>
                  <div>
                    <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
                      Special Notes (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                      placeholder="Any special instructions or requests…"
                      className="w-full border-b border-stone-200 bg-transparent py-3 font-body text-sm text-stone-700 placeholder:text-stone-300 focus:border-stone-500 focus:outline-none resize-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8">
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700"
                  >
                    <ArrowLeft size={13} /> Back to Cart
                  </Link>
                  <button onClick={handleNext} className="btn-primary ml-auto gap-2">
                    Review Order <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Review + Razorpay ── */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-7 pb-4 border-b border-stone-100">
                  Review & Pay
                </h2>

                {/* Delivery address summary */}
                <div className="bg-stone-50 border border-stone-100 p-5 mb-7">
                  <div className="flex justify-between mb-3">
                    <p className="font-body text-[10px] tracking-widest uppercase text-stone-400">
                      Delivering To
                    </p>
                    <button
                      onClick={() => setStep(1)}
                      className="font-body text-xs text-stone-400 underline underline-offset-2 hover:text-stone-700"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="font-body text-sm text-stone-800 font-medium">{form.name}</p>
                  <p className="font-body text-sm text-stone-500">{form.phone}</p>
                  <p className="font-body text-sm text-stone-500">
                    {form.address}, {form.city} — {form.pincode}
                  </p>
                  {form.notes && (
                    <p className="font-body text-xs text-stone-400 mt-2 italic">"{form.notes}"</p>
                  )}
                </div>

                {/* Cart items */}
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item.key} className="flex gap-4 items-center">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-20 object-cover bg-stone-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-base font-light text-stone-900 truncate">
                          {item.name}
                        </p>
                        <p className="font-body text-xs text-stone-400 mt-0.5">
                          {item.color} · Size {item.size} · Qty {item.qty}
                        </p>
                      </div>
                      <p className="font-body text-sm text-stone-900 shrink-0">
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Accepted payment methods */}
                <div className="border border-stone-100 p-5 mb-7">
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-4">
                    Accepted via Razorpay
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { icon: "💳", label: "Credit / Debit Card" },
                      { icon: "📱", label: "UPI (GPay, PhonePe…)" },
                      { icon: "🏦", label: "Net Banking" },
                      { icon: "💰", label: "Wallets" },
                      { icon: "📲", label: "EMI" },
                    ].map(({ icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 bg-stone-50 font-body text-xs text-stone-600 px-3 py-2"
                      >
                        {icon} {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Post-payment WhatsApp note */}
                <div className="bg-emerald-50 border border-emerald-100 p-4 mb-7 flex gap-3">
                  <MessageCircle size={17} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body text-sm text-emerald-800 font-medium">
                      Confirmation via WhatsApp
                    </p>
                    <p className="font-body text-xs text-emerald-600 mt-0.5 leading-relaxed">
                      Once Razorpay verifies your payment, your order details and Payment ID will be automatically sent to our WhatsApp for fulfilment.
                    </p>
                  </div>
                </div>

                {/* Payment error */}
                {payError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 p-4 mb-5 flex gap-3 items-start"
                  >
                    <AlertCircle size={15} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="font-body text-xs text-red-700 leading-relaxed">{payError}</p>
                  </motion.div>
                )}

                {/* Action row */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors shrink-0"
                  >
                    <ArrowLeft size={13} /> Edit Details
                  </button>

                  <button
                    onClick={handlePay}
                    disabled={paying || !razorpayReady}
                    className={`flex-1 font-body text-xs tracking-widest uppercase px-6 py-4 transition-all flex items-center justify-center gap-2
                      ${paying || !razorpayReady
                        ? "bg-stone-300 text-white cursor-not-allowed"
                        : "bg-stone-900 text-white hover:bg-stone-700 cursor-pointer active:scale-[0.99]"
                      }`}
                  >
                    {paying ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating Order…
                      </>
                    ) : (
                      <>
                        <CreditCard size={15} />
                        {`Pay ₹${grandTotal.toLocaleString()} Securely`}
                      </>
                    )}
                  </button>
                </div>

                {/* Trust row */}
                <div className="flex flex-wrap items-center justify-center gap-5 mt-6">
                  {[
                    { Icon: Lock,        label: "256-bit SSL" },
                    { Icon: ShieldCheck, label: "PCI DSS Compliant" },
                    { Icon: Smartphone,  label: "UPI Supported" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 text-stone-400">
                      <Icon size={11} />
                      <span className="font-body text-[9px] tracking-wider uppercase">{label}</span>
                    </div>
                  ))}
                </div>

                <p className="text-center font-body text-[10px] text-stone-300 mt-3">
                  Payments powered by <span className="text-stone-400 font-medium">Razorpay</span>
                </p>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: Order Summary ─────────────────────── */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <div className="bg-stone-50 p-7 sticky top-24">
              <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-600 mb-6 pb-4 border-b border-stone-200">
                Order Summary
              </h3>

              <div className="space-y-3 mb-5">
                {cart.map((item) => (
                  <div key={item.key} className="flex justify-between gap-3">
                    <span className="font-body text-xs text-stone-500 flex-1 min-w-0 truncate">
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-body text-xs text-stone-800 shrink-0">
                      ₹{(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-4 space-y-2 mb-5">
                <div className="flex justify-between">
                  <span className="font-body text-sm text-stone-500">Subtotal</span>
                  <span className="font-body text-sm">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-sm text-stone-500">Shipping</span>
                  <span className={`font-body text-sm ${shipping === 0 ? "text-emerald-600" : ""}`}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="border-t border-stone-200 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-body text-sm font-medium text-stone-900">Total</span>
                  <span className="font-display text-2xl font-light text-stone-900">
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
                <p className="font-body text-[10px] text-stone-400 mt-1">Including all taxes</p>
              </div>

              {/* Accepted card badges */}
              <div className="pt-5 border-t border-stone-100">
                <p className="font-body text-[9px] tracking-[0.2em] uppercase text-stone-400 mb-3">
                  We Accept
                </p>
                <div className="flex flex-wrap gap-2">
                  {["VISA", "MC", "AMEX", "RuPay", "UPI", "GPay", "PhonePe"].map((b) => (
                    <span
                      key={b}
                      className="font-body text-[9px] font-medium tracking-wider text-stone-500 border border-stone-200 px-2 py-1"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}