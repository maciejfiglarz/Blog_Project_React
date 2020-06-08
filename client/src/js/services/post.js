import API from "./../helper/api";

const pagination = async (params) => {
  return API.post(`/post/pagination`, params);
};

const fetchOneById = async (params) => {
  return API.post(`/post/fetch-one-by-id`, params);
};



const postServices = {
  pagination,
  fetchOneById  
};

export default postServices;