const mongoose = require("mongoose");

const Post = require("../models/post");
const UserModel = require("../models/user");
const commentModel = require("../models/comment");
const CommentService = require("./../services/comment");

exports.total_pages = async (req, res, next) => {
  const { params } = req;
  const { postId } = params;

  let countedTotalPages = await commentModel.countDocuments({ post: postId });
  countedTotalPages = Math.ceil(countedTotalPages / 15 - 2);
  res.status(201).json({ countedTotalPages });
};

exports.create_comment = async (req, res, next) => {
  const { body } = req;

  const commentService = new CommentService();
  const comment = await commentService.createComment(body);
  res.status(201).json({ success: true, comment });
  //   res.status(201).json({ success: true, comment });
  // } else {
  //   res.status(201).json({ success: false });
  // }

  // const { content, postId, user,parentCommentId } = body;
  // const { id } = user;
  // const postResult = await Post.findById(postId);
  // const userResult = await UserModel.findById(id);

  // if (postResult && userResult) {
  //   const comment = new commentModel({
  //     _id: mongoose.Types.ObjectId(),
  //     content: content,
  //     post: mongoose.Types.ObjectId(postId),
  //     user: mongoose.Types.ObjectId(id),
  //   });
  //   await comment.save();
  //   // await comment.populate("user");
  //   await comment.populate("user").execPopulate();
  //   delete comment["password"];
  //   res.status(201).json({ success: true, comment });
  // } else {
  //   res.status(201).json({ success: false });
  // }
};

exports.fetch_comments = async (req, res, next) => {
  // const {postId} = req.body;

  const { body } = req;
  const { page, postId } = body;
  const commentService = new CommentService();
  const comments = await commentService.fetchComments({ page, postId });
  console.log("comments", comments);
  res.status(200).json(comments);
};

exports.pagination_comment = async (req, res, next) => {
  const postId = req.params.postId;
  console.log("pagination", postId);
  // const post = await Post.findById(postId).then((post) => post);

  const perPage = 15;
  const page = Math.max(0, req.params.page);
  // console.log("page", page);
  await commentModel
    .find({ post: postId })
    // .select("createdAt _id title description")
    .limit(perPage)
    // .skip(perPage * page)
    .sort({
      _id: "desc",
    })
    // .sort("-createdAt")
    .exec((err, results) => {
      // console.log("results", results);
      res.status(201).json(results);
    });
};

exports.comment_delete = (req, res, next) => {
  const id = req.params.commentId;
  commentModel
    .remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Comment deleted",
        request: {
          type: "POST",
          url: `${global.baseUrl}/comment/`,
          body: { title: "String", content: "Number" },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.destroy_all = (req, res, next) => {
  commentModel.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
};

exports.fetch_all = (req, res, next) => {
  commentModel
    .find()
    // .select("title content _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        comments: docs.map((doc) => {
          return {
            post: doc.post,
            content: doc.content,
            _id: doc._id,
            request: {
              type: "GET",
              url: `${global.baseUrl}/comment/${doc._id}`,
            },
          };
        }),
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
