import axios from 'axios'

const API = axios.create({
    baseURL: "/auth",
    responseType: "json"
});

class AuthAPI {
    login = (credentials) => API.post('/login', credentials);
}

export default new AuthAPI();