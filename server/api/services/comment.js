const mongoose = require("mongoose");
const CommentModel = require("./../models/comment");
const PostModel = require("../models/post");
const UserModel = require("../models/user");

class CommentService {
  async createComment(params) {
    const { content, postId, user, parentCommentId } = params;
    const { id } = user;
    const postResult = await PostModel.findById(postId);
    const userResult = await UserModel.findById(id);
    const comment = new CommentModel({
      _id: mongoose.Types.ObjectId(),
      content: content,
      post: mongoose.Types.ObjectId(postId),
      user: mongoose.Types.ObjectId(id),
      parentComment: mongoose.Types.ObjectId(parentCommentId),
    });
    await comment.save();
    await comment.populate("user").execPopulate();
    delete comment["password"];
    console.log("addedComment", comment);
    return comment;
  }
  async fetchComments(params) {
    const perPage = 15;
    const { postId, page } = params;
    console.log("page", page);
    // return CommentModel.find({ post: postId, parentComment: { $ne: null } })
    //   .sort("-createdAt")
    //   .populate("user")
    //   .limit(perPage)
    //   .skip(perPage * page);
    const reponseComments = await CommentModel.find({
      post: postId,
      parentComment: { $ne: null },
    })
      .sort("-createdAt")
      .populate("user")
      .limit(perPage)
      .skip(perPage * page);

    let preparedResponseComments = {};
    for (let key in reponseComments) {
      if (!Array.isArray(preparedResponseComments[reponseComments[key].parentComment])) {
        preparedResponseComments[reponseComments[key].parentComment] =
          [reponseComments[key]];
      } else {
        preparedResponseComments[reponseComments[key].parentComment].push(
          reponseComments[key]
        );
      }
    }
    
    const mainComments = await CommentModel.find({
      post: postId,
      parentComment: null,
    })
      .sort("-createdAt")
      .populate("user")
      .limit(perPage)
      .skip(perPage * page);

    return { responseComments: preparedResponseComments, mainComments };
  }
}

module.exports = CommentService;
