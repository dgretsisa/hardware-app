import React from 'react'
import { useSelector } from 'react-redux'

const UserUpdate = ({ handleSubmit, handleCancel, handleInput, formInputs, handleChangePassword }) => {

    const { validationErrors } = useSelector(state => state.notificationReducer)

    return (
        <div className="w-full flex flex-col items-center gap-5 py-5 px-5 border">
            <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2 text-sm text-gray-600">
                <div className="">
                    <label>Name</label>
                    <div className="flex-1">
                        <input
                            defaultValue={formInputs.name}
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
                            defaultValue={formInputs.username}
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
                    <label>Role</label>
                    <div className="flex-1">
                        <select
                            defaultValue={formInputs.role}
                            onChange={handleInput}
                            name="role"
                            className={`${validationErrors.role && 'border-red-600'} rounded border-transparent border border-gray-300 py-1.5 px-4 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}>
                            <option value="User">User</option>
                            <option value="Administrator">Administrator</option>
                        </select>
                        {validationErrors.role &&
                            <p className="text-red-600 text-xs pt-1">{validationErrors.role}</p>
                        }
                    </div>
                </div>
                <div className="">
                    <label>Status</label>
                    <div className="flex-1">
                        <select
                            defaultValue={formInputs.isActive}
                            onChange={handleInput}
                            name="isActive"
                            className={`${validationErrors.isActive && 'border-red-600'} rounded border-transparent border border-gray-300 py-1.5 px-4 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        {validationErrors.isActive &&
                            <p className="text-red-600 text-xs pt-1">{validationErrors.isActive}</p>
                        }
                    </div>
                </div>
                <div className="mt-5">
                    <label>&nbsp;</label>
                    <button type="button" onClick={handleCancel} className="rounded text-sm text-gray-700 bg-white px-4 py-1 border border-gray-300">Cancel</button>
                </div>
                <div className="mt-5">
                    <label>&nbsp;</label>
                    <button type="submit" onClick={handleSubmit} className="rounded text-sm text-white bg-gray-400 px-4 py-1 hover:bg-gray-500">Update</button>
                </div>
            </form>
            <form className="w-full flex justify-center items-center mt-3 pt-7 pb-3 gap-2 text-sm text-gray-600 border-t">
                <div className="flex items-center gap-2">
                    <label>New Password</label>
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
                {formInputs.password &&
                    <div className="">
                        <label>&nbsp;</label>
                        <button type="submit" onClick={handleChangePassword} className="rounded text-sm text-white bg-gray-400 px-4 py-1 hover:bg-gray-500">Change Password</button>
                    </div>
                }
            </form>
        </div>
    )
}

export default UserUpdate
