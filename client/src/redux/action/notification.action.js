import { Types } from '../types/notification.types';

const assignGeneralError = (errors) => {
    return {
        type: Types.ASSIGN_GENERAL_ERROR,
        payload: { errors }
    }
}

const assignValidationError = (errors) => {
    return {
        type: Types.ASSIGN_VALIDATION_ERROR,
        payload: { errors }
    }
}

const clearLogs = (errors) => {
    return {
        type: Types.CLEAR_LOGS,
        payload: { errors }
    }
}

export {
    assignGeneralError,
    assignValidationError,
    clearLogs
}