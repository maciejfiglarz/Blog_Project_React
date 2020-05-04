import API from "./../helper/api";

const createComment = async (params) => {
  return API.post(`/comment/create`, params);
};

const fetchComments = async (params) => {
  return API.post(`/comment/fetch-comments`, params);
};

const commentServices = {
  createComment,
  fetchComments
};


export default commentServices;