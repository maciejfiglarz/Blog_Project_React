import React from "react";
import { Redirect } from "react-router";

import alertActions from "./alert_action";

import { postConstants } from "../constants/post_constants";
import { alertConstants } from "../constants/user_constants";

import { postServices } from "../services/user_services";

import { history } from "../helper/history";

const fetchPagination = (params) => {

  return (dispatch) => {
    postServices.register(params).then((result) => {
      const { data } = result;
      const { loggedUser, success } = data;
      console.log('dataReg',data);
      if (success) {
      
      } else {
        // dispatch(alertActions.error(data.message.toString()));
      }
    });
  };
};
