const { check, validationResult } = require('express-validator');

const { ValidationError } = require('../utility/error.class');
const format = require('./validation.format');

const create = [
    check('name')
        .notEmpty().withMessage('Name field is required!'),
    check('username')
        .notEmpty().withMessage('Username field is required!'),
    check('password')
        .notEmpty().withMessage('Password field is required!'),
    (req, res, next) => {
        const errors = validationResult(req).formatWith(format);

        if(!errors.isEmpty()) {
            throw new ValidationError('Failed to add user', errors.mapped());
        }
        next();
    }
];

const update = [
    check('name')
        .optional()
        .notEmpty().withMessage('Name field is required!'),
    check('username')
        .optional()
        .notEmpty().withMessage('Username field is required!'),
    check('password')
        .optional()
        .notEmpty().withMessage('Password field is required!'),
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