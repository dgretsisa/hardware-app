import API from '../config/axios.config';

class AuthAPI {
    login = (credentials) => API.post('/auth/login', credentials);
}

export default new AuthAPI();