import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import Login from "../components/auth/login";
import {bindActionCreators} from "redux";
import {loginUser} from "../state/actions";

const RegisterPage = ({loginUser}) => {
  return (
    <div className=' section-top'>
      <Login loginUser={loginUser}/>
    </div>
  );
};


function mapDispatch(dispatch) {
  return bindActionCreators({loginUser}, dispatch);
}

export default { component: connect(null, mapDispatch)(RegisterPage) };