import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import Cart from '../../components/shop/cart';
import { bindActionCreators } from 'redux';
import {
  deleteCartItem,
  productDeccrement,
  addToCart,
  submitOrder,
  setAmount
} from '../../state/actions';

const ShoppingCart = ({
  cart,
  auth,
  addToCart,
  total,
  deleteCartItem,
  productDeccrement,
  submitOrder,
  setAmount
}) => {
  if (cart.length > 0) setAmount(cart);
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
          submitOrder={submitOrder}
          total={total}
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
  auth: auth.isAuth,
  total: products.total
});
const mapDispatch = dispatch =>
  bindActionCreators(
    { addToCart, deleteCartItem, productDeccrement, submitOrder, setAmount },
    dispatch
  );

export default { component: connect(mapState, mapDispatch)(ShoppingCart) };
