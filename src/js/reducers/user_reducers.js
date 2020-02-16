import {LOGIN_SUCCES, LOGIN_LOGOUT, SET_CURRENT_USER} from '../actions/users_action';

export default(state = {}, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return action.payload.data;
        case LOGIN_SUCCES:
            return action.payload.data;
        case LOGIN_SUCCES:
            return action.payload.data;
        case LOGIN_LOGOUT:
            return Object.assign({}, state, {
                userId: false,
                userEmail: false,
                userUsername: false,
                userAvatar:false,
            })
    }
    return state;
}
