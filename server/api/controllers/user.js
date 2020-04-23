const mongoose = require("mongoose");

const User = require("./../models/user");
const UserSession = require("../models/user-session");



exports.login = async (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Musisz podać email i hasło",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Musisz podać email i hasło",
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
          message: "Błąd serwera. Spróbuj ponownie.",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Podane email lub hasło są niepoprawne",
        });
      }

      const user = users[0];

      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Podane email lub hasło są niepoprawne",
        });
      }

      let userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Błąd serwera. Spróbuj ponownie.",
          });
        }

        return res.send({
          success: true,
          message: "OK!",
          loggedUser: { id: user._id, username: user.username, token: doc._id },
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
      message: "Musisz wybrać nazwę użytkownika",
    });
  }

  if (!email) {
    return res.send({
      success: false,
      message: "Musisz podać email",
    });
  }


  let reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (!reg.test(email)) {
    return res.send({
      success: false,
      message: "Adres email jest nieprawidłowy",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Musisz wpisać hasło",
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

      let userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Błąd serwera. Spróbuj ponownie.",
          });
        }

        return res.send({
          success: true,
          message: "wszystko OK!",
          loggedUser: { id: user._id, username: user.username, token: doc._id },
        });
      });

      // return res.send({
      //   success: true,
      //   message: "Udało się!",
      //   user: user,
      // });
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
