import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditProductComponent from '../../components/admin/edit-product';
import { edit_Product } from '../../state/actions';
import requireAdmin from '../../hocs/requireAdmin';
import requireAuth from '../../hocs/requireAuth';

const EditProduct = ({ edit_Product, products }) => {
  return (
    <div className=' section-top'>
      <EditProductComponent edit_Product={edit_Product} products={products} />
    </div>
  );
};

function mapDispatch(dispatch) {
  return bindActionCreators({ edit_Product }, dispatch);
}

function mapState({ products }) {
  return { products: products.products };
}

export default {
  component: connect(
    mapState,
    mapDispatch
  )(requireAuth(requireAdmin(EditProduct)))
};
