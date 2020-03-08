import React from 'react';
import Product from './product';
import { connect } from 'react-redux';

const Products = ({ products }) => {
  return products ? (
    <main className='section' style={{ paddingTop: '4.5rem' }}>
      <div className='grid'>
        {products.map(product => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </main>
  ) : null;
};

const mapState = ({ products }) => ({ products: products.products });

export default connect(mapState, null)(Products);
