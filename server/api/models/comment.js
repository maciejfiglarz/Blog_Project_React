const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
    isRemove: { type: Boolean, default: false },
    isBan: { type: Boolean, default: false },
    content: String,
    createdAt: {type: Date, default: Date.now},
  }
);

// commentSchema.pre('save', function(next){
//   now = new Date();
//   this.updated_at = now;
//   if(!this.created_at) {
//       this.created_at = now
//   }
//   next();
// });


module.exports = mongoose.model("Comment", commentSchema);
