import mongoose, { Schema, models } from 'mongoose';

const CommentSchema = new Schema({
  name: String,
  text: String,
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  replies: []
});
CommentSchema.add({ replies: [CommentSchema] });

const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  slug: { type: String, required: true, unique: true },
  description: { type: String, maxlength: 240 },
  content: { type: String },
  date: { type: Date, default: Date.now },
  coverImage: { type: String },
  secondaryImage: { type: String },
  author: { type: String },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
  mediaBlocks: [
    {
      type: { type: String, enum: ['image', 'subtitle', 'list'], required: true },
      content: Schema.Types.Mixed,
      position: { type: Number } // optional: to order placement in content
    }
  ]
});

export default models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);
