/**
 * @deprecated Product data lives in Supabase (`products` table).
 * See src/lib/supabase.ts and supabase/schema.sql
 */
export type IProduct = {
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
  createdAt?: string;
  updatedAt?: string;
};

const Product = null as unknown as never;
export default Product;
