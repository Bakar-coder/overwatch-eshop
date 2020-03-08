import { GET_PRODUCTS, DELETE_PRODUCT } from '../types';
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
