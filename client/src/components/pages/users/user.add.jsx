import React from 'react'
import { useSelector } from 'react-redux'

const UserAdd = ({ handleSubmit, handleCancel, handleInput }) => {

    const { validationErrors } = useSelector(state => state.notificationReducer)

    return (
        <form onSubmit={handleSubmit} className="w-full py-5 px-5 justify-center items-center flex gap-2 text-sm text-gray-600 border">
            <div className="">
                <label>Name</label>
                <div className="flex-1">
                    <input
                        onChange={handleInput}
                        autoComplete="off"
                        name="name" 
                        type="text"
                        placeholder="Name"
                        className={`${validationErrors.name && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.name &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.name}</p>
                    }
                </div>
            </div>
            <div className="">
                <label>Username</label>
                <div className="flex-1">
                    <input
                        onChange={handleInput}
                        autoComplete="off"
                        name="username" 
                        type="text"
                        placeholder="Username"
                        className={`${validationErrors.username && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.username &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.username}</p>
                    }
                </div>
            </div>
            <div className="">
                <label>Password</label>
                <div className="flex-1">
                    <input
                        onChange={handleInput}
                        autoComplete="off"
                        name="password" 
                        type="password"
                        placeholder="Password"
                        className={`${validationErrors.password && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.password &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.password}</p>
                    }
                </div>
            </div>
            <div className="mt-5">
                <label>&nbsp;</label>
                <button type="button" onClick={handleCancel} className="rounded text-sm text-gray-700 bg-white px-4 py-1 border border-gray-300">Cancel</button>
            </div>
            <div className="mt-5">
                <label>&nbsp;</label>
                <button type="submit" onClick={handleSubmit} className="rounded text-sm text-white bg-gray-400 px-4 py-1 hover:bg-gray-500">Create</button>
            </div>
        </form>
    )
}

export default UserAdd
