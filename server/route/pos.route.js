const express = require('express')

const PosController = require('../controller/pos.controller');
const ErrorCatcher = require('../utility/error.catcher');
const Validator = require('../validator/pos.validator');
const AuthMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.use(AuthMiddleware);

/** 
 * @route   api/pos
 * @desc    GET fetch all pos entries
 * @desc    POST create a pos entry
 * @access  Private
 */

router.route('/')
      .get(ErrorCatcher(PosController.fetch))
      .post(Validator.create, ErrorCatcher(PosController.create));

/** 
 * @route   api/pos/:id
 * @desc    GET fetch a pos entry by id 
 * @desc    PUT update a pos entry by id
 * @desc    DELETE remove a pos entry by id
 * @access  Private
 */

router.route('/:id')
      .get(ErrorCatcher(PosController.fetchById))
      .put(Validator.update, ErrorCatcher(PosController.updateById))
      .patch(ErrorCatcher(PosController.updateById))
      .delete(ErrorCatcher(PosController.deleteById));

module.exports = router;