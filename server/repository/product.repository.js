const Product = require('../model/product.model');
const utility = require('../utility/utility.function');

const fetch = async () => {
    return await Product.find({});
}

const create = async (resource) => {
    /** Capitalize description */
    resource.description = utility.capitalizeWord(resource.description);
    resource.category = utility.capitalizeWord(resource.category);

    /** Lowercase the unit */
    resource.unit = resource.unit.toLowerCase();

    return await Product.create(resource);
}

const fetchById = async (id) => {
    return await Product.findById(id);
}

const updateById = async (id, resource) => {
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