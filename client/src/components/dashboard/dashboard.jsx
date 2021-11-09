import React from 'react'
import { useNavigate } from 'react-router'


import { UsersIcon, EyeIcon, CubeIcon, DatabaseIcon, CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/react/solid'

const Dashboard = ({ users }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full px-10 flex justify-center items-center gap-10 text-xs">
            <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-red-500 to-red-400 text-white rounded">
                <div className="flex justify-between items-end gap-10 p-5">
                    <div>
                        <p className="text-2xl">{ users.length }</p>
                        <p className="uppercase">Users</p>
                    </div>
                    <UsersIcon className="h-7 w-7 flex-1" />
                </div>
                <div onClick={() => navigate('/users')} className="flex justify-center items-center gap-2 px-5 py-2 text-red-900 font-bold text-center text-xs cursor-pointer">
                    <EyeIcon className="h-5 w-5" /> View Users
                </div>
            </div>
            <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-green-500 to-green-400 text-white rounded">
                <div className="flex justify-between items-end gap-10 p-5">
                    <div>
                        <p className="text-2xl">100</p>
                        <p className="uppercase">Products</p>
                    </div>
                    <CubeIcon className="h-7 w-7 flex-1" />
                </div>
                <div className="flex justify-center items-center gap-2 px-5 py-2 text-green-900 font-bold text-center text-xs cursor-pointer">
                    <EyeIcon className="h-5 w-5" /> View Products
                </div>
            </div>
            <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded">
                <div className="flex justify-between items-end gap-10 p-5">
                    <div>
                        <p className="text-2xl">2</p>
                        <p className="uppercase">Stock in</p>
                    </div>
                    <DatabaseIcon className="h-7 w-7 flex-1" />
                </div>
                <div className="flex justify-center items-center gap-2 px-5 py-2 text-blue-900 font-bold text-center text-xs cursor-pointer">
                    <EyeIcon className="h-5 w-5" /> View Stock in
                </div>
            </div>
            <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-gray-400 to-gray-300 text-white rounded">
                <div className="flex justify-between items-end gap-10 p-5">
                    <div>
                        <p className="text-2xl">10,000.00</p>
                        <p className="uppercase">Current Sales</p>
                    </div>
                    <CurrencyDollarIcon className="h-7 w-7 flex-1" />
                </div>
                <div className="flex justify-center items-center gap-2 px-5 py-2 text-gray-900 font-bold text-center text-xs cursor-pointer">
                    <EyeIcon className="h-5 w-5" /> View Sales
                </div>
            </div>
            <div className="flex flex-col divide-y-4 w-1/6 bg-gradient-to-r from-indigo-500 to-indigo-400 text-white rounded">
                <div className="flex justify-between items-end gap-10 p-5">
                    <div>
                        <p className="text-2xl">15</p>
                        <p className="uppercase">Invoices</p>
                    </div>
                    <DocumentTextIcon className="h-7 w-7 flex-1" />
                </div>
                <div className="flex justify-center items-center gap-2 px-5 py-2 text-indigo-900 font-bold text-center text-xs cursor-pointer">
                    <EyeIcon className="h-5 w-5" /> View Invoices
                </div>
            </div>
        </div>
    )
}

export default Dashboard
