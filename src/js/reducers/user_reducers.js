import { userConstants } from "./../constants/user_constants";


export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return { loggedIn: true, user: action.user };
    case userConstants.LOGIN_FAILURE:
      return { loggedIn: false, user: {} };
    case userConstants.LOGIN_LOGOUT:
      return {
        loggingIn: false,
        user: {},
      };
  }
  return state;
};
