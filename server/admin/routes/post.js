const express = require("express");
const router = express.Router();

const AdminPostController = require("../controllers/post");

// router.get("/all", PostController.all);


router.get('/', AdminPostController.fetch_all);

module.exports = router;
