const mongoose = require("mongoose");

const postModel = require("../../api/models/post");

const postService = require("./../services/post");

exports.fetch_all = async (req, res, next) => {
  // const posts = await Post.find()
  //   .select("title content _id")
  //   .exec()
  //   .then((docs) => {
  //     return docs.map((doc) => {
  //       return {
  //         title: doc.title,
  //         content: doc.content,
  //         _id: doc._id,
  //         request: {
  //           type: "GET",
  //           url: `${global.baseUrl}/post/${doc._id}`,
  //         },
  //       };
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({
  //       error: err,
  //     });
  //   });

  const perPage = 5;
  const { params, body } = req;

  console.log("body", req);

  const { page } = params;

  const posts = await postService.pagination(page, perPage, params);
console.log(posts);
  res.render("posts/index.twig", {
    posts,
    page,
  });
};

exports.update = async (req, res, next) => {
  const { body } = req;
  const { postId, page, title, content, isWaitingRoom,isActive } = body;

  // const post = await postModel.findById(postId).populate("user");
  // post.title = title;
  // post.content = content;
  // post.isWaitingRoom = isWaitingRoom ? true : false;

  await postModel
    .updateOne(
      { _id: postId },
      { $set: { title, content, isWaitingRoom: isWaitingRoom ? true : false,isActive: isActive ? true : false } }
    )
    .exec();

    res.redirect(`${page}`);

};
