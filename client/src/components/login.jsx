import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

/** Redux Actions */
import { login } from '../redux/action/auth.action';

const Login = () => {

    const navigate = useNavigate();

    /** Inputs */
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    /** Redux State */
    const { validationErrors } = useSelector(state => state.notificationReducer);

    const dispatch = useDispatch();

    /** Local Functions */
    const handleInputChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setCredentials(credentials => ({
            ...credentials,
            [name]: value
        }));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        
        dispatch(login(credentials))
        .then(data => navigate('dashboard'))
        .catch(error => {});
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center justify-items-center items-center gap-8 text-gray-800 text-sm">
            <h3 className="text-4xl uppercase tracking-widest">Hardware App</h3>
            <form onSubmit={handleLogin} className="w-1/3 flex flex-col gap-5 bg-gray-200 p-10">
                {validationErrors.credential &&
                    <div className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4" role="alert">
                        <p className="font-bold">
                            Login Failed!
                        </p>
                        <p className="text-xs">
                            {validationErrors.credential}.
                        </p>
                    </div>
                }
                <div className="flex items-center gap-5">
                    <label className="w-22">Username</label>
                    <div className="flex-1">
                        <input
                            autoComplete="off"
                            name="username" 
                            type="text"
                            value={credentials.username}
                            onChange={handleInputChange}
                            className={`w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-5">
                    <label className="w-22">Password</label>
                    <div className="flex-1">
                        <input 
                            autoComplete="off"
                            name="password" 
                            type="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            className={`w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-5">
                    <button className="rounded text-sm text-white bg-yellow-600 px-4 py-2 hover:bg-yellow-700">Sign in</button>
                </div>
            </form>
        </div>
    )
}

export default Login
