import React from 'react';
import { Helmet } from 'react-helmet';
import banner1 from '../images/banner1.jfif';

const HomePage = () => {
  const headerTags = () => (
    <Helmet>
      <title>
        Over Watch | Get World greatest Smart Watches | Digital Watch | Watch{' '}
      </title>
      <meta
        property='og:title'
        content="Over Watch | Get World's greatest Smart Watches | Digital Watch | Watch"
      />

      <meta
        property='og:description'
        content="Get World's greatest Smart Watches in one store"
      />
    </Helmet>
  );

  return (
    <React.Fragment>
      {headerTags()}
      <div style={{ marginTop: '3rem', maxHeight: '90vh' }}>
        <div className='carousel'>
          <button className='carousel__button carousel__button--left'></button>
          <div className='carousel__container'>
            <ul>
              <li className='carousel__slide'>
                <img className='carousel__image' src={banner1} alt='banner1' />
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

      </div>
    </React.Fragment>
  );
};

export default {
  component: HomePage
};
