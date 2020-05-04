import commentConstants from "./constants";
import commentServices from "../../services/comment";
import Axios from "axios";

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

    // if (data.length > 0) {
    dispatch({
      type: commentConstants.CREATE_COMMENT,
      payload: data,
    });
    // }
    dispatch(creatorLoading(false));
  };
};



const fetchComments = (postId) => {
  return async (dispatch) => {
    dispatch(loading(true));

    const result = await commentServices.createComment(postId);
    const { data } = result;

    dispatch({
      type: commentConstants.COMMENTS_LOADED,
      payload: data,
    });

    dispatch(loading(false));
  };
};

const commentActions = {
  createComment,
  fetchComments,
};

export default commentActions;
