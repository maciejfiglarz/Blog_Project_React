import { userConstants } from "./../constants/user_constants";

export default(state = {}, action) => {
console.log('ACTIVE');
    switch (action.type) {
        case userConstants.SET_CURRENT_USER:
            return action.payload.data;
        case userConstants.LOGIN_SUCCESS:
            console.log('payload',payload);
            return action.payload.data;
        case userConstants.LOGIN_LOGOUT:
            return Object.assign({}, state, {
                userId: false,
                userEmail: false,
                userUsername: false,
                userAvatar:false,
            })
    }
    return state;
}
