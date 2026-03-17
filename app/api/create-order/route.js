import Razorpay from "razorpay";
import { NextResponse } from "next/server";

// Razorpay instance — uses environment variables (never exposed to browser)
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency = "INR", receipt } = body;

    // Validate
    if (!amount || typeof amount !== "number" || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Create order on Razorpay servers
    const order = await razorpay.orders.create({
      amount:   Math.round(amount * 100), // paise
      currency,
      receipt:  receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    });

    return NextResponse.json({
      id:       order.id,
      amount:   order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Razorpay create-order error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create order" },
      { status: 500 }
    );
  }
}