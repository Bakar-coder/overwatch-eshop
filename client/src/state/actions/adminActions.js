import { UPDATE_PRODUCT } from '../types';

import setError from '../errorHandler';
import setAlert from '../alertHandler';

export const add_Product = (formData, history) => async (
  dispatch,
  getState,
  api
) => {
  try {
    const { data } = await api.post('/api/admin/add-product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setAlert(data, dispatch);
    history.push('/');
  } catch (ex) {
    setError(ex, dispatch);
  }
};

export const edit_Product = (formData, history) => async (
  dispatch,
  getState,
  api
) => {
  try {
    const { data } = await api.post('/api/admin/edit-product', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    dispatch({ type: UPDATE_PRODUCT, payload: data.product });
    setAlert(data, dispatch);
    history.push('/admin/product');
  } catch (ex) {
    setError(ex, dispatch);
  }
};
