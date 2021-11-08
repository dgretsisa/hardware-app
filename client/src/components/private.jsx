import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ element }) => {
    /** Redux state */
    const { isAuthenticated, authUser } = useSelector(state => state.authReducer);

    return isAuthenticated ? element : <Navigate to="/" replace />;
}

export default PrivateRoute
