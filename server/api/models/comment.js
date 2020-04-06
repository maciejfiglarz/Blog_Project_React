const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    post:  { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    content: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
