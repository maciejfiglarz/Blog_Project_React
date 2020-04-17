const jwt = require("jsonwebtoken");
const UserService = require("./../services/user");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  // const token = 'toekn';
  console.log("token", token);
  const userService = new UserService();
  const isAuth = await userService.isAuth(token);
  
  console.log("isAuth ", isAuth );

  if(isAuth){
    return true;
  }
  return false;

  // try {

  //   // const decoded = jwt.verify(token, process.env.JWT_KEY);
  //   // req.userData = decoded;
  //   next();
  // } catch (error) {
  //   return res.status(401).json({
  //     message: "Auth failed",
  //   });
  // }
};
