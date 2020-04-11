const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  type: String,
  photo: String,
  link: String,
  linkPhoto: String,
  youtube: String,
  voteNumber: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSchema);
