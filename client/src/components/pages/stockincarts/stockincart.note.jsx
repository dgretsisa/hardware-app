import React from 'react'

const StockincartNote = () => {
    return (
        <div className="mx-80 my-3 inline-flex items-center bg-white leading-none rounded-full p-2 shadow text-teal text-sm">
            <span className="inline-flex bg-gray-700 text-white rounded-full h-6 px-3 justify-center items-center">
                Note
            </span>
            <span className="inline-flex px-2 text-gray-700">
                To entry new stock search the product in the search box and select any suggested results.
            </span>
        </div>
    )
}

export default StockincartNote
