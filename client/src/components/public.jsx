import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = ({ element }) => {
    /** Redux state */
    const { isAuthenticated, authUser } = useSelector(state => state.authReducer);
    
    return isAuthenticated ? <Navigate to={-1} replace /> : element;
}

export default PublicRoute
