import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = ({ element }) => {
    /** Redux state */
    const { isAuthenticated } = useSelector(state => state.authReducer);
    
    return isAuthenticated ? <Navigate to="dashboard" replace /> : element;
}

export default PublicRoute
