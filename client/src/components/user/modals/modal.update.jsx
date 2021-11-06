import React, { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react';
import { UserCircleIcon, PencilAltIcon, CheckCircleIcon } from '@heroicons/react/solid';

const ModalUpdate = ({ modal, user, inputs, validationErrors, handleInputChange, handleUpdate, handleCancel, formatDate }) => {
    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 bg-opacity-80"
                onClose={() => {}}
                >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                    >
                    &#8203;
                    </span>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                    >
                    <div className="inline-block xl:w-3/5 lg:w-3/5 md:3/5 sm:full p-5 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <div className="flex justify-center  ">
                            <div className="w-1/2 flex flex-col gap-10 pr-5">
                                <div className="flex flex-col items-center">
                                    <UserCircleIcon className="w-40 text-gray-500"/>
                                    <h4 className="text-gray-700 text-lg">{user.name}</h4>
                                    <p className="text-gray-600 text-sm">{user.username}</p>
                                    <p className={`w-24 text-white text-xs text-center mt-3 ${user.isActive ? 'bg-green-700' : 'bg-red-700'} p-1.5 rounded`}>{user.role}</p>
                                </div>
                                <div className="divide-y-4 divide-gray-200">
                                    <div className="flex gap-3 text-gray-600 text-sm p-3">
                                        <CheckCircleIcon className="w-5 text-gray-500"/>
                                        <p className="w-14">Status</p>
                                        <p>: &nbsp; {user.isActive ? 'Active': 'Inactive'}</p>
                                    </div>
                                    <div className="flex gap-3 text-gray-600 text-sm p-3">
                                        <CheckCircleIcon className="w-5 text-gray-500"/>
                                        <p className="w-14">Created</p>
                                        <p>: &nbsp; {formatDate(user.createdAt)}</p>
                                    </div>
                                    <div className="flex gap-3 text-gray-600 text-sm p-3">
                                        <CheckCircleIcon className="w-5 text-gray-500"/>
                                        <p className="w-14">Updated</p>
                                        <p>: &nbsp; {formatDate(user.updatedAt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 pl-5 bg-gray-200 p-5 rounded">
                                <form onSubmit={handleUpdate} className="flex flex-col gap-7 text-gray-600 text-sm">
                                    <div className="flex justify-center gap-2 pt-10">
                                        <PencilAltIcon className="w-5 text-gray-500"/>
                                        <h4 className="text-lg tracking-wider">Edit User Account</h4>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <label className="w-20"><span className="text-red-600">*</span> Full Name</label>
                                        <div className="flex-1">
                                            <input 
                                                autoComplete="off"
                                                name="name" 
                                                type="text"
                                                defaultValue={inputs.name}
                                                onChange={handleInputChange}
                                                className={`${validationErrors.name && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                                            />
                                            {validationErrors.name &&
                                                <p className="text-red-600 text-xs pt-1">{validationErrors.name}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <label className="w-20"><span className="text-red-600">*</span> Username</label>
                                        <div className="flex-1">
                                            <input
                                                autoComplete="off"
                                                name="username"
                                                type="text"
                                                defaultValue={inputs.username}
                                                onChange={handleInputChange}
                                                className={`${validationErrors.username && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                                            />
                                            {validationErrors.username &&
                                                <p className="text-red-600 text-xs pt-1">{validationErrors.username}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <label className="w-20"><span className="text-red-600">*</span> Role</label>
                                        <div className="flex-1">
                                            <select
                                                name="role"
                                                defaultValue={inputs.role}
                                                onChange={handleInputChange}
                                                className={`w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                                            >
                                                <option value="User">User</option>
                                                <option value="Administrator">Administrator</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <label className="w-20"><span className="text-red-600">*</span> Status </label>
                                        <div className="flex-1">
                                            <select
                                                name="isActive"
                                                defaultValue={inputs.isActive}
                                                onChange={handleInputChange}
                                                className={`w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                                            >
                                                <option value="true">Active</option>
                                                <option value="false">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                                <div className="flex justify-end gap-5 mt-8">
                                    <button onClick={handleCancel} className="rounded text-gray-600 text-sm bg-white px-4 py-2 border hover:bg-gray-400">Cancel</button>
                                    <button onClick={handleUpdate} className="rounded text-white text-sm bg-green-700 px-4 py-2 hover:bg-green-800">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalUpdate
