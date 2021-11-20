const Stockin = require('../model/stockin.model');

const fetch = async () => {
    return await Stockin.find({});
}

const create = async (resource) => {
    return await Stockin.insertMany(resource);
}

const fetchById = async (id) => {
    return await Stockin.findById(id);
}

const updateById = async (id, resource) => {
    return await Stockin.findByIdAndUpdate(id, resource, { new: true });
}

const deleteById = async (id) => {
    return await Stockin.findByIdAndRemove(id, { new: true });
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}