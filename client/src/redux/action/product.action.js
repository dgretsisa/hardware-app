import * as utility from "../../components/functions/utility.function";
import ProductAPI from "../../axios/services/product.service";
import { Types } from "../types/product.types";
import * as notification from './notification.action';

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

/** Dispatcher */

export const fetchProducts = () => (dispatch) => {
    return ProductAPI.fetch()
    .then(({data}) => {
        dispatch(initializeProducts(data));
    })
    .catch(error => {
        const generalErrors = { status: error.response.status, message: error.response.statusText, title: 'Error' };
        dispatch(notification.assignGeneralError(generalErrors));
    });
}

export const addProduct = (resource) => (dispatch) => {
    return new Promise((resolve, reject) => { 
        ProductAPI.create(resource)
            .then(({data}) => {
                dispatch(notification.assignSuccessMessage('Created', 'Product was created successfully'))
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

export const addProductSocket = (product) => (dispatch) => {
    dispatch(addProductSuccess(product))
}

export const updateProductSocket = (product) => (dispatch) => {
    dispatch(updateProductSuccess(product))
}
