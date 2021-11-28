import React from 'react'

import { ExclamationCircleIcon } from '@heroicons/react/solid'

const StockincartEntries = ({ handleCancel, handleSubmit}) => {
    return (
        <div className="flex justify-center items-center py-5 gap-5">
            <div className="">
                <ExclamationCircleIcon className="w-24 h-30 text-yellow-500" />
            </div>
            <div className="text-gray-700 text-center text-sm">
                <h3 className="font-bold">Are you sure you want to transfer all stocks to inventory ?</h3>
                <p className="py-3">Please review first the entries before proceeding</p>
                <div className="flex justify-center gap-2 mt-3">
                    <button onClick={handleCancel} className="px-3 py-1 bg-white text-gray-700 rounded text-sm border border-gray-300">Cancel</button>
                    <button onClick={handleSubmit} className="px-3 py-1 bg-yellow-500 hover:bg-gray-500 text-white rounded text-sm">Proceed</button>
                </div>
            </div>
        </div>
    )
}

export default StockincartEntries
