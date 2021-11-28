import React from 'react'
import { useNavigate } from 'react-router'

import { EyeIcon, DatabaseIcon, CurrencyDollarIcon, DocumentTextIcon, RefreshIcon, PaperClipIcon, CalculatorIcon, ClipboardIcon, DocumentDuplicateIcon } from '@heroicons/react/solid'

const UserDashboard = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col gap-10">
            <div className="w-full px-10 flex justify-center items-center gap-10 text-xs">
                <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-green-500 to-green-400 text-white rounded">
                    <div className="flex justify-between items-end gap-10 p-5">
                        <div>
                            <p className="text-2xl"></p>
                            <p className="uppercase tracking-widest">POS</p>
                        </div>
                        <CalculatorIcon className="h-7 w-7 flex-1" />
                    </div>
                    <div onClick={() => navigate('/pos')} className="flex justify-center items-center gap-2 px-5 py-2 text-green-900 font-bold text-center text-xs cursor-pointer">
                        <EyeIcon className="h-5 w-5" /> View POS
                    </div>
                </div>
                <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-gray-400 to-gray-300 text-white rounded">
                    <div className="flex justify-between items-end gap-10 p-5">
                        <div>
                            <p className="text-2xl"></p>
                            <p className="uppercase">Sales</p>
                        </div>
                        <CurrencyDollarIcon className="h-7 w-7 flex-1" />
                    </div>
                    <div className="flex justify-center items-center gap-2 px-5 py-2 text-gray-700 font-bold text-center text-xs cursor-pointer">
                        <EyeIcon className="h-5 w-5" /> View Sales
                    </div>
                </div>
                <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded">
                    <div className="flex justify-between items-end gap-10 p-5">
                        <div>
                            <p className="text-2xl"></p>
                            <p className="uppercase">Receipts</p>
                        </div>
                        <DocumentTextIcon className="h-7 w-7 flex-1" />
                    </div>
                    <div className="flex justify-center items-center gap-2 px-5 py-2 text-indigo-900 font-bold text-center text-xs cursor-pointer">
                        <EyeIcon className="h-5 w-5" /> View Receipts
                    </div>
                </div>
            </div>
            <div className="w-full px-10 flex justify-center items-center gap-10 text-xs">
                <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded">
                    <div className="flex justify-between items-end gap-10 p-5">
                        <div>
                            <p className="text-2xl"></p>
                            <p className="uppercase">Orders</p>
                        </div>
                        <ClipboardIcon className="h-7 w-7 flex-1" />
                    </div>
                    <div onClick={() => {}} className="flex justify-center items-center gap-2 px-5 py-2 text-purple-900 font-bold text-center text-xs cursor-pointer">
                        <EyeIcon className="h-5 w-5" /> View Orders
                    </div>
                </div>
                <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded">
                    <div className="flex justify-between items-end gap-10 p-5">
                        <div>
                            <p className="text-2xl"></p>
                            <p className="uppercase">Credits</p>
                        </div>
                        <PaperClipIcon className="h-7 w-7 flex-1" />
                    </div>
                    <div onClick={() => {}} className="flex justify-center items-center gap-2 px-5 py-2 text-yellow-900 font-bold text-center text-xs cursor-pointer">
                        <EyeIcon className="h-5 w-5" /> View Credits
                    </div>
                </div>
                <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-red-500 to-red-400 text-white rounded">
                    <div className="flex justify-between items-end gap-10 p-5">
                        <div>
                            <p className="text-2xl"></p>
                            <p className="uppercase">Refunds</p>
                        </div>
                        <RefreshIcon className="h-7 w-7 flex-1" />
                    </div>
                    <div onClick={() => {}} className="flex justify-center items-center gap-2 px-5 py-2 text-red-900 font-bold text-center text-xs cursor-pointer">
                        <EyeIcon className="h-5 w-5" /> View Refunds
                    </div>
                </div>
            </div>
            <div className="w-full px-10 flex justify-center items-center gap-10 text-xs">
                <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-indigo-400 to-indigo-300 text-white rounded">
                    <div className="flex justify-between items-end gap-10 p-5">
                        <div>
                            <p className="text-2xl"></p>
                            <p className="uppercase">Payments</p>
                        </div>
                        <DocumentDuplicateIcon className="h-7 w-7 flex-1" />
                    </div>
                    <div onClick={() => {}} className="flex justify-center items-center gap-2 px-5 py-2 text-indigo-600 font-bold text-center text-xs cursor-pointer">
                        <EyeIcon className="h-5 w-5" /> View Payments
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
