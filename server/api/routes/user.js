const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

router.post("/", (req, res) => {
  const user = new User({
    _id: { type: mongoose.Types.ObjectId, require: true },
    quantity: { type: Number, default: 1 }
  });
  user
    .save()
    .exec()
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  req.statusCode(200).json({ user });
});

module.exports = router;
