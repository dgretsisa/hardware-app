const express = require('express')

const UserController = require('../controller/user.controller');
const ErrorCatcher = require('../utility/error.catcher');
const Validator = require('../validator/user.validator');
const AuthMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.use(AuthMiddleware);

/** 
 * @route   api/users
 * @desc    GET fetch all users
 * @desc    POST create a user
 * @access  Private
 */

router.route('/')
      .get(ErrorCatcher(UserController.fetch))
      .post(Validator.create, ErrorCatcher(UserController.create));

/** 
 * @route   api/users/:id
 * @desc    GET fetch a user by id 
 * @desc    PUT update a user by id
 * @desc    DELETE remove a user by id
 * @access  Private
 */

router.route('/:id')
      .get(ErrorCatcher(UserController.fetchById))
      .put(Validator.update, ErrorCatcher(UserController.updateById))
      .patch(ErrorCatcher(UserController.updateById))
      .delete(ErrorCatcher(UserController.deleteById));

module.exports = router;