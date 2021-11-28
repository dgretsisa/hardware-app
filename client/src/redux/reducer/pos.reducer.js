import { Types } from '../types/pos.types';

const initialState = {
    purchases: [],
    resultProducts: [],
    posSummary: {}
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.INITIALIZE_PURCHASES:
            return {
                ...state,
                purchases: payload.purchases
            }
        case Types.SEARCH_PRODUCT:
            const purchaseIds = [];
            state.purchases.map(purchase => purchaseIds.push(purchase.product._id));
            const result = payload.resultProducts.filter(result => !purchaseIds.includes(result._id));
            
            return {
                ...state,
                resultProducts: result
            }
        case Types.ADD_PURCHASE_SUCCESS:
            return {
                ...state,
                purchases: [payload.purchase, ...state.purchases]
            }
        case Types.UPDATE_PURCHASE_SUCCESS:
            return {
                ...state,
                purchases: [
                    ...state.purchases.map(purchase => {
                        return purchase._id === payload.purchase._id ? payload.purchase : purchase
                    })
                ]
            }
        case Types.DELETE_PURCHASE_SUCCESS:
            return {
                ...state,
                purchases: state.purchases.filter(purchase => purchase._id !== payload.purchase._id)
            }
        case Types.DELETE_BULK_PURCHASE_SUCCESS:
            return {
                purchases: []
            }
        case Types.SET_POS_SUMMARY:
            return {
                ...state,
                posSummary: payload.summary
            }
        default:
            return state;
    }
}

export default reducer