import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn(
    "[mongodb] MONGODB_URI is not set. Set it in .env.local (and Vercel env vars)."
  );
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var mongooseCache:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

/** Raw MongoDB client (optional direct collection access) */
function getClientPromise(): Promise<MongoClient> {
  if (!MONGODB_URI) {
    return Promise.reject(new Error("MONGODB_URI is not defined"));
  }
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

const clientPromise = MONGODB_URI
  ? getClientPromise()
  : Promise.reject(new Error("MONGODB_URI is not defined"));

export default clientPromise;

/** Mongoose connection (use this in API routes + models) */
if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

export async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not defined. Add it to .env.local and restart the server."
    );
  }

  const cached = global.mongooseCache!;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
