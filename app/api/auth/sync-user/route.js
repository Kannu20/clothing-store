// app/api/auth/sync-user/route.js
// Called from the client after every successful Firebase auth event
// Verifies the Firebase ID token, then upserts the user in MongoDB

import { NextResponse } from "next/server";
import { adminAuth }    from "@/lib/firebaseAdmin";
import connectDB        from "@/lib/mongodb";
import User             from "@/models/User";

export async function POST(request) {
  try {
    // 1. Extract Bearer token from Authorization header
    const authHeader = request.headers.get("Authorization") || "";
    const idToken    = authHeader.replace("Bearer ", "").trim();

    if (!idToken) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // 2. Verify token with Firebase Admin
    let decoded;
    try {
      decoded = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // 3. Connect to MongoDB
    await connectDB();

    // 4. Upsert user — create if new, update lastLoginAt if existing
    const user = await User.findOneAndUpdate(
      { firebaseUid: decoded.uid },
      {
        $set: {
          firebaseUid:   decoded.uid,
          email:         decoded.email || "",
          name:          decoded.name  || decoded.email?.split("@")[0] || "User",
          avatar:        decoded.picture || "",
          provider:      decoded.firebase?.sign_in_provider === "google.com" ? "google" : "email",
          emailVerified: decoded.email_verified || false,
          lastLoginAt:   new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      {
        upsert:    true,   // create if doesn't exist
        new:       true,   // return the updated document
        runValidators: true,
      }
    );

    return NextResponse.json({
      success: true,
      user: {
        id:            user._id,
        firebaseUid:   user.firebaseUid,
        name:          user.name,
        email:         user.email,
        avatar:        user.avatar,
        provider:      user.provider,
        emailVerified: user.emailVerified,
        phone:         user.phone,
        addresses:     user.addresses,
        wishlist:      user.wishlist,
      },
    });

  } catch (err) {
    console.error("sync-user error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}