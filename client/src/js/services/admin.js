const paginationPost = async (params) => {
  return API.post(`/post/pagination`, params);
};

const adminServices = {
  paginationPost,
};

export default adminServices;
