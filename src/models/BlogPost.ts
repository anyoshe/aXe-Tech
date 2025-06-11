import mongoose, { Schema, models } from 'mongoose';

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  content: String,
  date: { type: Date, default: Date.now },
  coverImage: String,
  author: String,
});

export default models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);