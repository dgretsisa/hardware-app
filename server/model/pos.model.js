const mongoose = require('mongoose');

const ProductSchema = require('./product.model').ProductSchema;

const PosSchema = new mongoose.Schema({
    product: ProductSchema,
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Pos', PosSchema);