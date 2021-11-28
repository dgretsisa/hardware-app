import React from 'react'

import * as helper from '../../helper.function';

const Table = ({ posSummary }) => {
    return (
        <div className="w-full pr-72 mt-5 text-sm">
            {Object.keys(posSummary).length > 0 ?
                <>
                    <div className="flex justify-end items-center gap-1 text-right">
                        <div className="w-52 text-gray-800">Subtotal</div>
                        <div className="w-32 text-gray-800">{helper.formatNumber(parseFloat(posSummary.amountDue))}</div>
                    </div>
                    <div className="flex justify-end items-center gap-1 text-right">
                        <div className="w-52 text-gray-800">Discount</div>
                        <div className="w-32 text-gray-800">{helper.formatNumber(parseFloat(posSummary.totalDiscount))}</div>
                    </div>
                    <div className="flex justify-end items-center gap-1 text-right mt-3 font-bold">
                        <div className="w-52 text-gray-800">Amount Due</div>
                        <div className="w-32 text-gray-800">₱ {helper.formatNumber(parseFloat(posSummary.amountDue))}</div>
                    </div>
                </> : null
            }
        </div>
    )
}

export default Table
