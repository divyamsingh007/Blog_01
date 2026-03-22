const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, default: "Admin" },
  lastName: { type: String, default: "User" },
  email: { type: String, default: "admin@example.com" },
  role: { type: String, default: "Full Stack Engineer" },
  bio: { type: String, default: "Software engineer exploring the intersection of design and code." },
  twitter: { type: String, default: "" },
  github: { type: String, default: "" },
  avatar: { type: String, default: "/Divyam.jpeg" },
  
  siteTitle: { type: String, default: "My Awesome Blog" },
  siteDescription: { type: String, default: "A curated collection of my thoughts." },
  postsPerPage: { type: Number, default: 10 },
  themePreference: { type: String, default: "System" }
}, { timestamps: true });

// Pre-save hook to hash password before saving to db
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify password match
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
