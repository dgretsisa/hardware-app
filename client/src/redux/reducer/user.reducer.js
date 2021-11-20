import { Types } from '../types/user.types';

const initialState = {
    users: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.INITIALIZE_USERS:
            return {
                ...state,
                users: payload.users
            };
        case Types.ADD_USER_SUCCESS:
            return {
                ...state,
                users: [payload.user, ...state.users]
            }
        case Types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: [
                    ...state.users.map(user => {
                        return user._id === payload.user._id ? payload.user : user
                    })
                ]
            };
        case Types.DELETE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user._id !== payload.user._id)
            }
        default:
            return state;
    }
}

export default reducer