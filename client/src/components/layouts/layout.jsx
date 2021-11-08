import React from 'react'
import { Routes, Route } from 'react-router'

/** Routes */
import PrivateRoute from '../routes/private';

/** Components */
import LayoutHeader from './layout.header';
import LayoutBreadcrumbs from './layout.breadcrumbs';
import Dashboard from '../dashboard/dashboard';
import Users from '../user/user.container';

const Layout = () => {
    return (
        <div>
            <LayoutHeader />
            <LayoutBreadcrumbs />

            <Routes>
                <Route exact path="dashboard" element={<PrivateRoute element={<Dashboard/>} />} />
                <Route exact path="users" element={<PrivateRoute element={<Users/>} />} />
                <Route exact path="sample" element={<PrivateRoute element={<Users/>} />}>
                    <Route exact index element={<PrivateRoute element={<Users/>} />} />
                    <Route exact path="sample2" element={<PrivateRoute element={<Users/>} />} />
                </Route>
                <Route path="*" element={<h3>Not Found</h3>}/>
            </Routes>
        </div>
    )
}

export default Layout
