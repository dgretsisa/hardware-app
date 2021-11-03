const User = require('../model/user.model');

const fetch = async () => {
    return await User.find({});
}

const create = async (resource) => {
    return await User.create(resource);
}

const fetchById = async (id) => {
    return await User.findById(id);
}

const updateById = async (id, resource) => {
    return await User.findByIdAndUpdate(id, resource, { new: true });
}

const deleteById = async (id) => {
    return await User.findByIdAndRemove(id, { new: true });
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}