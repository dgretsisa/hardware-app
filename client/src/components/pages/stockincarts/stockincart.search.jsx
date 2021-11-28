import React from 'react'

const StockincartSearch = ({ resultProducts, handleSelectProduct }) => {
    return (
        <div className="w-full px-5 py-5 inline-block overflow-hidden border">
            <table className="mx-auto flex flex-col items-center w-full leading-normal">
                <tbody>
                    {resultProducts.length === 0 ? (
                        <tr>
                            <td colSpan="2" className="text-center text-gray-700 text-sm">
                                No exact matches found
                            </td>
                        </tr>
                        ): (
                            <div className="flex flex-col items-center gap-3">
                                <tr><td colSpan="2" className="text-center text-sm font-semibold text-gray-600">SELECT PRODUCT TO ENTRY</td></tr>
                                {resultProducts.map((product, index) => {
                                    return (
                                        <tr key={index} className=" w-full flex justify-between items-center border border-gray-200">
                                            <td className="px-5 bg-white">
                                                <div className="flex items-center">
                                                    <div className="flex gap-2 py-2 text-sm text-gray-700 whitespace-no-wrap">
                                                        <div className="w-40">{product.productCode}</div>
                                                        <div className="w-60">{product.description}</div>
                                                        <div className="w-40">{product.category}</div>
                                                        <div className="">( by {product.unit} )</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 bg-white">
                                                <div className="flex items-center">
                                                    <div className="py-2 whitespace-no-wrap">
                                                        <button onClick={() => handleSelectProduct(product)} className="px-2 py-1 bg-gray-400 hover:bg-gray-500 text-xs text-white uppercase">Select</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </div>
                        )
                        
                    }
                </tbody>
            </table>
        </div>
    )
}

export default StockincartSearch
