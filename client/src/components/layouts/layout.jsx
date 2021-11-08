import React from 'react'
import { Routes, Route } from 'react-router'

/** Routes */
import PrivateRoute from '../routes/private';

/** Components */
import LayoutHeader from './layout.header';
import Dashboard from '../dashboard/dashboard';
import Users from '../user/user.container';

const Layout = () => {
    return (
        <div>
            <LayoutHeader />

            <Routes>
                <Route path="dashboard" element={<PrivateRoute element={<Dashboard/>} />} />
                <Route path="users" element={<PrivateRoute element={<Users/>} />} />
            </Routes>
        </div>
    )
}

export default Layout
