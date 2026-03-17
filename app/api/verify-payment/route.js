import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { verified: false, error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Generate expected signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { verified: false, error: "Signature mismatch — possible tampered payment" },
        { status: 400 }
      );
    }

    return NextResponse.json({ verified: true, paymentId: razorpay_payment_id });
  } catch (err) {
    console.error("Razorpay verify error:", err);
    return NextResponse.json(
      { verified: false, error: err.message },
      { status: 500 }
    );
  }
}