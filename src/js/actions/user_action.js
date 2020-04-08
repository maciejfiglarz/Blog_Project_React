import React from "react";
import { Redirect } from "react-router";

import alertActions from "./alert_action";

import { userConstants } from "../constants/user_constants";
import { alertConstants } from "../constants/user_constants";

import { userServices } from "../services/user_services";

import { history } from "../helper/history";

const register = (params) => {
  // const result = await userServices.register(data);

  // if (result.status) {
  //   return { type: userConstants.LOGIN_SUCCESS, payload: request };
  // }

  // return { type: userConstants.LOGIN_SUCCESS, payload: request };

  return (dispatch) => {
    userServices.register(params).then((result) => {
      const { data } = result;
      const { loggedUser, success } = data;
      console.log("dataRegister", data);
      if (success) {
        localStorage.setItem("user", JSON.stringify(loggedUser));
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          payload: data,
        });
        history.push("/");
      } else {
      }
    });
  };
};

const login = (params) => {
  return (dispatch) => {
    userServices.login(params).then((result) => {
      const { data } = result;
      const { loggedUser, success } = data;

      if (success) {
        localStorage.setItem("user", JSON.stringify(loggedUser));
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          payload: data,
        });
        history.push("/");
      } else {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
        });
        dispatch(alertActions.error(data.message.toString()));
      }
    });
  };
};

const logout = () => {
  userServices.logout();
  return (dispatch) => {
    dispatch({ type: userConstants.LOGIN_LOGOUT });
  };
};

export const userActions = {
  login,
  logout,
  register,
};
