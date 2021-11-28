import React from 'react'

import { TrashIcon } from '@heroicons/react/solid'

const PosDelete = ({ selectedRow, handleCancel, handleSubmit}) => {
    return (
        <div className="flex justify-center items-center py-5 gap-5">
            <div className="">
                <TrashIcon className="w-24 h-30 text-red-500" />
            </div>
            <div className="text-gray-700 text-center text-sm">
                <h3 className="font-bold">Are you sure you want to delete?</h3>
                <p className="py-3">{`${selectedRow.product.description} (${selectedRow.quantity } ${selectedRow.unit})`}</p>
                <div className="flex justify-between mt-3">
                    <button onClick={handleCancel} className="px-3 py-1 bg-white text-gray-700 rounded text-sm border border-gray-300">Cancel</button>
                    <button onClick={handleSubmit} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default PosDelete
