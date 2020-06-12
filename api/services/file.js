const fs = require("fs");
const mongoose = require("mongoose");
const TemponaryPhotoModel = require("./../models/temponary-photo");
const multer = require("multer");
const path = require("path");

class FileService {
  move(oldPath, newPath) {
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      // console.log("Successfully renamed - AKA moved!");
    });
  }
  remove(path) {
    fs.unlink(path, (error) => {
      if (error) {
        res.status(500).send({
          error: {
            message: "Error remove file",
            reason: error,
          },
        });
      }
    });
  }
  saveTemponaryImageInDB(fileName) {
    const temponaryPhoto = new TemponaryPhotoModel({
      _id: new mongoose.Types.ObjectId(),
      fileName,
    });
    temponaryPhoto
      .save()
      .then((doc) => {
        return doc;
      })
      .catch((error) => {
        res.status(500).send({
          error: {
            message: "Error while insert temponary image to db",
            reason: error,
          },
        });
      });
  }
  async upload(pathDest, req, res) {
    let fileName = "";
    const storage = multer.diskStorage({
      destination: "./public/uploads/" + pathDest,
      filename: function (req, file, cb) {
        let extension = path.extname(path.extname(file.originalname));
        fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
      },
    });

    const uploadFile = multer({
      storage: storage,
      limits: { fileSize: 1000000 },
    }).single("photo");

    await uploadFile(req, res, (err) => {
      return fileName;
    });
  }
}

module.exports = FileService;
