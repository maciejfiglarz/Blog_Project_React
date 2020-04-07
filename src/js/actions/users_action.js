import axios from "axios";

import { userConstants } from "./../constants/user_constants";

import { userServices } from "./../services/user_services";

const setCurrentUser = (data) => {
  return { type: SET_CURRENT_USER, payload: data };
};

const register = async (params) => {
  const result = await userServices.register(data);

  if (result.status) {
    return { type: userConstants.LOGIN_SUCCESS, payload: request };
  }

  return { type: userConstants.LOGIN_SUCCESS, payload: request };
};

const login = (params) => {
  return (dispatch) => {
    const { email, password } = params;
    userServices.login(params).then((result) => {
      const { data } = result;
      const { loggedUser } = data;
      console.log("data", data);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      console.log("fn", userConstants.LOGIN_SUCCESS);
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        payload: data,
      });
    });
  };
};

// const login = async (params) => {
//   const result = await userServices.login(params);
//   const { success, token, user } = result;

//   return { type: userConstants.LOGIN_SUCCESS, payload: { token, user } };
// };

const logout = () => {
  userServices.logout();
  return { type: userConstants.LOGOUT };
};

export const userActions = {
  login,
  logout,
  register,
};
