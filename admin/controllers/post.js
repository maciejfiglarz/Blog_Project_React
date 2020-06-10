const mongoose = require("mongoose");

const postModel = require("../../api/models/post");

const postService = require("./../services/post");

exports.fetch_all = async (req, res, next) => {

  const perPage = 5;
  const { params, body } = req;

  console.log("body", req);

  const { page } = params;

  const posts = await postService.pagination(page, perPage, params);

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
