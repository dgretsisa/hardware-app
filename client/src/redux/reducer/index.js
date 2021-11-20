import { combineReducers } from 'redux'

import userReducer from '../reducer/user.reducer';
import notificationReducer from '../reducer/notification.reducer';
import authReducer from '../reducer/auth.reducer';
import productReducer from '../reducer/product.reducer';
import stockincartReducer from '../reducer/stockincart.reducer';
import paginationReducer from '../reducer/pagination.reducer';

export default combineReducers({
    userReducer: userReducer,
    notificationReducer: notificationReducer,
    authReducer: authReducer,
    productReducer: productReducer,
    stockincartReducer: stockincartReducer,
    paginationReducer: paginationReducer
});