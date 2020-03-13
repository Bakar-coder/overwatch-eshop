import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CheckoutComponent from "../../components/shop/checkout";

const Checkout = ({ cart }) => {
  return (
    <div>
      <CheckoutComponent cart={cart}/>
    </div>
  );
};

Checkout.propTypes = {

};

function mapState({ products }) {
  return { cart: products.cart }
}

export default { component: connect(mapState, null)(Checkout) };
