const path = require("path");
const multer = require("multer");

const upload = (fieldname, url,req) => {

  const storage = multer.diskStorage({
    destination: "./public/uploads/post-temponary",
    filename: function(req, file, cb) {
      cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
  });

  const prepareUpload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }
  }).single("photo");
};

module.exports = upload;
