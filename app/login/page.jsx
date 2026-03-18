"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle, isLoggedIn, loading, authError, setAuthError } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && isLoggedIn) router.replace("/account");
  }, [isLoggedIn, loading, router]);

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEmailLogin = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = await loginWithEmail(form.email, form.password);
    setSubmitting(false);
    if (result.success) router.push("/account");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const result = await loginWithGoogle();
    setGoogleLoading(false);
    if (result.success) router.push("/account");
  };

  const Field = ({ icon: Icon, name, type, placeholder, toggle }) => (
    <div>
      <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">
        {name === "email" ? "Email Address" : "Password"}
      </label>
      <div className="relative">
        <Icon size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300" />
        <input
          type={type}
          value={form[name]}
          onChange={(e) => { setForm((p) => ({ ...p, [name]: e.target.value })); setErrors((p) => ({ ...p, [name]: "" })); setAuthError(""); }}
          placeholder={placeholder}
          className={`w-full border-b bg-transparent py-3 pl-6 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none transition-colors ${errors[name] ? "border-red-400" : "border-stone-200 focus:border-stone-700"}`}
        />
        {toggle && (
          <button type="button" onClick={() => setShowPw((p) => !p)} className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-600 transition-colors">
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {errors[name] && <p className="font-body text-xs text-red-500 mt-1.5">{errors[name]}</p>}
    </div>
  );

  if (loading) return null;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Left — Brand panel */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 xl:p-16 bg-stone-900"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex flex-col justify-between h-full">
          <Link href="/" className="font-display text-3xl font-light tracking-[0.3em] uppercase text-white">
            Luxe
          </Link>
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-white/50 mb-4">Welcome back</p>
            <h2 className="font-display text-5xl xl:text-6xl font-light text-white leading-tight mb-6">
              Your style,<br />your story.
            </h2>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-sm">
              Sign in to access your wishlist, track orders, and enjoy a seamless shopping experience.
            </p>
          </div>
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} LUXE Store. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right — Form panel */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-24 bg-white">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden font-display text-2xl font-light tracking-[0.3em] uppercase text-stone-900 mb-10 block">
          Luxe
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-md mx-auto"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">Welcome back</p>
          <h1 className="font-display text-4xl font-light text-stone-900 mb-8">Sign In</h1>

          {/* Global auth error */}
          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 bg-red-50 border border-red-100 p-4 mb-6"
            >
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <p className="font-body text-xs text-red-600 leading-relaxed">{authError}</p>
            </motion.div>
          )}

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-stone-200 py-3.5 font-body text-sm text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-all mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <span className="w-4 h-4 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            {googleLoading ? "Signing in…" : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-stone-100" />
            <span className="font-body text-xs text-stone-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-stone-100" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            <Field icon={Mail}  name="email"    type="email"                               placeholder="you@example.com" />
            <Field icon={Lock}  name="password" type={showPw ? "text" : "password"}       placeholder="Your password"    toggle />

            <div className="flex justify-end">
              <ForgotPassword email={form.email} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <ArrowRight size={14} />
              )}
              {submitting ? "Signing In…" : "Sign In"}
            </button>
          </form>

          <p className="font-body text-sm text-stone-400 text-center mt-8">
            Don't have an account?{" "}
            <Link href="/signup" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// ── Forgot password inline widget ─────────────────────────────────────────────
function ForgotPassword({ email }) {
  const { resetPassword } = useAuth();
  const [open, setOpen]   = useState(false);
  const [addr, setAddr]   = useState(email || "");
  const [sent, setSent]   = useState(false);
  const [err,  setErr]    = useState("");

  const handle = async () => {
    if (!addr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr)) {
      setErr("Enter a valid email first."); return;
    }
    const res = await resetPassword(addr);
    if (res.success) setSent(true);
    else setErr(res.error);
  };

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="font-body text-xs text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors">
        Forgot password?
      </button>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="w-full bg-stone-50 border border-stone-100 p-4 rounded-sm">
      {sent ? (
        <p className="font-body text-xs text-emerald-600">✓ Reset link sent to {addr}</p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            value={addr}
            onChange={(e) => { setAddr(e.target.value); setErr(""); }}
            placeholder="Enter your email"
            className="flex-1 bg-white border border-stone-200 px-3 py-2 font-body text-xs focus:outline-none focus:border-stone-400"
          />
          <button type="button" onClick={handle} className="bg-stone-900 text-white font-body text-xs px-4 py-2 hover:bg-stone-700 transition-colors">
            Send
          </button>
        </div>
      )}
      {err && <p className="font-body text-xs text-red-500 mt-1">{err}</p>}
    </motion.div>
  );
}

// ── Google Icon SVG ───────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}