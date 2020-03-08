import React from 'react';
import Navbar from './navbar';

const Layouts = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};

export default Layouts;
