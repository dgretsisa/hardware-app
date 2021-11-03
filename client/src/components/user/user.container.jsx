import React, { useContext, useEffect, useState } from 'react'
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

const UserContainer = () => {
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

    /** Socket */
    const socket = useContext(SocketContext);

    /** Redux States */
    const { userAddModal, userUpdateModal } = useSelector(state => state.modalReducer);
    const { loader } = useSelector(state => state.loaderReducer);
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

    const handleDelete = (user) => {
        dispatch(selectDeleteUser(user));
        dispatch(deleteUser(user._id));
    }

    const selectUpdateItem = (user) => {
        dispatch(selectUpdateUser(user));
        populateUpdateData();
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
        <div className="w-full">
            <UserHeader totalUsers={users.length} showModal={handleUserAddModalShow}/>
            <UserList 
                loader={loader} 
                users={users}
                updateButton={selectUpdateItem}
                deleteButton={handleDelete}
                formatDate={formatDate}
            />
            <ModalAdd 
                loader={loader}
                modal={userAddModal}
                inputs={addInputs}
                validationErrors={validationErrors}
                handleInputChange={handleAddInputChange}
                handleCreate={handleCreate} 
                handleCancel={handleCancel}
            />
            <ModalUpdate
                loader={loader}
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
