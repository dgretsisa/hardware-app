import React from 'react'

import { UsersIcon } from '@heroicons/react/solid';

const UserHeader = ({ totalUsers, showModal}) => {
    return (
        <div className="flex items-center bg-gray-200 p-3 gap-5">
            <div className="flex flex-1 items-center">
                <UsersIcon className="w-10 h-5 text-gray-700" />
                <div className="flex items-center text-gray-700 text-sm divide-x divide-gray-400 gap-5">
                    <div className="font-bold">Users</div>
                    <div className="pl-3">Total Users ( {totalUsers} )</div>
                    <div className="pl-3">Active Users ( 5 )</div>
                    <div className="pl-3">Inactive Users ( 15 )</div>
                    <button onClick={showModal} className="px-3 py-1.5 cursor-pointer rounded bg-green-700 text-white hover:bg-green-900">+ Create User</button>
                </div>
            </div>
            
            <input type="text" placeholder="Search user" className="w-1/4 rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"/>
            <button className="rounded text-white text-sm bg-green-700 px-3 py-1.5 hover:bg-green-900">Search</button>
        </div>
    )
}

export default UserHeader
