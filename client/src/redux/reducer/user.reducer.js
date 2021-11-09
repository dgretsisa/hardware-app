import { Types } from '../types/user.types';

const initialState = {
    users: [],
    resource: null,
    selectedUser: {}
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.CREATE_USER_REQUEST:
            return {
                ...state,
                resource: payload.resource
            }
        case Types.CREATE_USER_SUCCESS:
            return {
                ...state,
                users: [
                    payload.user, ...state.users
                ]
            };
        case Types.FETCH_USER_SUCCESS:
            return {
                ...state,
                users: payload.users
            };
        case Types.ASSIGN_SELECTED_USER:
            return {
                ...state,
                selectedUser: payload.user
            };
        case Types.UPDATE_USER_REQUEST:
            return {
                ...state,
                resource: payload.resource
            }
        case Types.UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: [
                    ...state.users.map(user => {
                        return user._id === payload.id ? payload.user : user
                    })
                ]
            };
        case Types.DELETE_USER_REQUEST:
            return {
                ...state,
                resource: payload.id
            }
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