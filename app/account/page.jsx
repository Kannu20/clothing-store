"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package, Heart, MapPin, LogOut, ShieldCheck,
  ChevronRight, AlertCircle, Phone, CheckCircle2,
  X, RefreshCw, KeyRound, Mail, Camera, Plus,
  Pencil, Trash2, Home, Briefcase, LocateFixed,
  Loader2, Save
} from "lucide-react";
import Navbar from "/components/layout/Navbar";
import Footer from "/components/layout/Footer";
import { useAuth } from "/contexts/AuthContext";
import { useStore } from "/lib/store";
import { auth } from "/lib/firebase";
import { RecaptchaVerifier, PhoneAuthProvider, updatePhoneNumber } from "firebase/auth";

// ─────────────────────────────────────────────────────────────────────────────
//  ADDRESS MODAL
// ─────────────────────────────────────────────────────────────────────────────
function AddressModal({ existing, onSave, onClose }) {
  const isEdit = !!existing;
  const [form, setForm] = useState({
    label: existing?.label || "Home",
    name: existing?.name || "",
    phone: existing?.phone || "",
    line1: existing?.line1 || "",
    landmark: existing?.landmark || "",
    city: existing?.city || "",
    state: existing?.state || "",
    pincode: existing?.pincode || "",
  });
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");
  const [mapReady, setMapReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const mapDivRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Load Leaflet from CDN
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.L) { setMapReady(true); return; }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setMapReady(true);
    script.onerror = () => setGeoError("Map load failed. Fill address manually.");
    document.head.appendChild(script);
    return () => {
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.remove(); } catch { }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Init map once Leaflet + div ready
  useEffect(() => {
    if (!mapReady || !mapDivRef.current || mapInstanceRef.current) return;
    const L = window.L;
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
    const map = L.map(mapDivRef.current, { zoomControl: true }).setView([20.5937, 78.9629], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors", maxZoom: 19,
    }).addTo(map);
    map.on("click", async (e) => {
      placeMarker(e.latlng.lat, e.latlng.lng, map);
      await reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
    mapInstanceRef.current = map;
  }, [mapReady]);

  const placeMarker = (lat, lng, mapArg) => {
    const L = window.L;
    const m = mapArg || mapInstanceRef.current;
    if (!m) return;
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng], { draggable: true }).addTo(m);
      markerRef.current.on("dragend", async (ev) => {
        const { lat: la, lng: ln } = ev.target.getLatLng();
        await reverseGeocode(la, ln);
      });
    }
    m.setView([lat, lng], 15);
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      const a = data.address || {};
      set("line1", [a.road, a.suburb, a.neighbourhood, a.quarter].filter(Boolean).join(", "));
      set("city", a.city || a.town || a.village || a.county || "");
      set("state", a.state || "");
      set("pincode", a.postcode || "");
    } catch { }
  };

  const useMyLocation = () => {
    setGeoError("");
    setLocating(true);
    if (!navigator.geolocation) { setGeoError("Geolocation not supported."); setLocating(false); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        if (mapInstanceRef.current) placeMarker(lat, lng);
        await reverseGeocode(lat, lng);
        setLocating(false);
      },
      () => { setGeoError("Location access denied. Fill manually ya manually type karo."); setLocating(false); },
      { timeout: 10000 }
    );
  };

  const handleSubmit = () => {
    if (!form.name.trim()) { setFormError("Name required."); return; }
    if (!form.phone.trim()) { setFormError("Phone required."); return; }
    if (!form.line1.trim()) { setFormError("Address required."); return; }
    if (!form.city.trim()) { setFormError("City required."); return; }
    if (!form.pincode.trim()) { setFormError("Pincode required."); return; }
    setSaving(true);
    onSave(form);
  };

  const labelOptions = [
    { value: "Home", icon: Home },
    { value: "Work", icon: Briefcase },
    { value: "Other", icon: MapPin },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-stone-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-400">{isEdit ? "Edit" : "Add New"}</p>
            <h3 className="font-display text-xl font-light text-stone-900">Delivery Address</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Map section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-body text-xs tracking-[0.1em] uppercase text-stone-500">Pin on Map</p>
              <button onClick={useMyLocation} disabled={locating}
                className="flex items-center gap-1.5 font-body text-xs text-stone-600 border border-stone-200 px-3 py-1.5 hover:border-stone-800 hover:text-stone-900 transition-all disabled:opacity-50"
              >
                {locating
                  ? <><Loader2 size={11} className="animate-spin" /> Locating…</>
                  : <><LocateFixed size={11} /> Use My Location</>
                }
              </button>
            </div>
            <div className="relative border border-stone-200 overflow-hidden">
              <div ref={mapDivRef} style={{ height: "220px", width: "100%" }} />
              {!mapReady && (
                <div className="absolute inset-0 bg-stone-50 flex flex-col items-center justify-center gap-2">
                  <span className="w-6 h-6 border-2 border-stone-200 border-t-stone-600 rounded-full animate-spin" />
                  <span className="font-body text-[10px] text-stone-400">Map load ho raha hai…</span>
                </div>
              )}
            </div>
            {geoError && (
              <p className="font-body text-[10px] text-amber-600 mt-1.5 flex items-center gap-1">
                <AlertCircle size={10} /> {geoError}
              </p>
            )}
            <p className="font-body text-[10px] text-stone-300 mt-1">Map pe tap karo → fields auto-fill · Marker drag kar sakte ho</p>
          </div>

          {/* Label */}
          <div>
            <p className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-400 mb-2">Address Label</p>
            <div className="flex gap-2">
              {labelOptions.map(({ value, icon: Icon }) => (
                <button key={value} onClick={() => set("label", value)}
                  className={`flex items-center gap-1.5 px-4 py-2 border font-body text-xs tracking-wider uppercase transition-all ${form.label === value ? "border-stone-900 bg-stone-900 text-white" : "border-stone-200 text-stone-500 hover:border-stone-400"
                    }`}
                >
                  <Icon size={11} /> {value}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {[
              { key: "name", label: "Full Name", placeholder: "Priya Sharma", span: 1 },
              { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", span: 1 },
              { key: "line1", label: "Address Line", placeholder: "House no., Street, Area", span: 2 },
              { key: "landmark", label: "Landmark (optional)", placeholder: "Near ABC Mall", span: 2 },
              { key: "city", label: "City", placeholder: "Mumbai", span: 1 },
              { key: "state", label: "State", placeholder: "Maharashtra", span: 1 },
              { key: "pincode", label: "Pincode", placeholder: "400001", span: 1 },
            ].map(({ key, label, placeholder, span }) => (
              <div key={key} className={span === 2 ? "sm:col-span-2" : ""}>
                <label className="block font-body text-[10px] tracking-[0.15em] uppercase text-stone-400 mb-1.5">{label}</label>
                <input
                  type="text" value={form[key]} placeholder={placeholder}
                  onChange={(e) => { set(key, e.target.value); setFormError(""); }}
                  className="w-full border-b border-stone-200 bg-transparent py-2.5 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-700 transition-colors"
                />
              </div>
            ))}
          </div>

          {formError && (
            <p className="font-body text-xs text-red-500 flex items-center gap-1.5">
              <AlertCircle size={12} /> {formError}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
            <button onClick={handleSubmit} disabled={saving}
              className="btn-primary flex-1 gap-2 py-3 justify-center disabled:opacity-60"
            >
              {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : <><Save size={14} /> {isEdit ? "Update Address" : "Save Address"}</>}
            </button>
            <button onClick={onClose}
              className="font-body text-xs tracking-widest uppercase text-stone-400 border border-stone-200 px-5 py-3 hover:border-stone-400 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  MAIN ACCOUNT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function AccountPage() {
  const router = useRouter();
  const { user, dbUser, loading, isLoggedIn, logout, getToken } = useAuth();
  const wishlistCount = useStore((s) => s.wishlist.length);
  const cartCount = useStore((s) => s.cartCount());

  // Photo
  const [localAvatar, setLocalAvatar] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const photoInputRef = useRef(null);

  // Address modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [localAddresses, setLocalAddresses] = useState(null);

  // Phone OTP
  const [phoneState, setPhoneState] = useState("idle");
  const [phoneInput, setPhoneInput] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneOtpDigits, setPhoneOtpDigits] = useState(["", "", "", "", "", ""]);
  const [phoneOtpError, setPhoneOtpError] = useState("");
  const [phoneCountdown, setPhoneCountdown] = useState(0);
  const [localPhoneData, setLocalPhoneData] = useState(null);
  const phoneConfirmRef = useRef(null);
  const recaptchaRef = useRef(null);
  const phoneOtpRefs = useRef([]);
  const phoneCountRef = useRef(null);

  // Email OTP
  const [emailState, setEmailState] = useState("idle");
  const [emailOtpDigits, setEmailOtpDigits] = useState(["", "", "", "", "", ""]);
  const [emailOtpError, setEmailOtpError] = useState("");
  const [emailCountdown, setEmailCountdown] = useState(0);
  const [localEmailVerified, setLocalEmailVerified] = useState(false);
  const emailOtpRefs = useRef([]);
  const emailCountRef = useRef(null);

  useEffect(() => {
    if (!loading && !isLoggedIn) router.replace("/login");
  }, [isLoggedIn, loading, router]);

  useEffect(() => {
    return () => {
      if (recaptchaRef.current) try { recaptchaRef.current.clear(); } catch { }
      clearInterval(phoneCountRef.current);
      clearInterval(emailCountRef.current);
    };
  }, []);

  if (loading || !isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-stone-200 border-t-stone-700 rounded-full animate-spin" />
      </div>
    );
  }

  const displayName = dbUser?.name || user?.displayName || "Customer";
  const email = dbUser?.email || user?.email || "";
  const avatar = localAvatar || dbUser?.avatar || user?.photoURL || "";
  const provider = dbUser?.provider || "email";
  const phone = localPhoneData?.phone ?? dbUser?.phone ?? "";
  const phoneVerified = localPhoneData?.phoneVerified ?? dbUser?.phoneVerified ?? false;
  const emailVerified = localEmailVerified || dbUser?.emailVerified || user?.emailVerified || false;
  const addresses = localAddresses ?? dbUser?.addresses ?? [];
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const startCountdown = (setFn, ref, secs) => {
    setFn(secs); clearInterval(ref.current);
    ref.current = setInterval(() => {
      setFn((p) => { if (p <= 1) { clearInterval(ref.current); return 0; } return p - 1; });
    }, 1000);
  };

  // ── Photo upload ──────────────────────────────────────────────────────────
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setPhotoError("Image file select karo."); return; }
    if (file.size > 5 * 1024 * 1024) { setPhotoError("5 MB se chhoti image chahiye."); return; }
    setPhotoError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 300;
        const ctx = canvas.getContext("2d");
        const size = Math.min(img.width, img.height);
        ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, 300, 300);
        const base64 = canvas.toDataURL("image/jpeg", 0.82);
        setPhotoUploading(true);
        try {
          const token = await getToken();
          const res = await fetch("/api/auth/me", {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ avatar: base64 }),
          });
          const data = await res.json();
          if (data.success) setLocalAvatar(base64);
          else setPhotoError("Save failed. Try again.");
        } catch { setPhotoError("Network error."); }
        finally { setPhotoUploading(false); }
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // ── Address CRUD ──────────────────────────────────────────────────────────
  const saveAddress = async (formData) => {
    try {
      const token = await getToken();
      const isEdit = editingAddress !== null;
      const body = isEdit
        ? { action: "updateAddress", index: editingAddress.index, address: formData }
        : { action: "addAddress", address: formData };
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        setLocalAddresses(data.user.addresses);
        setShowAddressModal(false);
        setEditingAddress(null);
      }
    } catch { }
  };

  const deleteAddress = async (index) => {
    if (!confirm("Delete this address?")) return;
    try {
      const token = await getToken();
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action: "deleteAddress", index }),
      });
      const data = await res.json();
      if (data.success) setLocalAddresses(data.user.addresses);
    } catch { }
  };

  // ── Phone OTP ─────────────────────────────────────────────────────────────
  const sendPhoneOtp = async (phoneNum) => {
    const digits = phoneNum.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(digits)) { setPhoneError("Valid 10-digit Indian number required."); return; }
    setPhoneError(""); setPhoneState("sending");
    if (!auth?.currentUser) { setPhoneError("Please log in first."); setPhoneState("entering"); return; }
    try {
      if (recaptchaRef.current) { try { recaptchaRef.current.clear(); } catch { } recaptchaRef.current = null; }
      // const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      //   size: "invisible", callback: () {},
      //   "expired-callback": () => { setPhoneError("reCAPTCHA expired."); setPhoneState("entering"); },
      // });
      // await verifier.render();
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",

        callback: () => {
          // reCAPTCHA solved
        },

        "expired-callback": () => {
          setPhoneError("reCAPTCHA expired.");
          setPhoneState("entering");
        },
      });

      await verifier.render();
      recaptchaRef.current = verifier;
      const prov = new PhoneAuthProvider(auth);
      const vid = await prov.verifyPhoneNumber(`+91${digits}`, verifier);
      phoneConfirmRef.current = vid;
      setPhoneState("otp"); setPhoneOtpDigits(["", "", "", "", "", ""]); setPhoneOtpError("");
      startCountdown(setPhoneCountdown, phoneCountRef, 60);
      setTimeout(() => phoneOtpRefs.current[0]?.focus(), 100);
    } catch (err) {
      setPhoneState("entering");
      const m = {
        "auth/operation-not-allowed": "Phone sign-in not enabled in Firebase.",
        "auth/invalid-phone-number": "Invalid phone number.",
        "auth/too-many-requests": "Too many requests. Wait a few minutes.",
        "auth/requires-recent-login": "Please sign out and sign back in.",
      };
      setPhoneError(m[err.code] || err.message);
    }
  };

  const verifyPhoneOtp = async () => {
    const code = phoneOtpDigits.join("");
    if (code.length < 6) { setPhoneOtpError("Enter all 6 digits."); return; }
    if (!phoneConfirmRef.current) { setPhoneOtpError("Session expired."); setPhoneState("entering"); return; }
    setPhoneState("verifying"); setPhoneOtpError("");
    try {
      const cred = PhoneAuthProvider.credential(phoneConfirmRef.current, code);
      await updatePhoneNumber(auth.currentUser, cred);
      const token = await getToken();
      const fullPhone = `+91${phoneInput.replace(/\D/g, "")}`;
      const res = await fetch("/api/auth/verify-phone", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const data = await res.json();
      if (data.success) { setLocalPhoneData({ phone: fullPhone, phoneVerified: true }); setPhoneState("done"); }
      else { setPhoneOtpError("Profile update failed. Refresh."); setPhoneState("otp"); }
    } catch (err) {
      const m = {
        "auth/invalid-verification-code": "Incorrect OTP.",
        "auth/code-expired": "OTP expired.",
        "auth/credential-already-in-use": "Number linked to another account.",
        "auth/requires-recent-login": "Please sign out and sign back in.",
      };
      setPhoneOtpError(m[err.code] || err.message); setPhoneState("otp");
    }
  };

  // ── Email OTP ─────────────────────────────────────────────────────────────
  const sendEmailOtp = async () => {
    setEmailOtpError(""); setEmailState("sending");
    try {
      const token = await getToken();
      const res = await fetch("/api/auth/send-email-otp", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) { setEmailOtpError(data.error || "Failed."); setEmailState("idle"); return; }
      setEmailState("otp"); setEmailOtpDigits(["", "", "", "", "", ""]); setEmailOtpError("");
      startCountdown(setEmailCountdown, emailCountRef, 60);
      setTimeout(() => emailOtpRefs.current[0]?.focus(), 100);
    } catch { setEmailOtpError("Network error."); setEmailState("idle"); }
  };

  const verifyEmailOtp = async () => {
    const code = emailOtpDigits.join("");
    if (code.length < 6) { setEmailOtpError("Enter all 6 digits."); return; }
    setEmailState("verifying"); setEmailOtpError("");
    try {
      const token = await getToken();
      const res = await fetch("/api/auth/verify-email-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ otp: code }),
      });
      const data = await res.json();
      if (data.success) { setLocalEmailVerified(true); setEmailState("done"); }
      else { setEmailOtpError(data.error || "Incorrect OTP."); setEmailState("otp"); }
    } catch { setEmailOtpError("Network error."); setEmailState("otp"); }
  };

  const makeOtpHandler = (digits, setDigits, setError, verifyFn, refs) => ({
    onChange: (idx, val) => {
      const d = val.replace(/\D/g, "").slice(-1);
      const n = [...digits]; n[idx] = d; setDigits(n); setError("");
      if (d && idx < 5) refs.current[idx + 1]?.focus();
      if (n.every((x) => x) && n.join("").length === 6) setTimeout(() => { setDigits(n); verifyFn(); }, 120);
    },
    onKeyDown: (idx, e) => { if (e.key === "Backspace" && !digits[idx] && idx > 0) refs.current[idx - 1]?.focus(); },
    onPaste: (e) => {
      const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
      if (p.length === 6) { setDigits(p.split("")); refs.current[5]?.focus(); }
    },
  });

  const phoneOtpH = makeOtpHandler(phoneOtpDigits, setPhoneOtpDigits, setPhoneOtpError, verifyPhoneOtp, phoneOtpRefs);
  const emailOtpH = makeOtpHandler(emailOtpDigits, setEmailOtpDigits, setEmailOtpError, verifyEmailOtp, emailOtpRefs);

  const handleLogout = async () => { await logout(); router.push("/"); };

  const quickLinks = [
    { icon: Package, label: "Track Orders", href: "/order-tracking", badge: null },
    { icon: Heart, label: "My Wishlist", href: "/wishlist", badge: wishlistCount || null },
    { icon: MapPin, label: "Saved Addresses", href: "#addresses", badge: addresses.length || null },
  ];

  const labelIcon = (lbl) =>
    lbl === "Home" ? <Home size={10} /> : lbl === "Work" ? <Briefcase size={10} /> : <MapPin size={10} />;

  // Helper: OTP input row
  const OtpBoxes = ({ digits, handlers, error, disabled }) => (
    <div className="flex gap-2 mb-4" onPaste={handlers.onPaste}>
      {digits.map((digit, idx) => (
        <input key={idx}
          ref={(el) => { if (handlers.refs) handlers.refs.current[idx] = el; }}
          type="text" inputMode="numeric" maxLength={1}
          value={digit}
          onChange={(e) => handlers.onChange(idx, e.target.value)}
          onKeyDown={(e) => handlers.onKeyDown(idx, e)}
          disabled={disabled}
          className={`w-11 h-12 text-center font-body text-lg font-medium border-2 bg-white transition-all focus:outline-none ${error ? "border-red-300 text-red-700" : digit ? "border-stone-900 text-stone-900" : "border-stone-200 focus:border-stone-500"
            } disabled:opacity-50`}
        />
      ))}
    </div>
  );

  // Attach refs to handlers (hack for passing refs)
  phoneOtpH.refs = phoneOtpRefs;
  emailOtpH.refs = emailOtpRefs;

  return (
    <>
      <Navbar />
      <div id="recaptcha-container" style={{ position: "fixed", bottom: 0, left: 0, zIndex: -1 }} />
      <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoSelect} />

      <AnimatePresence>
        {showAddressModal && (
          <AddressModal
            existing={editingAddress?.address ?? null}
            onSave={saveAddress}
            onClose={() => { setShowAddressModal(false); setEditingAddress(null); }}
          />
        )}
      </AnimatePresence>

      <main className="max-w-screen-xl mx-auto px-4 md:px-8 py-10 md:py-16 min-h-[70vh]">
        <div className="mb-10">
          <p className="section-subtitle">My Account</p>
          <h1 className="section-title">Welcome back</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Profile Card ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-1">
            <div className="bg-stone-900 p-8 text-center">

              {/* Avatar + camera */}
              <div className="mx-auto mb-2 relative w-24 h-24 group">
                {avatar ? (
                  <img src={avatar} alt={displayName} className="w-24 h-24 rounded-full object-cover border-2 border-stone-700" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-stone-700 border-2 border-stone-600 flex items-center justify-center">
                    <span className="font-display text-2xl font-light text-white">{initials}</span>
                  </div>
                )}

                {/* Camera hover overlay */}
                <button
                  onClick={() => { setPhotoError(""); photoInputRef.current?.click(); }}
                  disabled={photoUploading}
                  className="absolute inset-0 rounded-full bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer"
                >
                  {photoUploading
                    ? <Loader2 size={20} className="text-white animate-spin" />
                    : <><Camera size={20} className="text-white" /><span className="font-body text-[9px] tracking-wider text-white/90 uppercase">Change</span></>
                  }
                </button>

                {/* Spinning upload ring */}
                {photoUploading && (
                  <div className="absolute inset-0 rounded-full border-2 border-stone-600 border-t-white animate-spin pointer-events-none" />
                )}

                {provider === "google" && (
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow z-10">
                    <GoogleIcon size={14} />
                  </span>
                )}
              </div>

              <p className="font-body text-[10px] text-stone-500 mb-4">
                {photoUploading ? "Uploading…" : "Photo pe hover karo change karne ke liye"}
              </p>

              {photoError && (
                <p className="font-body text-[10px] text-red-400 mb-3 flex items-center justify-center gap-1">
                  <AlertCircle size={10} /> {photoError}
                </p>
              )}

              <h2 className="font-display text-2xl font-light text-white mb-1">{displayName}</h2>
              <p className="font-body text-xs text-stone-400 mb-3">{email}</p>

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

              {phone && (
                <div className={`flex items-center justify-center gap-1.5 px-3 py-1.5 mb-3 ${phoneVerified ? "bg-emerald-900/20 border border-emerald-700/20" : "bg-stone-800 border border-stone-700"
                  }`}>
                  {phoneVerified ? <CheckCircle2 size={11} className="text-emerald-400" /> : <Phone size={11} className="text-stone-400" />}
                  <p className={`font-body text-[10px] ${phoneVerified ? "text-emerald-400" : "text-stone-400"}`}>
                    {phone} {phoneVerified ? "· Verified" : "· Unverified"}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-center mb-6">
                <span className="font-body text-[10px] tracking-[0.15em] uppercase text-stone-500">
                  {provider === "google" ? "Google Account" : "Email Account"}
                </span>
              </div>

              <button onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 border border-stone-700 text-stone-400 font-body text-xs tracking-widest uppercase py-3 hover:border-stone-500 hover:text-stone-200 transition-all"
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-stone-100 mt-px">
              {[{ label: "Wishlist", value: wishlistCount }, { label: "Cart", value: cartCount }].map(({ label, value }) => (
                <div key={label} className="bg-white py-5 text-center">
                  <p className="font-display text-3xl font-light text-stone-900">{value}</p>
                  <p className="font-body text-[10px] tracking-widest uppercase text-stone-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right Panel ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Quick links */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">Quick Access</h3>
              <div className="divide-y divide-stone-50 border border-stone-100">
                {quickLinks.map(({ icon: Icon, label, href, badge }) => (
                  <Link key={label} href={href}
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
                        <span className="w-5 h-5 bg-stone-900 text-white text-[9px] rounded-full flex items-center justify-center font-medium">{badge}</span>
                      )}
                      <ChevronRight size={15} className="text-stone-300 group-hover:text-stone-600 transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Account details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">Account Details</h3>
              <div className="border border-stone-100 divide-y divide-stone-50">

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">Full Name</span>
                  <span className="font-body text-sm text-stone-700 text-right">{displayName}</span>
                </div>

                {/* Email */}
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">Email</span>
                    <div className="flex-1 flex items-center justify-between gap-3 flex-wrap min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-body text-sm text-stone-700 truncate">{email}</span>
                        {emailVerified
                          ? <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 font-body text-[9px] tracking-widest uppercase px-2 py-0.5 shrink-0"><CheckCircle2 size={9} /> Verified</span>
                          : <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-600 font-body text-[9px] tracking-widest uppercase px-2 py-0.5 shrink-0"><AlertCircle size={9} /> Unverified</span>
                        }
                      </div>
                      {!emailVerified && provider !== "google" && emailState === "idle" && (
                        <button onClick={sendEmailOtp}
                          className="font-body text-xs tracking-widest uppercase text-stone-500 border border-stone-200 px-3 py-1.5 hover:border-stone-500 hover:text-stone-800 transition-all shrink-0"
                        >
                          <Mail size={11} className="inline mr-1.5" />Verify Email
                        </button>
                      )}
                      {emailState === "sending" && (
                        <span className="font-body text-xs text-stone-400 flex items-center gap-1.5 shrink-0">
                          <span className="w-3.5 h-3.5 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" /> Sending…
                        </span>
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    {(emailState === "otp" || emailState === "verifying") && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden mt-4">
                        <div className="bg-stone-50 border border-stone-100 p-5">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="font-body text-xs font-medium text-stone-700">OTP sent to {email}</p>
                              <p className="font-body text-[10px] text-stone-400 mt-0.5">Inbox check karo (spam bhi)</p>
                            </div>
                            <button onClick={() => { setEmailState("idle"); setEmailOtpDigits(["", "", "", "", "", ""]); }} className="text-stone-400 hover:text-stone-700"><X size={14} /></button>
                          </div>
                          <OtpBoxes digits={emailOtpDigits} handlers={emailOtpH} error={emailOtpError} disabled={emailState === "verifying"} />
                          {emailOtpError && <p className="font-body text-xs text-red-500 mb-3">{emailOtpError}</p>}
                          <div className="flex items-center gap-3 flex-wrap">
                            <button onClick={verifyEmailOtp} disabled={emailOtpDigits.join("").length < 6 || emailState === "verifying"}
                              className="btn-primary py-2.5 px-5 text-[10px] gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              {emailState === "verifying" ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying…</> : <><KeyRound size={12} /> Verify Email</>}
                            </button>
                            <button onClick={sendEmailOtp} disabled={emailCountdown > 0 || emailState === "verifying"}
                              className="flex items-center gap-1.5 font-body text-xs text-stone-400 hover:text-stone-700 disabled:opacity-40"
                            >
                              <RefreshCw size={11} />{emailCountdown > 0 ? `Resend in ${emailCountdown}s` : "Resend"}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {emailState === "done" && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-100 px-4 py-3">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        <p className="font-body text-xs text-emerald-700 font-medium">Email verified! 🎉</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone */}
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">Mobile</span>
                    <div className="flex-1 flex items-center justify-between gap-3 flex-wrap min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        {phone
                          ? <><span className="font-body text-sm text-stone-700">{phone}</span>
                            {phoneVerified
                              ? <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 font-body text-[9px] tracking-widest uppercase px-2 py-0.5 shrink-0"><CheckCircle2 size={9} /> Verified</span>
                              : <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-600 font-body text-[9px] tracking-widest uppercase px-2 py-0.5 shrink-0"><AlertCircle size={9} /> Unverified</span>
                            }</>
                          : <span className="font-body text-sm text-stone-300">Not added</span>
                        }
                      </div>
                      {!phoneVerified && phoneState === "idle" && (
                        <button onClick={() => { setPhoneInput(phone ? phone.replace("+91", "") : ""); setPhoneState("entering"); }}
                          className="font-body text-xs tracking-widest uppercase text-stone-500 border border-stone-200 px-3 py-1.5 hover:border-stone-500 hover:text-stone-800 transition-all shrink-0"
                        >
                          <Phone size={11} className="inline mr-1.5" />{phone ? "Verify Now" : "Add & Verify"}
                        </button>
                      )}
                    </div>
                  </div>
                  <AnimatePresence>
                    {(phoneState !== "idle" && phoneState !== "done") && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden mt-4">
                        <div className="bg-stone-50 border border-stone-100 p-5">
                          {(phoneState === "entering" || phoneState === "sending") && (
                            <div>
                              <p className="font-body text-xs font-medium text-stone-700 mb-3">{phone ? "Verify your mobile" : "Add & verify your mobile"}</p>
                              <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                  <Phone size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300" />
                                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-body text-sm text-stone-400 select-none">+91</span>
                                  <input type="tel" inputMode="numeric" maxLength={10} value={phoneInput}
                                    onChange={(e) => { setPhoneInput(e.target.value.replace(/\D/g, "").slice(0, 10)); setPhoneError(""); }}
                                    onKeyDown={(e) => e.key === "Enter" && sendPhoneOtp(phoneInput)}
                                    placeholder="98765 43210"
                                    className="w-full border-b border-stone-200 bg-transparent py-2.5 pl-12 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
                                  />
                                </div>
                                <button onClick={() => sendPhoneOtp(phoneInput)} disabled={phoneState === "sending"}
                                  className="btn-primary py-2.5 px-5 text-[10px] gap-2 shrink-0 disabled:opacity-60"
                                >
                                  {phoneState === "sending" ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Send OTP"}
                                </button>
                                <button onClick={() => setPhoneState("idle")} className="text-stone-400 hover:text-stone-700 p-1"><X size={15} /></button>
                              </div>
                              {phoneError && <p className="font-body text-xs text-red-500 mt-2">{phoneError}</p>}
                            </div>
                          )}
                          {(phoneState === "otp" || phoneState === "verifying") && (
                            <div>
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <p className="font-body text-xs font-medium text-stone-700">OTP sent to +91 {phoneInput}</p>
                                  <p className="font-body text-[10px] text-stone-400 mt-0.5">SMS mein 6-digit code</p>
                                </div>
                                <button onClick={() => setPhoneState("entering")} className="font-body text-[10px] text-stone-400 hover:text-stone-700 underline">Change number</button>
                              </div>
                              <OtpBoxes digits={phoneOtpDigits} handlers={phoneOtpH} error={phoneOtpError} disabled={phoneState === "verifying"} />
                              {phoneOtpError && <p className="font-body text-xs text-red-500 mb-3">{phoneOtpError}</p>}
                              <div className="flex items-center gap-3 flex-wrap">
                                <button onClick={verifyPhoneOtp} disabled={phoneOtpDigits.join("").length < 6 || phoneState === "verifying"}
                                  className="btn-primary py-2.5 px-5 text-[10px] gap-2 disabled:opacity-60"
                                >
                                  {phoneState === "verifying" ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying…</> : <><KeyRound size={12} /> Verify OTP</>}
                                </button>
                                <button onClick={() => sendPhoneOtp(phoneInput)} disabled={phoneCountdown > 0 || phoneState === "verifying"}
                                  className="flex items-center gap-1.5 font-body text-xs text-stone-400 hover:text-stone-700 disabled:opacity-40"
                                >
                                  <RefreshCw size={11} />{phoneCountdown > 0 ? `Resend in ${phoneCountdown}s` : "Resend"}
                                </button>
                                <button onClick={() => setPhoneState("idle")} className="text-stone-400 hover:text-stone-700 p-1 ml-auto"><X size={14} /></button>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    {phoneState === "done" && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-3 bg-emerald-50 border border-emerald-100 px-4 py-3">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        <p className="font-body text-xs text-emerald-700 font-medium">Phone verified! 🎉</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {[
                  { label: "Member Since", value: dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "—" },
                  { label: "Auth Method", value: provider === "google" ? "Google Sign-In" : "Email & Password" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between px-6 py-4">
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-stone-400 w-32 shrink-0">{label}</span>
                    <span className="font-body text-sm text-stone-700 text-right">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Addresses ── */}
            <motion.div id="addresses" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-body text-xs tracking-[0.25em] uppercase text-stone-500">Saved Addresses</h3>
                <button
                  onClick={() => { setEditingAddress(null); setShowAddressModal(true); }}
                  className="flex items-center gap-1.5 font-body text-xs tracking-widest uppercase text-stone-600 border border-stone-300 px-3 py-1.5 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all"
                >
                  <Plus size={11} /> Add New
                </button>
              </div>

              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                      className="border border-stone-100 p-5 group relative hover:border-stone-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-600 font-body text-[9px] tracking-[0.15em] uppercase px-2.5 py-1">
                          {labelIcon(addr.label)} {addr.label || "Address"}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => { setEditingAddress({ address: addr, index: i }); setShowAddressModal(true); }}
                            className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => deleteAddress(i)}
                            className="w-7 h-7 flex items-center justify-center text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                      <p className="font-body text-sm text-stone-800 font-medium">{addr.name}</p>
                      <p className="font-body text-xs text-stone-500 mt-0.5">{addr.phone}</p>
                      <p className="font-body text-xs text-stone-500 leading-relaxed mt-1.5">
                        {addr.line1}{addr.landmark ? `, ${addr.landmark}` : ""}
                      </p>
                      <p className="font-body text-xs text-stone-500">
                        {addr.city}{addr.state ? `, ${addr.state}` : ""} — {addr.pincode}
                      </p>
                    </motion.div>
                  ))}

                  {/* Add more tile */}
                  <button
                    onClick={() => { setEditingAddress(null); setShowAddressModal(true); }}
                    className="border border-dashed border-stone-200 p-5 flex flex-col items-center justify-center gap-2 hover:border-stone-400 hover:bg-stone-50 transition-all min-h-[130px] group"
                  >
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors">
                      <Plus size={14} className="text-stone-500" />
                    </div>
                    <p className="font-body text-xs tracking-widest uppercase text-stone-400">Add Address</p>
                  </button>
                </div>
              ) : (
                <div className="border border-stone-100 p-10 text-center">
                  <MapPin size={36} className="text-stone-200 mx-auto mb-3" strokeWidth={1} />
                  <p className="font-body text-sm text-stone-400 mb-1">No saved addresses yet.</p>
                  <p className="font-body text-xs text-stone-300 mb-5">Map pe pin karo apna address add karne ke liye</p>
                  <button
                    onClick={() => { setEditingAddress(null); setShowAddressModal(true); }}
                    className="inline-flex items-center gap-2 font-body text-xs tracking-widest uppercase text-stone-600 border border-stone-300 px-5 py-2.5 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all"
                  >
                    <Plus size={12} /> Add First Address
                  </button>
                </div>
              )}
            </motion.div>

            {/* Shop CTA */}
            <div className="bg-stone-50 border border-stone-100 p-7 flex items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-light text-stone-900 mb-1">Continue Shopping</p>
                <p className="font-body text-xs text-stone-400">Explore new arrivals and trending styles</p>
              </div>
              <Link href="/shop" className="btn-primary shrink-0 gap-2">Shop Now <ChevronRight size={13} /></Link>
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
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}