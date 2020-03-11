import React from 'react';
import PropTypes from 'prop-types';

function Order({ orders }) {
  console.log(orders);
  return (
    <div>
      {orders && orders.map(order => <ul key={order.id}>
          <li>{order.id}</li>
        </ul>)}
    </div>
  );
}

Order.propTypes = {};

export default Order;
