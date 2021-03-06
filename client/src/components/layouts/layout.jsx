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
import StockinIndex from '../pages/stockins';
import PosIndex from '../pages/pos';

/** Redux Actions */
import { addUserSocket, updateUserSocket, deleteUserSocket } from '../../redux/action/user.action';
import { addProductSocket, updateProductSocket, deleteProductSocket } from '../../redux/action/product.action';
import { addStockincartSocket, updateStockincartSocket, deleteStockincartSocket, deleteBulkStockincartSocket } from '../../redux/action/stockincart.action';
import { addStockinSocket } from '../../redux/action/stockin.action';
import  { addPurchaseSocket, updatePurchaseSocket, deletePurchaseSocket, setPosSummarySocket } from '../../redux/action/pos.action';

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

        socket.on('ADD_STOCKIN', stockins => {
            dispatch(addStockinSocket(stockins))
            dispatch(deleteBulkStockincartSocket())
        });

        socket.on('ADD_POS', data => {
            dispatch(addPurchaseSocket(data.data));
            dispatch(setPosSummarySocket(data.summary[0]));
        });
        socket.on('UPDATE_POS', data => {
            dispatch(updatePurchaseSocket(data.data));
            dispatch(setPosSummarySocket(data.summary[0]));
        });
        socket.on('DELETE_POS', data => {
            dispatch(deletePurchaseSocket(data.data));
            dispatch(setPosSummarySocket(data.summary[0]));
        });
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
                <Route exact path="stockin" element={<PrivateRoute role="Administrator" element={<StockinIndex/>} />} />
                <Route exact path="stockin/entry" element={<PrivateRoute role="Administrator" element={<StockincartIndex/>} />} />
                <Route exact path="pos" element={<PrivateRoute role="User" element={<PosIndex/>} />} />
                <Route path="*" element={<h3>Not Found</h3>}/>
            </Routes>
        </div>
    )
}

export default Layout
