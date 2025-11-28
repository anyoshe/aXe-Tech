import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    images: { type: [String], default: [] },
    short: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev/reload
// Extend schema with optional fields for richer product pages
ProductSchema.add({
  videos: { type: [String], default: [] },
  features: { type: [String], default: [] },
  specs: { type: Object, default: {} },
});

const Product = (mongoose.models.Product as mongoose.Model<any>) || mongoose.model("Product", ProductSchema);

export default Product;
