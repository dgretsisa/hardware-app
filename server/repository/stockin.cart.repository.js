const StockinCart = require('../model/stockin.cart.model');

const fetch = async () => {
    const response = {};

    const data =  await StockinCart.find({}).populate('product');
    response.data = data;
    response.totalRecords = data.length;

    return response;
}

const create = async (resource) => {
    /** Uppercase */
    resource.stockinNumber ? resource.stockinNumber = resource.stockinNumber.toUpperCase(): null;

    const response =  await StockinCart.create(resource);

    return await response.populate('product');
}

const fetchById = async (id) => {
    return await StockinCart.findById(id).populate('product');
}

const updateById = async (id, resource) => {
    return await StockinCart.findByIdAndUpdate(id, resource, { new: true }).populate('product');
}

const deleteById = async (id) => {
    return await StockinCart.findByIdAndRemove(id, { new: true });
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}