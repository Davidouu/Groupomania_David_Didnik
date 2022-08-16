const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  postFirstName: { type: String, required: true },
  postLastName: { type: String, required: true },
  postTitle: { type: String, required: true },
  postMessage: { type: String, requried: false },
  postUserId: { type: String, required: true },
  postDate: { type: String, required: true },
  likes: { type: Number, required: true, default: 0 },
  usersLiked: { type: [String], required: true, default: [] },
  imageUrl: { type: String, required: false },
});

module.exports = mongoose.model('Post', postSchema);
