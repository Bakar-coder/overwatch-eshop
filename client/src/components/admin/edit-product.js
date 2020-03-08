import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

function EditProduct({ edit_Product, match, products, history }) {
  const { id } = match.params;
  const productItem =
    id && products && products.filter(prod => prod.id === Number(id))[0];

  const [product, setProduct] = useState({
    id: productItem.id,
    title: productItem.title,
    description: productItem.description,
    price: productItem.price,
    image: productItem.image
  });

  const [file, setFile] = useState(productItem.image);

  const handleFormSubmission = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', product.id);
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    edit_Product(formData, history);
  };

  const handleInputChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileUpload = e => {
    setFile(e.target.files[0]);
    setProduct({ ...product, image: e.target.files[0].name });
  };

  const { title, description, price } = product;
  return (
    <form onSubmit={handleFormSubmission} className='form'>
      <div className='form-title'>
        <h3>Edit Product</h3>
        <p className='text-primary'>Update Product</p>
      </div>

      <div className='form-group'>
        <input
          type='text'
          className={title ? 'form-control text-primary' : 'form-control'}
          id='title'
          name='title'
          value={title}
          onChange={handleInputChange}
          required
        />
        <label className='form-label' id='title'>
          {title && 'Title'}
        </label>
      </div>

      <div className='form-group'>
        <input
          type='file'
          className='form-control'
          onChange={handleFileUpload}
        />
      </div>

      <div className='form-group'>
        <textarea
          type='text'
          className={description ? 'form-control text-primary' : 'form-control'}
          id='description'
          name='description'
          value={description}
          col='4'
          row='30'
          onChange={handleInputChange}
          required></textarea>
        <label className='form-label' id='description'>
          {description && 'Description'}
        </label>
      </div>

      <div className='form-group'>
        <input
          type='text'
          className={price ? 'form-control text-primary' : 'form-control'}
          id='price'
          name='price'
          value={price}
          onChange={handleInputChange}
          required
        />
        <label className='form-label' id='price'>
          {price && 'Price'}
        </label>
      </div>

      <button type='submit' className='btn btn-primary form-btn'>
        Save
      </button>
    </form>
  );
}

EditProduct.propTypes = {};

export default withRouter(EditProduct);
