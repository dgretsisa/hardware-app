import StockincartAPI from "../../axios/services/stockincart.service";
import ProductAPI from "../../axios/services/product.service";
import { Types } from "../types/stockincart.types";
import * as notification from './notification.action';
import * as helper from '../helper.functions';

const initializeStockincarts = (stockins) => {
    return {
        type: Types.INITIALIZE_STOCKINCART,
        payload: { stockins }
    }
}

const searchProductSuccess = (resultProducts) => {
    return {
        type: Types.SEARCH_PRODUCT,
        payload: { resultProducts }
    }
}

const addStockincartSuccess = (stockin) => {
    return {
        type: Types.ADD_STOCKINCART_SUCCESS,
        payload: { stockin }
    }
}

const updateStockincartSuccess = (stockin) => {
    return {
        type: Types.UPDATE_STOCKINCART_SUCCESS,
        payload: { stockin }
    }
}

const deleteStockincartSuccess = (stockin) => {
    return {
        type: Types.DELETE_STOCKINCART_SUCCESS,
        payload: { stockin }
    }
}

/** Dispatcher */

export const fetchStockincarts = () => (dispatch) => {

    return new Promise((resolve, reject) => {
        StockincartAPI.fetch()
        .then(({data}) => {
            dispatch(initializeStockincarts(data.data));
            resolve(data.totalRecords);
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

export const addStockincart = (resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        StockincartAPI.create(resource)
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

export const updateStockincart = (id, resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        StockincartAPI.update(id, resource)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Updated', 'Stock was updated successfully'))
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

export const deleteStockincart = (id) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        StockincartAPI.delete(id)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Deleted', 'Stock was deleted successfully'))
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

export const addStockincartSocket = (stockin) => (dispatch) => {
    dispatch(addStockincartSuccess(stockin));
}

export const updateStockincartSocket = (stockin) => (dispatch) => {
    dispatch(updateStockincartSuccess(stockin))
}

export const deleteStockincartSocket = (stockin) => (dispatch) => {
    dispatch(deleteStockincartSuccess(stockin))
}
