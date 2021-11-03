const express = require('express')

const router = express.Router();

/** Controllers */
const UserController = require('../controller/user.controller');

/** Error Catcher */
const ErrorCatcher = require('../utility/error.catcher');

/** Validator */
const Validator = require('../validator/user.validator');

/** 
 * @route   api/users
 * @desc    GET fetch all users
 * @desc    POST create a user
 * @access  Public
 */

router.route('/')
      .get(ErrorCatcher(UserController.fetch))
      .post(Validator.create, ErrorCatcher(UserController.create));

/** 
 * @route   api/list/:id
 * @desc    GET fetch a list by id 
 * @desc    PUT update a list by id
 * @desc    DELETE remove a list by id
 * @access  Public
 */

router.route('/:id')
      .get(ErrorCatcher(UserController.fetchById))
      .put(Validator.update, ErrorCatcher(UserController.updateById))
      .patch(ErrorCatcher(UserController.updateById))
      .delete(ErrorCatcher(UserController.deleteById));

module.exports = router;