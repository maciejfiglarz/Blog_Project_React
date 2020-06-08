const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");

const Post = require("../models/post");

const fileGetContents = require("file-get-contents");
const domino = require("domino");

const PostService = require("./../services/post");

exports.fetch_one_by_id = async (req, res, next) => {
  const { body } = req;
  const { postId } = body;
  const postService = new PostService();
  const post = await postService.findOneById(postId);
  const success = post ? true : false;
  res.status(200).json({ success, post });
}

exports.pagination = async (req, res, next) => {
  const perPage = 5;
  const { body } = req;
  const { page, params } = body;

  const postService = new PostService();
  const result = await postService.pagination(page, perPage, params);
  res.status(201).json(result);
};

exports.destroy_all = (req, res, next) => {
  Post.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
};

exports.fetch_all = (req, res, next) => {
  Post.find()
    .select("title content _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        posts: docs.map((doc) => {
          return {
            title: doc.title,
            content: doc.content,
            _id: doc._id,
            request: {
              type: "GET",
              url: `${global.baseUrl}/post/${doc._id}`,
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

// exports.get_post = (req, res, next) => {
//   const id = req.params.postId;
//   Post.findById(id)
//     // .select("title content _id")
//     .exec()
//     .then((doc) => {
//       if (doc) {
//         res.status(200).json({
//           post: doc,
//           request: {
//             type: "GET",
//             url: `${global.baseUrl}/post/${doc._id}`,
//           },
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// };

exports.update_post = (req, res, next) => {
  const id = req.params.postId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Post.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Post updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/post" + id,
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

exports.post_delete = (req, res, next) => {
  const id = req.params.postId;
  Post.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Post deleted",
        request: {
          type: "POST",
          url: `${global.baseUrl}/post/`,
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
