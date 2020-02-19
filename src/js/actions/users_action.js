import axios from 'axios';
import {BACKEND_URL} from '../constants/types'

export const LOGIN_SUCCES = "login_succes";
export const LOGIN_LOGOUT = "login_logout";
export const SET_CURRENT_USER = "set_current_iser";

export const setCurrentUser = (data) => {
// console.log('setCurrentUser',data);
return {type: SET_CURRENT_USER, payload: data}
}

export const login = (data) => {
    const url = `${BACKEND_URL}/index.php?model=login`;
    const {email, password} = data;

    const request = axios.post(url, {
        'email': email,
        'password': password
    });
    console.log('request', request);
    return {type: LOGIN_SUCCES, payload: request}

}

export const logout = () => {
    const url = `${BACKEND_URL}/index.php?model=logout`;
    axios.get(url); 

    return {type: LOGIN_LOGOUT, payload: 'request'}
}
