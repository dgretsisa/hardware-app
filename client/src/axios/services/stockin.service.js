import API from '../config/axios.config';

class StockinAPI {
    create = (resource) => API.post('/api/stockins', resource);
    fetch = (params) => API.get('/api/stockins', { params: params });
    update = (id, resource) => API.put(`/api/stockins/${id}`, resource);
    delete = (id) => API.delete(`/api/stockins/${id}`);
}

export default new StockinAPI();