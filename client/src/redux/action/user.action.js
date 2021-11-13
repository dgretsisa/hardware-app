import { Types } from '../types/user.types';
import UserAPI from '../../axios/services/user.service';
import * as modal from './modal.action';
import * as notification from './notification.action';

/** Action Functions */
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
export const deleteUserSocket = (user) => (dispatch) => {
    dispatch(deleteUserSuccess(user));
}

/** New Actions */
const addUserSuccess = (user) => {
    return {
        type: Types.ADD_USER_SUCCESS,
        payload: { user }
    }
}

const updateUserSuccess = (user) => {
    return {
        type: Types.UPDATE_USER_SUCCESS,
        payload: { user }
    }
}

export const addUser = (resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        UserAPI.create(resource)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Created', 'Product was created successfully'));
                dispatch(notification.clearLogs());
                resolve();
            })
            .catch((error) => {
                const generalErrors = { status: error.response.status, message: error.response.statusText, title: 'Error' };
                
                if(error.response.status === 422) dispatch(notification.assignValidationError(error.response.data.errors))
                else dispatch(notification.assignGeneralError(generalErrors))
                reject();
            });
    })
}

export const updateUser = (id, resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        UserAPI.update(id, resource)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Updated', 'User was updated successfully'));
                dispatch(notification.clearLogs());
                resolve();
            })
            .catch((error) => {
                const generalErrors = { status: error.response.status, message: error.response.statusText, title: 'Error' };
                
                if(error.response.status === 422) dispatch(notification.assignValidationError(error.response.data.errors))
                else dispatch(notification.assignGeneralError(generalErrors))
                reject();
            });
    })
}

export const addUserSocket = (user) => (dispatch) => {
    dispatch(addUserSuccess(user))
}

export const updateUserSocket = (user) => (dispatch) => {
    dispatch(updateUserSuccess(user))
}