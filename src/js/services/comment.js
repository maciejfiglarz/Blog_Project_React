import API from "./../helper/api";

const createComment = async (params) => {
  const { user } = params;
  const config = {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  };
  return API.post(`/comment/create`, params, config);
};

const fetchComments = async (params) => {
  return API.post(`/comment/fetch-comments`, params);
};

const getTotalPages = async (postId) => {
  return API.get(`/comment/total-pages/${postId}`);
};

const commentServices = {
  createComment,
  fetchComments,
  getTotalPages,
};

export default commentServices;
