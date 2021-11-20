const express = require('express')

const StockinController = require('../controller/stockin.controller');
const ErrorCatcher = require('../utility/error.catcher');
const Validator = require('../validator/stockin.cart.validator');
const AuthMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.use(AuthMiddleware);

/** 
 * @route   api/stockins
 * @desc    GET fetch all stockins
 * @desc    POST create a stockin
 * @access  Private
 */

router.route('/')
      .get(ErrorCatcher(StockinController.fetch))
      .post(ErrorCatcher(StockinController.create));

/** 
 * @route   api/stockins/:id
 * @desc    GET fetch a stockin by id 
 * @desc    PUT update a stockin by id
 * @desc    DELETE remove a stockin by id
 * @access  Private
 */

router.route('/:id')
      .get(ErrorCatcher(StockinController.fetchById))
      .put(Validator.update, ErrorCatcher(StockinController.updateById))
      .patch(ErrorCatcher(StockinController.updateById))
      .delete(ErrorCatcher(StockinController.deleteById));

module.exports = router;