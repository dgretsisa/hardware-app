import API from '../config/axios.config';

class PosAPI {
    create = (resource) => API.post('/api/pos', resource);
    fetch = () => API.get('/api/pos');
    update = (id, resource) => API.put(`/api/pos/${id}`, resource);
    delete = (id) => API.delete(`/api/pos/${id}`);
}

export default new PosAPI();