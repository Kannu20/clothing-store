// models/User.js
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  label:   { type: String, default: "Home" },
  line1:   String,
  city:    String,
  state:   String,
  pincode: String,
  phone:   String,
}, { _id: false });

const UserSchema = new mongoose.Schema(
  {
    // Firebase UID — primary identifier that links Firebase ↔ MongoDB
    firebaseUid: {
      type:     String,
      required: true,
      unique:   true,
      index:    true,
    },

    // Profile
    name:        { type: String, required: true, trim: true },
    email:       { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone:       { type: String, default: "" },
    avatar:      { type: String, default: "" },  // URL from Google or upload

    // Auth provider
    provider:    { type: String, enum: ["google", "email"], default: "email" },
    emailVerified: { type: Boolean, default: false },

    // Saved addresses
    addresses:   { type: [AddressSchema], default: [] },

    // Wishlist (product IDs — mirrored from Zustand for persistence)
    wishlist:    { type: [String], default: [] },

    // Metadata
    lastLoginAt: { type: Date, default: Date.now },
    createdAt:   { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_, ret) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Prevent OverwriteModelError on hot-reload in dev
export default mongoose.models.User || mongoose.model("User", UserSchema);