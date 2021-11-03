import { Types } from '../types/notification.types';

const initialState = {
    generalErrors: {},
    validationErrors: {}
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.ASSIGN_VALIDATION_ERROR:
            return {
                ...state,
                validationErrors: payload.errors
            };
        case Types.ASSIGN_GENERAL_ERROR:
            return {
                ...state,
                generalErrors: payload.errors
            };
        case Types.CLEAR_LOGS:
            return {
                ...state,
                generalErrors: {},
                validationErrors: {}
            };
        default:
            return state;
    }
}

export default reducer