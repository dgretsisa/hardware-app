import { Types } from '../types/notification.types';

const initialState = {
    generalErrors: {},
    validationErrors: {},
    alertStatus: null,
    alertMessage: null,
    alertMessageTitle: null,
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
                generalErrors: payload.errors,
                alertStatus: 'error',
                alertMessage: payload.errors.message,
                alertMessageTitle: payload.errors.title
            };
        case Types.ASSIGN_SUCCESS_MESSAGE:
            return {
                ...state,
                alertStatus: 'success',
                alertMessage: payload.message,
                alertMessageTitle: payload.title
            };
        case Types.HIDE_ALERT:
            return {
                ...state,
                generalErrors: {},
                alertStatus: null,
                alertMessage: null,
                alertMessageTitle: null,
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