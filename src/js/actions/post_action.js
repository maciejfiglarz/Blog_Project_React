import React from "react";
import { Redirect } from "react-router";

import { postConstants } from "../constants/post_constants";

import postServices from "../services/post_services";

const fetchedSuccess = (items) => {
  return {
    type: postConstants.POSTS_FETCH_SUCCESS,
    items,
  };
};

const loading = (bool) => {
  return {
    type: postConstants.POSTS_ARE_LOADING,
    isLoading: bool,
  };
};

const pagination = (page) => {
  return (dispatch) => {
    dispatch(loading(true));
    postServices.pagination({ page }).then((result) => {
      dispatch(loading(false));
      const { data } = result;
      // if (data.length > 0) {
      dispatch({
        type: postConstants.POSTS_FETCH_SUCCES,
        payload: data,
      });
      // }
    });
  };
};

const userActions = {
  pagination,
};

export default userActions;
