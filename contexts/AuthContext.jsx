// "use client";
// // contexts/AuthContext.jsx
// // Wraps the entire app — provides user state + auth helpers everywhere

// import { createContext, useContext, useEffect, useState, useCallback } from "react";
// import {
//   auth,
//   googleProvider,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signOut,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   sendEmailVerification,
// } from "../lib/firebase";

// const AuthContext = createContext(null);

// // ── Helper: sync Firebase user → MongoDB after every login ───────────────────
// async function syncToMongoDB(firebaseUser) {
//   try {
//     const token = await firebaseUser.getIdToken();
//     const res   = await fetch("/api/auth/sync-user", {
//       method:  "POST",
//       headers: {
//         "Content-Type":  "application/json",
//         Authorization:   `Bearer ${token}`,
//       },
//     });
//     if (!res.ok) throw new Error("Sync failed");
//     const data = await res.json();
//     return data.user; // MongoDB user document
//   } catch (err) {
//     console.error("MongoDB sync error:", err);
//     return null;
//   }
// }

// export function AuthProvider({ children }) {
//   const [user,       setUser]       = useState(null);  // Firebase user
//   const [dbUser,     setDbUser]     = useState(null);  // MongoDB user
//   const [loading,    setLoading]    = useState(true);
//   const [authError,  setAuthError]  = useState("");

//   // ── Listen to Firebase auth state changes ─────────────────────────────────
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         setUser(firebaseUser);
//         const mongoUser = await syncToMongoDB(firebaseUser);
//         setDbUser(mongoUser);
//       } else {
//         setUser(null);
//         setDbUser(null);
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   // ── Google Sign-In ─────────────────────────────────────────────────────────
//   const loginWithGoogle = useCallback(async () => {
//     setAuthError("");
//     try {
//       const result = await signInWithPopup(auth, googleProvider);
//       const mongoUser = await syncToMongoDB(result.user);
//       setDbUser(mongoUser);
//       return { success: true, user: result.user };
//     } catch (err) {
//       const msg = getFriendlyError(err.code);
//       setAuthError(msg);
//       return { success: false, error: msg };
//     }
//   }, []);

//   // ── Email/Password Sign-In ─────────────────────────────────────────────────
//   const loginWithEmail = useCallback(async (email, password) => {
//     setAuthError("");
//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       const mongoUser = await syncToMongoDB(result.user);
//       setDbUser(mongoUser);
//       return { success: true, user: result.user };
//     } catch (err) {
//       const msg = getFriendlyError(err.code);
//       setAuthError(msg);
//       return { success: false, error: msg };
//     }
//   }, []);

//   // ── Email/Password Sign-Up ─────────────────────────────────────────────────
//   const signupWithEmail = useCallback(async (name, email, password) => {
//     setAuthError("");
//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password);

//       // Set display name in Firebase
//       await updateProfile(result.user, { displayName: name });

//       // Send verification email
//       await sendEmailVerification(result.user);

//       // Sync to MongoDB
//       const mongoUser = await syncToMongoDB(result.user);
//       setDbUser(mongoUser);

//       return { success: true, user: result.user };
//     } catch (err) {
//       const msg = getFriendlyError(err.code);
//       setAuthError(msg);
//       return { success: false, error: msg };
//     }
//   }, []);

//   // ── Password Reset ─────────────────────────────────────────────────────────
//   const resetPassword = useCallback(async (email) => {
//     setAuthError("");
//     try {
//       await sendPasswordResetEmail(auth, email);
//       return { success: true };
//     } catch (err) {
//       const msg = getFriendlyError(err.code);
//       setAuthError(msg);
//       return { success: false, error: msg };
//     }
//   }, []);

//   // ── Logout ─────────────────────────────────────────────────────────────────
//   const logout = useCallback(async () => {
//     await signOut(auth);
//     setUser(null);
//     setDbUser(null);
//   }, []);

//   // ── Get fresh ID token (for API calls) ────────────────────────────────────
//   const getToken = useCallback(async () => {
//     if (!user) return null;
//     return user.getIdToken();
//   }, [user]);

//   const value = {
//     user,           // Firebase user object
//     dbUser,         // MongoDB user document
//     loading,
//     authError,
//     setAuthError,
//     loginWithGoogle,
//     loginWithEmail,
//     signupWithEmail,
//     resetPassword,
//     logout,
//     getToken,
//     isLoggedIn: !!user,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
//   return ctx;
// }

// // ── Map Firebase error codes to friendly messages ─────────────────────────────
// function getFriendlyError(code) {
//   const map = {
//     "auth/user-not-found":        "No account found with this email. Please sign up.",
//     "auth/wrong-password":        "Incorrect password. Please try again.",
//     "auth/invalid-credential":    "Invalid email or password.",
//     "auth/email-already-in-use":  "An account with this email already exists. Please log in.",
//     "auth/weak-password":         "Password must be at least 6 characters.",
//     "auth/invalid-email":         "Please enter a valid email address.",
//     "auth/too-many-requests":     "Too many failed attempts. Please wait a few minutes and try again.",
//     "auth/popup-closed-by-user":  "Google sign-in was cancelled.",
//     "auth/network-request-failed":"Network error. Check your connection.",
//     "auth/user-disabled":         "This account has been disabled. Please contact support.",
//   };
//   return map[code] || "Something went wrong. Please try again.";
// }

