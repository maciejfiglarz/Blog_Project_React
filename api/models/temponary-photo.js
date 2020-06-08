const mongoose = require("mongoose");

const temponaryPhotoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fileName: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("TemponaryPhoto", temponaryPhotoSchema);
