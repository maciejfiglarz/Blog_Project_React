const paginationPost = async (params) => {
  return API.post(`/post/pagination`, params)
    .then((doc) => {
      return doc;
    })
    .catch((error) => {
      res.status(500).send({
        error: {
          message: "Error pagination",
          reason: error,
        },
      });
    });
};

const adminServices = {
  paginationPost,
};

export default adminServices;
