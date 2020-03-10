import React from 'react';
import banner1 from '../images/banner1.jfif';
import banner2 from '../images/banner2.jfif';
import banner3 from '../images/banner3.jfif';

import Products from '../components/products';

const HomePage = () => {
  return (
    <div style={{ marginTop: '3rem' }}>
      <div className='carousel'>
        <button className='carousel__button carousel__button--left'></button>
        <div className='carousel__container'>
          <ul>
            <li className='carousel__slide'>
              <img className='carousel__image' src={banner1} alt='banner1' />
            </li>

            <li className='carousel__slide'>
              <img className='carousel__image' src={banner3} alt='banner3' />
            </li>

            <li className='carousel__slide'>
              <img className='carousel__image' src={banner2} alt='banner2' />
            </li>
          </ul>
        </div>
        <button className='carousel__button carousel__button--right'></button>
        <div className='carousel__nav'>
          <button className='carousel__indicator'></button>
          <button className='carousel__indicator'></button>
          <button className='carousel__indicator'></button>
        </div>
      </div>
      <Products />;
    </div>
  );
};

export default {
  component: HomePage
};
