import { Types } from '../types/user.types';
import UserAPI from '../../axios/services/user.service';
import * as notification from './notification.action';
import * as helper from '../helper.functions';


const initializeUsers = (users) => {
    return {
        type: Types.INITIALIZE_USERS,
        payload: { users }
    }
}

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

const deleteUserSuccess = (user) => {
    return {
        type: Types.DELETE_USER_SUCCESS,
        payload: { user }
    }
}

/** Dispatcher */
export const fetchUsers = (resource) => (dispatch) => {
    const params = helper.fetchParams(resource);

    return new Promise((resolve, reject) => {
        UserAPI.fetch(params)
        .then(({data}) => {
            dispatch(initializeUsers(data.data));
            resolve(data.totalRecords);
        })
        .catch(error => {
            const generalErrors = { status: error.response.status, message: error.response.statusText, title: 'Error' };
            dispatch(notification.assignGeneralError(generalErrors));
            reject(error);
        });
    });
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

export const deleteUser = (id) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        UserAPI.delete(id)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Deleted', 'User was deleted successfully'));
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

export const deleteUserSocket = (user) => (dispatch) => {
    dispatch(deleteUserSuccess(user));
}