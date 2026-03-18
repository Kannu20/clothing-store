"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "/contexts/AuthContext";

// Password strength checker
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8)             score++;
  if (/[A-Z]/.test(pw))          score++;
  if (/[0-9]/.test(pw))          score++;
  if (/[^A-Za-z0-9]/.test(pw))   score++;
  return score; // 0–4
}
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-400"];

export default function SignupPage() {
  const router = useRouter();
  const { signupWithEmail, loginWithGoogle, isLoggedIn, loading, authError, setAuthError } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors]         = useState({});
  const [showPw, setShowPw]         = useState(false);
  const [showCf, setShowCf]         = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [agreed, setAgreed]         = useState(false);

  const strength = getStrength(form.password);

  useEffect(() => {
    if (!loading && isLoggedIn && !success) router.replace("/account");
  }, [isLoggedIn, loading, success, router]);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.password || form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm)
      e.confirm = "Passwords do not match";
    if (!agreed)
      e.terms = "You must agree to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = await signupWithEmail(form.name.trim(), form.email, form.password);
    setSubmitting(false);
    if (result.success) setSuccess(true);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const result = await loginWithGoogle();
    setGoogleLoading(false);
    if (result.success) router.push("/account");
  };

  const setField = (name) => (e) => {
    setForm((p) => ({ ...p, [name]: e.target.value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    setAuthError("");
  };

  if (loading) return null;

  // Success — email verification sent
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180 }}
          className="max-w-md w-full bg-white border border-stone-100 p-10 text-center"
        >
          <CheckCircle size={60} className="text-emerald-500 mx-auto mb-5" strokeWidth={1.2} />
          <h1 className="font-display text-4xl font-light text-stone-900 mb-3">
            Account Created!
          </h1>
          <p className="font-body text-sm text-stone-500 leading-relaxed mb-6">
            Welcome to LUXE, <strong>{form.name}</strong>! We've sent a verification email to{" "}
            <span className="font-medium text-stone-700">{form.email}</span>. Please verify your email to unlock all features.
          </p>
          <div className="bg-amber-50 border border-amber-100 p-4 mb-7 text-left">
            <p className="font-body text-xs text-amber-700">
              <span className="font-medium">Check your inbox</span> — the verification link expires in 24 hours. Check your spam folder if you don't see it.
            </p>
          </div>
          <Link href="/account" className="btn-primary w-full justify-center inline-flex mb-3">
            Continue to My Account
          </Link>
          <Link href="/" className="block font-body text-xs text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* Left — Brand panel */}
      <div
        className="hidden lg:block relative"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85)", backgroundSize: "cover", backgroundPosition: "center 20%" }}
      >
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="relative z-10 h-full flex flex-col justify-between p-12 xl:p-16">
          <Link href="/" className="font-display text-3xl font-light tracking-[0.3em] uppercase text-white">
            Luxe
          </Link>
          <div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-white/50 mb-4">Join the family</p>
            <h2 className="font-display text-5xl xl:text-6xl font-light text-white leading-tight mb-6">
              Dress with<br />intention.
            </h2>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-sm">
              Create an account to save your wishlist, get personalised recommendations, and enjoy exclusive member offers.
            </p>
            <div className="mt-8 space-y-3">
              {["Free shipping on first order", "Exclusive member-only sales", "Personalised style picks", "Easy order tracking"].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                  <span className="font-body text-xs text-white/70">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="font-body text-xs text-white/30">© {new Date().getFullYear()} LUXE Store.</p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-20 bg-white overflow-y-auto">
        <Link href="/" className="lg:hidden font-display text-2xl font-light tracking-[0.3em] uppercase text-stone-900 mb-8 block">
          Luxe
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="w-full max-w-md mx-auto"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-stone-400 mb-2">Join LUXE</p>
          <h1 className="font-display text-4xl font-light text-stone-900 mb-7">Create Account</h1>

          {/* Auth error */}
          {authError && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 bg-red-50 border border-red-100 p-4 mb-6"
            >
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <p className="font-body text-xs text-red-600">{authError}</p>
            </motion.div>
          )}

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-stone-200 py-3.5 font-body text-sm text-stone-700 hover:border-stone-400 hover:bg-stone-50 transition-all mb-6 disabled:opacity-60"
          >
            {googleLoading ? (
              <span className="w-4 h-4 border-2 border-stone-300 border-t-stone-700 rounded-full animate-spin" />
            ) : <GoogleIcon />}
            {googleLoading ? "Continuing…" : "Sign up with Google"}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-stone-100" />
            <span className="font-body text-xs text-stone-400 uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-stone-100" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300" />
                <input type="text" value={form.name} onChange={setField("name")}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full border-b bg-transparent py-3 pl-6 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none transition-colors ${errors.name ? "border-red-400" : "border-stone-200 focus:border-stone-700"}`}
                />
              </div>
              {errors.name && <p className="font-body text-xs text-red-500 mt-1.5">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300" />
                <input type="email" value={form.email} onChange={setField("email")}
                  placeholder="you@example.com"
                  className={`w-full border-b bg-transparent py-3 pl-6 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none transition-colors ${errors.email ? "border-red-400" : "border-stone-200 focus:border-stone-700"}`}
                />
              </div>
              {errors.email && <p className="font-body text-xs text-red-500 mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300" />
                <input type={showPw ? "text" : "password"} value={form.password} onChange={setField("password")}
                  placeholder="Min. 6 characters"
                  className={`w-full border-b bg-transparent py-3 pl-6 pr-8 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none transition-colors ${errors.password ? "border-red-400" : "border-stone-200 focus:border-stone-700"}`}
                />
                <button type="button" onClick={() => setShowPw((p) => !p)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-600 transition-colors">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Strength meter */}
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4].map((s) => (
                      <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${strength >= s ? STRENGTH_COLORS[strength] : "bg-stone-100"}`} />
                    ))}
                  </div>
                  <p className={`font-body text-[10px] ${strength <= 1 ? "text-red-400" : strength === 2 ? "text-amber-500" : strength === 3 ? "text-blue-500" : "text-emerald-500"}`}>
                    {STRENGTH_LABELS[strength]} password
                  </p>
                </div>
              )}
              {errors.password && <p className="font-body text-xs text-red-500 mt-1.5">{errors.password}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-300" />
                <input type={showCf ? "text" : "password"} value={form.confirm} onChange={setField("confirm")}
                  placeholder="Repeat your password"
                  className={`w-full border-b bg-transparent py-3 pl-6 pr-8 font-body text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none transition-colors ${errors.confirm ? "border-red-400" : "border-stone-200 focus:border-stone-700"}`}
                />
                <button type="button" onClick={() => setShowCf((p) => !p)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-600 transition-colors">
                  {showCf ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Match indicator */}
              {form.confirm && (
                <p className={`font-body text-[10px] mt-1.5 ${form.password === form.confirm ? "text-emerald-500" : "text-red-400"}`}>
                  {form.password === form.confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
              {errors.confirm && <p className="font-body text-xs text-red-500 mt-1">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => { setAgreed((p) => !p); setErrors((p) => ({ ...p, terms: "" })); }}
                  className={`mt-0.5 w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${agreed ? "bg-stone-900 border-stone-900" : "border-stone-300"}`}
                >
                  {agreed && <svg viewBox="0 0 10 8" className="w-2.5 fill-none stroke-white" strokeWidth="1.5"><path d="M1 4l3 3 5-6" /></svg>}
                </button>
                <span className="font-body text-xs text-stone-500 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-stone-900 underline underline-offset-1">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-stone-900 underline underline-offset-1">Privacy Policy</a>
                </span>
              </label>
              {errors.terms && <p className="font-body text-xs text-red-500 mt-1.5">{errors.terms}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed pt-2"
            >
              {submitting ? (
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : <ArrowRight size={14} />}
              {submitting ? "Creating Account…" : "Create Account"}
            </button>
          </form>

          <p className="font-body text-sm text-stone-400 text-center mt-7">
            Already have an account?{" "}
            <Link href="/login" className="text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
      <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  );
}