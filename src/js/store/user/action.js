import alertActions from "./../alert/action";

import userConstants from "./constants";
import userServices from "./../../services/user";

import { history } from "./../../helper/history";

const updateAvatar = (params, user) => {
  return async (dispatch) => {
    const { data } = await userServices.updateAvatar(params, user);
    const { fileName } = data;
    console.log("fileName", fileName);
    if (fileName) {
      dispatch({
        type: userConstants.UPDATE_USER_AVATAR,
        payload: fileName,
      });
    }
  };
};

const register = (params) => {
  return async (dispatch) => {
    const result = await userServices.register(params);
    const { data } = result;
    const { loggedUser, success, errors } = data;
    if (success) {
      localStorage.setItem("user", JSON.stringify(loggedUser));
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        payload: data,
      });
      history.push(`/profil/${loggedUser.id}`);
    } else {
      dispatch(alertActions.error(errors));
    }
  };
};

const login = (params) => {
  return async (dispatch) => {
    const result = await userServices.login(params);
    const { type } = params;
    const { data } = result;
    const { loggedUser, success, errors } = data;
    console.log("loggedUser", data);
    if (success) {
      localStorage.setItem("user", JSON.stringify(loggedUser));
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        payload: loggedUser,
      });
      history.push("/");
    } else {
      dispatch({
        type: userConstants.LOGIN_FAILURE,
      });
      if (type == "header") {
        return errors;
      } else {
        dispatch(alertActions.error(errors));
      }
    }
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
  updateAvatar,
};

export default userActions;
