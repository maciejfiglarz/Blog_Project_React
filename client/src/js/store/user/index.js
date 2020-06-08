import userConstants from "./constants";

let userLocal = localStorage.getItem("user");
let initialState = {
  isLogged: false,
};

if (userLocal) {
  let userJson = JSON.parse(userLocal);
  const { token, id, username } = userJson;
  initialState = { isLogged: true, token, id, username, votes: {} };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return { isLogged: true, ...action.payload };
    case userConstants.LOGIN_FAILURE:
      return { loggedIn: false, user: {} };
    case userConstants.FETCH_USER_VOTES:
      return {
        ...state,
        votes: action.payload,
      };
    case userConstants.UPDATE_USER_AVATAR:
      return {
        ...state,
        avatar: action.payload,
      };
    case userConstants.LOGIN_LOGOUT:
      return {
        loggingIn: false,
        user: {},
      };
  }
  return state;
};
