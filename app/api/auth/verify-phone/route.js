// app/api/auth/verify-phone/route.js
// Called from client after Firebase OTP verification succeeds.
// Marks phoneVerified = true and saves the phone number in MongoDB.

import { NextResponse } from "next/server";
import { adminAuth }    from "/lib/firebaseAdmin";
import connectDB        from "/lib/mongodb";
import User             from "/models/User";

export async function POST(request) {
  try {
    // 1. Verify the caller's Firebase ID token
    const authHeader = request.headers.get("Authorization") || "";
    const idToken    = authHeader.replace("Bearer ", "").trim();

    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    // 2. Get the phone number from request body
    const { phone } = await request.json();
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // 3. Update MongoDB — save phone and mark as verified
    await connectDB();
    const user = await User.findOneAndUpdate(
      { firebaseUid: decoded.uid },
      {
        $set: {
          phone,
          phoneVerified: true,
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      phone:         user.phone,
      phoneVerified: user.phoneVerified,
    });
  } catch (err) {
    console.error("verify-phone error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}