import commentConstants from "./constants";
import commentServices from "../../services/comment";

const creatorLoading = (bool) => {
  return {
    type: commentConstants.CREATE_COMMENT_LOADING,
    isLoading: bool,
  };
};
const loading = (bool) => {
  return {
    type: commentConstants.COMMENTS_ARE_LOADING,
    isLoading: bool,
  };
};

const createComment = (params) => {
  return async (dispatch) => {
    dispatch(creatorLoading(true));

    const result = await commentServices.createComment(params);
    const { data } = result;
    const { comment } = data;
    dispatch({
      type: commentConstants.CREATE_COMMENT,
      payload: comment,
    });
    dispatch(creatorLoading(false));
  };
};

const fetchComments = (params) => {
  const { page } = params;

  return async (dispatch) => {
    dispatch(loading(true));

    const { data } = await commentServices.fetchComments(params);
    const { mainComments, responseComments } = data;
    dispatch({
      type: commentConstants.COMMENTS_LOADED,
      payload: {
        newMainComments: mainComments,
        newResponseComments: responseComments,
        page,
      },
    });

    dispatch(loading(false));
  };
};

const commentActions = {
  createComment,
  fetchComments,
};

export default commentActions;
