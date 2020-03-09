const passport = require('passport');
const Router = require('express').Router();
const {
  postAddProduct,
  postAdminEditProduct,
  postAdminDeleteProduct,
  getCart
} = require('../../../controllers/admin/products');

Router.route('/add-product').post(
  passport.authenticate('jwt', { session: false }),
  postAddProduct
);

Router.route('/edit-product').post(
  passport.authenticate('jwt', { session: false }),
  postAdminEditProduct
);

Router.route('/delete-product').post(
  passport.authenticate('jwt', { session: false }),
  postAdminDeleteProduct
);

module.exports = Router;
