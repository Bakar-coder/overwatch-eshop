import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Product = ({ product, onDelete }) => {
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
            <div className='grouped'>
              <button type='submit' className='btn btn--primary'>
                <Link to={`/admin/edit-product/${product.id}`}>Edit</Link>
              </button>
              <button
                type='submit'
                className='btn btn--danger'
                onClick={() => onDelete(product)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Product);
