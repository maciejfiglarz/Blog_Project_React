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

const login =  async (params) => {
  const result = await userServices.login(params);
  const {success,token,user} = result;

  console.log('result',result,success, userConstants.LOGIN_SUCCESS,);

  if(success){
    return { type: userConstants.LOGIN_SUCCESS, payload: {token,user} };
  }
};

const logout = () => {
  const url = `${BACKEND_URL}/index.php?model=logout`;
  axios.get(url);

  return { type: LOGIN_LOGOUT, payload: "request" };
};

export const userActions = {
  login,
  logout,
  register,
};
