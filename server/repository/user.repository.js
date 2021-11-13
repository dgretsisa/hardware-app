const bcrypt = require('bcryptjs');

const User = require('../model/user.model');
const utility = require('../utility/utility.function');

const fetch = async () => {
    return await User.find({}).sort({createdAt: 'desc'});
}

const create = async (resource) => {
    /** Capitalize Name */
    resource.name = utility.capitalizeWord(resource.name);

    /** Hashing Password */
    const salt = await bcrypt.genSalt(10);
    resource.password = await bcrypt.hash(resource.password, salt);

    return await User.create(resource);
}

const fetchById = async (id) => {
    return await User.findById(id);
}

const updateById = async (id, resource) => {
    /** Capitalize Name */
    resource.name ? resource.name = utility.capitalizeWord(resource.name) : null;
    
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