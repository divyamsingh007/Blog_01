require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/blog_db').then(async () => {
  const users = await User.find({});
  console.log("Users in DB:", users);
  process.exit(0);
});
