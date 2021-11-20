import React, { useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

/** Routes */
import PrivateRoute from '../routes/private';

/** Components */
import Alert from '../common/alert';
import LayoutHeader from './layout.header';
import LayoutBreadcrumbs from './layout.breadcrumbs';
import Dashboard from '../dashboard/dashboard';
import ProductIndex from '../pages/products';
import UserIndex from '../pages/users';
import StockincartIndex from '../pages/stockincarts';

/** Redux Actions */
import { addUserSocket, updateUserSocket, deleteUserSocket } from '../../redux/action/user.action';
import { addProductSocket, updateProductSocket, deleteProductSocket } from '../../redux/action/product.action';
import { addStockincartSocket, updateStockincartSocket, deleteStockincartSocket } from '../../redux/action/stockincart.action';

/** Socket Context */
import { SocketContext } from '../../context/websocket.context';

const Layout = () => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const { alertStatus, alertMessage, alertMessageTitle } = useSelector(state => state.notificationReducer)

    /** Socket Listeners */
    useEffect(() => {
        socket.on('ADD_PRODUCT', product => dispatch(addProductSocket(product)));
        socket.on('UPDATE_PRODUCT', product => dispatch(updateProductSocket(product)));
        socket.on('DELETE_PRODUCT', product => dispatch(deleteProductSocket(product)));

        socket.on('ADD_USER', user => dispatch(addUserSocket(user)));
        socket.on('UPDATE_USER', user => dispatch(updateUserSocket(user)));
        socket.on('DELETE_USER', user => dispatch(deleteUserSocket(user)));

        socket.on('ADD_STOCKIN_CART', stockincart => dispatch(addStockincartSocket(stockincart)));
        socket.on('UPDATE_STOCKIN_CART', stockincart => dispatch(updateStockincartSocket(stockincart)));
        socket.on('DELETE_STOCKIN_CART', stockincart => dispatch(deleteStockincartSocket(stockincart)));
    }, [socket, dispatch])

    return (
        <div>
            {alertStatus !== null ? <Alert status={alertStatus} title={alertMessageTitle} message={alertMessage} />: null }
            <LayoutHeader />
            <LayoutBreadcrumbs />

            <Routes>
                <Route exact path="dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route exact path="users" element={<PrivateRoute role="Administrator" element={<UserIndex/>} />} />
                <Route exact path="products" element={<PrivateRoute role="Administrator" element={<ProductIndex/>} />} />
                <Route exact path="stockin/entry" element={<PrivateRoute role="Administrator" element={<StockincartIndex/>} />} />
                <Route path="*" element={<h3>Not Found</h3>}/>
            </Routes>
        </div>
    )
}

export default Layout
