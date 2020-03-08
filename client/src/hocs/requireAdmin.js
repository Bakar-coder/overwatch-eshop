import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
  const requireAuth = props => {
    switch (props.auth.user.admin) {
      case false:
        return <Redirect to='/users/login' />;
      case null:
        return <div>Loading...</div>;
      default:
        return <ChildComponent {...props} />;
    }
  };

  const mapStateToProps = ({ auth }) => ({ auth });
  return connect(mapStateToProps, null)(requireAuth);
};
