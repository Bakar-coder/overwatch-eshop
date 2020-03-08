import React from 'react';
import Product from './product';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteProduct } from '../../state/actions';

const AdminProducts = ({ products, deleteProduct }) => {
  return products ? (
    <main className='section section-top'>
      <div className='grid'>
        {products.map(product => (
          <Product
            product={product}
            key={product.id}
            onDelete={deleteProduct}
          />
        ))}
      </div>
    </main>
  ) : null;
};

const mapState = ({ products }) => ({ products: products.products });
const mapDispatch = dispatch => bindActionCreators({ deleteProduct }, dispatch);

export default connect(mapState, mapDispatch)(AdminProducts);
