const StockinCart = require('../model/stockin.cart.model');

const fetch = async () => {
    const response = {};

    const data =  await StockinCart.find({});
    response.data = data;
    response.totalRecords = data.length;

    return response;
}

const create = async (resource) => {
    /** Uppercase */
    resource.stockinNumber ? resource.stockinNumber = resource.stockinNumber.toUpperCase(): null;

    return await StockinCart.create(resource);
}

const fetchById = async (id) => {
    return await StockinCart.findById(id);
}

const updateById = async (id, resource) => {
    return await StockinCart.findByIdAndUpdate(id, resource, { new: true });
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