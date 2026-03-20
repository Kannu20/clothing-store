// app/api/auth/verify-email-otp/route.js
// 1. Verify Firebase token
// 2. Find OTP in MongoDB
// 3. Check OTP matches + not expired + not too many attempts
// 4. Mark emailVerified = true in MongoDB
// 5. Mark emailVerified = true in Firebase via Admin SDK

import { NextResponse }  from "next/server";
import { adminAuth }     from "@/lib/firebaseAdmin";
import connectDB         from "@/lib/mongodb";
import User              from "@/models/User";
import OtpToken          from "@/models/OtpToken";

export async function POST(request) {
  try {
    // 1. Verify Firebase token
    const authHeader = request.headers.get("Authorization") || "";
    const idToken    = authHeader.replace("Bearer ", "").trim();
    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = await adminAuth.verifyIdToken(idToken);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Get OTP from request body
    const { otp } = await request.json();
    if (!otp || otp.length !== 6) {
      return NextResponse.json({ error: "Invalid OTP format" }, { status: 400 });
    }

    await connectDB();

    // 3. Find OTP record
    const otpRecord = await OtpToken.findOne({ firebaseUid: decoded.uid });

    if (!otpRecord) {
      return NextResponse.json(
        { error: "OTP expired or not found. Please request a new one." },
        { status: 400 }
      );
    }

    // 4. Check attempts (lock after 5 wrong tries)
    if (otpRecord.attempts >= 5) {
      await OtpToken.deleteOne({ _id: otpRecord._id });
      return NextResponse.json(
        { error: "Too many incorrect attempts. Please request a new OTP." },
        { status: 429 }
      );
    }

    // 5. Check OTP value
    if (otpRecord.otp !== otp.trim()) {
      // Increment attempts
      await OtpToken.updateOne({ _id: otpRecord._id }, { $inc: { attempts: 1 } });
      const remaining = 5 - (otpRecord.attempts + 1);
      return NextResponse.json(
        {
          error: `Incorrect OTP. ${remaining > 0 ? `${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.` : "No attempts remaining."}`
        },
        { status: 400 }
      );
    }

    // 6. OTP is correct — delete it immediately (one-time use)
    await OtpToken.deleteOne({ _id: otpRecord._id });

    // 7. Mark emailVerified = true in MongoDB
    await User.findOneAndUpdate(
      { firebaseUid: decoded.uid },
      { $set: { emailVerified: true } }
    );

    // 8. Mark emailVerified = true in Firebase (via Admin SDK)
    try {
      await adminAuth.updateUser(decoded.uid, { emailVerified: true });
    } catch (fbErr) {
      // Non-fatal — MongoDB already updated, Firebase sync is best-effort
      console.warn("Firebase emailVerified update warning:", fbErr.message);
    }

    return NextResponse.json({ success: true, message: "Email verified successfully!" });

  } catch (err) {
    console.error("verify-email-otp error:", err);
    return NextResponse.json(
      { error: err.message || "Verification failed" },
      { status: 500 }
    );
  }
}