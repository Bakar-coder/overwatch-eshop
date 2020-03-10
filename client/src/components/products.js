import React from 'react';
import Product from './product';
import { connect } from 'react-redux';
import { addToCart } from '../state/actions';
import { bindActionCreators } from 'redux';

const Products = ({ auth, products, addToCart }) => {
  return products ? (
    <main className='section' style={{ paddingTop: '5.5rem' }}>
      <div className='grid'>
        {products.map(product => (
          <Product
            product={product}
            key={product.id}
            addToCart={addToCart}
            auth={auth}
          />
        ))}
      </div>
    </main>
  ) : null;
};

const mapState = ({ auth, products }) => ({
  auth: auth.isAuth,
  products: products.products
});
const mapDispatch = dispatch => bindActionCreators({ addToCart }, dispatch);

export default connect(mapState, mapDispatch)(Products);
