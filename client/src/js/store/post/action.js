import React from "react";
import { Redirect } from "react-router";

import postConstants from "./constants";
import postServices from "../../services/post";
import postMenagerServices from "../../services/post-menager";

import alertActions from "../alert/action";

import { Message } from "../../containers/message";

const loading = (bool) => {
  return {
    type: postConstants.POSTS_ARE_LOADING,
    isLoading: bool,
  };
};

const pagination = (page, params = {}) => {
  return async (dispatch) => {
    dispatch(loading(true));
    const result = await postServices.pagination({ page, params });
    const { data } = result;

    // if (data.length > 0) {
    dispatch({
      type: postConstants.POSTS_FETCH_SUCCESS,
      payload: data,
      page,
    });
    // }
    dispatch(loading(false));
  };
};


const postActions = {
  pagination,
};

export default postActions;
