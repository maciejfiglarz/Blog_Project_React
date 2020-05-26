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

const fetchById = async (id) => {
  return API.post(`/user/fetch-by-id`, id);
};

const updateAvatar = async (data, user) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Bearer " + user.token,
    },
  };

  return API.post(`/user/update-avatar`, data, config);
};

const getAvatar = (user) => {

}

const userServices = {
  login,
  logout,
  register,
  fetchById,
  updateAvatar,
};

export default userServices;
