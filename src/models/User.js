const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  id: Number,
  avatar_url: String,
  type: String,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  bio: String,
  public_repos: Number,
  followers: Number,
  following: Number,
  created_at: Date,
  updated_at: Date,
  is_active: {
    type: Boolean,
    default: true,
  },
  friends: [String],
});

module.exports = mongoose.model('User', userSchema);
