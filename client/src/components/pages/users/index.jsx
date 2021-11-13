import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PencilIcon, XIcon } from '@heroicons/react/solid';
import * as utility from '../../functions/utility.function';
import Table from '../../common/table';
import UserAdd from './user.add';
import UserUpdate from './user.update';
import Pagination from '../../common/pagination';

import { addUser, updateUser } from '../../../redux/action/user.action';
import { clearLogs, hideAlert } from '../../../redux/action/notification.action';

const UserIndex = () => {
    const dispatch = useDispatch();
    
    const { users } = useSelector(state => state.userReducer);
    const [filteredUsers, setfilteredUsers] = useState([]);
    const [sortedUsers, setsortedUsers] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortFieldname, setSortFieldname] = useState('name');
    const [sortOrder, setSortOrder] = useState('ascending');
    const [searchBy, setSearchBy] = useState('name');
    const [toggleAddForm, setToggleAddForm] = useState(false);
    const [toggleUpdateForm, setToggleUpdateForm] = useState(false);
    const [formInputs, setFormInputs] = useState({});
    const [passwordInput, setPasswordInput] = useState('');
    const [selectedUpdateRowId, setSelectedUpdateRowId] = useState(null);

    const table = {
        title: 'Users',
        createButtonLabel: '+ Create User',
        searchPlaceholder: 'Search user',
        columns: [
            { name: 'Name', render: (row) => tdTemplate(row.name)},
            { name: 'Role', render: (row) => tdTemplate(row.role)},
            { name: 'Username', render: (row) => tdTemplate(row.username)},
            { name: 'Status', render: (row) => tdTemplate(row.isActive ? 'active' : 'inactive')},
            { name: 'Created', render: (row) => tdTemplate(utility.formatDate(row.createdAt))},
            { name: '', render: (row) => tdActions(row)}
        ],
        sortFields: [
            { name: 'Name', field: 'name'},
            { name: 'Username', field: 'username'},
            { name: 'Created', field: 'createdAt'}
        ],
        sortOrders: [
            { name: 'Ascending', order: 'ascending'},
            { name: 'Descending', order: 'descending'}
        ],
        searchOptions: [
            { name: 'Name', field: 'name'},
            { name: 'Username', field: 'username'}
        ],
        addForm: () => (<UserAdd 
            handleSubmit={handleSubmit} 
            handleCancel={handleCancel} 
            setToggleAddForm={setToggleAddForm}
            handleInput={handleInput}
        />),
        updateForm: () => (<UserUpdate
            handleSubmit={handleSubmit} 
            handleCancel={handleCancel} 
            setToggleUpdateForm={setToggleUpdateForm}
            handleInput={handleInput}
            formInputs={formInputs}
            handleChangePassword={handleChangePassword}
        />)
    }
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
                <PencilIcon onClick={() => !toggleUpdateForm ? handleRowUpdate(row): {}} className="w-5 h-5 text-gray-600 cursor-pointer" />
            </div>
            <div className="pl-3">
                <XIcon onClick={() => {}} className="w-5 h-5 text-red-400 cursor-pointer" />
            </div>
        </div>);
    }

    useEffect(() => {
        if(isSorted) {
            setfilteredUsers(utility.paginate(sortedUsers, currentPage, pageLimit));
            setTotalRecords(sortedUsers.length)
        }
        else {
            setfilteredUsers(utility.paginate(users, currentPage, pageLimit));
            setTotalRecords(users.length)
        }
    }, [users, currentPage, pageLimit, isSorted, sortedUsers])

    const handleSelectPage = (page) => {
        setCurrentPage(page);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleSort = () => {
        setIsSorted(true);
        if(sortOrder === 'ascending') setsortedUsers(utility.sortByAscending(users, sortFieldname))
        if(sortOrder === 'descending') setsortedUsers(utility.sortByDescending(users, sortFieldname))
    }

    const handleShow = (e) => {
        setCurrentPage(1);

        if(e.target.value === "-1") setPageLimit(totalRecords);
        else setPageLimit(e.target.value);
    }

    const handleSearch = (e) => {
        
        if(isSorted) {
            const result = utility.search(sortedUsers, searchBy, e.target.value);
            setfilteredUsers(utility.paginate(result, currentPage, pageLimit));
            setTotalRecords(result.length)
        }
        else {
            const result = utility.search(users, searchBy, e.target.value);
            setfilteredUsers(utility.paginate(result, currentPage, pageLimit));
            setTotalRecords(result.length)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSorted(false);

        if(toggleAddForm) {
            dispatch(addUser(formInputs)).then(() => {
                setToggleAddForm(false);
                setFormInputs({});
            }).catch(error => {})
        }

        if(toggleUpdateForm) {
            dispatch(updateUser(selectedUpdateRowId, formInputs)).then(() => {
                setToggleUpdateForm(false);
                setSelectedUpdateRowId(null);
                setFormInputs({});
                setPasswordInput('');
            }).catch(error => {})
        }

        handleHideAlert();
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        setIsSorted(false);

        dispatch(updateUser(selectedUpdateRowId, { password : passwordInput })).then(() => {
            setToggleUpdateForm(false);
            setSelectedUpdateRowId(null);
            setFormInputs({});
            setPasswordInput('');
        }).catch(error => {})
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setToggleAddForm(false);
        setToggleUpdateForm(false);
        setSelectedUpdateRowId(null);
        setFormInputs({});
        setPasswordInput('');
        dispatch(clearLogs());
    }

    const handleRowUpdate = (row) => {
        setToggleAddForm(false);
        setToggleUpdateForm(true);
        setSelectedUpdateRowId(row._id);
        setFormInputs({
            name: row.name,
            username: row.username,
            role: row.role,
            isActive: row.isActive
        });
    }

    const handleHideAlert = () => {
        /** This close the alert after 5 seconds */
        setTimeout(() => {
            dispatch(hideAlert())
        }, 5000)
    }

    /** Input, Select */
    const handleSelect = (e) => {
        e.preventDefault();

        if(e.target.name === 'sortFieldname') setSortFieldname(e.target.value)
        if(e.target.name === 'sortOrder') setSortOrder(e.target.value)
        if(e.target.name === 'searchBy') setSearchBy(e.target.value)
    }

    const handleInput = (e) => {
        e.preventDefault();
        
        setFormInputs(formInputs => ({...formInputs, [e.target.name]: e.target.value}))

        if(e.target.name === 'password') setPasswordInput(e.target.value)
    }

    return ( 
        <div className="w-full px-10">
            <Table 
                table={table} 
                rows={filteredUsers}
                pageLimit={pageLimit}
                sortFieldname={sortFieldname}
                sortOrder={sortOrder}
                searchBy={searchBy}
                handleSelect={handleSelect}
                handleSort={handleSort}
                handleSearch={handleSearch}
                handleShow={handleShow}
                setToggleAddForm={setToggleAddForm}
                toggleAddForm={toggleAddForm}
                setToggleUpdateForm={setToggleUpdateForm}
                toggleUpdateForm={toggleUpdateForm}
            />
            <Pagination 
                currentPage={currentPage}
                pageLimit={pageLimit} 
                totalRecords={totalRecords}
                handleSelectPage={handleSelectPage}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        </div>
    )
}

export default UserIndex
