const express = require("express");
const router = express.Router();

const AdminPostController = require("../controllers/post");

// router.get("/all", PostController.all);


router.get('/:page', AdminPostController.fetch_all);

router.post('/update', AdminPostController.update);

module.exports = router;
