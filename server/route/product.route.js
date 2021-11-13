const express = require('express')

const ProductController = require('../controller/product.controller');
const ErrorCatcher = require('../utility/error.catcher');
const Validator = require('../validator/product.validator');
const AuthMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.use(AuthMiddleware);

/** 
 * @route   api/products
 * @desc    GET fetch all products
 * @desc    POST create a product
 * @access  Private
 */

router.route('/')
      .get(ErrorCatcher(ProductController.fetch))
      .post(Validator.create, ErrorCatcher(ProductController.create));

/** 
 * @route   api/products/:id
 * @desc    GET fetch a product by id 
 * @desc    PUT update a product by id
 * @desc    DELETE remove a product by id
 * @access  Private
 */

router.route('/:id')
      .get(ErrorCatcher(ProductController.fetchById))
      .put(Validator.update, ErrorCatcher(ProductController.updateById))
      .patch(ErrorCatcher(ProductController.updateById))
      .delete(ErrorCatcher(ProductController.deleteById));

module.exports = router;