import StockinAPI from "../../axios/services/stockin.service";
import { Types } from "../types/stockin.types";
import * as notification from './notification.action';
import * as helper from '../helper.functions';

const initializeStockin = (stockins) => {
    return {
        type: Types.INITIALIZE_STOCKIN,
        payload: { stockins }
    }
}

const addStockinSuccess = (stockins) => {
    return {
        type: Types.ADD_STOCKIN_SUCCESS,
        payload: { stockins }
    }
}

/** Dispatcher */

export const fetchStockin = (resource) => (dispatch) => {
    const params = helper.fetchParams(resource);

    return new Promise((resolve, reject) => {
        StockinAPI.fetch(params)
        .then(({data}) => {
            dispatch(initializeStockin(data.data));
            resolve(data.totalRecords);
        })
        .catch(error => {
            const generalErrors = { status: error.response.status, message: error.response.statusText, title: 'Error' };
            dispatch(notification.assignGeneralError(generalErrors));
            reject(error);
        });
    });
}

export const addStockin = (resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        StockinAPI.create(resource)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Added', 'Stock was added successfully'))
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

export const addStockinSocket = (stockins) => (dispatch) => {
    dispatch(addStockinSuccess(stockins));
}

