// models/OtpToken.js
// Stores email OTPs — auto-expires after 10 minutes via MongoDB TTL index

import mongoose from "mongoose";

const OtpTokenSchema = new mongoose.Schema({
  // Which user this OTP belongs to
  firebaseUid: {
    type:     String,
    required: true,
    index:    true,
  },
  email: {
    type:     String,
    required: true,
    lowercase: true,
  },

  // The 6-digit OTP (stored as hashed in production — plaintext for simplicity here)
  otp: {
    type:     String,
    required: true,
  },

  // OTP purpose — "email_verification"
  type: {
    type:    String,
    default: "email_verification",
  },

  // Attempt counter — lock after 5 wrong attempts
  attempts: {
    type:    Number,
    default: 0,
  },

  // MongoDB TTL index — document auto-deleted after 10 minutes
  createdAt: {
    type:    Date,
    default: Date.now,
    expires: 600,   // 600 seconds = 10 minutes
  },
});

export default mongoose.models.OtpToken ||
  mongoose.model("OtpToken", OtpTokenSchema);