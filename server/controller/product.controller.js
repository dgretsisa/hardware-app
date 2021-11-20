const ProductRepository = require('../repository/product.repository');
const utility = require('../utility/utility.function');

const fetch = async (req, res) => {
    const data = await ProductRepository.fetch(req.query);
    return res.status(200).json(data);
}

const create = async (req, res) => {
    const data = await ProductRepository.create(req.body);
    utility.broadcast(req, 'ADD_PRODUCT', data);
    return res.status(200).json(data);
}

const fetchById = async (req, res) => {
    const data = await ProductRepository.fetchById(req.params.id);
    return res.status(200).json(data);
}

const updateById = async (req, res) => {
    const data = await ProductRepository.updateById(req.params.id, req.body);
    utility.broadcast(req, 'UPDATE_PRODUCT', data);
    return res.status(200).json(data);
}

const deleteById = async (req, res) => {
    const data = await ProductRepository.deleteById(req.params.id);
    utility.broadcast(req, 'DELETE_PRODUCT', data);
    return res.status(200).json(data);
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}