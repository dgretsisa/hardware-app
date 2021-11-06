import React from 'react'

import { PencilIcon, XIcon } from '@heroicons/react/solid';

const UserList = ({ users, updateButton, deleteButton, formatDate }) => {
    return (
    <div className="">
        <div className="inline-block w-full shadow overflow-hidden">
            <table className="w-full leading-normal">
                <thead>
                    <tr>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-sm  font-semibold">
                            Name
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-sm  font-semibold">
                            Role
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-sm  font-semibold">
                            Username
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-sm  font-semibold">
                            Created
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-sm  font-semibold">
                            Updated
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-sm  font-semibold">
                            Status
                        </th>
                        <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-sm  font-semibold">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length !== 0 ? 
                        users.map((user, index) => {
                            return <tr key={index}>
                                <td className="px-5 py-2.5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                { user.name }
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        { user.role }
                                    </p>
                                </td>
                                <td className="px-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        { user.username }
                                    </p>
                                </td>
                                <td className="px-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        { formatDate(user.createdAt) }
                                    </p>
                                </td>
                                <td className="px-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        { formatDate(user.updatedAt) }
                                    </p>
                                </td>
                                <td className="px-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="relative inline-block px-3 py-1  leading-tight">
                                        <span aria-hidden="true" className={`${user.isActive ? 'bg-yellow-100': 'bg-red-200' } absolute inset-0 opacity-50 rounded-full`}></span>
                                        <span className={`relative ${user.isActive ? 'text-yellow-600': 'text-red-900'}`}>
                                            {user.isActive ? 'active': 'inactive'}
                                        </span>
                                    </span>
                                </td>
                                <td className="px-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex gap-3 divide-x">
                                        <div className="pl-3">
                                            <PencilIcon onClick={() => updateButton(user)} className="w-5 h-5 text-gray-600 cursor-pointer" />
                                        </div>
                                        <div className="pl-3">
                                            <XIcon onClick={() => deleteButton(user)} className="w-5 h-5 text-red-400 cursor-pointer" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        }):
                        <tr key={1}><td colSpan={7} className="text-center text-gray-500 border p-10">There are no available records</td></tr>
                    }
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default UserList
