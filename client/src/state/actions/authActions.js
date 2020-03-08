import { SET_CURRENT, REMOVE_CURRENT } from '../types';
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
    setAlert(data, dispatch);
    setTimeout(() => history.replace('/users/login'), 3000);
    return;
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
    setAlert(res.data, dispatch);
    setTimeout(() => {
      window.location = '/';
    }, 3000);
    return;
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
