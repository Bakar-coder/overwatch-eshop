import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';

const Reset = ({ resetPassword, history, match }) => {
  const { token } = match.params;
  const [user, setUser] = React.useState({
    passwd: '',
    token
  });


  const handleFormSubmission = e => {
    e.preventDefault();
    resetPassword(user, history);
  };

  const handleInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { passwd } = user;

  return token
    ? (
      <form onSubmit={handleFormSubmission} className='form'>
      <div className='form-title'>
        <h3>Update Password</h3>
        <p className='text-warning'>Reset your Password.</p>
      </div>

      <div className='form-group'>
        <input
          type='password'
          className={
            passwd && passwd.length < 8
              ? 'form-control text-danger'
              : passwd && passwd.length > 16
              ? 'form-control text-danger'
              : passwd
              ? 'form-control text-warning'
              : 'form-control'
          }
          id='passwd'
          name='passwd'
          value={passwd}
          onChange={handleInputChange}
          required
          placeholder='Password'
          minLength='8'
        />
        <label
          className={
            passwd && passwd.length < 8
              ? 'form-label text-danger'
              : passwd && passwd.length > 16
              ? 'form-label text-danger'
              : 'form-label'
          }
          id='passwd'>
          {passwd && passwd.length < 8
            ? 'Password must be at least 8 characters'
            : passwd && passwd.length > 16
            ? 'Password must be 16 characters maximum.'
            : passwd && passwd.length >= 8 && 'Password'}
        </label>
      </div>

      <button type='submit' className='btn btn-primary form-btn'>
        Reset
      </button>
    </form>
    ): <Redirect to='/users/login'/>
};

export default withRouter(Reset);
