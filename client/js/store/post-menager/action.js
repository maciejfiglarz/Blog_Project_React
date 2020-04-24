import React from "react";
import postMenagerConstants from "./constants";
import postMenagerServices from "../../services/post-menager";
import alertActions from "../alert/action";
import { history } from "../../helper/history";

const loading = (bool) => {
  return {
    type: postMenagerConstants.CHECKING_DATA,
    isLoading: bool,
  };
};


const createPost = (params) => {
  return async (dispatch) => {
    dispatch(loading(true));
    dispatch(alertActions.clear());
    let { post, user } = params;
    const { type } = post;
    let validation = null;

    if (type == "post") {
      validation = postMenagerServices.validationPost(post);
    } else if (type == "link") {
    }

    console.log("validation_action", validation, validation.isValid);
    
    if (validation.isValid) {
      post = { ...post, type: "post" };
      const result = await postMenagerServices.insertPost({
        post,
        user,
      });
      const { data } = result;
      const { success, postId } = data;

      if (success) {
        // history.push(`/post/${postId}`);
      } else {
        console.log("coś poszło nie tak");
      }
    } else {
      dispatch(alertActions.error(validation.errors));
    }

    dispatch(loading(false));
  };
};

const postMenagerActions = {
  createPost,
};

export default postMenagerActions;
