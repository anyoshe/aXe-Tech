import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  console.warn("MONGODB_URI not set — database calls will fail in server routes");
}

declare global {
  // allow global variable across module reloads in dev
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI ?? "";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  client = new MongoClient("");
  clientPromise = Promise.reject(new Error("MONGODB_URI not provided"));
} else {
  client = new MongoClient(uri, options as any);
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = client.connect();
  }
}

export default clientPromise;
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/axetech';

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  global.mongooseCache = cached;
  return cached.conn;
}