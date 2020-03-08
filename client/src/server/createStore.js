import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../state/reducers';
import axios from 'axios';
import cookie from 'js-cookie';

export default req => {
  const initialState = {};
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: { Authorization: cookie.get('x-auth-token') || '' }
  });
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
};
