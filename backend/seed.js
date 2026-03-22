const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Post = require('./models/Post');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    await Post.deleteMany();
    await User.deleteMany();

    await User.create({
      username: 'admin@gmail.com',
      password: 'password123'
    });

    const mockPosts = [
      {
        title: "Building Resilient Systems with Modern Architecture",
        description: "A deep-dive into the thinking, trade-offs, and late-night debugging sessions that shaped this piece of work.",
        content: "<p>System architecture isn't just about drawing boxes...</p>",
        category: "Essays",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=1200&q=80",
        author: "Divyam Singh"
      },
      {
        title: "The Art of Writing Clean, Maintainable Code",
        description: "Lessons learned from building and scaling applications for the real world.",
        content: "<p>Writing code is easy. Writing maintainable code is an art form.</p>",
        category: "Dev Log",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
        author: "Divyam Singh"
      }
    ];

    await Post.insertMany(mockPosts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
