import React from 'react'
import { useSelector } from 'react-redux';

/** Components */
import AdminDashboard from './admin.dashboard';
import UserDashboard from './user.dashboard';

const Dashboard = ({ users }) => {
    const { authUser } = useSelector(state => state.authReducer);

    return (
        <div>
            { authUser && authUser.role === 'Administrator' ? <AdminDashboard users={users} /> : <UserDashboard /> }
        </div>
    )
}

export default Dashboard
