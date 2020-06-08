const PostService = require("./../services/post");
const Vote = require("./../models/vote");
const Post = require("./../models/post");
const mongoose = require("mongoose");

class VoteService {
  
  async prepareForUser(userId) {
    let preparedData = {};
    return Vote.find({ user: userId })
      .exec()
      .then((result) => {
        for (const ops of result) {
          preparedData[ops.post] = ops.type;
        }
        return preparedData;
      });
  }

  async vote(params) {
    const { postId, voteNumber } = params;
    let vote = await this.fetchIfExist(params);
    if (!vote) {
      vote = new Vote();
      console.log("nie ma");
      this.insert(params);
    } else {
      console.log("jest");
      this.update(vote, params);
    }

    const postService = new PostService();
    postService.updateVote(params);
  }

  update(vote, params) {
    console.log("params", vote, params);
    const { _id, type } = params;
    vote.type = type;
    Vote.updateOne({ _id: _id }, { $set: vote })
      .exec()
      .then((result) => {
        // console.log("update", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  insert(params) {
    const { postId, userId, voteNumber, type } = params;
    const vote = new Vote({
      _id: new mongoose.Types.ObjectId(),
      post: postId,
      user: userId,
      type,
    });

    vote
      .save()
      .then((result) => {
        console.log("added", result);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async fetchIfExist(params) {
    const { postId, userId } = params;
    return await Vote.findOne({ post: postId, user: userId }).exec();
  }
}

module.exports = VoteService;
