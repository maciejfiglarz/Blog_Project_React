const User = require("./../models/user");
const UserSession = require("../models/user-session");
const UserService = require("./../services/user");
const multer = require("multer");
const path = require("path");

exports.update_avatar = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  let fileName = "";
  const storage = multer.diskStorage({
    destination: "./public/uploads/avatar",
    filename: function (req, file, cb) {
      extension = path.extname(path.extname(file.originalname));
      fileName = "IMAGE-" + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
  }).single("avatarFile");

  await upload(req, res, (err) => {
    const userService = new UserService();
    userService.updateAvatarByToken(fileName, token);
    res.status(200).json({ fileName });
  });
};

exports.fetch_by_id = async (req, res, next) => {
  const { body } = req;
  const { id } = body;
  const userService = new UserService();
  const response = await userService.findOneById(id);

  res.status(200).json(response);
};

exports.login = async (req, res, next) => {
  const { body } = req;

  const userService = new UserService();
  const validation = await userService.isValidLogin(body);
  const { isValid, errors, user } = validation;

  if (isValid) {
    const userSession = await userService.insertUserSession(user);
    return res.send({
      success: true,
      loggedUser: {
        id: user._id,
        username: user.username,
        token: userSession._id,
      },
    });
  } else {
    return res.send({
      success: false,
      errors: errors,
    });
  }
};

exports.register = async (req, res, next) => {
  const { body } = req;

  const userService = new UserService();

  const validation = await userService.isValidRegister(body);
  const { isValid, errors } = validation;
  let { user } = validation;
  console.log("userRegister", user,isValid, errors);
  if (isValid) {
    if (!user) {
      user = await userService.insertUser(body);
    }
    const userSession = await userService.insertUserSession(user);
    return res.send({
      success: true,
      loggedUser: {
        id: user._id,
        username: user.username,
        token: userSession._id,
      },
    });
  } else {
    return res.send({
      success: false,
      errors: errors,
    });
  }
};

exports.fetch_all = (req, res, next) => {
  User.find()
    // .select("title content _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        posts: docs.map((doc) => {
          return {
            user: doc,
            request: {
              type: "GET",
              url: `${global.baseUrl}/post/${doc._id}`,
            },
          };
        }),
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
