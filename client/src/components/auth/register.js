import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = ({ registerUser, history }) => {
  const [user, setUser] = React.useState({
    f_name: '',
    l_name: '',
    username: '',
    email: '',
    passwd: '',
    passwd2: ''
  });

  const handleFormSubmission = e => {
    e.preventDefault();
    const { username, passwd, passwd2 } = user;
    if (
      username.length < 3 ||
      passwd.length < 8 ||
      passwd.length > 16 ||
      passwd !== passwd2
    )
      return;
    registerUser(user, history);
  };

  const handleInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const { f_name, l_name, username, email, passwd, passwd2 } = user;

  return (
    <form onSubmit={handleFormSubmission} className='form'>
      <div className='form-title'>
        <h3>Sign up</h3>
        <p className='text-warning'>Create a free account.</p>
      </div>

      <div className='grid-2'>
        <div className='form-group'>
          <input
            type='text'
            className={f_name ? 'form-control text-warning' : 'form-control'}
            id='f_name'
            name='f_name'
            value={f_name}
            onChange={handleInputChange}
            required
            placeholder='First Name'
          />
          <label className='form-label' id='f_name'>
            {f_name && 'First Name'}
          </label>
        </div>

        <div className='form-group'>
          <input
            type='text'
            className={l_name ? 'form-control text-warning' : 'form-control'}
            id='l_name'
            name='l_name'
            value={l_name}
            onChange={handleInputChange}
            required
            placeholder='Last Name'
          />
          <label className='form-label' id='l_name'>
            {l_name && 'Last Name'}
          </label>
        </div>
      </div>

      <div className='grid-2'>
        <div className='form-group'>
          <input
            type='text'
            className={
              username && username.length < 3
                ? 'form-control text-danger'
                : username && username.length >= 3
                ? 'form-control text-warning'
                : 'form-control'
            }
            id='username'
            name='username'
            value={username}
            onChange={handleInputChange}
            required
            placeholder='Username'
            minLength='3'
          />
          <label
            className={
              username && username.length < 3
                ? 'form-label text-danger'
                : 'form-label'
            }
            id='username'>
            {username && username.length < 3
              ? 'Username must be at least 3 characters'
              : username && 'Username'}
          </label>
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

      <div className='form-group'>
        <input
          type='password'
          className={
            passwd2 && passwd2 !== passwd
              ? 'form-control text-danger'
              : passwd2 && passwd2 === passwd
              ? 'form-control text-warning'
              : 'form-control'
          }
          id='passwd2'
          name='passwd2'
          value={passwd2}
          onChange={handleInputChange}
          required
          placeholder='Confirm Password'
        />
        <label
          className={
            passwd2 && passwd2 !== passwd
              ? 'form-label text-danger'
              : 'form-label'
          }
          id='passwd2'>
          {passwd2 && passwd2 !== passwd
            ? "Passwords don't match."
            : passwd2 && 'Confirm Password'}
        </label>
      </div>

      <button type='submit' className='btn btn-primary form-btn'>
        Register
      </button>
      <p>
        Already Registered ?{' '}
        <Link to='/users/login' className='text-warning'>
          LOGIN
        </Link>
      </p>
    </form>
  );
};

export default withRouter(Register);
