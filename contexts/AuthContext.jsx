"use client";
// contexts/AuthContext.jsx
// Wraps the entire app — provides user state + auth helpers everywhere

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "@/lib/firebase";

const AuthContext = createContext(null);

// ── Helper: sync Firebase user → MongoDB after every login ───────────────────
async function syncToMongoDB(firebaseUser) {
  try {
    const token = await firebaseUser.getIdToken();
    const res   = await fetch("/api/auth/sync-user", {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        Authorization:   `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Sync failed");
    const data = await res.json();
    return data.user; // MongoDB user document
  } catch (err) {
    console.error("MongoDB sync error:", err);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user,       setUser]       = useState(null);  // Firebase user
  const [dbUser,     setDbUser]     = useState(null);  // MongoDB user
  const [loading,    setLoading]    = useState(true);
  const [authError,  setAuthError]  = useState("");

  // ── Listen to Firebase auth state changes ─────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const mongoUser = await syncToMongoDB(firebaseUser);
        setDbUser(mongoUser);
      } else {
        setUser(null);
        setDbUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ── Google Sign-In ─────────────────────────────────────────────────────────
  const loginWithGoogle = useCallback(async () => {
    setAuthError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const mongoUser = await syncToMongoDB(result.user);
      setDbUser(mongoUser);
      return { success: true, user: result.user };
    } catch (err) {
      const msg = getFriendlyError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  // ── Email/Password Sign-In ─────────────────────────────────────────────────
  const loginWithEmail = useCallback(async (email, password) => {
    setAuthError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const mongoUser = await syncToMongoDB(result.user);
      setDbUser(mongoUser);
      return { success: true, user: result.user };
    } catch (err) {
      const msg = getFriendlyError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  // ── Email/Password Sign-Up ─────────────────────────────────────────────────
  const signupWithEmail = useCallback(async (name, email, password) => {
    setAuthError("");
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Set display name in Firebase
      await updateProfile(result.user, { displayName: name });

      // Send verification email
      await sendEmailVerification(result.user);

      // Sync to MongoDB
      const mongoUser = await syncToMongoDB(result.user);
      setDbUser(mongoUser);

      return { success: true, user: result.user };
    } catch (err) {
      const msg = getFriendlyError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  // ── Password Reset ─────────────────────────────────────────────────────────
  const resetPassword = useCallback(async (email) => {
    setAuthError("");
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      const msg = getFriendlyError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    setDbUser(null);
  }, []);

  // ── Get fresh ID token (for API calls) ────────────────────────────────────
  const getToken = useCallback(async () => {
    if (!user) return null;
    return user.getIdToken();
  }, [user]);

  const value = {
    user,           // Firebase user object
    dbUser,         // MongoDB user document
    loading,
    authError,
    setAuthError,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    resetPassword,
    logout,
    getToken,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ── Map Firebase error codes to friendly messages ─────────────────────────────
function getFriendlyError(code) {
  const map = {
    "auth/user-not-found":        "No account found with this email. Please sign up.",
    "auth/wrong-password":        "Incorrect password. Please try again.",
    "auth/invalid-credential":    "Invalid email or password.",
    "auth/email-already-in-use":  "An account with this email already exists. Please log in.",
    "auth/weak-password":         "Password must be at least 6 characters.",
    "auth/invalid-email":         "Please enter a valid email address.",
    "auth/too-many-requests":     "Too many failed attempts. Please wait a few minutes and try again.",
    "auth/popup-closed-by-user":  "Google sign-in was cancelled.",
    "auth/network-request-failed":"Network error. Check your connection.",
    "auth/user-disabled":         "This account has been disabled. Please contact support.",
  };
  return map[code] || "Something went wrong. Please try again.";
}