const Product = require('../model/product.model').Product;
const utility = require('../utility/utility.function');

const fetch = async (params) => {
    const { limit, skip, sortBy, orderBy, searchKeyword } = params;
    
    if(!sortBy && !orderBy) {
        sortBy = 'createdAt';
        orderBy = -1;
    }
    
    const response = {};
    response.totalRecords = await Product.countDocuments({});

    if(searchKeyword) {
        const searchRegex = new RegExp(utility.escapeRegex(searchKeyword), 'gi');
        const data =  await Product.find({ $or: [{productCode: searchRegex}, {description: searchRegex}, {category: searchRegex}, {unit: searchRegex}]}).skip(parseInt(skip)).limit(parseInt(limit)).sort([[ sortBy, orderBy ]]);
        response.data = data;
        response.totalRecords = data.length; 
    }
    else response.data = await Product.find({}).skip(parseInt(skip)).limit(parseInt(limit)).sort([[ sortBy, orderBy ]]);

    return response;
}

const create = async (resource) => {
    /** Capitalize description */
    resource.description ? resource.description = utility.capitalizeWord(resource.description) : null;
    resource.category ? resource.category = utility.capitalizeWord(resource.category) : null;

    /** Lowercase or Uppercase */
    resource.unit ? resource.unit = resource.unit.toLowerCase() : null;
    resource.productCode ? resource.productCode = resource.productCode.toUpperCase() : null;

    return await Product.create(resource);
}

const fetchById = async (id) => {
    return await Product.findById(id);
}

const updateById = async (id, resource) => {
    /** Capitalize description */
    resource.description ? resource.description = utility.capitalizeWord(resource.description) : null;
    resource.category ? resource.category = utility.capitalizeWord(resource.category) : null;

    /** Lowercase or Uppercase */
    resource.unit ? resource.unit = resource.unit.toLowerCase() : null;
    resource.productCode ? resource.productCode = resource.productCode.toUpperCase() : null;
    
    return await Product.findByIdAndUpdate(id, resource, { new: true });
}

const deleteById = async (id) => {
    return await Product.findByIdAndRemove(id, { new: true });
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}