import axios from "axios";
import { serverUrl } from "./../constants/types";
import { setCurrentUser } from "../actions/user_action";

const register = async (params) => {
  return axios.post(`${serverUrl}/user/register`, params);
};

const login = (params) => {
  return axios.post(`${serverUrl}/user/login`, params);
};

const logout = () => {
  localStorage.removeItem("user");
};

export const userServices = {
  login,
  logout,
  register,
};
