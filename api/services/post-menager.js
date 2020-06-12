const PostModel = require("./../models/post");
const FileService = require("./../services/file");
const mongoose = require("mongoose");
const axios = require("axios").default;
const fileGetContents = require("file-get-contents");
const http = require("https");
const fs = require("fs");

class PostMenagerService {
  async generateGraphic(params) {
    const { photo, title, titleTop, content, titleColor } = params;
    const urlGenerator = "http://ssosii.kylos.pl/generatorszlauf/generator/szlauf-generator";

    const { data } = await axios.post(urlGenerator, {
      photo,
      title,
      titleTop,
      content,
      titleColor,
    });
    const { success, graphicId } = data;
    if (success) {
      const urlFile = `http://ssosii.kylos.pl/generatorszlauf/generator/szlauf-image/${graphicId}`;
      const destination = `./public/uploads/graphic/${graphicId}.jpg`;
      var file = fs.createWriteStream(destination);
      var request = http
        .get(urlFile, function (response) {
          response.pipe(file);
          file.on("finish", function () {});
        })
        .on("error", function (err) {
          fs.unlink(destination); // Delete the file async. (But we don't check the result)
          console.log("err", err);
        });
      return  graphicId ;
    }
    // return { success };
  }
  async insertPost(params) {
    const { post, user } = params;
    const {
      title,
      titleTop,
      titleColor,
      content,
      type,
      youtube,
      photo,
      link,
      linkPhoto,
      linkSiteName,
    } = post;

    if (photo) {
      await this.movePhotoFromTemponaryToPost(photo);
    }

    let graphicId = null;
    if (type == "graphic") {
      graphicId = await this.generateGraphic({
        photo,
        title,
        titleTop,
        content,
        titleColor,
      });

    }

    const newPost = new PostModel({
      _id: new mongoose.Types.ObjectId(),
      title,
      content,
      titleTop,
      titleColor,
      type,
      youtube,
      photo,
      graphicId,
      link,
      linkPhoto,
      linkSiteName,
      user: user.id,
    });

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

  async movePhotoFromTemponaryToPost(fileName) {
    const fileService = new FileService();
    const oldPath = `./public/uploads/post-temponary/${fileName}`;
    const newPath = `./public/uploads/post/${fileName}`;
    fileService.move(oldPath, newPath);
  }
}

module.exports = PostMenagerService;
