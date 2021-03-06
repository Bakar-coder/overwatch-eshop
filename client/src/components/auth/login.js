import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Login = ({ loginUser, history, reqPasswordReset }) => {
  const [user, setUser] = React.useState({
    email: '',
    passwd: ''
  });

  const handleInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmission = e => {
    e.preventDefault();
    loginUser(user, history);
  };

  const handleReset = () => {
    reqPasswordReset(user);
  }

  const { email, passwd } = user;

  return (
    <form onSubmit={handleFormSubmission} className='form'>
      <div className='form-title'>
        <h3>Sign in</h3>
        <p className='text-warning'>Login your account.</p>
      </div>

      <div className='form-group'>
        <input
          type='email'
          className={email ? 'form-control text-warning' : 'form-control'}
          id='email'
          name='email'
          value={email}
          onChange={handleInputChange}
          required
          placeholder='Email Address'
        />
        <label className='form-label' id='email'>
          {email && 'Email Address'}
        </label>
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
        Login
      </button>

      <div className='reset'>
      <p>
        Not yet registered ? {'  '}
        <Link to='/users/register' className='text-warning'>
          REGISTER
        </Link>
      </p>
      <p>Forgot Password ?{'  '} <Link to='#' className='text-warning' onClick={handleReset}>Reset.</Link></p></div>
    </form>
  );
};

export default withRouter(Login);
