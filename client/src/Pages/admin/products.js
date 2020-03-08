import React from 'react';
import PropTypes from 'prop-types';
import requireAdmin from '../../hocs/requireAdmin';
import requireAuth from '../../hocs/requireAuth';
import Products from '../../components/admin/products';

function AdminProducts(props) {
  return <Products />;
}

AdminProducts.propTypes = {};

export default { component: requireAuth(requireAdmin(AdminProducts)) };
