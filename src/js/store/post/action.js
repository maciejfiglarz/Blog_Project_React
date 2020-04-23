import React from "react";
import { Redirect } from "react-router";

import postConstants from "./constants";
import postServices from "./../../services/post_services";
import postMenagerServices from "./../../services/post-menager";

import alertActions from "./../alert/action";

import { Message } from "./../../containers/message";

const loading = (bool) => {
  return {
    type: postConstants.POSTS_ARE_LOADING,
    isLoading: bool,
  };
};

const create = (params) => {
  return async (dispatch) => {
    dispatch(loading(true));
    const validation = postMenagerServices.validation(params);
    console.log("validation_action", validation,validation.isValid);

    if (validation.isValid) {
      
    } else {
      console.log('dispatch');
      dispatch(alertActions.error(validation.errors));
    }
  };
};

const pagination = (page) => {
  return (dispatch) => {
    console.log("constants", postConstants);
    dispatch(loading(true));
    postServices.pagination({ page }).then((result) => {
      dispatch(loading(false));
      const { data } = result;
      console.log("dataxxx", data);
      // if (data.length > 0) {
      dispatch({
        type: postConstants.POSTS_FETCH_SUCCESS,
        payload: data,
      });
      // }
    });
  };
};

const postActions = {
  pagination,
  create,
};

export default postActions;
