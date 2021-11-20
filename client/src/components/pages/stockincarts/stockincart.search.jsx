import React from 'react'

const StockincartSearch = ({ resultProducts, handleSelectProduct }) => {
    return (
        <div className="w-full px-5 py-5 inline-block overflow-hidden border">
            <table className="mx-auto w-3/4 leading-normal">
                <tbody>
                    {resultProducts.length === 0 ? (
                        <tr>
                            <td colSpan="2" className="text-center text-gray-700 text-sm">
                                No exact matches found
                            </td>
                        </tr>
                        ):
                        resultProducts.map((product, index) => {
                            return (
                                <tr key={index} className="border border-gray-200">
                                    <td className="px-5 bg-white">
                                        <div className="flex items-center">
                                            <div className="flex gap-2 py-2 text-sm text-gray-900 whitespace-no-wrap">
                                                <div className="w-40">{product.productCode}</div>
                                                <div>{product.description}</div>
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
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default StockincartSearch
