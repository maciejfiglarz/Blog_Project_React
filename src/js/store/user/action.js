
import alertActions from "./../alert/action";

import  userConstants  from "./constants";
import  userServices  from "./../../services/user_services";

import { history } from "./../../helper/history";

import voteService from "./../../services/vote_service";

const register = (params) => {
  return (dispatch) => {
    userServices.register(params).then((result) => {
      const { data } = result;
      const { loggedUser, success } = data;

      if (success) {
        localStorage.setItem("user", JSON.stringify(loggedUser));
        dispatch({
          type: userConstants.LOGIN_SUCCESS,
          payload: data,
        });
        history.push(`/profil/${loggedUser.id}`);
      } else {
        dispatch(alertActions.error(data.message.toString()));
      }
    });
  };
};

const login = (params) => {
  return (dispatch) => {
    userServices.login(params).then((result) => {
      const { data } = result;
      const { loggedUser, success } = data;
      console.log('loggedUser');
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

const userActions = {
  login,
  logout,
  register,
};

export default userActions;