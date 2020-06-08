const userModel = require("../../api/models/user");

exports.pagination = (page, perPage, params = null) => {
  if (params) {
    console.log("params", params);
  }
  return (
    userModel
      .find({})
      // .select("createdAt _id title description")
      .limit(perPage)
      // .skip(perPage * page)
      .sort({
        _id: "desc",
      })
      // .sort("-createdAt")koleg
      .exec()
      .then((result) => {
        return result;
      })
  );
};


