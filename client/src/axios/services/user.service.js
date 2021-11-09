import API from '../config/axios.config';

class UserAPI {
    create = (resource) => API.post('/api/users', resource);
    fetch = () => API.get('/api/users');
    update = (id, resource) => API.put(`/api/users/${id}`, resource);
    delete = (id) => API.delete(`/api/users/${id}`);
}

export default new UserAPI();