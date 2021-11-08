const bcrypt = require('bcryptjs');

/** Model */
const User = require('../model/user.model');

const fetch = async () => {
    return await User.find({});
}

const create = async (resource) => {
    
    /** Hashing Password */
    const salt = await bcrypt.genSalt(10);
    resource.password = await bcrypt.hash(resource.password, salt);

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