import axios from 'axios'
import {BACKEND_URL} from './../constants/types'
import{setCurrentUser} from './../actions/users_action'

const ROOT_URL = 'http://localhost:80/Redux_PHP/src/server';


export const userRegister = async(data) => {
    console.log('data', data);
    const {username, email, password} = data;
    const url = `${ROOT_URL}/index.php?model=register`;
    const request = axios.post(url, {
        'username': username,
        'email': email,
        'password': password
    });
    request.then(function (response) {
        console.log(response);
        return true;
    })
        .catch(function (error) {
            // console.log(error);
            return false;
        });
}

export const login = async (data) => {
    const url = `${BACKEND_URL}/index.php?model=login`;
    const {email, password} = data;

    const request = await axios.post(url, {
        'email': email,
        'password': password
    });
    console.log('request', request);
    setCurrentUser(request);
}
