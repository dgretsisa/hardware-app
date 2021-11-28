const Stockin = require('../model/stockin.model');
const Stockincart = require('../model/stockin.cart.model');
const utility = require('../utility/utility.function');

const fetch = async (params) => {
    const { limit, skip, sortBy, orderBy, searchKeyword } = params;
    
    if(!sortBy && !orderBy) {
        sortBy = 'createdAt';
        orderBy = -1;
    }

    const response = {};
    response.totalRecords = await Stockin.countDocuments({});
    
    if(searchKeyword) {
        const searchRegex = new RegExp(utility.escapeRegex(searchKeyword), 'gi');
        const data = await Stockin.find({ $or: [{stockinNumber: searchRegex}, { 'product.description': searchRegex }] }).skip(parseInt(skip)).limit(parseInt(limit)).sort([[ sortBy, orderBy ]]);

        response.data = data;
        response.totalRecords = data.length; 
    }
    else response.data = await Stockin.find({}).skip(parseInt(skip)).limit(parseInt(limit)).sort([[ sortBy, orderBy ]]);

    return response;
}

const create = async (resource) => {
    const stockins = await Stockin.insertMany(resource);
    await Stockincart.deleteMany({});

    return stockins;
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