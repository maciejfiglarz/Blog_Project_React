const mongoose = require("mongoose");

const Post = require("../models/post");
const Comment = require("../models/comment");

exports.create_comment = async (req, res, next) => {
  const content = req.body.content;
  const postId = req.body.post;

  await Post.findById(postId).then((post) => {
    const comment = new Comment({
      _id: mongoose.Types.ObjectId(),
      content: content,
      post: postId,
    });
    comment.save();
    res.status(201).json({ result: "ok" ,comment: comment });
  });
};

exports.fetch_comments = async (req, res, next) => {
  // const {postId} = req.body;
  console.log('comment',req.body);
  
  res.status(200).json({ });
  // console.log('pagination',postId);
  // // const post = await Post.findById(postId).then((post) => post);

  // const perPage = 5;
  // const page = Math.max(0, req.params.page);
  // // console.log("page", page);
  // await Comment.find({ 'post': postId })
  //   // .select("createdAt _id title description")
  //   .limit(perPage)
  //   // .skip(perPage * page)
  //   .sort({
  //     _id: "desc",
  //   })
  //   // .sort("-createdAt")
  //   .exec((err, results) => {
  //     // console.log("results", results);
  //     res.status(201).json(results);
  //   });
};

exports.pagination_comment = async (req, res, next) => {
  const postId = req.params.postId;
  console.log('pagination',postId);
  // const post = await Post.findById(postId).then((post) => post);

  const perPage = 5;
  const page = Math.max(0, req.params.page);
  // console.log("page", page);
  await Comment.find({ 'post': postId })
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
  Comment.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Comment deleted",
        request: {
          type: "POST",
          url: `${global.baseUrl}/comment/`,
          body: { title: "String", content: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.destroy_all = (req, res, next) => {
  Comment.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
};

exports.destroy_all = (req, res, next) => {
  Post.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
};

exports.fetch_all = (req, res, next) => {
  Comment.find()
    // .select("title content _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        comments: docs.map(doc => {
          return {
            post: doc.post,
            content: doc.content,
            _id: doc._id,
            request: {
              type: "GET",
              url: `${global.baseUrl}/comment/${doc._id}`
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
