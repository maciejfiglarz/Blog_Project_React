const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const assert = require("assert");
const path = require("path");
const multer = require("multer");

// const upload = require('./../helper/upload');

router.get("/post-temponary/:fileName", async (req, res) => {
  const fileName = req.params.fileName;

  await res.sendFile(
    path.join(__dirname, `../../public/uploads/post-temponary/${fileName}`)
  );
});

router.get("/post/:fileName", async (req, res) => {
  const fileName = req.params.fileName;
  if(fileName)
  await res.sendFile(
    path.join(__dirname, `../../public/uploads/post/${fileName}`)
  );
});

router.get("/graphic/:fileName", async (req, res) => {
  const fileName = req.params.fileName;
  
  await res.sendFile(
    path.join(__dirname, `../../public/uploads/graphic/${fileName}`)
  );
});




router.get("/avatar/:fileName", async (req, res) => {
  const fileName = req.params.fileName;

  await res.sendFile(
    path.join(__dirname, `../../public/uploads/avatar/${fileName}`)
  );
});

module.exports = router;
