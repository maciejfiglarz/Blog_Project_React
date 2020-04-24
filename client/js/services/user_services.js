import API from "../helper/api";


const register = async (params) => {
  return API.post(`/user/register`, params);
};

const login = (params) => {
  return API.post(`/user/login`, params);
};

const logout = () => {
  localStorage.removeItem("user");
};

export const userServices = {
  login,
  logout,
  register,
};
