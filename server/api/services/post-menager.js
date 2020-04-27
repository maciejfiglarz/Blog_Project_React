const PostModel = require("./../models/post");
const FileService = require("./../services/file");
const mongoose = require("mongoose");

class PostMenagerService {
  async insertPost(params) {
    const { post, user } = params;
    const {
      title,
      content,
      type,
      youtube,
      photo,
      link,
      linkPhoto,
      linkSiteName,
    } = post;

    const newPost = new PostModel({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      type,
      youtube,
      photo,
      link,
      linkPhoto,
      linkSiteName,
      user: user.id,
    });
    if (photo) {
      this.movePhotoFromTemponaryToPost(photo);
    }

    return newPost
      .save()
      .then((result) => {
        console.log("insert", result);
        return { success: true, postId: result._id };
      })
      .catch((err) => {
        console.log("errInsert", err);
        return { success: false };
      });
  }

  movePhotoFromTemponaryToPost(fileName) {
    const fileService = new FileService();
    const oldPath = `./public/uploads/post-temponary/${fileName}`;
    const newPath = `./public/uploads/post/${fileName}`;
    fileService.move(oldPath, newPath);
  }
}

module.exports = PostMenagerService;
