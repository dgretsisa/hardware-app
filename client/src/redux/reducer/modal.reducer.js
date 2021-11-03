import { Types } from '../types/modal.types';

const initialState = {
    userAddModal: false,
    userUpdateModal: false
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.USER_ADD_MODAL_SHOW:
            return {
                ...state,
                userAddModal: true
            };
        case Types.USER_UPDATE_MODAL_SHOW:
            return {
                ...state,
                userUpdateModal: true
            };
        case Types.MODAL_HIDE:
            return {
                ...state,
                userAddModal: false,
                userUpdateModal: false
            };
        default:
            return state;
    }
}

export default reducer