const { check, validationResult } = require('express-validator');

const { ValidationError } = require('../utility/error.class');
const format = require('./validation.format');
const User = require('../model/user.model');

const create = [
    check('name')
        .notEmpty().withMessage('Name field is required!')
        .isLength({ min: 2 }).withMessage('Name should be atleast 2 characters!'),
    check('username')
        .notEmpty().withMessage('Username field is required!')
        .custom(value => User.validateUsername(value))
        .isLength({ min: 6 }).withMessage('Username should be atleast 6 characters!'),
    check('password')
        .notEmpty().withMessage('Password field is required!')
        .isLength({ min: 6 }).withMessage('Password should be atleast 6 characters!'),
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
        .notEmpty().withMessage('Name field is required!')
        .isLength({ min: 2 }).withMessage('Name should be atleast 2 characters!'),
    check('username')
        .optional()
        .notEmpty().withMessage('Username field is required!')
        .custom((value, { req }) => User.validateUsername(value, req.params.id))
        .isLength({ min: 6 }).withMessage('Username should be atleast 6 characters!'),
    check('password')
        .optional()
        .notEmpty().withMessage('Password field is required!')
        .isLength({ min: 6 }).withMessage('Password should be atleast 6 characters!'),
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