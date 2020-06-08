const mongoose = require("mongoose");

const voteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Vote", voteSchema);
