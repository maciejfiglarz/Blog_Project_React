import React from "react";
import alertActions from "./alert_action";

import { userConstants } from "../constants/user_constants";
import { userServices } from "../services/user_services";


import voteService from "./../services/vote_service";

const setInitialData = (user) => {
  return (dispatch) => {

    voteService
      .prepareVotesForUser(user)
      .then((result) => {
        const { data } = result;
        console.log("data", data);
        dispatch({
          type: userConstants.FETCH_USER_VOTES,
          payload: data,
        });
      })
      .catch((error) => {
        console.log('error',error);
      });
  };
};

const userActions = {
    login,
    logout,
    register,
    setInitialData,
  };
  
  export default userActions;