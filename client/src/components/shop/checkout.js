import React from 'react';
import PropTypes from 'prop-types';

const CheckoutComponent = ({ cart }) => {
  console.log(cart);
  return (
    <div className='section section-top'>
      <h1>Checkout</h1>
    </div>
  );
};

CheckoutComponent.propTypes = {

};

export default CheckoutComponent;
