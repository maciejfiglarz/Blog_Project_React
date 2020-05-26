const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  titleTop: String,
  content: String,
  type: String,
  photo: String,
  link: String,
  linkPhoto: String,
  linkSiteName: String,
  youtube: String,
  graphicId: String,
  voteNumber: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSchema);
