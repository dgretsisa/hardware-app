const StockinRepository = require('../repository/stockin.repository');
const Product = require('../model/product.model').Product;
const utility = require('../utility/utility.function');

const fetch = async (req, res) => {
    const data = await StockinRepository.fetch(req.query);
    return res.status(200).json(data);
}

const create = async (req, res) => {
    const data = await StockinRepository.create(req.body);
    utility.broadcast(req, 'ADD_STOCKIN', data);
    
    data.map(async(stockin) => {
        const quantity = parseFloat(stockin.product.quantity) + parseFloat(stockin.quantity);
        const product = await Product.findByIdAndUpdate(stockin.product._id, { quantity }, { new: true });
        utility.broadcast(req, 'UPDATE_PRODUCT', product);
    });

    return res.status(200).json(data);
}

const fetchById = async (req, res) => {
    const data = await StockinRepository.fetchById(req.params.id);
    return res.status(200).json(data);
}

const updateById = async (req, res) => {
    const data = await StockinRepository.updateById(req.params.id, req.body);
    utility.broadcast(req, 'UPDATE_STOCKIN', data);
    return res.status(200).json(data);
}

const deleteById = async (req, res) => {
    const data = await StockinRepository.deleteById(req.params.id);
    utility.broadcast(req, 'DELETE_STOCKIN', data);
    return res.status(200).json(data);
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}