const { check, validationResult } = require('express-validator');

const { ValidationError } = require('../utility/error.class');
const format = require('./validation.format');
const Product = require('../model/product.model').Product;
const utility = require('../utility/utility.function');

const create = [
    check('description')
        .notEmpty().withMessage('Description field is required!')
        .custom(value => Product.validateDescription(value))
        .isLength({ min: 2 }).withMessage('Description should be atleast 2 characters!'),
    check('productCode')
        .custom((value) => Product.validateProductCode(value))
        .notEmpty().withMessage('Product code field is required!')
        .isLength({ min: 2 }).withMessage('Product code should be atleast 2 characters!'),
    check('category')
        .notEmpty().withMessage('Category field is required!'),
    check('unit')
        .notEmpty().withMessage('Unit field is required!'),
    check('price')
        .notEmpty().withMessage('Price field is required!')
        .custom(value => utility.numberValidator(value, 'Price')),
    (req, res, next) => {
        const errors = validationResult(req).formatWith(format);

        if(!errors.isEmpty()) {
            throw new ValidationError('Failed to add product', errors.mapped());
        }
        next();
    }
];

const update = [
    check('productCode')
        .optional()
        .custom((value, { req }) => Product.validateProductCode(value, req.params.id))
        .notEmpty().withMessage('Product code field is required!')
        .isLength({ min: 2 }).withMessage('Product code should be atleast 2 characters!'),
    check('description')
        .optional()
        .notEmpty().withMessage('Description field is required!')
        .custom((value, { req }) => Product.validateDescription(value, req.params.id))
        .isLength({ min: 2 }).withMessage('Description should be atleast 2 characters!'),
    check('category')
        .optional()
        .notEmpty().withMessage('Category field is required!'),
    check('unit')
        .optional()
        .notEmpty().withMessage('Unit field is required!'),
    check('price')
        .optional()
        .notEmpty().withMessage('Price field is required!')
        .custom(value => utility.numberValidator(value, 'Price')),
    (req, res, next) => {
        const errors = validationResult(req).formatWith(format);

        if(!errors.isEmpty()) {
            throw new ValidationError('Failed to update user', errors.mapped());
        }
        next();
    }
];

module.exports = {
    create,
    update
};