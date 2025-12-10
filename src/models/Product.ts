
// import mongoose, { Schema, Model, Document } from "mongoose";

// export interface IProduct extends Document {
//   id: string;
//   title: string;
//   price: number;
//   category?: string;
//   images: string[];
//   short?: string;
//   description?: string;
//   videos: string[];
//   features: string[];
//   specs: Record<string, unknown>;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const ProductSchema = new Schema<IProduct>(
//   {
//     id: { 
//       type: String, 
//       required: [true, "Product ID is required"], 
//       unique: true,
//       trim: true 
//     },
//     title: { 
//       type: String, 
//       required: [true, "Product title is required"],
//       trim: true 
//     },
//     price: { 
//       type: Number, 
//       required: [true, "Product price is required"],
//       min: [0, "Price cannot be negative"] 
//     },
//     category: { 
//       type: String, 
//       trim: true 
//     },
//     images: { 
//       type: [String], 
//       default: [],
//       validate: {
//         validator: function(images: string[]) {
//           return images.every(img => img.startsWith('http') || img.startsWith('/'));
//         },
//         message: "Images must be valid URLs or paths"
//       }
//     },
//     short: { 
//       type: String, 
//       trim: true,
//       maxlength: [200, "Short description cannot exceed 200 characters"]
//     },
//     description: { 
//       type: String, 
//       trim: true 
//     },
//     videos: { 
//       type: [String], 
//       default: [] 
//     },
//     features: { 
//       type: [String], 
//       default: [] 
//     },
//     specs: { 
//       type: Schema.Types.Mixed, 
//       default: {} 
//     },
//   },
//   { 
//     timestamps: true 
//   }
// );

// // Index for better search performance
// ProductSchema.index({ id: 1 });
// ProductSchema.index({ category: 1 });
// ProductSchema.index({ price: 1 });
// ProductSchema.index({ title: 'text', short: 'text', description: 'text' });

// const Product: Model<IProduct> =
//   mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

// export default Product;


import mongoose, { Schema, Model, Document } from "mongoose";

export interface IProduct extends Document {
  id: string;
  title: string;
  price: number;
  category?: string;
  images: string[]; // Can be URLs OR Base64 strings
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
        // REMOVE the URL validation to allow Base64
        validator: function(images: string[]) {
          // Allow empty array
          if (images.length === 0) return true;
          
          // Check each image - can be URL OR Base64
          return images.every(img => {
            if (!img || typeof img !== 'string') return false;
            
            // Accept URLs
            if (img.startsWith('http') || img.startsWith('/')) return true;
            
            // Accept Base64 data URLs
            if (img.startsWith('data:image/')) return true;
            
            // Reject everything else
            return false;
          });
        },
        message: "Images must be valid URLs (http://, /path/) or Base64 data URLs (data:image/...)"
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
      default: [],
      validate: {
        validator: function(videos: string[]) {
          if (videos.length === 0) return true;
          
          return videos.every(video => {
            if (!video || typeof video !== 'string') return false;
            
            // Accept YouTube/Vimeo embed URLs
            if (video.includes('youtube.com/embed/') || 
                video.includes('youtu.be/') ||
                video.includes('vimeo.com/') ||
                video.includes('player.vimeo.com/')) {
              return true;
            }
            
            // Accept regular URLs
            if (video.startsWith('http')) return true;
            
            return false;
          });
        },
        message: "Videos must be valid embed URLs (YouTube, Vimeo) or direct video URLs"
      }
    },
    features: { 
      type: [String], 
      default: [] 
    },
    specs: { 
      type: Schema.Types.Mixed, 
      default: {},
      validate: {
        validator: function(specs: any) {
          // Allow empty object
          if (!specs || Object.keys(specs).length === 0) return true;
          
          try {
            // Try to stringify to ensure it's valid JSON
            JSON.stringify(specs);
            return true;
          } catch {
            return false;
          }
        },
        message: "Specs must be valid JSON object"
      }
    },
  },
  { 
    timestamps: true 
  }
);

// Indexes for better search performance
// Note: `id` field already has `unique: true` which creates an index,
// so we avoid adding a duplicate index here.
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ title: 'text', short: 'text', description: 'text' });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;