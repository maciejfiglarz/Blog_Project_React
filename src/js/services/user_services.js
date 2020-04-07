import axios from "axios";
import { serverUrl } from "./../constants/types";
import { setCurrentUser } from "./../actions/users_action";

const register = async (params) => {

  let res = await axios.post(`${serverUrl}/user/register`, params);
  let { data } = res;
  console.log("bbb", data);
  return data ;

};

const login = (params) => {

  return axios.post(`${serverUrl}/user/login`, params);
  // let { data } = res;
  // console.log('data',data);
  // return data ;

  // const { email, password } = data;
  // //sefsefse@w.pl
  // //xx
  // await axios
  //   .post(`${serverUrl}/user/login`, {
  //     email: email,
  //     password: password,
  //   })
  //   .then((resp) => {
  //     console.log("login", resp);
  //     const { status, user } = resp.data;
  //     // status ? setCurrentUser(user) : "";
  //   });

  // //   console.log("request", request);
  // //   setCurrentUser(request);
};

const logout =() => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

export const userServices = {
  login,
  logout,
  register,
};
