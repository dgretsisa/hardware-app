import { Types } from "../types/auth.types";
import AuthAPI from '../../axios/services/auth.service';
import API from '../../axios/config/axios.config';
import * as notification from './notification.action';

const loginRequest = (credentials) => {
    return {
        type: Types.LOGIN_REQUEST,
        payload: { credentials }
    }
}

const loginSuccess = (user, token) => {
    return {
        type: Types.LOGIN_SUCCESS,
        payload: { user, token }
    }
}

const loginFailed = () => {
    return {
        type: Types.LOGIN_FAILED
    }
}

/** Dispatcher Functions */

export const login = (credentials) => (dispatch) => {
    dispatch(loginRequest(credentials));

    return new Promise((resolve, reject) => {
        AuthAPI.login(credentials)
            .then(({data}) => {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));

                /** Just setting the api headers with token after login */
                API.defaults.headers.authorization = JSON.parse(localStorage.getItem("token"));

                dispatch(loginSuccess(data.user, data.token));
                dispatch(notification.clearLogs());
                resolve(data);
            })
            .catch((error) => {
                dispatch(loginFailed());

                const generalErrors = {
                    status: error.response.status,
                    message: error.response.statusText
                };
                
                if(error.response.status === 422) {
                    dispatch(notification.assignValidationError(error.response.data.errors));
                }
                else {
                    dispatch(notification.assignGeneralError(generalErrors));
                }

                reject(error.response.data.errors);
            });
    });
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch({ type: Types.LOGOUT });
}