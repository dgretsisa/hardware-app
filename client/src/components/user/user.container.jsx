import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';

import UserHeader from './user.header';
import UserList from './user.list';
import ModalAdd from './modals/modal.add';
import ModalUpdate from './modals/modal.update';

/** Redux */
import { userAddModalShow } from '../../redux/action/modal.action';
import { createUser, createUserSocket, fetchUser, selectUpdateUser, updateUser, updateUserSocket, selectDeleteUser, deleteUser, deleteUserSocket } from '../../redux/action/user.action';
import { cancel, clear } from '../../redux/action/general.action';

/** Context */
import { SocketContext } from '../../context/websocket.context';

/** Utility Functions */
import * as utility from '../functions/utility.function';

const UserContainer = () => {
    const navigate = useNavigate();
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

    /** Socket */
    const socket = useContext(SocketContext);

    /** Redux States */
    const { userAddModal, userUpdateModal } = useSelector(state => state.modalReducer);
    const { validationErrors } = useSelector(state => state.notificationReducer);
    const { users, selectedUser } = useSelector(state => state.userReducer);

    /** Socket Listeners */
    useEffect(() => {
        dispatch(fetchUser()); 
        socket.on('ADD_USER', user => dispatch(createUserSocket(user)));
        socket.on('UPDATE_USER', data => dispatch(updateUserSocket(data.id, data.user)));
        socket.on('DELETE_USER', user => dispatch(deleteUserSocket(user)));
        
        return () => socket.disconnect();
    },[]);

    useEffect(() => {
        setDisplayUsers(users);
    }, [users]);

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
    
        setDisplayUsers(utility.search(users, 'name', e.target.value));
    }

    const sortByDateRange = () => {
        setDisplayUsers(utility.sortByDateRange(users, "createdAt", '2021-11-05', '2022-11-02'));
    }

    const sortByAscending = (fieldName) => {
        setDisplayUsers(utility.sortByAscending(users, fieldName));
    }

    const sortByDescending = (fieldName) => {
        setDisplayUsers(utility.sortByDescending(users, fieldName));
    }

    /** Helper Functions */
    const resetForm = () => {
        setAddInputs({ name: '', username: '', password: ''});
        setUpdateInputs({ name: '', username: '', role: '', isActive: ''});
    }

    const formatDate = (date) => {
        return moment(date).format("MMM. DD, YYYY");
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
        <div className="w-full px-10 py-10">
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
