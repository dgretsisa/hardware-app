import React from 'react'

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-5 my-5">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            <p className="text-green-900">Processing Request</p>
        </div>
    )
}

export default Loader
