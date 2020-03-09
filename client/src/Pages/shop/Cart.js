import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cart from '../../components/shop/cart';

const ShoppingCart = ({ cart }) => {
  return (
    <div className='section section-top'>
      {cart &&
        cart.map((cartItem, index) => <Cart cart={cartItem} key={index} />)}
    </div>
  );
};

ShoppingCart.propTypes = {};

const mapState = ({ products }) => ({ cart: products.cart });

export default { component: connect(mapState, null)(ShoppingCart) };
