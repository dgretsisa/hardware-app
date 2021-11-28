const { check, validationResult } = require('express-validator');

const { ValidationError } = require('../utility/error.class');
const format = require('./validation.format');
const Product = require('../model/product.model').Product;
const utility = require('../utility/utility.function');

const create = [
    check('product')
        .notEmpty().withMessage('Product field is required!')
        .custom(value => Product.validateProductId(value._id)),
    check('quantity')
        .notEmpty().withMessage('Quantity field is required!')
        .custom(value => utility.numberValidator(value, 'Quantity')),
    check('discount')
        .optional()
        .custom(value => utility.numberValidatorDiscount(value, 'Discount')),
    check('total')
        .notEmpty().withMessage('Total field is required!')
        .custom(value => utility.numberValidator(value, 'Total')),
    (req, res, next) => {
        const errors = validationResult(req).formatWith(format);

        if(!errors.isEmpty()) {
            throw new ValidationError('Failed to add entry', errors.mapped());
        }
        next();
    }
];

const update = [
    check('product')
        .optional()
        .notEmpty().withMessage('Product field is required!')
        .custom(value => Product.validateProductId(value._id)),
    check('quantity')
        .optional()
        .notEmpty().withMessage('Quantity field is required!')
        .custom(value => utility.numberValidator(value, 'Quantity')),
    check('discount')
        .optional()
        .custom(value => utility.numberValidatorDiscount(value, 'Discount')),
    check('total')
        .optional()
        .notEmpty().withMessage('Total field is required!')
        .custom(value => utility.numberValidator(value, 'Total')),
    (req, res, next) => {
        const errors = validationResult(req).formatWith(format);

        if(!errors.isEmpty()) {
            throw new ValidationError('Failed to update stock', errors.mapped());
        }
        next();
    }
];

module.exports = {
    create,
    update
};