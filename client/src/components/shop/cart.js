import React from 'react';
import PropTypes from 'prop-types';

const Cart = ({ cart }) => {
  console.log(cart);
  return (
    <div className='cart'>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='image-container'>
                <img src={`${__dirname}${cart.image}`} alt={cart.title} />
              </div>
            </td>
            <td>{cart.title}</td>
            <td>{cart.cartItem.quantity}</td>
            <td>$ {cart.price}</td>
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
