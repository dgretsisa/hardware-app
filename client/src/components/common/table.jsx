import React from 'react'

const Table = ({ columns, rows }) => {
    return (
        <div className="w-full inline-block overflow-hidden border">
            <table className="w-full leading-normal">
                <thead>
                    <tr key="trh">
                        {columns.map((column, index) => {
                            return <th key={index} scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-700  text-left text-xs  uppercase">
                                {column.name}
                            </th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={(columns.length -1)} className="text-center text-gray-700 text-sm py-3">There are no available data</td>
                        </tr>) : (
                        rows.map((row, index) => {
                            return <tr key={index}>
                                {columns.map((column, key) => {
                                    return <td key={key} className="px-5 border-b border-gray-200 bg-white">{ column.render(row) }</td>
                                })}
                            </tr>
                        }))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
