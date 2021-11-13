import React from 'react'
import { useSelector } from 'react-redux'

const ProductAdd = ({ handleSubmit, handleCancel, handleInput }) => {

    const { validationErrors } = useSelector(state => state.notificationReducer)

    return (
        <form onSubmit={handleSubmit} className="w-full py-5 px-5 justify-center items-center flex gap-2 text-sm text-gray-600 border">
            <div className="">
                <label>Description</label>
                <div className="flex-1">
                    <input
                        onChange={handleInput}
                        autoComplete="off"
                        name="description" 
                        type="text"
                        placeholder="Description"
                        className={`${validationErrors.description && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.description &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.description}</p>
                    }
                </div>
            </div>
            <div className="">
                <label>Code #</label>
                <div className="flex-1">
                    <input
                        onChange={handleInput}
                        autoComplete="off"
                        name="productCode" 
                        type="text"
                        placeholder="Code #"
                        className={`${validationErrors.productCode && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.productCode &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.productCode}</p>
                    }
                </div>
            </div>
            <div className="">
                <label>Category</label>
                <div className="flex-1">
                    <input
                        onChange={handleInput}
                        autoComplete="off"
                        name="category" 
                        type="text"
                        placeholder="Category"
                        className={`${validationErrors.category && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.category &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.category}</p>
                    }
                </div>
            </div>
            <div className="">
                <label>Quantity</label>
                <div className="flex-1">
                    <input
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
            <div className="">
                <label>Unit</label>
                <div className="flex-1">
                    <input
                        onChange={handleInput}
                        autoComplete="off"
                        name="unit" 
                        type="text"
                        placeholder="Unit"
                        className={`${validationErrors.unit && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.unit &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.unit}</p>
                    }
                </div>
            </div>
            <div className="">
                <label>Price</label>
                <div className="flex-1">
                    <input
                        onChange={handleInput}
                        autoComplete="off"
                        name="price" 
                        type="text"
                        placeholder="Price"
                        className={`${validationErrors.price && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                    />
                    {validationErrors.price &&
                        <p className="text-red-600 text-xs pt-1">{validationErrors.price}</p>
                    }
                </div>
            </div>
            <div className="">
                <label>&nbsp;</label>
                <button type="button" onClick={handleCancel} className="rounded text-sm text-white bg-gray-400 px-4 py-1 hover:bg-gray-600">Cancel</button>
            </div>
            <div className="">
                <label>&nbsp;</label>
                <button type="submit" onClick={handleSubmit} className="rounded text-sm text-white bg-yellow-600 px-4 py-1 hover:bg-yellow-700">Create</button>
            </div>
        </form>
    )
}

export default ProductAdd
