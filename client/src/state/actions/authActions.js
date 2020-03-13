import { SET_CURRENT, REMOVE_CURRENT, SET_ERROR, REMOVE_ERROR, RESET_TOKEN } from '../types';
import Jwt from 'jwt-decode';
import cookie from 'js-cookie';
import setError from '../errorHandler';
import setAlert from '../alertHandler';

export const registerUser = (user, history) => async (
  dispatch,
  getState,
  api
) => {
  try {
    const { data } = await api.post('/api/users/register', user);
    history.replace('/users/login'), 3000;
    return setAlert(data, dispatch);
  } catch (ex) {
    console.log(ex);
    setError(ex, dispatch);
  }
};

export const loginUser = user => async (dispatch, getState, api) => {
  try {
    const res = await api.post('/api/users/login', user);
    const token = res.headers['x-auth-token'];
    cookie.set('x-auth-token', token);
    window.location = '/';
    return setAlert(res.data, dispatch);
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const setCurrent = () => async dispatch => {
  try {
    let token = cookie.get('x-auth-token');
    if (token) {
      token = token.split(' ')[1];
      const user = await Jwt(token);
      if (user.exp < Date.now() / 1000)
        return dispatch({ type: REMOVE_CURRENT });
      dispatch({ type: SET_CURRENT, payload: user });
    }
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const logoutUser = () => async dispatch => {
  dispatch({ type: REMOVE_CURRENT });
  const data = { msg: "You've successfully logged out your account." };
  setAlert(data, dispatch);
  setTimeout(() => {
    window.location = '/';
  }, 3000);
};

export const resetPassword = (user, history) => async (dispatch, getState, api) => {
  try {
    const {data} = await api.post('/api/users/new-password', user);
    if (!data.success) return;
    setAlert(data, dispatch);
    return history.push('/users/login');
  } catch (ex) {
    setError(ex, dispatch);
  }
}

export const reqPasswordReset = user => async (dispatch, getState, api) => {
  try {
    if (!user.email) {
      setTimeout(() => dispatch({ type: REMOVE_ERROR }), 3000)
      return dispatch({ type: SET_ERROR, payload: 'Enter your email address to reset password.' })
    }
      const { data } = await api.post('/api/users/reset', user );
      setAlert(data, dispatch)
  } catch (ex) {
    setError(ex, dispatch);
  }
}
