const { check, validationResult } = require('express-validator');

const { ValidationError } = require('../utility/error.class');
const format = require('./validation.format');
const Product = require('../model/product.model');
const utility = require('../utility/utility.function');

const create = [
    check('stockinNumber')
        .notEmpty().withMessage('Stockin number field is required!')
        .isLength({ min: 2 }).withMessage('Stockin number should be atleast 2 characters!'),
    check('product')
        .notEmpty().withMessage('Product field is required!')
        .custom(value => Product.validateProductId(value)),
    check('quantity')
        .notEmpty().withMessage('Quantity field is required!')
        .custom(value => utility.numberValidator(value, 'Quantity')),
    check('unitCost')
        .notEmpty().withMessage('Unit cost field is required!')
        .custom(value => utility.numberValidator(value, 'Unit cost')),
    check('totalCost')
        .notEmpty().withMessage('Total cost field is required!')
        .custom(value => utility.numberValidator(value, 'Total cost')),
    (req, res, next) => {
        const errors = validationResult(req).formatWith(format);

        if(!errors.isEmpty()) {
            throw new ValidationError('Failed to add stock', errors.mapped());
        }
        next();
    }
];

const update = [
    check('stockinNumber')
        .optional()
        .notEmpty().withMessage('Stockin number field is required!')
        .isLength({ min: 2 }).withMessage('Stockin number should be atleast 2 characters!'),
    check('product')
        .optional()
        .notEmpty().withMessage('Product field is required!')
        .custom(value => Product.validateProductId(value)),
    check('quantity')
        .optional()
        .notEmpty().withMessage('Quantity field is required!')
        .custom(value => utility.numberValidator(value, 'Quantity')),
    check('unitCost')
        .optional()
        .notEmpty().withMessage('Unit cost field is required!')
        .custom(value => utility.numberValidator(value, 'Unit cost')),
    check('totalCost')
        .optional()
        .notEmpty().withMessage('Total cost field is required!')
        .custom(value => utility.numberValidator(value, 'Total cost')),
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