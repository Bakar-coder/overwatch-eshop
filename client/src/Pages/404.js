import React, { Fragment } from 'react';
import PageImg from '../images/404.png'

const NoPage = () => {

  return <div className='noPage'>
    <img src={PageImg} alt="404 image"/>
    <p>Sorry, Page Not Found.</p>
  </div>
}

export default { component: NoPage };
