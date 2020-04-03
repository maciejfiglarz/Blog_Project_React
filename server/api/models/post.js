const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    type: String,
    photo: String,
    link: String,
    linkPhoto: String,
    youtube: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
