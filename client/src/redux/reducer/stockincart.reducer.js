import { Types } from '../types/stockincart.types';

const initialState = {
    stockincarts: [],
    resultProducts: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.INITIALIZE_STOCKINCART:
            return {
                ...state,
                stockincarts: payload.stockins
            }
        case Types.SEARCH_PRODUCT:
            return {
                ...state,
                resultProducts: payload.resultProducts
            }
        case Types.ADD_STOCKINCART_SUCCESS:
            return {
                ...state,
                stockincarts: [payload.stockin, ...state.stockincarts]
            }
        case Types.UPDATE_STOCKINCART_SUCCESS:
            return {
                ...state,
                stockincarts: [
                    ...state.stockincarts.map(stockin => {
                        return stockin._id === payload.stockin._id ? payload.stockin : stockin
                    })
                ]
            }
        case Types.DELETE_STOCKINCART_SUCCESS:
            return {
                ...state,
                stockincarts: state.stockincarts.filter(stockin => stockin._id !== payload.stockin._id)
            }
        case Types.DELETE_BULK_STOCKINCART_SUCCESS:
            return {
                stockincarts: []
            }
        default:
            return state;
    }
}

export default reducer