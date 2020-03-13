import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import Reset from "../../components/auth/reset";
import {bindActionCreators} from "redux";
import {resetPassword} from "../../state/actions";

const RegisterPage = ({resetPassword}) => {
  return (
    <div className=' section-top'>
      <Reset resetPassword={resetPassword}/>
    </div>
  );
};


function mapDispatch(dispatch) {
  return bindActionCreators({resetPassword}, dispatch);
}

export default { component: connect(null, mapDispatch)(RegisterPage) };
