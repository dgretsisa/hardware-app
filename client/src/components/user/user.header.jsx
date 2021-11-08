import React from 'react'

import Filter from '../filter/filter';

const UserHeader = ({ showModal, handleSearch, sortByAscending, sortByDescending }) => {
    return (
        <div className="flex items-center bg-gray-200 p-3 gap-5 px-5">
            <div className="flex flex-1 items-center">
                <div className="flex items-center text-gray-700 text-sm gap-5">
                    <div className="mt-1 mr-24 uppercase">Users</div>
                    <Filter sortByAscending={sortByAscending} sortByDescending={sortByDescending} />
                    <button onClick={showModal} className="px-3 py-1.5 mt-1 cursor-pointer rounded bg-white hover:text-yellow-600 hover:bg-yellow-100">+ Create New User</button>
                </div>
            </div>
            
            <input onKeyUp={handleSearch} name="search" type="text" placeholder="Search user" className="w-1/3 rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none"/>
        </div>
    )
}

export default UserHeader
