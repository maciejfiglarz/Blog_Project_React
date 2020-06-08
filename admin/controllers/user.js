const mongoose = require("mongoose");

const userModel = require("../../api/models/user");

const userService = require("../services/user");

exports.fetch_all = async (req, res, next) => {
  const perPage = 5;
  const { params, body } = req;

  const { page } = params;

  const users = await userService.pagination(page, perPage, params);
  console.log("users", users);
  res.render("users/index.twig", {
    users,
    page,
  });
};

exports.update = async (req, res, next) => {
  const { body } = req;
  const { userId, page, isBan, isActive } = body;

  await userModel
    .updateOne(
      { _id: userId },
      {
        $set: {
          isBan: isBan ? true : false,
          isActive: isActive ? true : false,
        },
      }
    )
    .exec();

  res.redirect(`${page}`);
};
