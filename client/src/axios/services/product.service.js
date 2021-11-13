import API from '../config/axios.config';

class ProductAPI {
    create = (resource) => API.post('/api/products', resource);
    fetch = () => API.get('/api/products');
    update = (id, resource) => API.put(`/api/products/${id}`, resource);
    delete = (id) => API.delete(`/api/products/${id}`);
}

export default new ProductAPI();