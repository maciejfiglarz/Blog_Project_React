const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const Post = require("../models/post");

const fileGetContents = require("file-get-contents");
const domino = require("domino");

exports.get_link_info = async (req, res, next) => {
  const url = req.body.url;
  console.log("jest");
  fileGetContents(url)
    .then(text => {
      const window = domino.createWindow(text);
      const document = window.document;
      console.log("jest");
      const title = document
        .querySelector("meta[property='og:title']")
        .getAttribute("content");
      const image = document
        .querySelector("meta[property='og:image']")
        .getAttribute("content");
      const description = document
        .querySelector("meta[property='og:image']")
        .getAttribute("description");
      var urlParts = url
        .replace("http://", "")
        .replace("https://", "")
        .split(/[/?#]/);
      const siteName = urlParts[0];

      res.status(200).json({
        title: title,
        description: description,
        image: image,
        siteName: siteName
      });
    })
    .catch(err => {
      console.log(`err`, err);
    });
};

exports.upload_photo_temponary = async (req, res, next) => {
  console.log(req, res);
  let fileName = "";
  const storage = multer.diskStorage({
    destination: "./public/uploads/post-temponary",
    filename: function(req, file, cb) {
      extension = path.extname(path.extname(file.originalname));
      fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
  }).single("photo");

  await upload(req, res, err => {
    res.status(200).json({ fileName: fileName });
  });
};

exports.fetch_all = (req, res, next) => {
  Post.find()
    .select("title content _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            title: doc.title,
            content: doc.content,
            _id: doc._id,
            request: {
              type: "GET",
              url: `${global.baseUrl}/post/${doc._id}`
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

exports.get_post = (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    // .select("title content _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          post: doc,
          request: {
            type: "GET",
            url: `${global.baseUrl}/post/${doc._id}`
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.create_post = (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content
  });
  post
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created post successfully",
        createdPost: {
          title: result.title,
          content: result.content,
          _id: result._id,
          request: {
            type: "GET",
            url: `${global.baseUrl}/post/${result._id}`
          }
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

exports.update_post = (req, res, next) => {
  const id = req.params.postId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Post.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/post" + id
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

exports.post_delete = (req, res, next) => {
  const id = req.params.postId;
  Post.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post deleted",
        request: {
          type: "POST",
          url: `${global.baseUrl}/post/`,
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
