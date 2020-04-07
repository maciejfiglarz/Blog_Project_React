import { userConstants } from "./../constants/user_constants";

export default(state = {}, action) => {

    switch (action.type) {
        case userConstants.SET_CURRENT_USER:
            return action.payload;
        case userConstants.LOGIN_SUCCESS:
            return action.payload;
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
