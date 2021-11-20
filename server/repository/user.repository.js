const bcrypt = require('bcryptjs');

const User = require('../model/user.model');
const utility = require('../utility/utility.function');

const fetch = async (params) => {
    const { limit, skip, sortBy, orderBy, searchKeyword } = params;
    const sort = {};

    if(sortBy && orderBy) {
        sort[sortBy] = orderBy;
    }

    const response = {};
    response.totalRecords = await User.countDocuments({});

    if(searchKeyword) {
        const data =  await User.find({ $text : { $search: searchKeyword }}).skip(parseInt(skip)).limit(parseInt(limit)).sort(sort);
        response.data = data;
        response.totalRecords = data.length; 
    }
    else response.data = await User.find({}).skip(parseInt(skip)).limit(parseInt(limit)).sort(sort);

    return response;
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
    
    /** Hashing Password */
    const salt = await bcrypt.genSalt(10);
    resource.password? resource.password = await bcrypt.hash(resource.password, salt) : null;

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