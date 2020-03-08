import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import alertReducer from './alertReducer';
import productsReducer from './productsReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  alerts: alertReducer,
  products: productsReducer
});
