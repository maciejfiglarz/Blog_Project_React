const express = require("express");
const router = express.Router();

const AdminUserController = require("../controllers/user");

// router.get("/all", PostController.all);


router.get('/:page', AdminUserController.fetch_all);

router.post('/update', AdminUserController.update);

module.exports = router;