// "use client";

// import { createContext, useContext, useEffect, useState, useCallback } from "react";
// import {
//   auth,
//   googleProvider,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   updateProfile,
//   signOut,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   sendEmailVerification,
// } from "../lib/firebase";

// const AuthContext = createContext(null);

// // 🔗 Sync Firebase user → MongoDB
// async function syncToMongoDB(firebaseUser) {
//   try {
//     const token = await firebaseUser.getIdToken();

//     const res = await fetch("/api/auth/sync-user", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) throw new Error("MongoDB sync failed");

//     const data = await res.json();
//     return data.user;

//   } catch (err) {
//     console.error("🔥 MongoDB sync error:", err);
//     return null;
//   }
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [dbUser, setDbUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [authError, setAuthError] = useState("");

//   // 🔄 Listen auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       try {
//         if (firebaseUser) {
//           setUser(firebaseUser);

//           const mongoUser = await syncToMongoDB(firebaseUser);
//           setDbUser(mongoUser);
//         } else {
//           setUser(null);
//           setDbUser(null);
//         }
//       } catch (err) {
//         console.error("Auth state error:", err);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // 🔐 Google Login
//   const loginWithGoogle = useCallback(async () => {
//     setAuthError("");

//     try {
//       const result = await signInWithPopup(auth, googleProvider);

//       const mongoUser = await syncToMongoDB(result.user);
//       setDbUser(mongoUser);

//       return { success: true, user: result.user };

//     } catch (err) {
//       console.log("🔥 Google Login Error:", err.code, err.message);

//       const msg = getFriendlyError(err.code);
//       setAuthError(msg);

//       return { success: false, error: err.code };
//     }
//   }, []);

//   // 🔐 Email Login
//   const loginWithEmail = useCallback(async (email, password) => {
//     setAuthError("");

//     if (!email || !password) {
//       setAuthError("Email and password required");
//       return { success: false };
//     }

//     try {
//       const result = await signInWithEmailAndPassword(auth, email, password);

//       const mongoUser = await syncToMongoDB(result.user);
//       setDbUser(mongoUser);

//       return { success: true, user: result.user };

//     } catch (err) {
//       console.log("🔥 Login Error:", err.code, err.message);

//       const msg = getFriendlyError(err.code);
//       setAuthError(msg);

//       return { success: false, error: err.code };
//     }
//   }, []);

//   // 🆕 Signup
//   const signupWithEmail = useCallback(async (name, email, password) => {
//     setAuthError("");

//     // ✅ Validation
//     if (!name || !email || !password) {
//       setAuthError("All fields are required");
//       return { success: false };
//     }

//     if (password.length < 6) {
//       setAuthError("Password must be at least 6 characters");
//       return { success: false };
//     }

//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password);

//       await updateProfile(result.user, { displayName: name });

//       await sendEmailVerification(result.user);

//       const mongoUser = await syncToMongoDB(result.user);

//       if (!mongoUser) throw new Error("MongoDB sync failed");

//       setDbUser(mongoUser);

//       return { success: true, user: result.user };

//     } catch (err) {
//       console.log("🔥 Signup Error:", err.code, err.message);

//       const msg = getFriendlyError(err.code);
//       setAuthError(msg);

//       return { success: false, error: err.code };
//     }
//   }, []);

//   // 🔁 Reset Password
//   const resetPassword = useCallback(async (email) => {
//     setAuthError("");

//     try {
//       await sendPasswordResetEmail(auth, email);
//       return { success: true };

//     } catch (err) {
//       console.log("🔥 Reset Error:", err.code, err.message);

//       const msg = getFriendlyError(err.code);
//       setAuthError(msg);

//       return { success: false, error: err.code };
//     }
//   }, []);

//   // 🚪 Logout
//   const logout = useCallback(async () => {
//     await signOut(auth);
//     setUser(null);
//     setDbUser(null);
//   }, []);

//   // 🔑 Token
//   const getToken = useCallback(async () => {
//     if (!user) return null;
//     return user.getIdToken();
//   }, [user]);

//   const value = {
//     user,
//     dbUser,
//     loading,
//     authError,
//     setAuthError,
//     loginWithGoogle,
//     loginWithEmail,
//     signupWithEmail,
//     resetPassword,
//     logout,
//     getToken,
//     isLoggedIn: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// // 🪝 Hook
// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
//   return ctx;
// }

// // 🎯 Error Mapper
// function getFriendlyError(code) {
//   const map = {
//     "auth/user-not-found": "No account found with this email.",
//     "auth/wrong-password": "Incorrect password.",
//     "auth/email-already-in-use": "Email already registered.",
//     "auth/weak-password": "Password too weak.",
//     "auth/invalid-email": "Invalid email address.",
//     "auth/too-many-requests": "Too many attempts. Try later.",
//     "auth/network-request-failed": "Network error.",
//   };

//   return map[code] || code; // 👈 IMPORTANT: show real error if unknown
// }

"use client";
// contexts/AuthContext.jsx

import { createContext, useContext, useEffect, useState, useCallback } from "react";

// ── Firebase imports ─────────────────────────────────────────────────────────
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

// ── ✅ FIX 3: Safe Firebase initialisation — won't crash if env vars are missing
const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only init if the API key is actually set (not a placeholder)
const isFirebaseConfigured =
  !!firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("YOUR_");

let auth = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });
}

// ── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ── Helper: sync Firebase user → MongoDB ─────────────────────────────────────
async function syncToMongoDB(firebaseUser, phone = "") {
  try {
    const token = await firebaseUser.getIdToken();
    const res = await fetch("/api/auth/sync-user", {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:  `Bearer ${token}`,
      },
      body: JSON.stringify({ phone }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
  } catch (err) {
    console.error("MongoDB sync error:", err);
    return null;
  }
}

// ── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user,      setUser]      = useState(null);
  const [dbUser,    setDbUser]    = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [authError, setAuthError] = useState("");

  // ── Listen to Firebase auth state ────────────────────────────────────────
  useEffect(() => {
    // If Firebase isn't configured, skip auth listener
    if (!auth) {
      setLoading(false);
      return;
    }

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

  // ── Google Sign-In ────────────────────────────────────────────────────────
  const loginWithGoogle = useCallback(async () => {
    setAuthError("");
    if (!auth || !googleProvider) {
      const msg = "Firebase is not configured. Check your .env.local file.";
      setAuthError(msg);
      return { success: false, error: msg };
    }
    try {
      const result     = await signInWithPopup(auth, googleProvider);
      const mongoUser  = await syncToMongoDB(result.user);
      setDbUser(mongoUser);
      return { success: true, user: result.user };
    } catch (err) {
      const msg = getFriendlyError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  // ── Email / Password Sign-In ──────────────────────────────────────────────
  const loginWithEmail = useCallback(async (email, password) => {
    setAuthError("");
    if (!auth) {
      const msg = "Firebase is not configured. Check your .env.local file.";
      setAuthError(msg);
      return { success: false, error: msg };
    }
    try {
      const result    = await signInWithEmailAndPassword(auth, email, password);
      const mongoUser = await syncToMongoDB(result.user);
      setDbUser(mongoUser);
      return { success: true, user: result.user };
    } catch (err) {
      const msg = getFriendlyError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  // ── Email / Password Sign-Up ──────────────────────────────────────────────
  const signupWithEmail = useCallback(async (name, email, password, phone = "") => {
    setAuthError("");
    if (!auth) {
      const msg = "Firebase is not configured. Check your .env.local file.";
      setAuthError(msg);
      return { success: false, error: msg };
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await sendEmailVerification(result.user);
      // Pass phone to sync so MongoDB saves it immediately
      const mongoUser = await syncToMongoDB(result.user, phone);
      setDbUser(mongoUser);
      return { success: true, user: result.user };
    } catch (err) {
      const msg = getFriendlyError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  // ── Password Reset ────────────────────────────────────────────────────────
  const resetPassword = useCallback(async (email) => {
    setAuthError("");
    if (!auth) return { success: false, error: "Firebase not configured." };
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      const msg = getFriendlyError(err.code);
      setAuthError(msg);
      return { success: false, error: msg };
    }
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    if (auth) await signOut(auth);
    setUser(null);
    setDbUser(null);
  }, []);

  // ── Get fresh ID token ────────────────────────────────────────────────────
  const getToken = useCallback(async () => {
    if (!user) return null;
    return user.getIdToken();
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      dbUser,
      loading,
      authError,
      setAuthError,
      loginWithGoogle,
      loginWithEmail,
      signupWithEmail,
      resetPassword,
      logout,
      getToken,
      isLoggedIn:        !!user,
      isFirebaseReady:   isFirebaseConfigured,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ── Map Firebase error codes → friendly messages ──────────────────────────────
function getFriendlyError(code) {
  const map = {
    "auth/user-not-found":         "No account found with this email. Please sign up.",
    "auth/wrong-password":         "Incorrect password. Please try again.",
    "auth/invalid-credential":     "Invalid email or password. Please check and try again.",
    "auth/email-already-in-use":   "An account with this email already exists. Please log in.",
    "auth/weak-password":          "Password must be at least 6 characters.",
    "auth/invalid-email":          "Please enter a valid email address.",
    "auth/too-many-requests":      "Too many attempts. Please wait a few minutes and try again.",
    "auth/popup-closed-by-user":   "Google sign-in was cancelled. Please try again.",
    "auth/popup-blocked":          "Popup was blocked by your browser. Please allow popups for this site.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/user-disabled":          "This account has been disabled. Please contact support.",
    "auth/account-exists-with-different-credential": "An account already exists with this email using a different sign-in method.",
  };
  return map[code] || `Authentication error (${code}). Please try again.`;
}