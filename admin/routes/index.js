const express = require("express");
const router = express.Router();

const AdminIndexController = require("../controllers/index");


router.get('/', AdminIndexController.index);

module.exports = router;
