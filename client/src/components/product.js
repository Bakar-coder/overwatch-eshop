import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className='card' key={product.id}>
      <div className='card--image'>
        <img src={`${__dirname}${product.image}`} alt='product-image' />
      </div>
      <div className='card--content'>
        <h3 className='card-title'>{product.title} </h3>
        <div className='card--footer'>
          <h4 className='card--price'> $ {product.price} </h4>
          <div>
            <button type='button' className='btn btn--outline'>
              <Link to={`/products/${product.title}`}>Details</Link>
            </button>
            <button type='submit' className='btn btn--primary'>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Product);
