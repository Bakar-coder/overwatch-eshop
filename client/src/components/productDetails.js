import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const ProductDetails = ({ match, products, history, auth, addToCart }) => {
  const { title } = match.params;
  let product =
    title && products && products.filter(prod => prod.title === title);
  if (products) product = product[0];

  return product ? (
    <main className='product-details'>
      <div className='col img-container'>
        <img src={`${__dirname}${product.image}`} alt={product.title} />
      </div>
      <div className='col'>
        <h3> {product.title} </h3>
        <p> {product.description} </p>
        <h4> Price: $ {product.price}</h4>
        <button
          className='btn btn--primary'
          onClick={() => addToCart(product, history, auth)}>
          Add to Cart
        </button>
      </div>
    </main>
  ) : (
    <Redirect to='/' />
  );
};

export default withRouter(ProductDetails);
