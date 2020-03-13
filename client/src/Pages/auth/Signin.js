import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import Login from "../../components/auth/login";
import {bindActionCreators} from "redux";
import {loginUser, reqPasswordReset} from "../../state/actions";

const RegisterPage = ({loginUser, reqPasswordReset}) => {
  return (
    <div className=' section-top'>
      <Login loginUser={loginUser} reqPasswordReset={reqPasswordReset}/>
    </div>
  );
};


function mapDispatch(dispatch) {
  return bindActionCreators({loginUser, reqPasswordReset}, dispatch);
}

export default { component: connect(null, mapDispatch)(RegisterPage) };
