import ProductAPI from "../../axios/services/product.service";
import { Types } from "../types/product.types";
import * as notification from './notification.action';
import * as helper from '../helper.functions';

const initializeProducts = (products) => {
    return {
        type: Types.INITIALIZE_PRODUCTS,
        payload: { products }
    }
}

const addProductSuccess = (product) => {
    return {
        type: Types.ADD_PRODUCT_SUCCESS,
        payload: { product }
    }
}

const updateProductSuccess = (product) => {
    return {
        type: Types.UPDATE_PRODUCT_SUCCESS,
        payload: { product }
    }
}

const deleteProductSuccess = (product) => {
    return {
        type: Types.DELETE_PRODUCT_SUCCESS,
        payload: { product }
    }
}

/** Dispatcher */

export const fetchProducts = (resource) => (dispatch) => {
    const params = helper.fetchParams(resource);

    return new Promise((resolve, reject) => {
        ProductAPI.fetch(params)
        .then(({data}) => {
            dispatch(initializeProducts(data.data));
            resolve(data.totalRecords);
        })
        .catch(error => {
            const generalErrors = { status: error.response.status, message: error.response.statusText, title: 'Error' };
            dispatch(notification.assignGeneralError(generalErrors));
            reject(error);
        });
    });
}

export const addProduct = (resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        ProductAPI.create(resource)
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

export const updateProduct = (id, resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        ProductAPI.update(id, resource)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Updated', 'Product was updated successfully'))
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

export const deleteProduct = (id) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        ProductAPI.delete(id)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Deleted', 'Product was deleted successfully'));
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

export const addProductSocket = (product) => (dispatch) => {
    dispatch(addProductSuccess(product));
}

export const updateProductSocket = (product) => (dispatch) => {
    dispatch(updateProductSuccess(product));
}

export const deleteProductSocket = (user) => (dispatch) => {
    dispatch(deleteProductSuccess(user));
}
