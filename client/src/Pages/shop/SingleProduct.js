import React, { useEffect } from 'react';

import ProductDetails from '../../components/productDetails';
import { connect } from 'react-redux';

const SingleProduct = ({ products }) => {
  return (
    <section className='section section-top'>
      <ProductDetails products={products} />
    </section>
  );
};

const mapState = ({ products }) => ({ products: products.products });

export default { component: connect(mapState, null)(SingleProduct) };
