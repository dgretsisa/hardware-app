import React, { Fragment } from 'react'

import { Dialog, Transition } from '@headlessui/react';

const ModalAdd = ({ modal, inputs, validationErrors, handleInputChange, handleCreate, handleCancel }) => {
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
                    <div className="inline-block xl:w-1/3 lg:w-1/2 md:w-1/2 sm:1/2 p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <Dialog.Title
                        as="h3"
                        className="text-xl text-center font-medium leading-6 text-gray-600 tracking-wider"
                        >
                        Create New User
                        </Dialog.Title>
                            <div className="my-8">
                                <form  onSubmit={handleCreate} className="flex flex-col gap-7 text-gray-600 text-sm">
                                    <div className="flex items-center gap-5">
                                        <label><span className="text-red-600">*</span> Full Name</label>
                                        <div className="flex-1">
                                            <input 
                                                autoComplete="off"
                                                name="name" 
                                                value={inputs.name} 
                                                onChange={handleInputChange} 
                                                type="text" 
                                                className={`${validationErrors.name && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                                            />
                                            {validationErrors.name &&
                                                <p className="text-red-600 text-xs pt-1">{validationErrors.name}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <label><span className="text-red-600">*</span> Username</label>
                                        <div className="flex-1">
                                            <input
                                                autoComplete="off"
                                                name="username" 
                                                value={inputs.username}
                                                onChange={handleInputChange} 
                                                type="text" 
                                                className={`${validationErrors.username && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                                            />
                                            {validationErrors.username &&
                                                <p className="text-red-600 text-xs pt-1">{validationErrors.username}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <label><span className="text-red-600">*</span> Password</label>
                                        <div className="flex-1">
                                            <input 
                                                autoComplete="off"
                                                name="password" 
                                                value={inputs.password} 
                                                onChange={handleInputChange} 
                                                type="password" 
                                                className={`${validationErrors.password && 'border-red-600'} w-full rounded border-transparent border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none`}
                                            />
                                            {validationErrors.password &&
                                                <p className="text-red-600 text-xs pt-1">{validationErrors.password}</p>
                                            }
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="flex justify-end gap-5 mt-4">
                                <button onClick={handleCancel} className="rounded text-gray-600 text-sm bg-gray-200 px-4 py-2 border hover:bg-gray-300">Cancel</button>
                                <button onClick={handleCreate} className="rounded text-sm text-white bg-yellow-600 px-4 py-2 hover:bg-yellow-700">Create</button>
                            </div>
                    </div>
                    </Transition.Child>
                </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalAdd
