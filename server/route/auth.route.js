const express = require('express');

const router = express.Router();

/** Controller */
const AuthController = require('../controller/auth.controller');

/** Error Catcher */
const ErrorCatcher = require('../utility/error.catcher');

/** Middleware */
const authMiddleware = require('../middleware/auth.middleware');

router.route('/login').post(ErrorCatcher(AuthController.login));

module.exports = router;