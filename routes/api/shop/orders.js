const passport = require('passport');
const Router = require('express').Router();
const { postOrder, getOrders } = require('../../../controllers/shop/orders');

Router.route('/')
  .get(  passport.authenticate('jwt', { session: false }),getOrders)
  .post(passport.authenticate('jwt', { session: false }),postOrder);

module.exports = Router;
