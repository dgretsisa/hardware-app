const StockinCartRepository = require('../repository/stockin.cart.repository');
const utility = require('../utility/utility.function');

const fetch = async (req, res) => {
    const data = await StockinCartRepository.fetch();
    return res.status(200).json(data);
}

const create = async (req, res) => {
    const data = await StockinCartRepository.create(req.body);
    utility.broadcast(req, 'ADD_STOCKIN_CART', data);
    return res.status(200).json(data);
}

const fetchById = async (req, res) => {
    const data = await StockinCartRepository.fetchById(req.params.id);
    return res.status(200).json(data);
}

const updateById = async (req, res) => {
    const data = await StockinCartRepository.updateById(req.params.id, req.body);
    utility.broadcast(req, 'UPDATE_STOCKIN_CART', data);
    return res.status(200).json(data);
}

const deleteById = async (req, res) => {
    const data = await StockinCartRepository.deleteById(req.params.id);
    utility.broadcast(req, 'DELETE_STOCKIN_CART', data);
    return res.status(200).json(data);
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}