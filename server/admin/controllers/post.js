const mongoose = require("mongoose");

const Post = require("../../api/models/post");

exports.fetch_all = async (req, res, next) => {
  const posts = await Post.find()
    .select("title content _id")
    .exec()
    .then((docs) => {
      return docs.map((doc) => {
        return {
          title: doc.title,
          content: doc.content,
          _id: doc._id,
          request: {
            type: "GET",
            url: `${global.baseUrl}/post/${doc._id}`,
          },
        };
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  res.render("posts/index.twig", {
    posts,
    message: "Hello World",
    test: ["test", "yp"],
  });
};
