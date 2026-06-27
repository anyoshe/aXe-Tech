// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   console.warn("MONGODB_URI not set — database calls will fail in server routes");
// }

// declare global {
//   // allow global variable across module reloads in dev
//   // eslint-disable-next-line no-var
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// const uri = process.env.MONGODB_URI ?? "";
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!uri) {
//   client = new MongoClient("");
//   clientPromise = Promise.reject(new Error("MONGODB_URI not provided"));
// } else {
//   client = new MongoClient(uri, options as any);
//   if (process.env.NODE_ENV === "development") {
//     if (!global._mongoClientPromise) {
//       global._mongoClientPromise = client.connect();
//     }
//     clientPromise = global._mongoClientPromise;
//   } else {
//     clientPromise = client.connect();
//   }
// }

// export default clientPromise;
// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/axetech';

// declare global {
//   // eslint-disable-next-line no-var
//   var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
// }

// const cached = global.mongooseCache || { conn: null, promise: null };

// export async function dbConnect() {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => mongoose);
//   }
//   cached.conn = await cached.promise;
//   global.mongooseCache = cached;
//   return cached.conn;
// }

import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/axetech";

if (!process.env.MONGODB_URI) {
  console.warn("MONGODB_URI not set — defaulting to local fallback database.");
}

// 1. Unified Global Type Definitions for Next.js Fast Refresh
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var mongooseCache: { conn: any; promise: any } | undefined;
}

// ============================================================================
//   RAW MONGODB CLIENT (For direct collection queries: clientPromise)
// ============================================================================
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "test") {
  const client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
} else {
  // Always use global cache in development to prevent connection pooling limits
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

export default clientPromise;

// ============================================================================
//   MONGOOSE CONNECTION (For schemas and models: dbConnect)
// ============================================================================
// Initialize the global cache safely on the global context right away
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

export async function dbConnect() {
  // Check the global pointer directly
  if (global.mongooseCache?.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache?.promise) {
    global.mongooseCache!.promise = mongoose
      .connect(MONGODB_URI, { 
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000 // Fails fast (5s) instead of stalling your app for 30 seconds
      })
      .then((m) => m);
  }

  try {
    global.mongooseCache!.conn = await global.mongooseCache!.promise;
  } catch (e) {
    global.mongooseCache!.promise = null; // Reset promise on failure so it can retry next time
    throw e;
  }

  return global.mongooseCache!.conn;
}