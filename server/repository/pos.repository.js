const Pos = require('../model/pos.model');

const fetch = async () => {
    const response = {};

    response.data = await Pos.find({});

    if(response.data.length > 0) {
        response.summary = await Pos.aggregate([
            {
                $group: {
                    _id: null,
                    amountDue: { $sum: "$total" },
                    totalDiscount:  { $sum: "$discount" }
                }
            }
        ]);
    }
    else response.summary = [{}];

    return response;
}

const create = async (resource) => {
    const response = {};

    response.data = await Pos.create(resource);
    response.summary = await Pos.aggregate([
        {
            $group: {
                _id: null,
                amountDue: { $sum: "$total" },
                totalDiscount:  { $sum: "$discount" }
            }
        }
    ]);

    return response;
}

const fetchById = async (id) => {
    return await Pos.findById(id);
}

const updateById = async (id, resource) => {
    const response = {};

    response.data = await Pos.findByIdAndUpdate(id, resource, { new: true });
    response.summary = await Pos.aggregate([
        {
            $group: {
                _id: null,
                amountDue: { $sum: "$total" },
                totalDiscount:  { $sum: "$discount" }
            }
        }
    ]);

    return response;
}

const deleteById = async (id) => {
    const response = {};

    response.data = await Pos.findByIdAndRemove(id, { new: true });
    response.summary = await Pos.aggregate([
        {
            $group: {
                _id: null,
                amountDue: { $sum: "$total" },
                totalDiscount:  { $sum: "$discount" }
            }
        }
    ]);

    return response;
}

module.exports = {
    fetch,
    create,
    fetchById,
    updateById,
    deleteById
}