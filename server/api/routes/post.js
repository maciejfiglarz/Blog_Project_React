const express = require("express");
const router = express.Router();
const multer = require("multer");

const PostController = require("../controllers/post");


router.get("/destroy",PostController.destroy_all);
exports.destroy_all = (req, res, next) => {
    Post.deleteMany({}, function(err) {
      if (err) {
        console.log(err);
      } else {
        res.end("success");
      }
    });
  };

router.post("/photo-temponary", PostController.upload_photo_temponary);

router.get("/", PostController.fetch_all);

router.get("/:postId", PostController.get_post);

router.post("/", PostController.create_post);

router.get("/pagination/page-:page", PostController.pagination_post);

router.post("/link",PostController.get_link_info);



// router.patch("/:postId", PostController.post_update);

// router.delete("/:postId", PostController.post_delete);

































// router.patch("/:postId", (req, res) => {
//   //titleNew contentNew
//   const id = req.params.postId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[updateOps] = ops;
//   }
//   Post.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         title: result.title,
//         content: result.content,
//         _id: result._id,
//         request: {
//           type: "GET",
//           url: "http://localhost:5000/products/" + result._id
//         }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.get("/", (req, res) => {
//   Post.find()
//     .select("title content _id")
//     .exec()
//     .then(docs => {
//       console.log(docs);
//       const response = {
//         count: docs.length,
//         products: docs.map(doc => {
//           console.log("doc", doc);
//           return {
//             title: doc.title,
//             content: doc.content,
//             _id: doc._id,
//             request: {
//               type: "GET",
//               url: "http://localhost:5000/products/" + doc._id
//             }
//           };
//         })
//       };
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       res.status(500).json({ error: err });
//     });
// });

// router.delete("/:postId", (req, res) => {
//   const id = req.params.postId;
//   Post.deleteOne({ _id: id })
//     .exec()
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// router.post("/insert", (req, res) => {
//   console.log("body", req.body);
//   const post = new Post({
//     _id: mongoose.Types.ObjectId(),
//     title: req.body.title,
//     content: req.body.content
//   });

//   post
//     .save()
//     .then(response => console.log(response))
//     .catch(err => console.log(err));

//   res.status(201).json({
//     message: "post correct",
//     post: post,
//     body: req.body
//   });
// });

// router.get("/:postId", (req, res) => {
//   const id = req.params.postId;
//   Post.findById(id)
//     .exec()
//     .then(doc => {
//       console.log(doc);
//       if (doc) {
//         res.status(200).json(doc);
//       } else {
//         res.status(500).json({ message: "Not found post" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });

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

// router.post("/photo-temponary", async (req, res) => {
//   let fileName = "";

//   const storage = multer.diskStorage({
//     destination: "./public/uploads/post-temponary",
//     filename: function(req, file, cb) {
//       extension = path.extname(path.extname(file.originalname));
//       fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
//       cb(null, fileName);
//     }
//   });

//   const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }
//   }).single("photo");

//   await upload(req, res, err => {
//     console.log("Request ---", req.body);
//     console.log("Request file ---", req.file); //Here you get file.

//     if (!err) {
//       const db = req.app.get("db")();
//       const item = {
//         fileName: fileName
//       };
//       // db.collection("photo-temponary").insertOne(item, (err, result) => {

//       //   if (err) return console.log(err);
//       //   console.log("saved to database", result);
//       //   const insertedId = result.insertedId;

//       //   let extension = path.extname(
//       //     "./public/uploads/post-temponary/" + fileName
//       //   );
//       //   console.log('extension',extension);
//       //   fs.rename(
//       //     "./public/uploads/post-temponary/" + fileName,
//       //     "./public/uploads/post-temponary/" + insertedId + extension,
//       //     function(err) {
//       //       if (err) console.log("ERROR: " + err);
//       //     }
//       //   );

//       //   res.setHeader("Content-Type", "application/json");
//       //   res.end(JSON.stringify({ fileName: insertedId + extension }));
//       // });

//       res.setHeader("Content-Type", "application/json");
//       res.end(JSON.stringify({ fileName: fileName }));
//     }
//   });
// });

// router.post("/delete", function(req, res, next) {
//   const id = req.body.id;
//   const db = req.app.get("db")();

//   db.collection("lights").deleteOne({ _id: ObjectID(id) });

//   res.send("OK");
// });

// router.post("/update", (req, res, next) => {
//   const item = {
//     value: req.body.value,
//     label: req.body.label,
//     port: req.body.port,
//     host: req.body.host
//   };
//   const id = req.body.id;
//   const db = req.app.get("db")();

//   db.collection("lights").updateOne({ _id: ObjectID(id) }, { $set: item });
//   res.send("OK");
// });

// router.post("/insert", (req, res, next) => {
//   const item = {
//     value: req.body.value,
//     label: req.body.label,
//     port: req.body.port,
//     host: req.body.host
//   };

//   const db = req.app.get("db")();

//   db.collection("lights").insertOne(item, (err, result) => {
//     if (err) return console.log(err);
//     console.log("saved to database");
//   });
//   res.send("OK");
// });

// router.get("/fetch-all", (req, res, next) => {
//   res.setHeader("Content-Type", "application/json");

//   const db = req.app.get("db")();
//   const data = db.collection("lights").find();

//   let resultArray = [];
//   data.forEach(
//     function(doc, err) {
//       assert.equal(null, err);
//       resultArray.push(doc);
//     },
//     () => {
//       res.end(JSON.stringify(resultArray));
//     }
//   );
// });

module.exports = router;
