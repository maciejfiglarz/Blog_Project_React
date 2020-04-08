import { userConstants } from "./../constants/user_constants";

console.log("userinit", localStorage.getItem("user"));
let userLocal = localStorage.getItem("user");
let initialState = { loggedIn: false, user: {} };

if (userLocal && userLocal != undefined && userLocal != "undefined") {
  let userJson = JSON.parse(userLocal);
  console.log("userJson", userJson);
  initialState = { loggedIn: true, user: userJson };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return { loggedIn: false, user: {} };
    case userConstants.LOGIN_LOGOUT:
      return {
        loggingIn: false,
        user: {},
      };
    default:
      return state;
  }
};
