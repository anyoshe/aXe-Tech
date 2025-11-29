// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     id: { type: String, required: true, unique: true },
//     title: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: String },
//     images: { type: [String], default: [] },
//     short: { type: String },
//     description: { type: String },
//   },
//   { timestamps: true }
// );

// // Prevent model overwrite in dev/reload
// // Extend schema with optional fields for richer product pages
// ProductSchema.add({
//   videos: { type: [String], default: [] },
//   features: { type: [String], default: [] },
//   specs: { type: Object, default: {} },
// });

// const Product = (mongoose.models.Product as mongoose.Model<any>) || mongoose.model("Product", ProductSchema);

// export default Product;

import mongoose, { Schema, Model, Document } from "mongoose";

/* ------------------------------
   PRODUCT TYPE (TS Interface)
------------------------------ */
export interface IProduct extends Document {
  id: string;
  title: string;
  price: number;
  category?: string;
  images: string[];
  short?: string;
  description?: string;
  videos: string[];
  features: string[];
  specs: Record<string, unknown>;
}

/* ------------------------------
   PRODUCT SCHEMA
------------------------------ */
const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    images: { type: [String], default: [] },
    short: { type: String },
    description: { type: String },

    // Extended fields
    videos: { type: [String], default: [] },
    features: { type: [String], default: [] },

    // Safe non-any type for object fields
    specs: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

/* ------------------------------
   PREVENT MODEL OVERWRITE
------------------------------ */
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
