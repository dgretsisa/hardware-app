import React from 'react'
import { useSelector } from 'react-redux'

const StockincartAdd = ({ selectedProduct, handleSubmit, handleCancel, handleInput, formInputs }) => {

    const { validationErrors } = useSelector(state => state.notificationReducer)

    return (
        <form onSubmit={handleSubmit} className="w-full py-5 px-5 justify-center items-center flex gap-2 text-sm text-gray-600 border">
            <div className="flex flex-col w-200">
                <label>Product</label>
                <div className="w-full flex-1">
                    <input
                        value={selectedProduct.description}
                        autoComplete="off"
                        type="text"
                        disabled
                        className={`${validationErrors.product && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.product &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.product}</p>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label>Stockin #</label>
                <div className="flex-1">
                    <input
                        defaultValue={formInputs.stockinNumber}
                        onChange={handleInput}
                        autoComplete="off"
                        name="stockinNumber" 
                        type="text"
                        placeholder="Stockin #"
                        className={`${validationErrors.stockinNumber && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.stockinNumber &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.stockinNumber}</p>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label>Quantity &nbsp; <span className="text-xs">( by { selectedProduct.unit } )</span></label>
                <div className="flex-1">
                    <input
                        defaultValue={formInputs.quantity}
                        onChange={handleInput}
                        autoComplete="off"
                        name="quantity" 
                        type="text"
                        placeholder="Quantity"
                        className={`${validationErrors.quantity && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.quantity &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.quantity}</p>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label></label>
                <div className="flex-1">
                    <input
                        value={selectedProduct.unit}
                        onChange={handleInput}
                        autoComplete="off"
                        name="unit" 
                        type="hidden"
                        placeholder="Unit"
                        className={`${validationErrors.unit && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.quantity &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.unit}</p>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label>Unit Cost</label>
                <div className="flex-1">
                    <input
                        defaultValue={formInputs.unitCost}
                        onChange={handleInput}
                        autoComplete="off"
                        name="unitCost" 
                        type="text"
                        placeholder="Unit Cost"
                        className={`${validationErrors.unitCost && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.unitCost &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.unitCost}</p>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label>Total Cost</label>
                <div className="flex-1">
                    <input
                        value={Number.isNaN(formInputs.totalCost) ? '' : formInputs.totalCost}
                        onChange={handleInput}
                        autoComplete="off"
                        name="totalCost" 
                        type="text"
                        placeholder="Total Cost"
                        className={`${validationErrors.totalCost && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.totalCost &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.totalCost}</p>
                    }
                </div>
            </div>
            <div className="">
                <label>&nbsp;</label>
                <button type="button" onClick={handleCancel} className="rounded text-sm text-gray-700 bg-white px-4 py-1 border border-gray-300">Cancel</button>
            </div>
            <div className="">
                <label>&nbsp;</label>
                <button type="submit" onClick={handleSubmit} className="rounded text-sm text-white bg-gray-400 px-4 py-1 hover:bg-gray-500">Add Stock</button>
            </div>
        </form>
    )
}

export default StockincartAdd
