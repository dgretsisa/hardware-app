import { Types } from '../types/auth.types';

const initialState = {
    token: JSON.parse(localStorage.getItem("token")) || null,
    isAuthenticated: !!localStorage.getItem("token") || false,
    authUser: JSON.parse(localStorage.getItem("user")) || {}
}

const reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case Types.LOGIN_REQUEST:
            return {
                ...state,
                credentials: payload.credentials
            };
        case Types.LOGIN_SUCCESS:
            

            return {
                ...state,
                isAuthenticated: true,
                authUser: payload.user,
                token: payload.user.token
            };
        case Types.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authUser: {},
                token: null
            };
        default:
            return state;
    }
}

export default reducer