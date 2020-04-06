const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment");

router.post("/", CommentController.create_comment);

router.get(
  "/pagination/page-:page/post-:postId",
  CommentController.pagination_comment
);

router.get("/destroy", CommentController.destroy_all);
router.get("/", CommentController.fetch_all);
module.exports = router;
