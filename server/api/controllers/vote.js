const mongoose = require("mongoose");

const Vote = require("../models/vote");
const VoteService = require("../services/vote");

exports.vote = (req, res, next) => {
  const { body } = req;
  const voteService = new VoteService();
  voteService.vote(body);

  return res.send({
    success: true,
    message: "OK!",
  });
};

exports.prepare_for_user = async (req, res, next) => {
  const { user } = req.body;
  const { id } = user;
  
  const voteService = new VoteService();
  const preparedVotes = await voteService.prepareForUser(id);

  return res.send(preparedVotes);
};

exports.destroy_all = (req, res, next) => {
  Vote.deleteMany({}, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.end("success");
    }
  });
};
