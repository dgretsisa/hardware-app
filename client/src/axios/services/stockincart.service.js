import API from '../config/axios.config';

class StockincartAPI {
    create = (resource) => API.post('/api/stockins/cart', resource);
    fetch = () => API.get('/api/stockins/cart');
    update = (id, resource) => API.put(`/api/stockins/cart/${id}`, resource);
    delete = (id) => API.delete(`/api/stockins/cart/${id}`);
}

export default new StockincartAPI();