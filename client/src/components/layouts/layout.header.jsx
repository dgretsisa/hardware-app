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
            <div className="w-full flex justify-between items-center text-white bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 px-10 py-2">
                <h3 onClick={handleDashboard} className="text-white cursor-pointer text-sm  tracking-wider hover:text-gray-600 uppercase">Hardware App</h3>
                <p  onClick={handleLogout} className="text-sm cursor-pointer px-3 py-1 rounded hover:bg-red-200 hover:text-red-500">Sign out</p>
            </div>
        </div>
    )
}

export default LayoutHeader
