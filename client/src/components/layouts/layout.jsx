import React, { useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

/** Routes */
import PrivateRoute from '../routes/private';

/** Components */
import LayoutHeader from './layout.header';
import LayoutBreadcrumbs from './layout.breadcrumbs';
import Dashboard from '../dashboard/dashboard';
import Users from '../user/user.container';

/** Redux Actions */
import { fetchUser } from '../../redux/action/user.action';
import { createUserSocket, updateUserSocket, deleteUserSocket } from '../../redux/action/user.action';

/** Socket Context */
import { SocketContext } from '../../context/websocket.context';

const Layout = () => {
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    /** Redux state */
    const { users } = useSelector(state => state.userReducer);

    /** Dispatch Data Fetchers */
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])

    /** Socket Listeners */
    useEffect(() => {
        socket.on('ADD_USER', user => dispatch(createUserSocket(user)));
        socket.on('UPDATE_USER', data => dispatch(updateUserSocket(data.id, data.user)));
        socket.on('DELETE_USER', user => dispatch(deleteUserSocket(user)));
    }, [socket])

    return (
        <div>
            <LayoutHeader />
            <LayoutBreadcrumbs />

            <Routes>
                <Route exact path="dashboard" element={<PrivateRoute element={<Dashboard users={users}/>} />} />
                <Route exact path="users" element={<PrivateRoute element={<Users users={users}/>} />} />
                <Route path="*" element={<h3>Not Found</h3>}/>
            </Routes>
        </div>
    )
}

export default Layout
