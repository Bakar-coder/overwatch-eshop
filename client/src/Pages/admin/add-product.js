import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AddProductComponent from '../../components/admin/add-product';
import { add_Product } from '../../state/actions';
import requireAdmin from '../../hocs/requireAdmin';
import requireAuth from '../../hocs/requireAuth';

const AddProduct = ({ add_Product }) => {
  return (
    <div className=' section-top'>
      <AddProductComponent add_Product={add_Product} />
    </div>
  );
};

function mapDispatch(dispatch) {
  return bindActionCreators({ add_Product }, dispatch);
}

export default {
  component: connect(null, mapDispatch)(requireAuth(requireAdmin(AddProduct)))
};
