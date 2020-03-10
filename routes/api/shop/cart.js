const passport = require('passport');
const Router = require('express').Router();
const {
  getCart,
  postAddCart,
  postDeleteCart,
  postDecrementCartItem
} = require('../../../controllers/shop/cart');

Router.route('/')
  .get(passport.authenticate('jwt', { session: false }), getCart)
  .post(passport.authenticate('jwt', { session: false }), postAddCart);

Router.route('/delete').post(
  passport.authenticate('jwt', { session: false }),
  postDeleteCart
);

Router.route('/decrement').post(
  passport.authenticate('jwt', { session: false }),
  postDecrementCartItem
);

module.exports = Router;
