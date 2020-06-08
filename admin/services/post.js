const postModel = require("./../../api/models/post");

exports.pagination = (page, perPage, params = null) => {
  if (params) {
    console.log("params", params);
  }
  return (
    postModel
      .find({})
      // .select("createdAt _id title description")
      .populate("user")
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


