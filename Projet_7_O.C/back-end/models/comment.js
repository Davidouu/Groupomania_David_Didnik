const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  message: { type: String, required: true },
  postId: { type: String, required: true },
  userId: { type: String, required: true },
  commentFirstName: { type: String, required: true },
  commentLastName: { type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
