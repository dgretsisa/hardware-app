import { Types } from '../types/pagination.types';

const initialState = {
    pageLimit: 10,
    currentPage: 1,
    totalRecords: 0
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.INITIALIZE_PAGINATION:
            return {
                ...state,
                pageLimit: payload.pageLimit,
                currentPage: payload.currentPage,
                totalRecords: payload.totalRecords
            }
        default:
            return state;
    }
}

export default reducer