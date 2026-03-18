// lib/mongodb.js
// ─── MongoDB connection (singleton for Next.js) ───────────────────────────────

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI in .env.local\n" +
    "Get it from: https://cloud.mongodb.com → Connect → Drivers"
  );
}

/**
 * Global cache to avoid creating a new connection on every hot-reload in dev,
 * and to reuse the connection across serverless function invocations in prod.
 */
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;