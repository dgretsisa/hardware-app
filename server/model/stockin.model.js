const mongoose = require('mongoose');
const Product = require('./product.model');

const StockinSchema = mongoose.Schema({
    stockinNumber: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    },
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

StockinSchema.post('insertMany', function(stockins, next) {
    stockins.map(stockin => {
        Product.findById(stockin.product, function(error, product){
            product.quantity = parseFloat(product.quantity) + parseFloat(stockin.quantity);
            product.save();
        })
    })

    next();
});

module.exports = mongoose.model('Stockin', StockinSchema);