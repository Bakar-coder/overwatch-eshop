import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import Register from "../../components/auth/register";
import {bindActionCreators} from "redux";
import {registerUser} from "../../state/actions";

const RegisterPage = ({registerUser}) => {
  return (
    <div className=' section-top'>
      <Register registerUser={registerUser}/>
    </div>
  );
};

function mapStateToProps() {
  return {}
}

function mapDispatch(dispatch) {
  return bindActionCreators({registerUser}, dispatch);
}

export default { component: connect(mapStateToProps, mapDispatch)(RegisterPage) };
