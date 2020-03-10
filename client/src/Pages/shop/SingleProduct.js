import React from 'react';
import ProductDetails from '../../components/productDetails';
import { connect } from 'react-redux';
import { addToCart } from '../../state/actions';
import { bindActionCreators } from 'redux';

const SingleProduct = ({ products, auth, addToCart }) => {
  return (
    <section className='section section-top'>
      <ProductDetails products={products} addToCart={addToCart} auth={auth} />
    </section>
  );
};

const mapState = ({ products, auth }) => ({
  products: products.products,
  auth: auth.isAuth
});

const mapDispatch = dispatch => bindActionCreators({ addToCart }, dispatch);

export default { component: connect(mapState, mapDispatch)(SingleProduct) };
