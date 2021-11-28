import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PencilIcon, XIcon } from '@heroicons/react/solid';
import * as helper from '../../helper.function';
import TableHeader from '../../common/table.header';
import Table from '../../common/table';
import Pagination from '../../common/pagination';
import UserAdd from './user.add';
import UserUpdate from './user.update';
import UserDelete from './user.delete';

import { fetchUsers, addUser, updateUser, deleteUser } from '../../../redux/action/user.action';
import { clearLogs, hideAlert } from '../../../redux/action/notification.action';

const UserIndex = () => {
    const dispatch = useDispatch();

    const { users } = useSelector(state => state.userReducer);
    const { authUser } = useSelector(state => state.authReducer);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [sortBy, setSortBy] = useState('createdAt');
    const [orderBy, setOrderBy] = useState('-1');
    const [formInputs, setFormInputs] = useState({});
    const [toggleAddForm, setToggleAddForm] = useState(false);
    const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectedRow, setSelectedRow] = useState({});
    
    const tableheader = {
        title: 'Users',
        button: '+ Add New User',
        placeholder: 'Search User',
        pageLimit: pageLimit,
        sortBy: sortBy,
        orderBy: orderBy,
        sortByOptions: [
            { label: 'Date', field: 'createdAt' },
            { label: 'Name', field: 'name' },
            { label: 'Username', field: 'username' },
            { label: 'Role', field: 'role' },
        ],
        setPageLimit: (e) => setPageLimit(e.target.value),
        setSortBy: (e) => setSortBy(e.target.value),
        setOrderBy: (e) => setOrderBy(e.target.value),
        setToggleAddForm: () => { 
            setToggleAddForm(true); 
            setToggleUpdateForm(false);
        },
        handleSearch: (e) => debounceHandleSearch(e),
    }

    const columns = [
        { name: 'Name', render: (row) => tdTemplate(row.name)},
        { name: 'Username', render: (row) => tdTemplate(row.username)},
        { name: 'Role', render: (row) => tdTemplate(row.role)},
        { name: 'Status', render: (row) => tdTemplate(row.isActive ? 'Active': 'Inactive')},
        { name: 'Date Added', render: (row) => tdTemplate(helper.formatDate(row.createdAt))},
        { name: '', render: (row) => tdActions(row)}
    ]

    const tdTemplate = (value) => {
        return (<div className="flex items-center">
           <div className="py-1.5 text-sm text-gray-900 whitespace-no-wrap">
                { value }
            </div>
        </div>)
    }

    const tdActions = (row) => {
        return ( <div className="flex gap-3 divide-x">
            <div className="pl-3">
                <PencilIcon onClick={() => (!toggleUpdateForm && !toggleDelete) && handleUpdateRow(row)} className="w-5 h-5 text-gray-600 cursor-pointer" />
            </div>
            {(authUser._id !== row._id) &&
                <div className="pl-3">
                    <XIcon onClick={() => (!toggleDelete && !toggleUpdateForm) && handleDeleteRow(row)} className="w-5 h-5 text-red-400 cursor-pointer" />
                </div>
            }
        </div>);
    }

    /** Initialize Users */
    useEffect(() => {
        dispatch(fetchUsers({ currentPage, pageLimit, sortBy, orderBy }))
        .then(total => setTotalRecords(total)).catch(error => handleHideAlert());
    }, [currentPage, pageLimit, sortBy, orderBy, dispatch])

    const handleSearch = (e) => {
        e.preventDefault();

        dispatch(fetchUsers({ currentPage, pageLimit, sortBy, orderBy, searchKeyword: e.target.value }))
        .then(total => setTotalRecords(total)).catch(error => handleHideAlert());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(toggleAddForm) {
            dispatch(addUser(formInputs)).then(() => {
                setFormInputs({});
                setToggleAddForm(false);
            }).catch(() => {});
        }

        if(toggleUpdateForm) {
            dispatch(updateUser(selectedRow._id,formInputs)).then(() => {
                setFormInputs({});
                setToggleUpdateForm(false);
                setSelectedRow({});
            }).catch(() => {});
        }

        if(toggleDelete) {
            dispatch(deleteUser(selectedRow._id)).then(() => {
                setToggleDelete(false);
                setSelectedRow({});
            }).catch(() => {});
        }

        handleHideAlert();
    }

    const handleChangePassword = (e) => {
        e.preventDefault();

         dispatch(updateUser(selectedRow._id, { password: formInputs.password })).then(() => {
            setFormInputs({});
            setToggleUpdateForm(false);
            setSelectedRow({});
        }).catch(() => {});

        handleHideAlert();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setToggleAddForm(false);
        setToggleUpdateForm(false);
        setToggleDelete(false);
        setSelectedRow({});

        dispatch(clearLogs());
    }

    const handleUpdateRow = (row) => {
        setToggleUpdateForm(true);
        setToggleAddForm(false);

        setSelectedRow(row);
        setFormInputs({
            name: row.name,
            username: row.username,
            role: row.role,
            isActive: row.isActive,
        });
    }

    const handleDeleteRow = (row) => {
        setToggleDelete(true);
        setToggleUpdateForm(false);
        setToggleAddForm(false);

        setSelectedRow(row);
    }

    const handleHideAlert = () => {
        /** This close the alert after 5 seconds */
        setTimeout(() => {
            dispatch(hideAlert())
        }, 5000)
    }

    const handleSelectPage = (page) => {
        setCurrentPage(page);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    /** Handle Inputs Select */
    const handleInput = (e) => {
        e.preventDefault();

        if(e.target.name === 'password') setFormInputs({...formInputs, password : e.target.value });
        else setFormInputs(formInputs => ({...formInputs, [e.target.name]: e.target.value}));
    }

    /** Debounce */
    const debounceHandleSearch = helper.debounce(handleSearch, 800);

    return ( 
        <div className="w-full px-10">
            <TableHeader 
                tableheader={tableheader}
                hasShow={true}
                hasSort={true}
                hasSearch={true}
                hasButton={true}
            />
            {toggleAddForm && 
                <UserAdd 
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }
            {toggleUpdateForm && 
                <UserUpdate 
                    formInputs={formInputs}
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    handleChangePassword={handleChangePassword}
                />
            }
            {toggleDelete && 
                <UserDelete 
                    selectedRow={selectedRow}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                />
            }
            <Table 
                columns={columns}
                rows={users}
            />
            {users.length > 0 &&
                <Pagination 
                    currentPage={currentPage}
                    pageLimit={pageLimit}
                    totalRecords={totalRecords}
                    handleSelectPage={handleSelectPage}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
            }
        </div>
    )
}

export default UserIndex
