const Pos = require('../model/pos.model');

const fetch = async () => {
    return await Pos.find({});
}

const create = async (resource) => {
    return await Pos.create(resource);
}

const fetchById = async (id) => {
    return await Pos.findById(id);
}

const updateById = async (id, resource) => {
    return await Pos.findByIdAndUpdate(id, resource, { new: true });
}

const deleteById = async (id) => {
    return await Pos.findByIdAndRemove(id, { new: true });
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}