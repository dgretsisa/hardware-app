import { Types } from '../types/stockin.types';

const initialState = {
    stockins: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.INITIALIZE_STOCKIN:
            return {
                ...state,
                stockins: payload.stockins
            }
        case Types.ADD_STOCKIN_SUCCESS:
            return {
                ...state,
                stockins: [...payload.stockins, ...state.stockins]
            }
        default:
            return state;
    }
}

export default reducer