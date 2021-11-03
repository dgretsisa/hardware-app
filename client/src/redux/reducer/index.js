import { combineReducers } from 'redux'

import userReducer from '../reducer/user.reducer';
import loaderReducer from '../reducer/loader.reducer';
import modalReducer from '../reducer/modal.reducer';
import notificationReducer from '../reducer/notification.reducer';

export default combineReducers({
    userReducer: userReducer,
    loaderReducer: loaderReducer,
    modalReducer: modalReducer,
    notificationReducer: notificationReducer
});