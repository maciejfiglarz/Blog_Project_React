const userModel = require("./../models/user");
const userSessionModel = require("./../models/user-session");
const FileServices = require("./../services/file");
const ValidationService = require("./validation");

class UserService {
  async findOneById(id) {
    return userModel.findById(id).select("-password");
  }
  async findOneByEmail(email) {
    const user = await userModel.find({ email });
    return user.length > 0 ? user : null;
  }
  async findOneByParams(params) {
    const user = await userModel.find(params);
    return user.length > 0 ? user : null;
  }

  async updateAvatarByToken(fileName, token) {
    const userSession = await userSessionModel
      .findOne({ _id: token })
      .populate("user")
      .exec();
    console.log("userSession", userSession.user);
    const { user } = userSession;
    const { avatar } = user;
    if (avatar) {
      const fileService = new FileServices();
      fileService.remove(`./public/uploads/avatar/${avatar}`);
    }

    let doc = await userModel.findOneAndUpdate(
      { _id: userSession.user._id },
      { avatar: fileName },
      {
        new: true,
      }
    );
    console.log("doc", userSession);
  }

  async isAuth(token) {
    return userSessionModel
      .findOne({ _id: token })
      .exec()
      .then((result) => {
        console.log("result.auth", result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async isValidLogin(params) {
    const { password } = params;
    let { email } = params;
    let errors = {};

    if (!email) {
      errors["loginError"] = "Musisz wpisać email";
    }

    if (!password) {
      errors["loginError"] = "Musisz wpisać hasło";
    }

    email = email.toLowerCase();
    let user = await this.findOneByEmail(email);
    console.log("user", user[0], userModel);
    if (password && user.length > 0) {
      user = user[0];
      if (!user.validPassword(password)) {
        errors["loginError"] = "Podany email lub hasło są nieprawidłowe";
      }
    } else {
      errors["loginError"] = "Podany email lub hasło są nieprawidłowe";
    }

    return {
      isValid: Object.keys(errors).length == 0 ? true : false,
      user,
      errors,
    };
  }

  async isValidRegister(params) {
    const { username, password, passwordConfirmation, email } = params;

    let errors = {};
    if (!username) {
      errors["registerUsername"] = "Musisz wybrać nazwę użytkownika";
    }

    const validationService = new ValidationService();

    if (!validationService.isEmail(email)) {
      errors["registerEmail"] = "Adres email jest nieprawidłowy";
    }

    if (!email) {
      errors["registerEmail"] = "Musisz podać email";
    }

    const user = await this.findOneByEmail(email);

    if (user) {
      errors["registerEmail"] = "Podany email jest zajęty";
    }

    if (password !== passwordConfirmation) {
      errors["registerPassword"] = "Hasła są różne";
    }
    if (!password) {
      errors["registerPassword"] = "Musisz wpisać hasło";
    }

    return {
      isValid: Object.keys(errors).length == 0 ? true : false,
      user,
      errors,
    };
  }
  async insertUser(params) {
    const { username, password, email } = params;

    const user = new userModel();
    user.email = email;
    user.username = username;
    user.password = user.generateHash(password);

    return await user.save();
  }
  async insertUserSession(params) {
    const { _id } = params;

    const userSession = new userSessionModel();
    userSession.user = _id;

    return userSession.save();
  }
}

module.exports = UserService;
