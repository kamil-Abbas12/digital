import mongoose from "mongoose";

// Ensure MONGODB_URI is defined and narrow its type
const MONGODB_URI: string = process.env.MONGODB_URI ?? (() => {
  throw new Error("Missing MONGODB_URI in .env.local");
})();

declare global {
  // Prevent multiple connections in development
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

// Use cached connection if it exists
const cached = global.mongooseCache || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached;

  return cached.conn;
}