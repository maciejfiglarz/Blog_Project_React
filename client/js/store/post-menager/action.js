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
    } else if (type == "graphic") {
      validation = postMenagerServices.validationGraphic(post);
    } else if (type == "link"){
      validation = postMenagerServices.validationLink(post);
    }

    console.log("validation_action", validation, validation.isValid);
    
    if (validation.isValid) {
      const result = await postMenagerServices.insertPost({
        post,
        user,
      });
      const { data } = result;
      const { success, postId } = data;
      console.log('successPost',success);
      if (success) {
        // history.push(`/post/${postId}`);
        console.log("post dodany");
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
