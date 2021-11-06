import { Types } from '../types/user.types';
import UserAPI from '../../axios/services/user.service';
import * as modal from './modal.action';
import * as notification from './notification.action';

/** Action Functions */

const createUserRequest = (resource) => {
    return {
        type: Types.CREATE_USER_REQUEST,
        payload: { resource }
    }
}

const createUserSuccess = (user) => {
    return {
        type: Types.CREATE_USER_SUCCESS,
        payload: { user }
    }
}

const createUserFailed = () => {
    return {
        type: Types.CREATE_USER_FAILED
    }
}

const fetchUserRequest = () => {
    return {
        type: Types.FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: Types.FETCH_USER_SUCCESS,
        payload: { users }
    }
}

const fetchUserFailed = () => {
    return {
        type: Types.FETCH_USER_FAILED
    }
}

const assignSelectedUser = (user) => {
    return {
        type: Types.ASSIGN_SELECTED_USER,
        payload: { user }
    }
}

const updateUserRequest = (resource) => {
    return {
        type: Types.UPDATE_USER_REQUEST,
        payload: { resource }
    }
}

const updateUserSuccess = (id, user) => {
    return {
        type: Types.UPDATE_USER_SUCCESS,
        payload: { id, user }
    }
}

const updateUserFailed = () => {
    return {
        type: Types.UPDATE_USER_FAILED
    }
}

const deleteUserRequest = (id) => {
    return {
        type: Types.DELETE_USER_REQUEST,
        payload: { id }
    }
}

const deleteUserSuccess = (user) => {
    return {
        type: Types.DELETE_USER_SUCCESS,
        payload: { user }
    }
}

const deleteUserFailed = () => {
    return {
        type: Types.DELETE_USER_FAILED
    }
}

/** Dispatcher Functions */
export const createUser = (resource) => (dispatch) => {
    dispatch(createUserRequest(resource));

    return new Promise((resolve, reject) => { 
        UserAPI.create(resource)
            .then(({data}) => {
                dispatch(modal.modalHide());
                resolve();
            })
            .catch((error) => {
                dispatch(createUserFailed());

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

                reject();
        });
    });
}

export const fetchUser = () => (dispatch) => {
    dispatch(fetchUserRequest());

    return UserAPI.fetch()
        .then(({data}) => {
            dispatch(fetchUserSuccess(data));
        })
        .catch((error) => {
            dispatch(fetchUserFailed());

            const generalErrors = {
                status: error.response.status,
                message: error.response.statusText
            };

            dispatch(notification.assignGeneralError(generalErrors));
        });
}

export const selectUpdateUser = (user) => (dispatch) => {
    dispatch(assignSelectedUser(user));
    dispatch(modal.userUpdateModalShow());
}

export const updateUser = (id, resource) => (dispatch) => {
    dispatch(updateUserRequest(resource));

    return new Promise((resolve, reject) => { 
        UserAPI.update(id, resource)
            .then(({data}) => {
                dispatch(modal.modalHide());
                resolve();
            })
            .catch((error) => {
                dispatch(updateUserFailed());

                const generalErrors = {
                    status: error.response.status,
                    message: error.response.statusText
                };
                
                if(error.response.status === 422) {
                    dispatch(notification.assignValidationError(error.response.data.errors))
                }
                else {
                    dispatch(notification.assignGeneralError(generalErrors))
                }

                reject();
        });
    });
}

export const selectDeleteUser = (user) => (dispatch) => {
    dispatch(assignSelectedUser(user));
}

export const deleteUser = (id) => (dispatch) => {
    dispatch(deleteUserRequest(id));

    return new Promise((resolve, reject) => {
        UserAPI.delete(id)
            .then(({data}) => {
                dispatch(modal.modalHide());
                resolve();
            })
            .catch((error) => {
                dispatch(deleteUserFailed());

                const generalErrors = {
                    status: error.response.status,
                    message: error.response.statusText
                };
                
                if(error.response.status === 422) {
                    dispatch(notification.assignValidationError(error.response.data.errors))
                }
                else {
                    dispatch(notification.assignGeneralError(generalErrors))
                }

                reject();
        });
    });
}

/** Socket Dispatcher Functions */
export const createUserSocket = (user) => (dispatch) => {
    dispatch(createUserSuccess(user));
}

export const updateUserSocket = (id, user) => (dispatch) => {
    dispatch(updateUserSuccess(id, user));
}

export const deleteUserSocket = (user) => (dispatch) => {
    dispatch(deleteUserSuccess(user));
}