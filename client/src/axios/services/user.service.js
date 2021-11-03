import API from '../config/axios.config';

class UserAPI {
    create = (resource) => API.post('/users', resource);
    fetch = () => API.get('/users');
    update = (id, resource) => API.put(`/users/${id}`, resource);
    delete = (id) => API.delete(`/users/${id}`);
}

export default new UserAPI();