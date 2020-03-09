import { GET_PRODUCTS, DELETE_PRODUCT, GET_CART } from '../types';
import setError from '../errorHandler';
import setAlert from '../alertHandler';

export const getProducts = () => async (dispatch, getState, api) => {
  try {
    const { data } = await api.get('/api/products');
    return dispatch({ type: GET_PRODUCTS, payload: data.products });
  } catch (ex) {
    console.log(ex);
  }
};

export const deleteProduct = product => async (dispatch, getState, api) => {
  try {
    const { data } = await api.post('/api/admin/delete-product', product);
    if (data.success) dispatch({ type: DELETE_PRODUCT, payload: product });
    setAlert(data, dispatch);
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const getCart = () => async (dispatch, getState, api) => {
  try {
    const { data } = await api.get('/api/cart');
    dispatch({ type: GET_CART, payload: data.cartProducts });
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const addToCart = (product, history, auth) => async (
  dispatch,
  getState,
  api
) => {
  try {
    let res;
    if (auth) res = await api.post('/api/cart', product);
    else return history.push('/users/login');
    console.log(res.data);
  } catch (ex) {
    setError(ex, dispatch);
  }
};
