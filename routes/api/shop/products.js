const Router = require('express').Router();
const { getProducts } = require('../../../controllers/shop/products');

Router.route('/').get(getProducts);

module.exports = Router;
