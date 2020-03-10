import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Cart from '../../components/shop/cart';
import { bindActionCreators } from 'redux';
import {
  deleteCartItem,
  productDeccrement,
  addToCart
} from '../../state/actions';

const ShoppingCart = ({
  cart,
  auth,
  addToCart,
  deleteCartItem,
  productDeccrement
}) => {
  return cart ? (
    <div className='section section-top'>
      {cart.length === 0 ? (
        <div className='cart'>
          <p style={{ textAlign: 'center' }}>
            No products added to your shopping Cart.
          </p>
        </div>
      ) : (
        <Cart
          cart={cart}
          auth={auth}
          addToCart={addToCart}
          productDeccrement={productDeccrement}
          deleteCartItem={deleteCartItem}
        />
      )}
    </div>
  ) : (
    <Redirect to='/' />
  );
};

ShoppingCart.propTypes = {};

const mapState = ({ auth, products }) => ({
  cart: products.cart,
  auth: auth.isAuth
});
const mapDispatch = dispatch =>
  bindActionCreators(
    { addToCart, deleteCartItem, productDeccrement },
    dispatch
  );

export default { component: connect(mapState, mapDispatch)(ShoppingCart) };
