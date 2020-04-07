const mongoose = require("mongoose");

const User = require("./../models/user");
const UserSession = require("./../models/userSession");

exports.login = async (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email name cannot be blank.",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password name cannot be blank.",
    });
  }

  email = email.toLowerCase();

  User.find(
    {
      email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error #0.",
        });
      }
      console.log("users", users);
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid1",
        });
      }

      const user = users[0];

      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid2",
        });
      }

      let userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error #1.",
          });
        }

        return res.send({
          success: true,
          message: "Valid sign in.",
          loggedUser: { username: user.username, token:  doc._id },
        });
      });
    }
  );
};

exports.register = async (req, res, next) => {
  const { body } = req;
  const { username, password, passwordConfirmation } = body;
  let { email } = body;

  if (!username) {
    return res.send({
      success: false,
      message: "Puste pole username",
    });
  }

  if (!email) {
    return res.send({
      success: false,
      message: "Pusty adres email",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Puste hasło",
    });
  }

  if (password !== passwordConfirmation) {
    return res.send({
      success: false,
      message: "Hasła są różne",
    });
  }

  email = email.toLowerCase();

  await User.find({ email }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: "Błąd serwera.",
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: "Ten email jest zajęty.",
      });
    }

    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: "Błąd serwera.",
        });
      }
      return res.send({
        success: true,
        message: "Udało się!",
        user: user,
      });
    });
  });
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
