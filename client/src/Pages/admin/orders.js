import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import requireAdmin from '../../hocs/requireAdmin';
import requireAuth from '../../hocs/requireAuth';
import Orders from '../../components/admin/orders';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrders } from '../../state/actions';


function AdminOrders({getOrders, orders}) {
  useEffect(() => {
    getOrders(orders)
  },[getOrders])
  return (
    <div className='section section-top'>
      <Orders orders={orders} />
    </div>
  );
}

AdminOrders.propTypes = {};

const mapDispatch = dispatch => bindActionCreators({getOrders}, dispatch);
const mapState = ({ products }) => ({ orders: products.orders })


export default { component: requireAuth(requireAdmin(connect(mapState, mapDispatch)(AdminOrders))) };
