// app/api/auth/me/route.js
// Returns the full MongoDB user document for the authenticated Firebase user

import { NextResponse } from "next/server";
import { adminAuth }    from "/lib/firebaseAdmin";
import connectDB        from "/lib/mongodb";
import User             from "/models/User";

export async function GET(request) {
  try {
    const authHeader = request.headers.get("Authorization") || "";
    const idToken    = authHeader.replace("Bearer ", "").trim();

    if (!idToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(idToken);
    await connectDB();

    const user = await User.findOne({ firebaseUid: decoded.uid }).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Update profile
export async function PATCH(request) {
  try {
    const authHeader = request.headers.get("Authorization") || "";
    const idToken    = authHeader.replace("Bearer ", "").trim();
    if (!idToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(idToken);
    await connectDB();

    const body = await request.json();

    // ── Address operations ─────────────────────────────────────────────────
    if (body.action === "addAddress") {
      const user = await User.findOneAndUpdate(
        { firebaseUid: decoded.uid },
        { $push: { addresses: body.address } },
        { new: true }
      );
      return NextResponse.json({ success: true, user });
    }

    if (body.action === "updateAddress") {
      const user = await User.findOne({ firebaseUid: decoded.uid });
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
      user.addresses[body.index] = body.address;
      user.markModified("addresses");
      await user.save();
      return NextResponse.json({ success: true, user });
    }

    if (body.action === "deleteAddress") {
      const user = await User.findOne({ firebaseUid: decoded.uid });
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
      user.addresses.splice(body.index, 1);
      user.markModified("addresses");
      await user.save();
      return NextResponse.json({ success: true, user });
    }

    // ── General field update ───────────────────────────────────────────────
    const allowedFields = ["name", "phone", "addresses", "wishlist", "avatar"];
    const update = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) update[field] = body[field];
    }

    const user = await User.findOneAndUpdate(
      { firebaseUid: decoded.uid },
      { $set: update },
      { new: true }
    );
    return NextResponse.json({ success: true, user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}