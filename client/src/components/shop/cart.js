import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Cart = ({
  cart,
  auth,
  deleteCartItem,
  productDeccrement,
  addToCart,
  history
}) => {
  const onDecrement = product => {
    productDeccrement(product, history, auth);
  };

  return (
    <div className='cart'>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Qty</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart &&
            cart.map(product => (
              <tr key={product.id}>
                <td>
                  <div className='image-container'>
                    <img
                      src={`${__dirname}${product.image}`}
                      alt={product.title}
                    />
                  </div>
                </td>
                <td>{product.title}</td>
                <td>{product.cartItem.quantity}</td>
                <td>${product.price}</td>

                <td>
                  <span
                    className='badge badge-dark'
                    onClick={() => onDecrement(product, history, auth)}>
                    -
                  </span>{' '}
                  <span
                    className='badge badge-primary'
                    onClick={() => addToCart(product, history, auth)}>
                    +
                  </span>{' '}
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteCartItem(product)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

Cart.propTypes = {};

export default withRouter(Cart);
