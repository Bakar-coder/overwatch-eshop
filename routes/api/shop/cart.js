const passport = require('passport');
const Router = require('express').Router();
const { getCart, postCart } = require('../../../controllers/shop/cart');

Router.route('/')
  .get(passport.authenticate('jwt', { session: false }), getCart)
  .post(passport.authenticate('jwt', { session: false }), postCart);

module.exports = Router;
