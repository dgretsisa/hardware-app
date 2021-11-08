import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { logout } from '../../redux/action/auth.action';

const LayoutHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /** Local Functions */
    const handleDashboard = () => {
        navigate('dashboard');
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <div>
            <div className="w-full flex justify-between items-center bg-gray-200 px-10 py-2">
                <h3 onClick={handleDashboard} className="text-gray-500 cursor-pointer text-sm uppercase tracking-wider hover:text-gray-900">Hardware App</h3>
                <p  onClick={handleLogout} className="text-gray-500 text-sm cursor-pointer px-3 py-1 rounded hover:bg-red-200 hover:text-red-500">Sign out</p>
            </div>
        </div>
    )
}

export default LayoutHeader
