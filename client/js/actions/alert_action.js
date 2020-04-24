import { alertConstants } from '../constants/alert_constants';


const success = (message) => {
    return { type: alertConstants.SUCCESS, message };
}

const error = (message) => {
    return { type: alertConstants.ERROR, message };
}

const clear = () => {
    return { type: alertConstants.CLEAR };
}


export const alertActions = {
    success,
    error,
    clear
};



export default alertActions;