import React from 'react'
import { useSelector } from 'react-redux'

const PosUpdate = ({ selectedRow, handleSubmit, handleCancel, handleInput, formInputs }) => {

    const { validationErrors } = useSelector(state => state.notificationReducer)

    return (
        <form onSubmit={handleSubmit} className="w-full py-5 px-5 justify-center items-center flex gap-2 text-sm text-gray-600 border">
            <div className="flex flex-col w-200">
                <label>Product</label>
                <div className="w-full flex-1">
                    <input
                        value={selectedRow.product.description}
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
                <label>Price </label>
                <div className="flex-1">
                    <input
                        defaultValue={selectedRow.price}
                        onChange={handleInput}
                        autoComplete="off"
                        name="price"
                        type="text"
                        placeholder="Price"
                        disabled
                        className={`${validationErrors.price && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.price &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.price}</p>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label>Quantity &nbsp; <span className="text-xs">( by {selectedRow.unit} )</span></label>
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
                        value={selectedRow.unit}
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
                <label>Discount</label>
                <div className="flex-1">
                    <input
                        defaultValue={formInputs.discount}
                        onChange={handleInput}
                        autoComplete="off"
                        name="discount"
                        type="text"
                        placeholder="Discount"
                        className={`${validationErrors.discount && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.discount &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.discount}</p>
                    }
                </div>
            </div>
            <div className="flex flex-col">
                <label>Total</label>
                <div className="flex-1">
                    <input
                        value={Number.isNaN(formInputs.total) ? '' : formInputs.total}
                        onChange={handleInput}
                        autoComplete="off"
                        name="total"
                        type="text"
                        placeholder="Total"
                        className={`${validationErrors.total && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.total &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.total}</p>
                    }
                </div>
            </div>
            <div className="mt-5">
                <label>&nbsp;</label>
                <button type="button" onClick={handleCancel} className="rounded text-sm text-gray-700 bg-white px-4 py-1 border border-gray-300">Cancel</button>
            </div>
            <div className="mt-5">
                <label>&nbsp;</label>
                <button type="submit" onClick={handleSubmit} className="rounded text-sm text-white bg-gray-400 px-4 py-1 hover:bg-gray-500">Update</button>
            </div>
        </form>
    )
}

export default PosUpdate
