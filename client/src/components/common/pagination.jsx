import React from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const pagination = ({ pageLimit, totalRecords, currentPage, handleSelectPage, handlePrevPage, handleNextPage }) => {

    const totalPages = Math.ceil(totalRecords/pageLimit);
    const pages = [];

    for(let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="bg-white px-4 py-1 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                <div className="relative inline-flex items-center px-4 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                </div>
                <div className="ml-3 relative inline-flex items-center px-4 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                </div>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{((currentPage - 1) * pageLimit) + 1}</span> to <span className="font-medium">{Math.min( currentPage * pageLimit, totalRecords)}</span> of{' '}
                    <span className="font-medium">{ totalRecords }</span> results
                </p>
                </div>
                <div>
                <div className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    { currentPage > 1 ?
                        <button onClick={handlePrevPage} className="cursor-pointer relative inline-flex items-center px-2 py-1.5 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        : null
                    }
                    
                    { totalPages === 1 ? null:
                        pages.map((page, index) => {
                            return <div
                                    onClick={() => handleSelectPage(page)} 
                                    key={index}
                                    aria-current="page" 
                                    className={` ${currentPage == page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'} cursor-pointer relative inline-flex items-center px-4 py-1.5 border text-sm font-medium`}>
                                        {page}
                                    </div>
                        })
                    }
                    { currentPage < totalPages ?
                        <button onClick={handleNextPage} className="cursor-pointer relative inline-flex items-center px-2 py-1.5 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button> 
                        : null
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

export default pagination
