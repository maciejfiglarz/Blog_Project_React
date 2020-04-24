const express = require("express");
const router = express.Router();
const PostMenagerController = require("../controllers/post-menager");

router.get("/create-graphic", PostMenagerController.create_graphic);

router.post("/insert-post", PostMenagerController.insert_post);

router.post("/get-link-data", PostMenagerController.get_link_data);

router.post("/photo-temponary", PostMenagerController.upload_photo_temponary);

router.post(
  "/photo-temponary/remove",
  PostMenagerController.remove_photo_temponary
);

// router.post("/photo-temponary/remove", (req, res) => {
//   const photo = req.body.photo;
//   const path = "./public/uploads/post-temponary/" + photo;
//   console.log("remove");
//   fs.unlink(path, err => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//   });
// });

module.exports = router;
