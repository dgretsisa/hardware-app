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

const assignSuccessMessage = (title, message) => {
    return {
        type: Types.ASSIGN_SUCCESS_MESSAGE,
        payload: { title, message }
    }
}

const hideAlert = () => {
    return {
        type: Types.HIDE_ALERT
    }
}

const clearLogs = () => {
    return {
        type: Types.CLEAR_LOGS
    }
}

export {
    assignGeneralError,
    assignValidationError,
    clearLogs,
    hideAlert,
    assignSuccessMessage
}