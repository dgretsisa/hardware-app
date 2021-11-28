const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    unit: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    }
},{
    timestamps: true
});

ProductSchema.statics.validateDescription = function(description, id=null) {
    if(id === null) {
        return this.find({ description })
        .then(products => {
            if(products.length > 0) return Promise.reject('Product already exist!');
        });
    }
    else{
        return this.find({ _id: { $ne: id }, description }).then(products => {
            if(products.length > 0) return Promise.reject('Product already exist!');
        });
    }
}

ProductSchema.statics.validateProductCode = function(productCode, id=null) {
    if(id === null) {
        return this.find({ productCode : productCode.toUpperCase() })
        .then(products => {
            if(products.length > 0) return Promise.reject('Product code already exist!');
        });
    }
    else{
        return this.find({ _id: { $ne: id }, productCode : productCode.toUpperCase() }).then(products => {
            if(products.length > 0) return Promise.reject('Product code already exist!');
        });
    }
}

ProductSchema.statics.validateProductId = function(id) {
    return this.find({ _id: id })
    .then(() => true)
    .catch(() => Promise.reject('Product does not exist!'));
}

const Product = mongoose.model('Product', ProductSchema);

module.exports = { Product, ProductSchema };