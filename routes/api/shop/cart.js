const Router = require('express').Router();
const { getCart } = require('../../../controllers/shop/cart');

Router.route('/cart').get(getCart);

module.exports = Router;
