const express = require('express')

const StockinCartController = require('../controller/stockin.cart.controller');
const ErrorCatcher = require('../utility/error.catcher');
const Validator = require('../validator/stockin.cart.validator');
const AuthMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.use(AuthMiddleware);

/** 
 * @route   api/stockins/cart
 * @desc    GET fetch all stock in cart
 * @desc    POST create a stock in a cart
 * @access  Private
 */

router.route('/')
      .get(ErrorCatcher(StockinCartController.fetch))
      .post(Validator.create, ErrorCatcher(StockinCartController.create));

/** 
 * @route   api/stockins/cart/:id
 * @desc    GET fetch a stock in a cart by id 
 * @desc    PUT update a stock in a cart by id
 * @desc    DELETE remove a stock in a cart by id
 * @access  Private
 */

router.route('/:id')
      .get(ErrorCatcher(StockinCartController.fetchById))
      .put(Validator.update, ErrorCatcher(StockinCartController.updateById))
      .patch(ErrorCatcher(StockinCartController.updateById))
      .delete(ErrorCatcher(StockinCartController.deleteById));

module.exports = router;