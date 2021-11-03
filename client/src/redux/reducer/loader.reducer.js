import { Types } from '../types/loader.types';

const initialState = {
    loader: false
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.LOADER_SHOW:
            return {
                ...state,
                loader: true
            };
        case Types.LOADER_HIDE:
            return {
                ...state,
                loader: false
            };
        default:
            return state;
    }
}

export default reducer