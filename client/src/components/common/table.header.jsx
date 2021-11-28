import React from 'react'

const TableHeader = ({ tableheader, hasShow, hasSort, hasButton, customButton, hasSearch }) => {
    return (
        <div className="flex items-center bg-gray-200 p-3 gap-5 px-5">
            <div className="flex flex-1 items-center">
                <div className="flex items-center text-gray-700 text-sm gap-5">
                    <div className="mr-5 uppercase font-bold">{tableheader.title}</div>
                    {hasShow && 
                        <div className="flex items-center gap-1">
                            <label>Show</label>
                            <select 
                                defaultValue={tableheader.pageLimit}
                                name="showLimit" 
                                onChange={tableheader.setPageLimit} 
                                className={`rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}
                            >
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="500">500</option>
                                <option value="-1">All</option>
                            </select>
                        </div>
                    }
                    {hasSort && 
                        <div className="flex items-center gap-1"> 
                            <label>Sort By</label>
                            <select
                                defaultValue={tableheader.sortBy}
                                name="sortBy" 
                                onChange={tableheader.setSortBy} 
                                className={`rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}
                            >
                                {tableheader.sortByOptions.map((option, index) => {
                                    return <option key={index} value={option.field}>{option.label}</option>
                                })}
                            </select>
                            <select
                                defaultValue={tableheader.orderBy}
                                name="sortOrder" 
                                onChange={tableheader.setOrderBy}
                                className={`rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}>
                                <option value="1">Ascending</option>
                                <option value="-1">Descending</option>
                            </select>
                        </div>
                    }
                    {hasButton &&
                        <button onClick={() => { customButton ? tableheader.customButtonMethod() : tableheader.setToggleAddForm() }} className="px-3 py-1 border border-gray-300 cursor-pointer rounded bg-white hover:text-white hover:bg-gray-500">
                            {tableheader.button}
                        </button>
                    }
                </div>
            </div>
            {hasSearch && 
                <div className="w-1/3 flex justify-end items-center gap-1 text-gray-700 text-sm">
                    <input 
                        name="search"
                        onKeyUp={tableheader.handleSearch}
                        autoComplete="off" 
                        type="text"
                        placeholder={tableheader.placeholder}
                        className="w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none"
                    />
                </div>
            }
        </div>
    )
}

export default TableHeader
