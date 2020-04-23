import { userConstants } from "./../constants/user_constants";

let userLocal = localStorage.getItem("user");
let initialState = { loggedIn: false, user: {}, votes: {} };

if (userLocal) {
  let userJson = JSON.parse(userLocal);
  initialState = { loggedIn: true, user: userJson, votes: {} };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.FETCH_USER_VOTES:
      console.log("actionPayload", action.payload);
      return {
        ...state,
        votes: action.payload,
      };
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
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
