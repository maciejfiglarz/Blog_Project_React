const userSessionModel = require("./../models/userSession");

class UserService {
  async findOneById(id) {
    return userModel.findById(id);
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
}

module.exports = UserService;
