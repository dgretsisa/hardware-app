import { Types } from '../types/modal.types';

const userAddModalShow = () => (dispatch) => {
    dispatch({
        type: Types.USER_ADD_MODAL_SHOW
    });
}

const userUpdateModalShow = () => (dispatch) => {
    dispatch({
        type: Types.USER_UPDATE_MODAL_SHOW
    });
}

const modalHide = () => (dispatch) => {
    dispatch({
        type: Types.MODAL_HIDE
    });
}

export {
    userAddModalShow,
    userUpdateModalShow,
    modalHide
}