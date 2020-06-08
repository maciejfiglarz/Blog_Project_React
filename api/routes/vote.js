const express = require("express");
const router = express.Router();

const VoteController = require("../controllers/vote");

const checkAuth = require('./../middleware/check-auth');

router.post("/", VoteController.vote);

router.post("/prepare-for-user",  VoteController.prepare_for_user);

router.get("/destroy",VoteController.destroy_all);

module.exports = router;