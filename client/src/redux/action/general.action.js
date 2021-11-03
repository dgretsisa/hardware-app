import * as notification from './notification.action';
import * as modal from './modal.action';

export const cancel = () => (dispatch) => {
    dispatch(modal.modalHide());
    dispatch(notification.clearLogs());
}

export const clear = () => (dispatch) => {
    dispatch(notification.clearLogs());
}