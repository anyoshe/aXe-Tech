
import mongoose, { Schema, Model, Document } from "mongoose";

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
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { 
      type: String, 
      required: [true, "Product ID is required"], 
      unique: true,
      trim: true 
    },
    title: { 
      type: String, 
      required: [true, "Product title is required"],
      trim: true 
    },
    price: { 
      type: Number, 
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"] 
    },
    category: { 
      type: String, 
      trim: true 
    },
    images: { 
      type: [String], 
      default: [],
      validate: {
        validator: function(images: string[]) {
          return images.every(img => img.startsWith('http') || img.startsWith('/'));
        },
        message: "Images must be valid URLs or paths"
      }
    },
    short: { 
      type: String, 
      trim: true,
      maxlength: [200, "Short description cannot exceed 200 characters"]
    },
    description: { 
      type: String, 
      trim: true 
    },
    videos: { 
      type: [String], 
      default: [] 
    },
    features: { 
      type: [String], 
      default: [] 
    },
    specs: { 
      type: Schema.Types.Mixed, 
      default: {} 
    },
  },
  { 
    timestamps: true 
  }
);

// Index for better search performance
ProductSchema.index({ id: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ title: 'text', short: 'text', description: 'text' });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;