import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../state/reducers';
import Axios from 'axios';
import cookie from 'js-cookie';

const axiosInstance = Axios.create({
  baseURL: '/api',
  headers: { Authorization: cookie.get('x-auth-token') || '' }
});
const initialState = window.INITIAL_STATE;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance)))
);
