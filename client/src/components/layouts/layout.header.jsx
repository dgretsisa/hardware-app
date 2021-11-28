import { UserIcon } from '@heroicons/react/solid';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { logout } from '../../redux/action/auth.action';

const LayoutHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { authUser } = useSelector(state => state.authReducer)

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
                <div className="flex items-center gap-2">
                    <UserIcon className="w-4 text-gray-700"/>
                    <p className="text-sm text-gray-700"><span className="">{ authUser.name }</span></p>
                    <p  onClick={handleLogout} className="text-sm cursor-pointer px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600">Sign out</p>
                </div>
                
            </div>
        </div>
    )
}

export default LayoutHeader
