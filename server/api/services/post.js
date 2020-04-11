const postModel = require("./../models/post");

class PostService {
  async findOneById(id) {
    return postModel.findById(id);
  }

  async updateVote(params) {
    const { type, postId } = params;
    const post = await this.findOneById(postId);
    const voteNumber = type == "up" ? post.voteNumber + 1 : post.voteNumber - 1;

    postModel
      .updateOne({ _id: postId }, { $set: { voteNumber: voteNumber } })
      .exec()
      .then((result) => {
        console.log("updatevvvvvvvvvvv", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = PostService;
