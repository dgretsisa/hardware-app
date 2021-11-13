import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ element, role }) => {
    /** Redux state */
    const { isAuthenticated, authUser } = useSelector(state => state.authReducer);

    if(isAuthenticated && role) {
        return authUser.role === role ? element : <Navigate to="/dashboard" replace/>
    }

    return isAuthenticated ? element : <Navigate to="/" replace />;
}

export default PrivateRoute
