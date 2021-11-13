const express = require('express');

const AuthController = require('../controller/auth.controller');
const ErrorCatcher = require('../utility/error.catcher');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

/** 
 * @route   auth/login
 * @desc    POST login a user
 * @access  Public
 */

router.route('/login').post(ErrorCatcher(AuthController.login));

module.exports = router;