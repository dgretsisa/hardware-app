const mongoose = require('mongoose');

const ProductSchema = require('./product.model').ProductSchema;

const StockincartSchema = mongoose.Schema({
    stockinNumber: {
        type: String,
        required: true
    },
    product: ProductSchema,
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
    },
    unitCost: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    }
},  {
    timestamps: true
})

module.exports = mongoose.model('Stockincart', StockincartSchema);