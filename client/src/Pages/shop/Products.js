import React from 'react';
import PropTypes from 'prop-types';
import Products from "../../components/products";

const ProductsPage = props => {
  return (
    <div className='section section-top'>
      <Products/>
    </div>
  );
};

ProductsPage.propTypes = {

};

export default { component: ProductsPage};
