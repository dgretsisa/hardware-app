import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/** Components */
import UserHeader from './user.header';
import UserList from './user.list';
import ModalAdd from './modals/modal.add';
import ModalUpdate from './modals/modal.update';
import Pagination from '../common/pagination';

/** Redux */
import { userAddModalShow } from '../../redux/action/modal.action';
import { createUser, selectUpdateUser, updateUser, selectDeleteUser, deleteUser } from '../../redux/action/user.action';
import { cancel, clear } from '../../redux/action/general.action';

/** Context */
import { SocketContext } from '../../context/websocket.context';

/** Utility Functions */
import * as utility from '../functions/utility.function';

const UserContainer = ({ users }) => {
    const dispatch = useDispatch();

    /** Input Fields */
    const [addInputs, setAddInputs] = useState({
        name: '',
        username: '',
        password: ''
    })

    const [updateInputs, setUpdateInputs] = useState({
        name: '',
        username: '',
        role: '',
        isActive: ''
    })

    const [displayUsers, setDisplayUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(10);
    const indexEnd = Math.ceil(currentPage * pageLimit);
    const indexStart = Math.ceil(indexEnd - pageLimit);

    /** Socket */
    const socket = useContext(SocketContext);

    /** Redux States */
    const { userAddModal, userUpdateModal } = useSelector(state => state.modalReducer);
    const { validationErrors } = useSelector(state => state.notificationReducer);
    const { selectedUser } = useSelector(state => state.userReducer);

    /** Socket Listeners */
    useEffect(() => {
        setDisplayUsers(paginate(users));
    }, [users, currentPage]);

    useEffect(() => {
        populateUpdateData();
    }, [selectedUser])

    /** Dispatcher Functions */
    const handleUserAddModalShow = () => { 
        dispatch(userAddModalShow()); 
    }

    const handleAddInputChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setAddInputs(addInputs => ({
            ...addInputs,
            [name]: value
        }));
    }

    const handleUpdateInputChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        setUpdateInputs(updateInputs => ({
            ...updateInputs,
            [name]: value
        }));
    }

    const handleCancel = () => {
        dispatch(cancel());
        resetForm();
    }

    const handleCreate = (e) => {
        e.preventDefault();

        dispatch(createUser(addInputs))
        .then(() => {
            /** Clear Forms and Errors */
            dispatch(clear())
            resetForm();
        })
        .catch(() => {});
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        
        dispatch(updateUser(selectedUser._id, updateInputs))
        .then(() => {
            /** Clear Forms and Errors */
            dispatch(clear())
            resetForm();
        })
        .catch(() => {});
    }

    const selectUpdateItem = (user) => {
        dispatch(selectUpdateUser(user));
        populateUpdateData();
    }

    const handleDelete = (user) => {
        dispatch(selectDeleteUser(user));
        dispatch(deleteUser(user._id));
    }

    const handleSearch = (e) => {
        e.preventDefault();
    
        setDisplayUsers(paginate(utility.search(users, 'name', e.target.value)));
    }

    const sortByDateRange = () => {
        setDisplayUsers(paginate(utility.sortByDateRange(users, "createdAt", '2021-11-05', '2022-11-02')));
    }

    const sortByAscending = (fieldName) => {
        setDisplayUsers(paginate(utility.sortByAscending(users, fieldName)));
    }

    const sortByDescending = (fieldName) => {
        setDisplayUsers(paginate(utility.sortByDescending(users, fieldName)));
    }

    const paginate = (array) => {
        return array.slice(indexStart, indexEnd);
    }

    const changePage = (page) => {
        setCurrentPage(page);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    /** Helper Functions */
    const resetForm = () => {
        setAddInputs({ name: '', username: '', password: ''});
        setUpdateInputs({ name: '', username: '', role: '', isActive: ''});
    }

    const formatDate = (date) => {
        return utility.formatDate(date);
    }

    const populateUpdateData = () => {
        if(selectedUser !== null) setUpdateInputs({
            name: selectedUser.name,
            username: selectedUser.username,
            role: selectedUser.role,
            isActive: selectedUser.isActive,
        });
    }

    return (
        <div className="w-full px-10">
            <UserHeader 
                showModal={handleUserAddModalShow}
                handleSearch={handleSearch}
                sortByAscending={sortByAscending}
                sortByDescending={sortByDescending}
            />
            <UserList  
                users={displayUsers}
                updateButton={selectUpdateItem}
                deleteButton={handleDelete}
                formatDate={formatDate}
            />
            <Pagination
                currentPage={currentPage}
                pageLimit={pageLimit} 
                totalRecords={users.length}
                changePage={changePage}
                prevPage={prevPage}
                nextPage={nextPage}
            />
            <ModalAdd 
                modal={userAddModal}
                inputs={addInputs}
                validationErrors={validationErrors}
                handleInputChange={handleAddInputChange}
                handleCreate={handleCreate} 
                handleCancel={handleCancel}
            />
            <ModalUpdate
                modal={userUpdateModal}
                user={selectedUser}
                formatDate={formatDate}
                inputs={updateInputs}
                validationErrors={validationErrors}
                handleInputChange={handleUpdateInputChange}
                handleUpdate={handleUpdate}
                handleCancel={handleCancel}
            />
        </div>
    )
}

export default UserContainer
