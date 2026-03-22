const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  content: {
    type: String,
    required: [true, 'Please provide post content']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category']
  },
  date: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String,
    default: '5 min read'
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=1600&q=80'
  },
  author: {
    type: String,
    default: 'Divyam Singh'
  },
  views: {
    type: Number,
    default: 0
  },
  upvotes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
