import React from 'react'

const Table = ({ table, rows, pageLimit, sortFieldname, sortOrder, searchBy, handleSelect, handleSort, handleSearch, handleShow, setToggleAddForm, toggleAddForm, setToggleUpdateForm, toggleUpdateForm }) => {

    return (
        <div>
            <div className="flex items-center bg-gray-200 p-3 gap-5 px-5">
                <div className="flex flex-1 items-center">
                    <div className="flex items-center text-gray-700 text-sm gap-5">
                        <div className="mr-5 uppercase font-bold">{table.title}</div>
                        <div className="flex items-center gap-1">
                            <label>Show</label>
                            <select defaultValue={pageLimit} onChange={handleShow} className={`rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="500">500</option>
                                <option value="-1">All</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-1"> 
                            <label>Sort By</label>
                            <select defaultValue={sortFieldname} name="sortFieldname" onChange={(e) => { handleSelect(e); handleSort(); }} className={`rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}>
                                {table.sortFields.map((field, index) => <option key={index} value={field.field}>{field.name}</option>)}
                            </select>
                            <select defaultValue={sortOrder} name="sortOrder" onChange={(e) => { handleSelect(e); handleSort(); }} className={`rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}>
                                {table.sortOrders.map((order, index) => <option key={index} value={order.order}>{order.name}</option>)}
                            </select>
                            <button onClick={() => { setToggleAddForm(true); setToggleUpdateForm(false); }} className="px-3 py-1 border border-gray-300 cursor-pointer rounded bg-white hover:text-yellow-600 hover:bg-yellow-100">
                                {table.createButtonLabel}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-gray-700 text-sm">
                    <label>Search By</label>
                    <select defaultValue={searchBy} name="searchBy" onChange={(e) => { handleSelect(e) }} className={`rounded border-transparent border border-gray-300 py-1 px-1 bg-white text-gray-700 placeholder-gray-400 text-sm focus:outline-none`}>
                        {table.searchOptions.map((searchOpt, index) => <option key={index} value={searchOpt.field}>{searchOpt.name}</option>)}
                    </select>
                    <input 
                        onKeyUp={handleSearch} 
                        name="search" 
                        autoComplete="off" 
                        type="text" 
                        placeholder={table.searchPlaceholder} 
                        className="rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none"
                    />
                </div>
            </div>

            { toggleAddForm ? table.addForm() : null }
            { toggleUpdateForm ? table.updateForm() : null }

            <div className="w-full inline-block overflow-hidden">
                <table className="w-full leading-normal">
                    <thead>
                        <tr key="trh">
                            {table.columns.map((column, index) => {
                                return <th key={index} scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-xs  uppercase">
                                    {column.name}
                                </th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={(table.columns.length -1)} className="text-center text-gray-700 text-sm py-3">There are no available data</td>
                            </tr>) : (
                            rows.map((row, index) => {
                                return <tr key={index}>
                                    {table.columns.map((column, key) => {
                                        return <td key={key} className="px-5 border-b border-gray-200 bg-white">{ column.render(row) }</td>
                                    })}
                                </tr>
                            }))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
