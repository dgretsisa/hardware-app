import PosAPI from "../../axios/services/pos.service";
import ProductAPI from "../../axios/services/product.service";
import { Types } from "../types/pos.types";
import * as notification from './notification.action';
import * as helper from '../helper.functions';

const initializePurchases = (purchases) => {
    return {
        type: Types.INITIALIZE_PURCHASES,
        payload: { purchases }
    }
}

const searchProductSuccess = (resultProducts) => {
    return {
        type: Types.SEARCH_PRODUCT,
        payload: { resultProducts }
    }
}

const addPurchaseSuccess = (purchase) => {
    return {
        type: Types.ADD_PURCHASE_SUCCESS,
        payload: { purchase }
    }
}

const updatePurchaseSuccess = (purchase) => {
    return {
        type: Types.UPDATE_PURCHASE_SUCCESS,
        payload: { purchase }
    }
}

const deletePurchaseSuccess = (purchase) => {
    return {
        type: Types.DELETE_PURCHASE_SUCCESS,
        payload: { purchase }
    }
}

/** Dispatcher */

export const fetchPurchases = () => (dispatch) => {

    return new Promise((resolve, reject) => {
        PosAPI.fetch()
        .then(({data}) => {
            dispatch(initializePurchases(data));
            resolve();
        })
        .catch(error => {
            const generalErrors = { status: error.response.status, message: error.response.statusText, title: 'Error' };
            dispatch(notification.assignGeneralError(generalErrors));
            reject(error);
        });
    });
}

export const searchProducts = (resource) => (dispatch) => {
    const params = helper.fetchParams(resource);

    return ProductAPI.fetch(params)
        .then(({data}) => {
            dispatch(searchProductSuccess(data.data));
        })
        .catch(error => {
            const generalErrors = { status: error.response.status, message: error.response.statusText, title: 'Error' };
            dispatch(notification.assignGeneralError(generalErrors));
        });
}

export const addPurchase = (resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        PosAPI.create(resource)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Added', 'Item was added successfully'))
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

export const updatePurchase = (id, resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        PosAPI.update(id, resource)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Updated', 'Item was updated successfully'))
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

export const deletePurchase = (id, resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        PosAPI.delete(id)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Delete', 'Item was deleted successfully'))
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

export const addPurchaseSocket = (purchase) => (dispatch) => {
    dispatch(addPurchaseSuccess(purchase));
}

export const updatePurchaseSocket = (purchase) => (dispatch) => {
    dispatch(updatePurchaseSuccess(purchase));
}

export const deletePurchaseSocket = (purchase) => (dispatch) => {
    dispatch(deletePurchaseSuccess(purchase));
}

