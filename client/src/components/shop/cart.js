import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Cart = ({
  cart,
  auth,
  total,
  submitOrder,
  deleteCartItem,
  productDeccrement,
  addToCart,
  history
}) => {
  const onDecrement = product => {
    productDeccrement(product, history, auth);
  };

  const handleOrder = () => {
    submitOrder(history);
  };

  console.log(total);
  return (
    <div className='cart'>
    <div class="table-content table-responsive">
      <table >
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
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
                <td>{product.price}</td>
                <td>{(product.cartItem.quantity * product.price).toFixed(2)}</td>

                <td>
                  <span
                    className='badge badge-warning'
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

      <div className='order-sec'>
        <h4>
          Total Amount : <span>$ {total}</span>
        </h4>

        <button className='btn btn-warning btn-lg' onClick={handleOrder}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {};

export default withRouter(Cart);
