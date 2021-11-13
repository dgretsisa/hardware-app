import { Types } from "../types/product.types";

const initialState = {
    products: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.INITIALIZE_PRODUCTS:
            return {
                ...state,
                products: payload.products
            }
        case Types.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [payload.product, ...state.products]
            }
        case Types.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [
                    ...state.products.map(product => {
                        return product._id === payload.product._id ? payload.product : product
                    })
                ]
            };
        default:
            return state;
    }
}

export default reducer